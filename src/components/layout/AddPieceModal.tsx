// src/components/AddPieceModal.js
import React, { useState } from 'react';

// 'isOpen', 'onClose' ve 'onSubmit' props'larını App.js'ten alıyoruz
function AddPieceModal({ isOpen, onClose, onSubmit }) {
  // Form alanları için kendi dahili state'lerini yönetir
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('1'); // Varsayılan kategori ID'si
  const [imageUrl, setImageUrl] = useState('');

  // Form gönderildiğinde
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    if (!name || !imageUrl) return; // Basit doğrulama

    // Toplanan veriyi App.js'teki onSubmit fonksiyonuna gönder
    onSubmit({
      name,
      imageUrl,
      categoryId: parseInt(categoryId, 10) // ID'yi sayı olarak gönder
    });

    // Formu temizle
    setName('');
    setImageUrl('');
    setCategoryId('1');
    // onClose(); // onSubmit fonksiyonu zaten App.js'te modalı kapatıyor
  };

  // Eğer isOpen false ise, hiçbir şey render etme (null döndür)
  if (!isOpen) {
    return null;
  }

  return (
    // Modal Arka Planı
    // Orijinal CSS'inizdeki geçiş efektlerini (transition) koruyoruz
    <div 
      id="addPieceModal" 
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Arka plana tıklayınca kapat
    >
      {/* Modal İçeriği */}
      <div 
        className="modal-content bg-white w-full max-w-md p-8 rounded-lg shadow-xl transition-transform"
        onClick={e => e.stopPropagation()} // İçeriğe tıklayınca kapanmasını engelle
      >
        
        {/* Modal Başlığı */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif-display font-bold">Yeni Parça Ekle</h2>
          <button id="closeModalBtn" onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form id="addPieceForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="pieceName" className="block text-sm font-medium text-gray-700">Parça Adı</label>
            <input 
              type="text" 
              id="pieceName" 
              name="name" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm" 
              placeholder="Örn: Beyaz Gömlek"
              value={name} // State'e bağla
              onChange={e => setName(e.target.value)} // State'i güncelle
              required
            />
          </div>
          
          <div>
            <label htmlFor="pieceCategory" className="block text-sm font-medium text-gray-700">Kategori</label>
            <select 
              id="pieceCategory" 
              name="categoryId" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
              value={categoryId} // State'e bağla
              onChange={e => setCategoryId(e.target.value)} // State'i güncelle
            >
              {/* Kategoriler API'den gelseydi burayı da map ile dönerdik */}
              <option value="1">Ceketler</option>
              <option value="2">Pantolonlar</option>
              <option value="3">Elbiseler</option>
              <option value="4">Ayakkabılar</option>
            </select>
          </div>

          <div>
            <label htmlFor="pieceImageUrl" className="block text-sm font-medium text-gray-700">Resim URL</label>
            <input 
              type="text" 
              id="pieceImageUrl" 
              name="imageUrl" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm" 
              placeholder="https_//...."
              value={imageUrl} // State'e bağla
              onChange={e => setImageUrl(e.target.value)} // State'i güncelle
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPieceModal;