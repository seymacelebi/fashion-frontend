import React, { useState, useEffect } from "react";

// 1. Gerçek Servis ve Context Importları
import * as productService from "../services/productService"; // Backend ile konuşan servis

// 2. Gerçek Bileşen Importları
// (Dosya yollarının projenizdeki yerlerle eşleştiğinden emin olun)
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import AddPieceModal from "../components/layout/AddPieceModal";

import { useAuth } from "../hooks/useAuth"; // Auth Context Hook

function WardrobePage() {
  // --- State Yönetimi ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // null = "Tümü"

  // Yüklenme ve Hata Durumları
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth Context'ten kullanıcının giriş durumunu al
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  // --- VERİ ÇEKME (Backend'den) ---

  // 1. Kategorileri Yükle (Sayfa açılışında 1 kere)
  useEffect(() => {
    // Auth yükleniyorsa veya kullanıcı giriş yapmadıysa bekle
    if (isAuthLoading || !isLoggedIn) {
      if (!isAuthLoading) setIsPageLoading(false);
      return;
    }

    const loadCategories = async () => {
      try {
        // Backend: GET /api/categories
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kategori yükleme hatası:", err);
        setError("Kategoriler yüklenemedi.");
      }
    };

    loadCategories();
  }, [isLoggedIn, isAuthLoading]);

  // 2. Ürünleri Yükle (Kategori değiştiğinde veya giriş yapıldığında)
  useEffect(() => {
    if (isAuthLoading || !isLoggedIn) return;

    const loadProducts = async () => {
      setIsPageLoading(true);
      setError(null);
      try {
        // Backend: GET /api/products (veya ?categoryId=...)
        // productService token'ı otomatik ekler (apiClient sayesinde)
        const data = await productService.getProducts(activeCategory);
        setProducts(data);
      } catch (err) {
        console.error("Ürün yükleme hatası:", err);
        setError("Ürünler yüklenirken bir sorun oluştu.");
      } finally {
        setIsPageLoading(false);
      }
    };

    loadProducts();
  }, [isLoggedIn, isAuthLoading, activeCategory]);

  // --- OLAY YÖNETİCİLERİ (Handlers) ---

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Yeni Parça Ekle (Backend'e POST)
  const handleAddPiece = async (formData) => {
    try {
      // Backend: POST /api/products
      const newProduct = await productService.createProduct(formData);

      // Başarılıysa listeyi güncelle (sayfa yenilemeden)
      setProducts((prev) => [newProduct, ...prev]);
      closeModal();
    } catch (err) {
      alert("Hata: " + (err.response?.data?.message || err.message));
    }
  };

  // Parça Sil (Backend'e DELETE)
  const handleDeletePiece = async (productId) => {
    if (!window.confirm("Bu parçayı silmek istediğinizden emin misiniz?"))
      return;

    try {
      // Backend: DELETE /api/products/{id}
      await productService.deleteProduct(productId);

      // Başarılıysa listeden çıkar
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      alert("Silme Hatası: " + (err.response?.data?.message || err.message));
    }
  };

  // --- RENDER ---
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          {/* Başlık ve Ekle Butonu */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold">
              Gardırobum
            </h1>
            <button
              onClick={openModal}
              disabled={!isLoggedIn}
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* SVG Artı İkonu */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              <span>Yeni Parça Ekle</span>
            </button>
          </div>

          {/* Kategori Sekmeleri */}
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

          {/* İçerik Alanı */}
          {!isLoggedIn ? (
            <div className="text-center py-20 text-gray-500">
              Gardırobunuzu görmek için lütfen giriş yapın.
            </div>
          ) : isPageLoading ? (
            <div className="text-center py-20 text-gray-500">
              Gardırobunuz yükleniyor...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              {activeCategory
                ? "Bu kategoride henüz parça yok."
                : "Gardırobunuz boş, yeni parçalar ekleyin!"}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
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

        {/* Modal Bileşeni */}
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
