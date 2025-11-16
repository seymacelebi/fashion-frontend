// src/pages/WardrobePage.tsx
import { useEffect, useState } from "react";
import type { Category } from "../types"; // sadece tip amaçlı
import ProductCard from "../components/layout/ProductCard";
import AddPieceModal from "../components/layout/AddPieceModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import * as productService from "../services/productService";

// Tipler
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  price?: number;
}

interface ProductFormData {
  name: string;
  imageUrl: string;
  categoryId: number;
}

// Örnek kategoriler
const categories: Category[] = [
  { id: 0, name: "Tümü" },
  { id: 1, name: "Günlük" },
  { id: 2, name: "İş" },
  { id: 3, name: "Özel Davet" },
];

function WardrobePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  // Modal aç/kapat
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Backend’den ürünleri çek ve normalize et
  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await productService.getProducts();
        const normalizedProducts: Product[] = fetchedProducts.map(p => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          categoryId: p.categoryId ?? 0, // eksikse default değer
          price: p.price,
        }));
        setProducts(normalizedProducts);
      } catch (err) {
        console.error("Ürünler çekilemedi:", err);
      }
    }

    fetchProducts();
  }, []);

  // Yeni ürün ekleme
  const handleAddPiece = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: products.length + 1,
      name: formData.name,
      imageUrl: formData.imageUrl,
      categoryId: formData.categoryId,
    };
    setProducts(prev => [...prev, newProduct]);
    closeModal();
  };

  // Ürün silme
  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(
    p =>
      activeCategory === "Tümü" ||
      categories.find(c => c.id === p.categoryId)?.name === activeCategory
  );

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold">Gardırobum</h1>
            <button
              onClick={openModal}
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center space-x-2"
            >
              Yeni Ürün Ekle
            </button>
          </div>

          <div className="flex space-x-2 mb-8">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.name)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === c.name ? "bg-zinc-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onDelete={handleDeleteProduct} />
            ))}
          </div>
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
}

export default WardrobePage;
