// src/pages/CombinationPage.js
import { useState } from "react";
import ProductCard from "../components/layout/ProductCard";
import AddPieceModal from "../components/layout/AddPieceModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// 1. Başlangıç verilerini (normalde API'den gelir) tanımlayalım
const initialCombinations = [
  {
    id: 1,
    name: "Hafta Sonu Kombini",
    category: "Günlük",
    imageUrl: "https://placehold.co/400x500/dbeafe/1e3a8a?text=Kombin+1",
  },
  {
    id: 2,
    name: "İş Toplantısı",
    category: "İş",
    imageUrl: "https://placehold.co/400x500/dbeafe/1e3a8a?text=Kombin+2",
  },
  {
    id: 3,
    name: "Akşam Yemeği",
    category: "Özel Davet",
    imageUrl: "https://placehold.co/400x500/dbeafe/1e3a8a?text=Kombin+3",
  },
];

const categories = ["Tümü", "Günlük", "İş", "Özel Davet"];

// Kategori ID'lerini isimlerle eşleştirmek için bir yardımcı
const categoryMap = {
  1: "Günlük",
  2: "İş",
  3: "Özel Davet",
};

function CombinationPage() {
  // 2. State'leri tanımlayalım
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 'products' state'ini 'combinations' olarak yeniden adlandırdık
  const [combinations, setCombinations] = useState(initialCombinations);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  // 3. Olay Yöneticileri (Event Handlers)
  // Modal'ı aç/kapat
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Yeni kombin ekleme
  const handleAddCombination = (formData: any) => {
    // API'ye gönderme simülasyonu
    console.log("API'ye gönderilen kombin verisi:", formData);

    // Yeni kombini oluştur ve listeye ekle
    const newCombination = {
      id: combinations.length + 5, // Gerçek bir DB'de bu ID'yi sunucu verir
      name: formData.name,
      imageUrl: formData.imageUrl,
      category: categoryMap[formData.categoryId], // ID'yi isme çevir
    };

    setCombinations((prevCombinations) => [
      ...prevCombinations,
      newCombination,
    ]);
    closeModal(); // Modalı kapat
  };

  // Kombin silme
  const handleDeleteCombination = (combinationId: any) => {
    // API'ye DELETE isteği simülasyonu
    console.log(`Kombin ${combinationId} siliniyor...`);
    setCombinations((prevCombinations) =>
      prevCombinations.filter((c) => c.id !== combinationId)
    );
  };

  // 4. Filtrelenmiş kombin listesini hesapla
  const filteredCombinations = combinations.filter((combination) => {
    if (activeCategory === "Tümü") return true;
    return combination.category === activeCategory;
  });

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold">
              Kombinlerim
            </h1>

            <button
              id="addCombinationBtn" // ID güncellendi
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
              <span>Yeni Kombin Ekle</span>
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
            {filteredCombinations.map((combination) => (
              <ProductCard
                key={combination.id}
                product={combination} // ProductCard 'product' prop'u bekliyor
                onDelete={handleDeleteCombination} // Silme fonksiyonu güncellendi
              />
            ))}
          </div>
        </main>

        <Footer />

        <AddPieceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddCombination}
        />
      </div>
    </>
  );
}

export default CombinationPage;
