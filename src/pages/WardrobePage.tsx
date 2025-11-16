import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import type { Category } from "../types"; // sadece tip amaçlı
import { useAuth } from "../hooks/useAuth";
import * as productService from "../services/productService";
import AddPieceModal from "../components/layout/AddPieceModal";


// Product ve FormData tipleri
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
}

export interface ProductFormData {
  name: string;
  imageUrl: string;
  categoryId: number;
}

const WardrobePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  // Kategorileri yükle
  useEffect(() => {
    if (isAuthLoading || !isLoggedIn) {
      if (!isAuthLoading) setIsPageLoading(false);
      return;
    }

    const loadCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Kategoriler yüklenemedi.");
      }
    };

    loadCategories();
  }, [isLoggedIn, isAuthLoading]);

  // Ürünleri yükle
  useEffect(() => {
    if (isAuthLoading || !isLoggedIn) return;

    const loadProducts = async () => {
      setIsPageLoading(true);
      setError(null);
      try {
        const data: Product[] = await productService.getProducts(activeCategory);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Ürünler yüklenirken bir sorun oluştu.");
      } finally {
        setIsPageLoading(false);
      }
    };

    loadProducts();
  }, [isLoggedIn, isAuthLoading, activeCategory]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPiece = async (formData: ProductFormData) => {
    try {
      const newProduct: Product = await productService.createProduct(formData);
      setProducts((prev) => [newProduct, ...prev]);
      closeModal();
    } catch (err: any) {
      alert("Hata: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeletePiece = async (productId: number) => {
    if (!window.confirm("Bu parçayı silmek istediğinizden emin misiniz?")) return;

    try {
      await productService.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      alert("Silme Hatası: " + (err.response?.data?.message || err.message));
    }
  };

  const filteredProducts = products.filter(
    (p) => activeCategory === null || p.categoryId === activeCategory
  );

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold">
              Gardırobum
            </h1>
            <button
              onClick={openModal}
              disabled={!isLoggedIn}
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Yeni Parça Ekle
            </button>
          </div>

          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`tab-btn px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                activeCategory === null
                  ? "bg-zinc-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tümü
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tab-btn px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-zinc-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {!isLoggedIn ? (
            <div className="text-center py-20 text-gray-500">
              Giriş yapmalısınız.
            </div>
          ) : isPageLoading ? (
            <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-600">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              {activeCategory
                ? "Bu kategoride parça yok."
                : "Gardırobunuz boş."}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={() => handleDeletePiece(product.id)}
                />
              ))}
            </div>
          )}
        </main>

        <Footer />

        <AddPieceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddPiece}
          categories={categories}
        />
      </div>
    </>
  );
};

export default WardrobePage;
