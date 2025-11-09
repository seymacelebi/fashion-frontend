import { useState } from "react";
import ProductCard from "../components/layout/ProductCard";
import AddPieceModal from "../components/layout/AddPieceModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const initialProducts = [
  {
    id: 1,
    name: "Bej Blazer Ceket",
    category: "Ceketler",
    imageUrl: "https://placehold.co/400x500/e2e8f0/64748b?text=Ceket",
  },
  {
    id: 2,
    name: "Keten Pantolon",
    category: "Pantolonlar",
    imageUrl: "https://placehold.co/400x500/e2e8f0/64748b?text=Pantolon",
  },
  {
    id: 3,
    name: "Çiçekli Elbise",
    category: "Elbiseler",
    imageUrl: "https://placehold.co/400x500/e2e8f0/64748b?text=Elbise",
  },
  {
    id: 4,
    name: "Beyaz Sneaker",
    category: "Ayakkabılar",
    imageUrl: "https://placehold.co/400x500/e2e8f0/64748b?text=Ayakkab%C4%B1",
  },
];

const categories = [
  "Tümü",
  "Ceketler",
  "Pantolonlar",
  "Elbiseler",
  "Ayakkabılar",
];

const categoryMap = {
  1: "Ceketler",
  2: "Pantolonlar",
  3: "Elbiseler",
  4: "Ayakkabılar",
};

function WardrobePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPiece = (formData: any) => {
    console.log("API'ye gönderilen veri:", formData);

    const newProduct = {
      id: products.length + 5, // Gerçek bir DB'de bu ID'yi sunucu verir
      name: formData.name,
      imageUrl: formData.imageUrl,
      category: categoryMap[formData.categoryId], // ID'yi isme çevir
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    closeModal(); // Modalı kapat
  };

  const handleDeletePiece = (productId: any) => {
    console.log(`Ürün ${productId} siliniyor...`);
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  };

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "Tümü") return true;
    return product.category === activeCategory;
  });

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold">
              Gardırobum
            </h1>
            <button
              id="addPieceBtn"
              onClick={openModal}
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center space-x-2"
            >
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

          <div className="flex space-x-2 mb-8" id="categoryTabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tab-btn px-4 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-zinc-900 text-white" // Aktif stil
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Pasif stil
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* 5. Filtrelenmiş listeyi map ile dönerek ProductCard bileşenini oluştur */}
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDeletePiece}
              />
            ))}
          </div>
        </main>

        <Footer />

        <AddPieceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddPiece}
        />
      </div>
    </>
  );
}

export default WardrobePage;
