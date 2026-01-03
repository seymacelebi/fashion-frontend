import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import AddItemModal from '../components/layout/AddItemModal'; // Dosya yolunuza göre düzenleyin
import {
  Plus,
  Shirt,
  Wand2,
  Share2,
  Check,
  Edit3,
  ChevronRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

// --- MOCK DATA (Veri Yapısı) ---
const FILTERS = ["Tümü", "Üst Giyim", "Alt Giyim", "Ayakkabı"];

const WARDROBE_ITEMS = [
  {
    id: 1,
    title: "Haki Yeşil Kazak",
    brand: "Zara",
    season: "Sonbahar",
    category: "Üst Giyim",
    image: "https://placehold.co/100x120/5F6F52/ffffff?text=Kazak",
    largeImage: "https://placehold.co/400x500/5F6F52/ffffff?text=Haki+Kazak",
    colorHex: "#5F6F52",
    colorName: "Toprak Tonları",
    dateAdded: "2 hafta önce",
    palette: [
      { color: "#5F6F52", name: "Haki", type: "ANA" },
      { color: "#F5EFE6", name: "Krem", type: "YAN" },
      { color: "#B99470", name: "Taba", type: "YAN" },
      { color: "#1A1A1A", name: "Siyah", type: "YAN" },
    ],
    aiNote:
      "Bu haki tonu, doğadan ilham alan 'Toprak Tonları' grubundadır. Krem rengi bir alt giyimle yumuşak bir geçiş yapabilir veya siyah deri bir parça ile kontrast yaratarak daha modern bir görünüm elde edebilirsin.",
  },
  {
    id: 2,
    title: "Krem Kumaş Pantolon",
    brand: "Mango",
    season: "4 Mevsim",
    category: "Alt Giyim",
    image: "https://placehold.co/100x120/F5EFE6/333?text=Pantolon",
    largeImage: "https://placehold.co/400x500/F5EFE6/333?text=Krem+Pantolon",
    colorHex: "#F5EFE6",
    colorName: "Nötr",
    dateAdded: "1 ay önce",
    palette: [],
    aiNote: "Nötr tonlar her şeyle uyumludur.",
  },
  {
    id: 3,
    title: "Siyah Deri Ceket",
    brand: "Stradivarius",
    season: "Kış",
    category: "Üst Giyim",
    image: "https://placehold.co/100x120/1A1A1A/fff?text=Deri+Ceket",
    largeImage: "https://placehold.co/400x500/1A1A1A/fff?text=Deri+Ceket",
    colorHex: "#1A1A1A",
    colorName: "Koyu",
    dateAdded: "3 hafta önce",
    palette: [],
    aiNote: "Siyah deri ceket gardırobun joker parçasıdır.",
  },
];
// --- COMPONENTS ---

// // 1. Navbar Bileşeni
// const Navbar = () => (
//   <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
//     <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//       <div className="text-2xl font-bold serif tracking-tight font-serif">
//         StilRehberi
//         <span className="text-stone-400 text-sm font-sans font-normal ml-1">
//           v2
//         </span>
//       </div>
//       <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
//         <a href="#" className="hover:text-black transition">
//           Bugün Ne Giysem?
//         </a>
//         <a
//           href="#"
//           className="text-black font-semibold border-b-2 border-black pb-1"
//         >
//           Akıllı Gardırop
//         </a>
//         <a href="#" className="hover:text-black transition">
//           Keşfet & Al
//         </a>
//       </div>
//       <div className="flex items-center gap-4">
//         <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-stone-800 transition">
//           <Plus className="w-4 h-4" /> Parça Ekle
//         </button>
//         <div className="w-8 h-8 bg-stone-200 rounded-full overflow-hidden border border-stone-200">
//           <img
//             src="https://ui-avatars.com/api/?name=User&background=random"
//             alt="Profil"
//           />
//         </div>
//       </div>
//     </div>
//   </nav>
// );

// 2. Sol Liste Bileşeni
// const SidebarList = ({
//   items,
//   selectedId,
//   onSelect,
//   activeFilter,
//   onFilterChange,
// }) => {
//   // Filtreleme mantığı
//   const filteredItems =
//     activeFilter === "Tümü"
//       ? items
//       : items.filter((item) => item.category === activeFilter);

//   return (
//     <div className="lg:col-span-4 space-y-6">
//       {/* Filtreler */}
//       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//         {FILTERS.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => onFilterChange(filter)}
//             className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
//               activeFilter === filter
//                 ? "bg-black text-white"
//                 : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* Liste */}
//       <div className="space-y-3 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
//         {filteredItems.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => onSelect(item.id)}
//             className={`flex gap-3 p-2 rounded-xl cursor-pointer transition ${
//               selectedId === item.id
//                 ? "bg-stone-100 border border-stone-300 ring-1 ring-stone-300"
//                 : "bg-white border border-stone-100 hover:bg-stone-50"
//             }`}
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-16 h-20 object-cover rounded-lg shrink-0"
//             />
//             <div className="flex flex-col justify-center">
//               <h4 className="font-bold text-sm text-stone-900">{item.title}</h4>
//               <p className="text-xs text-stone-500">
//                 {item.brand} • {item.season}
//               </p>
//               <div className="flex gap-1 mt-2">
//                 <span
//                   className="w-3 h-3 rounded-full border border-stone-200"
//                   style={{ backgroundColor: item.colorHex }}
//                 ></span>
//                 <span className="text-[10px] text-stone-400">
//                   {item.colorName}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
    
//     </div>
//   );
// };
const SidebarList = ({
  items,
  selectedId,
  onSelect,
  activeFilter,
  onFilterChange,
  isModalOpen,
  setIsModalOpen,
}) => {
  // Filtreleme mantığı
  const filteredItems =
    activeFilter === "Tümü"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    // Genişlik ayarı: lg:col-span-4 (Genişletmek istersen 5 yapabilirsin)
    <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
      
      {/* --- YENİ EKLENEN KISIM: Başlık ve Buton --- */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="font-bold text-xl text-stone-900">Gardırop</h3>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-stone-800 transition shadow-lg shadow-stone-200">
          <Plus className="w-4 h-4" /> Parça Ekle
        </button>
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      </div>
      {/* ------------------------------------------- */}

      {/* Filtreler */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-black text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-3 h-[calc(100vh-240px)] overflow-y-auto pr-2 custom-scrollbar">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex gap-3 p-2 rounded-xl cursor-pointer transition ${
              selectedId === item.id
                ? "bg-stone-100 border border-stone-300 ring-1 ring-stone-300"
                : "bg-white border border-stone-100 hover:bg-stone-50"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-20 object-cover rounded-lg shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-sm text-stone-900">{item.title}</h4>
              <p className="text-xs text-stone-500">
                {item.brand} • {item.season}
              </p>
              <div className="flex gap-1 mt-2">
                <span
                  className="w-3 h-3 rounded-full border border-stone-200"
                  style={{ backgroundColor: item.colorHex }}
                ></span>
                <span className="text-[10px] text-stone-400">
                  {item.colorName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Detay Kartı Bileşeni
const ItemDetail = ({ item }) => {
  if (!item) return <div>Yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8">
      {/* Görsel */}
      <div className="w-full md:w-1/3">
        <div className="aspect-[3/4] rounded-xl overflow-hidden relative group">
          <img
            src={item.largeImage}
            className="w-full h-full object-cover"
            alt="Detail"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white p-2 rounded-full shadow-lg hover:text-red-500 transition">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Analiz */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {item.title}
              </h2>
              <p className="text-sm text-stone-500">
                Dolabına {item.dateAdded} eklendi.
              </p>
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Check className="w-3 h-3" /> AI Analizi Tamamlandı
            </div>
          </div>

          {/* Renk Paleti */}
          {item.palette && item.palette.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                Uyumlu Renk Paleti
              </h3>
              <div className="flex gap-3">
                {item.palette.map((swatch, index) => (
                  <React.Fragment key={index}>
                    <div className="text-center group cursor-pointer">
                      <div
                        className={`w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[8px] font-bold mb-1 transition-transform hover:scale-110 ${
                          swatch.type === "ANA" ? "text-white" : ""
                        }`}
                        style={{ backgroundColor: swatch.color }}
                      >
                        {swatch.type === "ANA" && "ANA"}
                      </div>
                      <span className="text-[10px] text-stone-500 group-hover:text-black">
                        {swatch.name}
                      </span>
                    </div>
                    {index < item.palette.length - 1 && (
                      <div className="h-10 w-px bg-stone-200 mx-1"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-800">AI Stil Notu:</strong>{" "}
              {item.aiNote}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-stone-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition shadow-lg shadow-stone-200/50 flex items-center justify-center gap-2">
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

// 4. Öneriler Bileşeni
const Suggestions = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Dolap Eşleşmeleri */}
    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
      <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
        <Shirt className="w-4 h-4 text-blue-600" /> Dolabınla Eşleşenler
      </h3>
      <div className="space-y-3">
        {[
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
        ].map((item, idx) => (
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

    {/* Satın Alma Önerisi */}
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
          <p className="text-xs text-stone-500 mb-1">
            Bu kazakla harika gider:
          </p>
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

// --- MAIN APP ---

const App = () => {
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Seçili ürünü bul
  const selectedItem =
    WARDROBE_ITEMS.find((item) => item.id === selectedItemId) ||
    WARDROBE_ITEMS[0];

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-stone-900">
      {/* Google Fonts (Normalde index.html'e eklenir, burada demo amaçlı style tagi) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Bodoni Moda', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <Navbar />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sol Panel */}
        <SidebarList
            items={WARDROBE_ITEMS}
            selectedId={selectedItemId}
            onSelect={setSelectedItemId}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          {/* Sağ Panel */}
          <div className="lg:col-span-8 space-y-6">
            <ItemDetail item={selectedItem} />
            <Suggestions />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-stone-400 text-xs border-t border-stone-200">
        <p>StilRehberi v2 React Versiyonu &copy; 2025</p>
      </footer>
    </div>
  );
};

export default App;
