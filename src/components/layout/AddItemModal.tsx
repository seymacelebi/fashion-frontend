import  { useState, useEffect } from "react";
import {
  createProduct,
  getCategories,
} from "../../services/productService";
import { Season, Style } from "../../types";

const AddItemModal = ({ isOpen, onClose, onSuccess }) => {
  const [imageUrlPreview, setImageUrlPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (error) {
          console.error("Kategoriler yüklenemedi:", error);
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    categoryId: 0,
    season: Season.SUMMER,
    style: Style.CASUAL,
    color: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageUrlPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    console.log("FORM DATA:", formData);
    console.log("FORM STATE:", formData);
    console.log("SELECTED FILE:", selectedFile);
    console.log("IS FILE INSTANCE:", selectedFile instanceof File);

    if (!formData.name || !formData.brandName) {
      alert("Lütfen parça adı ve marka giriniz.");
      return;
    }

    if (!formData.categoryId) {
      alert("Lütfen bir kategori seçiniz.");
      return;
    }

    if (!selectedFile) {
      alert("Lütfen bir resim yükleyiniz.");
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        brandName: formData.brandName,
        categoryId: formData.categoryId,
        season: formData.season,
        style: formData.style,
        color: formData.color,
        imageFile: selectedFile,
      };

      console.log("Ürün eklendi:", productData);
      const result = await createProduct(productData);
      console.log("Ürün eklendi:", result);

      if (onSuccess) onSuccess();
      handleCloseAndReset();
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert(
        "Parça eklenirken bir hata oluştu. Lütfen bilgileri kontrol ediniz."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900">Yeni Parça Ekle</h2>
          <button
            onClick={handleCloseAndReset}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
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

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Resim Yükleme Alanı */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parça Fotoğrafı
            </label>
            <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {imageUrlPreview ? (
                <img
                  src={imageUrlPreview}
                  alt="Önizleme"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Fotoğraf yüklemek için tıkla
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* NAME */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parça Adı
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Örn: Siyah Deri Ceket"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marka
              </label>
              <input
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                type="text"
                placeholder="Zara, Mango..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value={0}>Seçiniz</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COLOR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Renk
              </label>
              <input
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                type="text"
                placeholder="Siyah..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* SEASON */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mevsim
              </label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value={Season.SUMMER}>Yaz</option>
                <option value={Season.WINTER}>Kış</option>
                <option value={Season.SPRING}>Bahar</option>
                <option value={Season.AUTUMN}>Sonbahar</option>
              </select>
            </div>

            {/* STYLE */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tarz
              </label>
              <select
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value={Style.CASUAL}>Günlük (Casual)</option>
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
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg"
          >
            {isLoading ? "Ekleniyor..." : "Dolaba Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
