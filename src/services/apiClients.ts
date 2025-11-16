// Sorumluluğu: API'nin temel ayarlarını (base URL, token yönetimi)
// merkezi bir yerde toplamak ve yapılandırılmış bir axios istemcisi sağlamak.
import axios from "axios";

// --- PROFESYONEL YAKLAŞIM 1: Ortam Değişkenleri (Environment Variables) ---
// API adresini doğrudan koda yazmak yerine, bir .env dosyasından okumak
// en iyi pratiktir. Bu, geliştirme (localhost) ve production (gerçek sunucu)
// ortamları arasında kolayca geçiş yapmanızı sağlar.
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// src/services/apiClients.ts

// ESKİ HALİ:
// const API_BASE_URL = 'http://localhost:8080/api';

// YENİ HALİ (BUNU KULLANIN):
const API_BASE_URL =
  "[https://fashion-backend-l6pnd.onrender.com/api](https://fashion-backend-l6pnd.onrender.com/api)";

// --- PROFESYONEL YAKLAŞIM 2: Merkezi Axios İstemcisi (Centralized Client) ---
// Her API isteği için fetch ayarlarını tekrar tekrar yazmak yerine,
// tüm ayarları (baseURL, timeout vb.) içeren tek bir "istemci" oluştururuz.
// Bu, "Kendini Tekrar Etme" (DRY) prensibinin temelidir.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000, // İsteklerin 10 saniye içinde zaman aşımına uğramasını sağlayabilirsiniz.
});

// --- PROFESYONEL YAKLAŞIM 3: İstek Interceptor'ı (Request Interceptor) ---
// Bu bölüm, uygulamanızdan gönderilen HER BİR API isteğini,
// sunucuya ulaşmadan hemen önce "yakalar" ve üzerinde değişiklik yapar.
apiClient.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı al.
    const token = localStorage.getItem("token");

    // Eğer token varsa, isteğin "Authorization" başlığına "Bearer [token]"
    // olarak otomatik ekle. Bu sayede her servis dosyasında bu işlemi
    // tekrar tekrar yapmaktan kurtuluruz.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // İstek gönderilirken bir hata oluşursa, bu hata doğrudan yakalanır.
    return Promise.reject(error);
  }
);

// --- PROFESYONEL YAKLAŞIM 4: Yanıt Interceptor'ı (Response Interceptor) ---
// Bu bölüm, sunucudan gelen HER BİR yanıtı, uygulamanızın
// geri kalanına ulaşmadan hemen önce "yakalar". Hata yönetimi için mükemmeldir.
apiClient.interceptors.response.use(
  (response) => {
    // Yanıt başarılı ise (2xx durum kodu), doğrudan geri döndür.
    return response;
  },
  (error) => {
    // Yanıt hatalı ise (4xx, 5xx durum kodu), hatayı merkezi olarak işleyebiliriz.
    if (axios.isAxiosError(error) && error.response) {
      // Örneğin, 401 (Unauthorized) hatası gelirse, kullanıcının token'ı
      // geçersiz demektir. Burada kullanıcıyı otomatik olarak login sayfasına
      // yönlendiren bir mantık yazılabilir.
      if (error.response.status === 401) {
        // localStorage.removeItem('token');
        // window.location.href = '/login';
        console.error("Yetki hatası! Token geçersiz veya süresi dolmuş.");
      }

      // Backend'den gelen özel hata mesajını fırlat.
      return Promise.reject(
        new Error(error.response.data.message || "Bir sunucu hatası oluştu.")
      );
    }
    // Eğer ağ hatası gibi bir sorun varsa, genel bir hata mesajı fırlat.
    return Promise.reject(
      new Error("Sunucuya bağlanırken bir ağ hatası oluştu.")
    );
  }
);

export default apiClient;
