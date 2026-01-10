import React from "react";
import { Check, Edit3, Wand2, Share2, Trash2 } from "lucide-react";
import type { Product } from "../../types";

interface ItemDetailProps {
  item: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onDelete, onEdit }) => {
  const confirmAndDelete = () => {
    if (
      window.confirm(
        `${item.name} parçasını gardırobundan silmek istediğine emin misin?`
      )
    ) {
      onDelete(item.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <div className="aspect-[3/4] rounded-xl overflow-hidden relative group">
          <img
            src={item.imageUrl}
            className="w-full h-full object-cover"
            alt={item.name}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => {
                onEdit(item);
              }}
              className="bg-white p-2.5 rounded-full shadow-lg hover:text-stone-900 transition-colors"
              title="Düzenle"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={confirmAndDelete}
              className="bg-white p-2.5 rounded-full shadow-lg hover:text-red-500 transition-colors"
              title="Sil"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {item.name}
              </h2>
              <p className="text-sm text-stone-500">
                {item.brandName || "Markasız"} • {item.season}
              </p>
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Check className="w-3 h-3" /> AI Analizi Tamamlandı
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-800">AI Stil Notu:</strong> Çok şık
              bir parça! Bu parçayı özellikle toprak tonlarıyla kombinleyerek
              modern bir görünüm yakalayabilirsin.
            </p>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-stone-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition shadow-lg flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4" /> Bununla Kombin Yap
          </button>
          <button className="px-4 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-500 transition flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
