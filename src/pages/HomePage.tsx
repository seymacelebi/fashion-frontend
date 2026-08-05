import { useState, useRef } from "react";
import {
  CloudRain,
  Shuffle,
  Palette,
  Shirt,
  ShoppingBag,
  Sun,
  Cloud,
  Snowflake,
  Wind,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useWeather } from "../hooks/useWeather";
import { getStyleAdvice } from "../utils/styleAdvice";
import {
  SurpriseOutfitCard,
  type SurpriseOutfitCardRef,
} from "../components/surprise/SurpriseOutfitCard";

const StilRehberi = () => {
  const [activeMode, setActiveMode] = useState("Ofis");
  const { user } = useAuth(); // Kullanıcı bilgilerini alıyoruz
  const { weather, loading } = useWeather(user?.city); // Hava durumunu çekiyoruz

  const surpriseCardRef = useRef<SurpriseOutfitCardRef>(null);

  const handleTopButtonClick = () => {
    surpriseCardRef.current?.fetchSurprise();
  };

  const modes = ["Ofis", "Kahve Molası", "Akşam Yemeği", "Spor"];

  // Hava durumuna göre ikon belirleme fonksiyonu
  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clear":
        return <Sun className="w-5 h-5 text-amber-500" />;
      case "Clouds":
        return <Cloud className="w-5 h-5 text-stone-400" />;
      case "Rain":
      case "Drizzle":
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      case "Snow":
        return <Snowflake className="w-5 h-5 text-blue-200" />;
      default:
        return <Wind className="w-5 h-5 text-stone-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      {/* Google Fonts importunu projenizin index.html veya App.css dosyasına eklemeyi unutmayın */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Bodoni Moda', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
        `}</style>

      {/* NAV */}
      <Navbar />
      {/* 1. BUGÜN NE GİYSEM */}
      <section
        id="bugun-ne-giysem"
        className="py-12 px-4 border-b border-stone-200"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">
                Günaydın, {user?.name || "Misafir"}
              </h2>
              <div className="flex items-center text-stone-500 text-sm">
                {loading ? (
                  <span className="animate-pulse">
                    Hava durumu yükleniyor...
                  </span>
                ) : weather ? (
                  <>
                    {getWeatherIcon(weather.weather[0].main)}
                    <span className="ml-2">
                      {weather.name}, {Math.round(weather.main.temp)}°C -
                      <span className="capitalize">
                        {" "}
                        {weather.weather[0].description}
                      </span>
                    </span>
                  </>
                ) : (
                  <span>Konum bilgisi alınamadı.</span>
                )}
              </div>
            </div>
            {/* 
            <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm hover:bg-black transition-all shadow-lg shadow-stone-200 flex items-center w-fit">
              <Shuffle className="w-4 h-4 mr-2" />
              Beni Şaşırt
            </button> */}

            <button
              onClick={handleTopButtonClick}
              className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm hover:bg-black transition-all shadow-lg shadow-stone-200 flex items-center w-fit cursor-pointer"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Beni Şaşırt
            </button>
          </div>

          <SurpriseOutfitCard
            ref={surpriseCardRef}
            weatherTemp={weather?.main?.temp}
            weatherDescription={weather?.weather?.[0]?.description}
          />

          {/* Mod Seçimi */}
          <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-5 py-2 rounded-full border text-sm whitespace-nowrap transition-all ${
                  activeMode === mode
                    ? "border-stone-900 bg-stone-900 text-white shadow-md"
                    : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900 bg-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Önerilen Kombin Kartı */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-10">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-stone-100 rounded-2xl aspect-[3/4] relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1591047139829-d91aec16adcd?q=80&w=400"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Trençkot"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  Dolabından
                </div>
              </div>
              <div className="bg-stone-100 rounded-2xl aspect-[3/4] relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Siyah Pantolon"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  Dolabından
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">
                  Özel Seçki
                </span>
                <h3 className="text-3xl font-serif font-bold mt-1 mb-3 italic">
                  {/* Başlığı da havaya göre güncelleyebiliriz */}
                  {weather?.main.temp < 15
                    ? "Serin Gün Şıklığı"
                    : "Hafif ve Rahat"}
                </h3>
              </div>

              {/* DİNAMİK TAVSİYE: getStyleAdvice fonksiyonunu kullanıyoruz */}
              <p className="text-stone-600 mb-8 text-sm leading-relaxed font-light">
                {weather
                  ? getStyleAdvice(
                      weather.main.temp,
                      weather.weather[0].description,
                    )
                  : "Size en uygun kombin hazırlanıyor..."}
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
                      className="text-xs font-semibold text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-all"
                    >
                      Ürünü İncele →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RENK ANALİZİ */}
      <section id="gardirobum" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold mb-2">
              Renk Uyumu Analizi
            </h2>
            <p className="text-stone-500 font-light italic">
              Dolabındaki parçaların potansiyelini AI ile keşfet.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Seçilen Parça */}
            <div className="w-full md:w-2/5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer shadow-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  alt="Kazak"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-bold tracking-widest opacity-80 uppercase mb-1">
                    Analiz Edilen
                  </p>
                  <h3 className="text-2xl font-serif font-bold italic">
                    Haki Yeşil Kazak
                  </h3>
                </div>
              </div>
            </div>

            {/* Analiz Sonuçları */}
            <div className="w-full md:w-3/5 space-y-12">
              {/* Palet */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 mb-6 tracking-widest flex items-center uppercase">
                  <Palette className="w-4 h-4 mr-2" /> Uyumu Yakalayan Renkler
                </h4>
                <div className="flex gap-4">
                  {[
                    { color: "#5F6F52", label: "Haki" },
                    { color: "#F5EFE6", label: "Krem" },
                    { color: "#B99470", label: "Taba" },
                    { color: "#1A1A1A", label: "Siyah" },
                  ].map((item, idx) => (
                    <div key={idx} className="group flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-full border-4 border-white shadow-lg cursor-help transition-transform hover:scale-110 active:scale-95"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] mt-2 font-bold text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-stone-500 mt-6 leading-relaxed font-light">
                  Bu derin haki tonu,{" "}
                  <span className="text-stone-900 font-medium italic">
                    toprak paleti
                  </span>{" "}
                  ile mükemmel bir denge kurar. Siyah deri ile sert, krem
                  tonları ile yumuşak bir silüet oluşturabilirsiniz.
                </p>
              </div>

              {/* Eşleşmeler */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 mb-6 tracking-widest flex items-center uppercase">
                  <Shirt className="w-4 h-4 mr-2" /> Dolabındaki Eşleşmeler
                </h4>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200",
                      name: "Krem Pantolon",
                      color: "#F5EFE6",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200",
                      name: "Deri Etek",
                      color: "#1A1A1A",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="bg-stone-50 rounded-2xl aspect-square mb-3 relative overflow-hidden">
                        <img
                          src={item.img}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                          alt={item.name}
                        />
                        <div
                          className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-stone-700 tracking-tight uppercase block text-center">
                        {item.name}
                      </span>
                    </div>
                  ))}

                  {/* AI Alışveriş Önerisi */}
                  <div className="flex flex-col">
                    <div className="bg-stone-50 rounded-2xl aspect-square mb-3 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 group hover:border-stone-400 transition-colors cursor-pointer p-4 text-center">
                      <ShoppingBag className="w-6 h-6 text-stone-300 group-hover:text-stone-600 mb-2 transition-colors" />
                      <span className="text-[10px] font-bold text-stone-500 uppercase leading-tight">
                        Kombini Tamamla
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase text-center">
                      Taba Çanta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-stone-100 bg-white">
        <div className="font-serif text-xl font-bold italic mb-4">
          StilRehberi
        </div>
        <p className="text-stone-400 text-[11px] tracking-[0.2em] font-medium uppercase">
          &copy; 2024 StilRehberi v2 &bull; Digital Wardrobe Assistant
        </p>
      </footer>
    </div>
  );
};

export default StilRehberi;
