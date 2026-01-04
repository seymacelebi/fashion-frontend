import React from "react";
import { 
  Shirt, 
  ChevronRight, 
  Sparkles, 
  ShoppingBag 
} from "lucide-react";

const Suggestions: React.FC = () => {
  // Not: Bu veriler ileride props aracılığıyla backend'den gelebilir.
  const wardrobeMatches = [
    {
      name: "Krem Kumaş Pantolon",
      img: "https://placehold.co/100x100/F5EFE6/333?text=Pant",
      match: "Ofis Uyumu (%95)",
    },
    {
      name: "Siyah Deri Etek",
      img: "https://placehold.co/100x100/1A1A1A/fff?text=Etek",
      match: "Şık Gece Uyumu (%88)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dolap Eşleşmeleri */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Shirt className="w-4 h-4 text-blue-600" /> Dolabınla Eşleşenler
        </h3>
        <div className="space-y-3">
          {wardrobeMatches.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 border border-stone-100">
                <img
                  src={item.img}
                  className="w-full h-full object-cover"
                  alt="Match"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-stone-800 group-hover:text-blue-600 transition">
                  {item.name}
                </p>
                <p className="text-[10px] text-stone-400">{item.match}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Satın Alma Önerisi (Kombini Tamamla) */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-1 rounded-bl-lg">
          ÖNERİ
        </div>
        <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" /> Kombini Tamamla
        </h3>
        <div className="flex gap-4 items-center mb-4">
          <div className="w-16 h-16 bg-white rounded-lg p-1 border border-stone-200 shadow-sm shrink-0">
            <img
              src="https://placehold.co/100x100/333/fff?text=Canta"
              className="w-full h-full object-contain"
              alt="Suggestion"
            />
          </div>
          <div>
            <p className="text-xs text-stone-500 mb-1">Bu kazakla harika gider:</p>
            <p className="text-sm font-bold text-stone-900">Taba Süet Çanta</p>
            <p className="text-[10px] font-medium text-stone-400">Mango • 899₺</p>
          </div>
        </div>
        <button className="w-full bg-white border border-stone-200 text-stone-700 py-2 rounded-lg text-xs font-bold hover:bg-stone-50 hover:border-stone-300 transition flex items-center justify-center gap-2">
          <ShoppingBag className="w-3 h-3" /> Ürünü İncele
        </button>
      </div>
    </div>
  );
};

export default Suggestions;