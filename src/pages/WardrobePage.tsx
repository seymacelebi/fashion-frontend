import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import AddItemModal from "../components/layout/AddItemModal";

// Yeni ayırdığımız bileşenler
import SidebarList from "../components/wardrobe/SidebarList";
import ItemDetail from "../components/wardrobe/ItemDetail";
import Suggestions from "../components/wardrobe/Suggestions";

import { getProducts, getCategories, type Product, type Category } from "../services/productService";

const WardrobePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Veri yükleme logic'i
  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(activeFilterId),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);

      if (productsData.length > 0 && !selectedItemId) {
        setSelectedItemId(productsData[0].id);
      }
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeFilterId]);

  const selectedItem = products.find((item) => item.id === selectedItemId);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-stone-900">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <SidebarList
            items={products}
            categories={categories}
            selectedId={selectedItemId}
            onSelect={setSelectedItemId}
            activeFilterId={activeFilterId}
            onFilterChange={setActiveFilterId}
            setIsModalOpen={setIsModalOpen}
          />

          <div className="lg:col-span-8 space-y-6">
            {selectedItem ? (
              <>
                <ItemDetail item={selectedItem} />
                <Suggestions />
              </>
            ) : (
              <div className="text-center py-20 text-stone-400 bg-white rounded-2xl border border-stone-200">
                Henüz parça bulunamadı.
              </div>
            )}
          </div>

        </div>
      </main>

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadData} 
      />
    </div>
  );
};

export default WardrobePage;