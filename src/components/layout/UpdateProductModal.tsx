import { useState, useEffect } from "react";
// Dosya yolu hatası düzeltildi: Proje yapınıza uygun olarak "../../" dizinine çekildi.
import {
  updateProduct,
  getCategories,
  getProductById,
} from "../../services/productService";
import { Season, Style } from "../../types";

const UpdateProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  productId = null, // Düzenlenecek ürünün ID'si
  initialData = null, // Opsiyonel: Veri dışarıdan da aktarılabilir
}) => {
  const [imageUrlPreview, setImageUrlPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    categoryId: 0,
    season: Season.SUMMER,
    style: Style.CASUAL,
    color: "",
  });

  useEffect(() => {
    if (!isOpen || !initialData) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const catData = await getCategories();
        setCategories(catData);

        console.log("🟡 initialData.categoryName:", initialData.categoryName);
        console.log(
          "🟡 catData names:",
          catData.map((c) => c.name)
        );

        const matchedCategory = catData.find(
          (c) =>
            c.name.trim().toLowerCase() ===
            initialData.categoryName?.trim().toLowerCase()
        );

        console.log("🟢 matchedCategory:", matchedCategory);

        let dataToFill = initialData;

        if (productId && !initialData) {
          dataToFill = await getProductById(productId);
        }

        if (dataToFill) {
          setFormData({
            name: dataToFill.name || "",
            brandName: dataToFill.brand?.name || dataToFill.brandName || "",
            categoryId: matchedCategory?.id || 0,
            season: dataToFill.season || Season.SUMMER,
            style: dataToFill.style || Style.CASUAL,
            color: dataToFill.color || "",
          });
          setImageUrlPreview(dataToFill.imageUrl);
        }
      } catch (error) {
        console.error("Veriler yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen, initialData, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (imageUrlPreview && !imageUrlPreview.startsWith("http")) {
        URL.revokeObjectURL(imageUrlPreview);
      }
      setImageUrlPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.categoryId || formData.categoryId === 0) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setIsLoading(true);
    try {
      const updateData = {
        ...formData,
        imageFile: selectedFile,
      };

      const currentId = productId || initialData?.id;
      if (!currentId) throw new Error("Ürün ID'si bulunamadı.");

      await updateProduct(currentId, updateData);

      if (onSuccess) onSuccess();
      handleCloseAndReset();
    } catch (error) {
      console.error("Güncelleme sırasında hata:", error);
      alert("Ürün güncellenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    if (imageUrlPreview && !imageUrlPreview.startsWith("http")) {
      URL.revokeObjectURL(imageUrlPreview);
    }
    setFormData({
      name: "",
      brandName: "",
      categoryId: 0,
      season: Season.SUMMER,
      style: Style.CASUAL,
      color: "",
    });
    setSelectedFile(null);
    setImageUrlPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900">Parçayı Düzenle</h2>
          <button
            onClick={handleCloseAndReset}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Fotoğraf Alanı */}
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative flex items-center justify-center cursor-pointer overflow-hidden group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 z-10 cursor-pointer"
            />
            {imageUrlPreview ? (
              <>
                <img
                  src={imageUrlPreview}
                  alt="Önizleme"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">
                    Fotoğrafı Değiştir
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400">
                <p>Resim Seç</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Parça Adı
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ürün adı"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Marka
              </label>
              <input
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                placeholder="Marka adı"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Kategori
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
              >
                <option value={0}>Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Mevsim
              </label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
              >
                <option value={Season.SUMMER}>Yaz</option>
                <option value={Season.WINTER}>Kış</option>
                <option value={Season.SPRING}>Bahar</option>
                <option value={Season.AUTUMN}>Sonbahar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Tarz
              </label>
              <select
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
              >
                <option value={Style.CASUAL}>Günlük</option>
                <option value={Style.SPORT}>Spor</option>
                <option value={Style.CLASSIC}>Klasik</option>
                <option value={Style.PARTY}>Parti</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleCloseAndReset}
            className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-black text-white rounded-lg font-medium shadow-lg hover:bg-gray-800 disabled:bg-gray-400 transition-all"
          >
            {isLoading ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
