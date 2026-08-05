import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Shuffle,
  RefreshCw,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { combinationService } from "../../services/combination";
import type { ProductSummary } from "../../types/index";

// Üst sayfadan tetiklemek için ref tipi
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
  const [activeMode, setActiveMode] = useState<string>("Ofis");
  const [loading, setLoading] = useState<boolean>(false);
  const [outfitProducts, setOutfitProducts] = useState<ProductSummary[]>([]);

  const modes = ["Ofis", "Kahve Molası", "Akşam Yemeği", "Spor"];

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

  // Üst sayfadaki (StilRehberi) "Beni Şaşırt" butonunun bu fonksiyonu tetiklemesini sağlar
  useImperativeHandle(ref, () => ({
    fetchSurprise: handleFetchSurprise,
  }));

  // Sayfa ilk yüklendiğinde bir kez kombin getir
  useEffect(() => {
    handleFetchSurprise();
  }, []);

  const totalPrice = outfitProducts.reduce(
    (sum, item) => sum + (item.price || 0),
    0,
  );

  return (
    <div className="w-full">
      {/* Üst Başlık ve Beni Şaşırt Butonu */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-stone-200 text-stone-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Gardırop Önerisi
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900">
            Günün Kombin Önerisi
          </h2>
          <p className="text-stone-500 text-sm italic font-light mt-1">
            Gardırobandaki parçalarla sana özel stil tavsiyesi.
          </p>
        </div>

        <button
          onClick={handleFetchSurprise}
          disabled={loading}
          className="bg-stone-900 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-black active:scale-95 transition-all shadow-xl shadow-stone-200/80 flex items-center justify-center w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 mr-2.5 animate-spin text-amber-400" />
          ) : (
            <Shuffle className="w-4 h-4 mr-2.5 text-amber-400" />
          )}
          <span>Beni Şaşırt</span>
        </button>
      </div>

      {/* Mod Seçenekleri */}
      <div className="flex space-x-2.5 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setActiveMode(mode);
              handleFetchSurprise();
            }}
            className={`px-5 py-2.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMode === mode
                ? "border-stone-900 bg-stone-900 text-white shadow-md"
                : "border-stone-200 text-stone-600 hover:border-stone-400 bg-white hover:bg-stone-50"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Kombin Kartı Gösterimi */}
      <div
        className={`bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-100 flex flex-col md:flex-row gap-8 transition-all duration-300 relative ${
          loading ? "opacity-50 blur-[1px]" : "opacity-100"
        }`}
      >
        {/* Ürün Görselleri */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {outfitProducts.length > 0 ? (
            outfitProducts.map((product) => (
              <div
                key={product.id}
                className="bg-stone-100 rounded-2xl aspect-[3/4] relative overflow-hidden group border border-stone-100 shadow-inner"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600";
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm border border-white/60 text-stone-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />{" "}
                  DOLABINDAN
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                    {product.brandName}
                  </p>
                  <p className="text-xs font-medium truncate">{product.name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center text-stone-400 text-sm">
              Henüz gardırobunuzda bu kritere uygun kombin bulunamadı.
            </div>
          )}
        </div>

        {/* Detay ve Tavsiye Metni */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{" "}
                ÖZEL SEÇKİ
              </span>
              <h3 className="text-3xl font-serif font-bold mt-1 mb-2 italic text-stone-900">
                {weatherTemp < 15 ? "Serin Gün Şıklığı" : "Hafif ve Rahat"}
              </h3>
            </div>

            <p className="text-stone-600 mb-6 text-sm leading-relaxed font-light">
              {weatherTemp < 15
                ? "Soğuk ve rüzgarlı havalar için ideal. Kendi dolabından özenle seçilen katmanlı parçalarla gün boyu sıcak ve şık kal."
                : "Ilıman ve tatlı bir hava var. Nefes alan kumaşlar ve dengeli toprak tonları gün boyu yüksek konfor sağlayacaktır."}
            </p>

            {/* Tamamlayıcı Ürün Önerisi */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/60 transition-all hover:border-stone-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center">
                  <ShoppingBag className="w-3.5 h-3.5 mr-1 text-stone-600" />{" "}
                  Kombini Tamamla
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  SİZE ÖZEL
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 p-0.5 border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300"
                    className="w-full h-full object-cover rounded-lg"
                    alt="Deri Chelsea Bot"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-stone-900">
                    Deri Chelsea Bot
                  </h4>
                  <p className="text-xs text-stone-500 mb-1.5 font-medium">
                    Massimo Dutti
                  </p>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs font-semibold text-stone-900 inline-flex items-center gap-1 hover:text-amber-700 transition-all"
                  >
                    Ürünü İncele <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {totalPrice > 0 && (
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Toplam Gardırop Değeri:</span>
              <span className="font-bold text-base text-stone-900">
                {totalPrice.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
