import React from "react";
import { X, CheckCircle2, ShoppingBag } from "lucide-react";

const CombinationModal = ({ isOpen, onClose, combination }) => {
  if (!isOpen || !combination) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
          {/* Sol: Ürün Görselleri Grid */}
          <div className="md:w-1/2 bg-stone-50 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {combination.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden aspect-square shadow-sm bg-white border border-stone-100"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Bilgiler ve Parçalar */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                Akıllı Öneri
              </span>
              <h2 className="text-3xl font-serif font-bold italic mt-2 mb-6">
                {combination.name}
              </h2>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">
                  Kombin Parçaları
                </h4>
                {combination.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-stone-200">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-stone-800">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase">
                        {product.category.name}
                      </span>
                    </div>
                    <CheckCircle2
                      size={16}
                      className="ml-auto text-stone-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-8 w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Kombini Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationModal;
