import  { useState, useEffect } from "react";
import apiClient from "../services/apiClients";
import { Link } from "react-router-dom";

const CombinationsPage = () => {
  const [combinations, setCombinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCombinations();
  }, []);

  const fetchCombinations = async () => {
    try {
      setIsLoading(true);
      // Backend'deki GET /api/v1/combinations endpoint'i çağrılıyor.
      const response = await apiClient.get("/combinations");
      setCombinations(response.data);
    } catch (err) {
      console.error("Kombinler yüklenemedi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kombini silmek istediğinize emin misiniz?")) return;

    try {
      await apiClient.delete(`/combinations/${id}`);
      setCombinations((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Kombin silinirken bir hata oluştu.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Başlık ve Eylem Butonu */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-900">
              Kombinlerim
            </h1>
            <p className="text-stone-500 mt-2">
              Kişisel stil arşiviniz ve hazırladığınız setler.
            </p>
          </div>
          <Link
            to="/outfit-builder"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Yeni Kombin Oluştur
          </Link>
        </div>

        {combinations.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-stone-300">
            <div className="mb-6 inline-block p-4 bg-stone-100 rounded-full">
              <svg
                className="w-12 h-12 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-2">
              Henüz kombin oluşturmadınız
            </h3>
            <p className="text-stone-500 mb-8">
              Gardırobunuzdaki parçaları bir araya getirerek ilk kombinini
              yaratın.
            </p>
            <Link
              to="/outfit-builder"
              className="text-black font-bold border-b-2 border-black pb-1 hover:text-stone-600 hover:border-stone-600 transition-all"
            >
              Kombin Oluşturucuya Git
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combinations.map((combination) => (
              <div
                key={combination.id}
                className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Kombin Önizleme (Üst Üste Binen Resimler) */}
                <div className="relative h-64 bg-stone-100 p-4 flex items-center justify-center overflow-hidden">
                  <div className="flex -space-x-12 hover:space-x-2 transition-all duration-500">
                    {combination.products?.slice(0, 3).map((product, idx) => (
                      <div
                        key={product.id}
                        className="w-32 h-44 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden transform transition-transform group-hover:rotate-0"
                        style={{
                          transform: `rotate(${
                            idx % 2 === 0 ? -5 : 5
                          }deg) translateY(${idx === 1 ? -10 : 0}px)`,
                          zIndex: 10 - idx,
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Hızlı Eylem Butonu (Silme) */}
                  <button
                    onClick={() => handleDelete(combination.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full shadow-sm backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Kombin Detayları */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-bold text-stone-900 truncate">
                      {combination.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 bg-stone-100 rounded text-stone-500">
                      {combination.products?.length} Parça
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-4">
                    {combination.description ||
                      "Bu kombin için açıklama eklenmedi."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                    <span className="text-xs text-stone-400">
                      {new Date(combination.createdAt).toLocaleDateString(
                        "tr-TR"
                      )}
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      {combination.totalValue?.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinationsPage;
