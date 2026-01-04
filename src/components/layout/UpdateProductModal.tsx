import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  getCategories,
} from "../../services/productService";
import { Season, Style } from "../../types";

const UpdateProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData = null,
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

      if (initialData) {
        setFormData({
          name: initialData.name || "",
          brandName: initialData.brand?.name || "",
          categoryId: initialData.categoryId || 0,
          season: initialData.season || Season.SUMMER,
          style: initialData.style || Style.CASUAL,
          color: initialData.color || "",
        });
        setImageUrlPreview(initialData.imageUrl);
      }
    }
  }, [isOpen, initialData]);

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
    if (!formData.name || !formData.categoryId) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setIsLoading(true);
    try {
      // imageFile: selectedFile -> Eğer kullanıcı yeni resim seçtiyse o gider, seçmediyse null gider (backend eskiyi korur)
      const productData = { ...formData, imageFile: selectedFile };

      if (initialData) {
        await updateProduct(initialData.id, productData);
      } else {
        if (!selectedFile) return alert("Resim seçmelisiniz.");
        await createProduct(productData);
      }

      onSuccess();
      handleCloseAndReset();
    } catch (error) {
      console.error("Hata:", error);
      alert("İşlem sırasında bir hata oluştu.");
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900">
            {initialData ? "Parçayı Düzenle" : "Yeni Parça Ekle"}
          </h2>
          <button
            onClick={handleCloseAndReset}
            className="p-2 text-gray-400 hover:text-gray-600"
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
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Fotoğraf */}
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative flex items-center justify-center cursor-pointer overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 z-10 cursor-pointer"
            />
            {imageUrlPreview ? (
              <img
                src={imageUrlPreview}
                alt="Preview"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <span className="text-gray-400">Resim Seç</span>
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
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
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value={0}>Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={handleCloseAndReset}
            className="px-5 py-2 text-gray-600 font-medium"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-black text-white rounded-lg font-medium shadow-lg hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading
              ? "Kaydediliyor..."
              : initialData
              ? "Güncelle"
              : "Dolaba Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
