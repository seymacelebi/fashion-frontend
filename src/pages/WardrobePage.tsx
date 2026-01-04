import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import AddItemModal from "../components/layout/AddItemModal";
import UpdateProductModal from "../components/layout/UpdateProductModal";
import SidebarList from "../components/wardrobe/SidebarList";
import ItemDetail from "../components/wardrobe/ItemDetail";
import Suggestions from "../components/wardrobe/Suggestions";
import type { Product, Category } from "../types";
import {
  getProducts,
  getCategories,
  deleteProduct,
} from "../services/productService";

const WardrobePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Modallar için ayrı state'ler
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      if (window.confirm("Bu parçayı silmek istediğinize emin misiniz?")) {
        await deleteProduct(id);
        await loadData();
        setSelectedItemId(null);
      }
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
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
            setIsModalOpen={setIsAddModalOpen} // Sidebar'daki buton Ekleme modalını açar
          />

          <div className="lg:col-span-8 space-y-6">
            {selectedItem ? (
              <>
                <ItemDetail
                  item={selectedItem}
                  onDelete={handleDeleteProduct}
                  onEdit={handleOpenEditModal} // Detaydaki buton Düzenleme modalını açar
                />
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
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSuccess={loadData}
      />

      <UpdateProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        initialData={editingProduct}
        onSuccess={loadData}
      />
    </div>
  );
};

export default WardrobePage;
