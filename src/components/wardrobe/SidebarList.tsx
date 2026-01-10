import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type { Product, Category } from "../../types";

interface SidebarListProps {
  items: Product[];
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  activeFilterId: number | null;
  onFilterChange: (id: number | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SidebarList: React.FC<SidebarListProps> = ({
  items,
  categories,
  selectedId,
  onSelect,
  activeFilterId,
  onFilterChange,
  setIsModalOpen,
}) => {
  const [displayLimit, setDisplayLimit] = useState(6);

  useEffect(() => {
    setDisplayLimit(4);
  }, [activeFilterId]);

  const visibleItems = items.slice(0, displayLimit);

  return (
    <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between pt-1">
        <h3 className="font-bold text-xl text-stone-900">Gardırop</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-stone-800 transition shadow-lg shadow-stone-200"
        >
          <Plus className="w-4 h-4" /> Parça Ekle
        </button>
      </div>

      {/* Filtreler */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth flex-nowrap">
          <button
            onClick={() => onFilterChange(null)}
            className={`px-4 py-2 text-xs rounded-full whitespace-nowrap transition-all border ${
              activeFilterId === null
                ? "bg-black text-white border-black shadow-sm"
                : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              className={`px-4 py-2 text-xs rounded-full whitespace-nowrap transition-all border ${
                activeFilterId === cat.id
                  ? "bg-black text-white border-black shadow-sm"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
      </div>

      {/* Liste Alanı */}
      <div className="space-y-3 h-[calc(100vh-240px)] overflow-y-auto pr-2 custom-scrollbar">
        {/* Liste Başlığı / Bilgisi */}
        <div className="flex justify-between items-center px-1 mb-2">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            {activeFilterId === null ? "Tüm Parçalar" : "Kategori Sonuçları"}
          </span>
          <span className="text-[10px] text-stone-400 font-medium">
            {items.length} Ürün
          </span>
        </div>

        {items.length > 0 ? (
          <>
            {visibleItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedId === item.id
                    ? "bg-stone-100 border border-stone-300 ring-1 ring-stone-300"
                    : "bg-white border border-stone-100 hover:bg-stone-50 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="relative w-16 h-20 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col justify-center overflow-hidden">
                  <h4 className="font-bold text-sm text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {item.brandName || "Markasız"} • {item.season}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-stone-200"
                      style={{ backgroundColor: item.color || "#ccc" }}
                    ></span>
                    <span className="text-[10px] text-stone-400 font-medium uppercase tracking-tight">
                      {item.color}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* --- YENİ: Daha Fazla Göster Butonu --- */}
            {items.length > displayLimit && (
              <button
                onClick={() => setDisplayLimit((prev) => prev + 6)}
                className="w-full py-3 mt-2 text-[11px] font-bold text-stone-500 hover:text-black hover:border-stone-400 transition-all border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50"
              >
                +{items.length - displayLimit} Parça Daha Göster
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-stone-400 text-xs border-2 border-dashed border-stone-200 rounded-2xl">
            Bu kategoride henüz parça bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarList;
