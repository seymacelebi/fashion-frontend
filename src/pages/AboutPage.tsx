import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  Thermometer,
  Wind,
  ShoppingBag,
  Plus,
  ArrowRight,
  User,
} from "lucide-react";

/**
 * MOCK API CLIENT
 * Projenizdeki gerçek apiClient'ı simüle eder.
 * Normalde: import apiClient from '../services/apiClients';
 */
const mockApiClient = {
  get: async (url) => {
    // Gerçek API çağrısı yapılıyormuş gibi simüle ediyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              name: "Kış Ofis Şıklığı",
              description: "Soğuk günler için profesyonel ve sıcak bir tercih.",
              products: [
                {
                  id: 101,
                  name: "Kaşe Palto",
                  season: "WINTER",
                  imageUrl:
                    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=200&q=80",
                },
                {
                  id: 102,
                  name: "Yün Kazak",
                  season: "WINTER",
                  imageUrl:
                    "https://images.unsplash.com/photo-1611312449412-6cefac56399e?w=200&q=80",
                },
              ],
            },
            {
              id: 2,
              name: "Yazlık Sahil Kombini",
              description: "Sıcak havalarda ferah hissetmek için.",
              products: [
                {
                  id: 201,
                  name: "Keten Gömlek",
                  season: "SUMMER",
                  imageUrl:
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80",
                },
                {
                  id: 202,
                  name: "Şort",
                  season: "SUMMER",
                  imageUrl:
                    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&q=80",
                },
              ],
            },
          ],
        });
      }, 800);
    });
  },
};

// --- GÜNLÜK ÖNERİ BİLEŞENİ (Artık aynı dosyada) ---
const DailyRecommendation = ({ currentTemp }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        setIsLoading(true);
        const response = await mockApiClient.get("/combinations");
        const allCombinations = response.data;

        if (!allCombinations || allCombinations.length === 0) return;

        // Mevsim belirleme mantığı
        let targetSeason = currentTemp < 15 ? "WINTER" : "SUMMER";

        const suitable = allCombinations.filter((comb) =>
          comb.products.some((p) => p.season === targetSeason)
        );

        setRecommendation(
          suitable.length > 0 ? suitable[0] : allCombinations[0]
        );
      } catch (err) {
        console.error("Hata:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendation();
  }, [currentTemp]);

  if (isLoading)
    return (
      <div className="animate-pulse bg-white rounded-3xl p-8 border border-stone-200 h-64 flex flex-col justify-center items-center">
        <div className="h-4 w-32 bg-stone-200 rounded mb-4"></div>
        <div className="h-8 w-64 bg-stone-100 rounded"></div>
      </div>
    );

  if (!recommendation) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-10 overflow-hidden relative group">
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Günün Stil Önerisi
            </span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-stone-900">
            {recommendation.name}
          </h3>
        </div>
        <div className="bg-stone-50 px-4 py-2 rounded-full border border-stone-200 flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-stone-600" />
          <span className="text-sm font-bold text-stone-800">
            {currentTemp}°C
          </span>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 relative z-10">
        {recommendation.products.map((product) => (
          <div key={product.id} className="min-w-[140px]">
            <div className="aspect-[3/4] bg-stone-50 rounded-2xl mb-3 border border-stone-100 overflow-hidden group/item">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
              />
            </div>
            <p className="text-xs font-semibold text-stone-800 text-center">
              {product.name}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-50 pt-6 relative z-10">
        <p className="text-sm text-stone-500 italic max-w-md">
          "{recommendation.description}"
        </p>
        <button className="flex items-center gap-2 text-sm font-bold bg-black text-white px-6 py-3 rounded-full hover:bg-stone-800 transition-all">
          Kombini Seç <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-stone-50 rounded-full blur-3xl -z-0 opacity-50"></div>
    </div>
  );
};

// --- ANA SAYFA BİLEŞENİ ---
const HomePage = () => {
  const [temp, setTemp] = useState(12); // Örnek sıcaklık
  const [userName] = useState("Şeyma"); // Örnek kullanıcı adı

  return (
    <div className="min-h-screen bg-[#f9f8f6] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-serif font-medium text-stone-900 leading-tight">
              Merhaba, <span className="italic">{userName}</span>
            </h1>
            <p className="text-stone-500 text-lg mt-2">
              Bugün gardırobun senin için hazır.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-tighter">
                Hava Durumu
              </p>
              <p className="text-sm font-medium text-stone-600">İstanbul, TR</p>
            </div>
            <Cloud className="w-8 h-8" />
          </div>
        </header>

        {/* Günlük Öneri Alanı */}
        <DailyRecommendation currentTemp={temp} />

        {/* İstatistikler ve Aksiyonlar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gardırop Özeti Kartı */}
          <div className="lg:col-span-2 bg-stone-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="relative z-10">
              <h4 className="text-2xl font-serif mb-4 italic">
                Gardırobun Büyüyor
              </h4>
              <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
                Bu ay koleksiyonuna 5 yeni parça ekledin. Stilini geliştirmeye
                devam et!
              </p>
            </div>

            <div className="flex items-end justify-between relative z-10">
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Toplam
                  </p>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Kombinler
                  </p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
              <button className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* Arkaplan Deseni */}
            <div className="absolute right-[-5%] top-[-5%] w-80 h-80 border border-white/5 rounded-full"></div>
            <div className="absolute right-[-10%] top-[-10%] w-96 h-96 border border-white/5 rounded-full"></div>
          </div>

          {/* Küçük Aksiyon Kartları */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 border border-stone-100 flex-1 flex flex-col justify-center items-center text-center shadow-sm">
              <div className="bg-stone-50 p-4 rounded-full mb-4">
                <ShoppingBag className="w-6 h-6 text-stone-800" />
              </div>
              <h5 className="font-bold text-stone-900 mb-1">Yeni Ürün Ekle</h5>
              <p className="text-xs text-stone-400 px-4">
                Dolabını güncel tutmak için yeni parçalar yükle.
              </p>
            </div>

            <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100 flex-1 flex flex-col justify-center items-center text-center">
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                <Wind className="w-6 h-6 text-amber-600" />
              </div>
              <h5 className="font-bold text-stone-900 mb-1">Haftalık Bakış</h5>
              <p className="text-xs text-stone-500 px-4">
                Önümüzdeki günlerin hava durumuna göz at.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Shortcut */}
        <div className="mt-12 text-center">
          <p className="text-stone-300 text-xs font-medium uppercase tracking-[0.2em]">
            Kişisel Stil Asistanın
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
