// src/pages/CombinationPage.tsx
import { useState } from "react";
import ProductCard from "../components/layout/ProductCard";
import AddPieceModal from "../components/layout/AddPieceModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Örnek tipler
interface Category {
  id: number;
  name: string;
}

interface Combination {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}

// Başlangıç kombinleri
const initialCombinations: Combination[] = [
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

// Modal için kategoriler
const categories: Category[] = [
  { id: 0, name: "Tümü" },
  { id: 1, name: "Günlük" },
  { id: 2, name: "İş" },
  { id: 3, name: "Özel Davet" },
];

function CombinationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [combinations, setCombinations] =
    useState<Combination[]>(initialCombinations);
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Yeni parça ekleme (modal için)
  const handleAddPiece = (formData: {
    name: string;
    imageUrl: string;
    categoryId: number;
  }) => {
    const newCombination: Combination = {
      id: combinations.length + 1,
      name: formData.name,
      imageUrl: formData.imageUrl,
      category:
        categories.find((c) => c.id === formData.categoryId)?.name || "Tümü",
    };
    setCombinations((prev) => [newCombination, ...prev]);
    closeModal();
  };

  const handleDeleteCombination = (combinationId: number) => {
    setCombinations((prev) => prev.filter((c) => c.id !== combinationId));
  };

  // Filtrelenmiş kombinler
  const filteredCombinations = combinations.filter(
    (c) => activeCategory === "Tümü" || c.category === activeCategory
  );

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
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.name)}
                className={`tab-btn px-4 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === c.name
                    ? "bg-zinc-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredCombinations.map((c) => (
              <ProductCard
                key={c.id}
                product={c}
                onDelete={handleDeleteCombination}
              />
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

export default CombinationPage;
