import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ShoppingBag } from "lucide-react";
import { combinationService } from "../../services/combination";
import type { ProductSummary } from "../../types/index";

export interface SurpriseOutfitCardRef {
  fetchSurprise: () => void;
}

interface SurpriseOutfitCardProps {
  weatherTemp?: number;
  weatherDescription?: string;
  onOutfitChange?: (products: ProductSummary[]) => void;
}

export const SurpriseOutfitCard = forwardRef<
  SurpriseOutfitCardRef,
  SurpriseOutfitCardProps
>(({ weatherTemp = 20, weatherDescription = "Açık", onOutfitChange }, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [outfitProducts, setOutfitProducts] = useState<ProductSummary[]>([]);

  const handleFetchSurprise = async () => {
    setLoading(true);
    try {
      const data = await combinationService.getSurpriseOutfit();
      if (data && data.length > 0) {
        setOutfitProducts(data);
        if (onOutfitChange) onOutfitChange(data);
      }
    } catch (err) {
      console.error("Kombin getirilirken hata oluştu:", err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchSurprise: handleFetchSurprise,
  }));

  useEffect(() => {
    handleFetchSurprise();
  }, []);

  return (
    <div
      className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-10 transition-all duration-300 relative ${
        loading ? "opacity-50 blur-[1px]" : "opacity-100"
      }`}
    >
      {/* Ürün Görselleri */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {outfitProducts.length > 0 ? (
          outfitProducts.map((product) => (
            <div
              key={product.id}
              className="bg-stone-100 rounded-2xl aspect-[3/4] relative overflow-hidden group"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1591047139829-d91aec16adcd?q=80&w=400";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                Dolabından
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-stone-400 text-sm">
            Gardırobunuzda bu kritere uygun kombin bulunamadı.
          </div>
        )}
      </div>

      {/* Detay ve Tavsiye Metni */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">
            Özel Seçki
          </span>
          <h3 className="text-3xl font-serif font-bold mt-1 mb-3 italic">
            {weatherTemp < 15 ? "Serin Gün Şıklığı" : "Hafif ve Rahat"}
          </h3>
        </div>

        <p className="text-stone-600 mb-8 text-sm leading-relaxed font-light">
          {weatherTemp < 15
            ? "Soğuk havalar için ideal. Kendi dolabından özenle seçilen katmanlı parçalarla gün boyu şık kal."
            : "Hava çok güzel! Keten gömlek ve rahat bir pantolonla günün tadını çıkar."}
        </p>

        {/* Eksik Parça Önerisi */}
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 transition-hover hover:border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center">
              <ShoppingBag className="w-3 h-3 mr-1" /> Kombini Tamamla
            </span>
            <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              SİZE ÖZEL
            </span>
          </div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200"
                className="w-full h-full object-cover"
                alt="Bot"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-800">
                Deri Chelsea Bot
              </h4>
              <p className="text-xs text-stone-500 mb-2 font-medium">
                Massimo Dutti
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-semibold text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-all"
              >
                Ürünü İncele →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});