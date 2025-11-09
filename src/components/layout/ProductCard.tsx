// src/components/ProductCard.js

// 'product' ve 'onDelete' objelerini props olarak alıyoruz
function ProductCard({ product, onDelete }) {
  // SVG ikonunu bir değişkene atayabiliriz (isteğe bağlı)
  const hangerIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-1.05.246-1.91.731-2.5 1.344a.75.75 0 0 0 1 1.124A4.053 4.053 0 0 1 6 6.22V16.25a.75.75 0 0 0 1.5 0V6.22c.31 0 .614.03.91.087a5.552 5.552 0 0 0 1.636.213c.277 0 .548-.02.812-.058a5.571 5.571 0 0 0 1.542-.37c1.07-.377 1.91-.97 2.4-1.682a.75.75 0 0 0-1-1.124c-.456.621-1.137 1.077-1.92 1.393a4.07 4.07 0 0 1-1.42.31c-.261 0-.515-.02-.76-.058a4.054 4.054 0 0 1-1.44-.24l-.004-.001v-.443A2.75 2.75 0 0 0 8.75 1Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="group relative">
      {/* HTML'deki aspect-w-1 aspect-h-1 sınıfları @tailwindcss/aspect-ratio eklentisi ile çalışır */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        {/* Silme butonuna App.js'ten gelen onDelete fonksiyonunu bağlıyoruz */}
        <button
          onClick={() => onDelete(product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Bu parçayı sil"
        >
          {hangerIcon}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
