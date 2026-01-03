// Sorumluluğu: API'nin temel ayarlarını (base URL, token yönetimi)
// merkezi bir yerde toplamak ve yapılandırılmış bir axios istemcisi sağlamak.
import axios from "axios";

// --- PROFESYONEL YAKLAŞIM: Otomatik Ortam Algılama ---
// Uygulama 'localhost' üzerindeyse yerel backend'e,
// değilse (Netlify, Render vb.) canlı backend'e istek atar.
// Bu sayede kodu her seferinde değiştirmek zorunda kalmazsınız.

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api" // Yerel Geliştirme (Local)
    : "https://fashion-backend-l6pnd.onrender.com/api"; // Canlı (Production)

// --- Merkezi Axios İstemcisi (Centralized Client) ---
// Her API isteği için fetch ayarlarını tekrar tekrar yazmak yerine,
// tüm ayarları (baseURL, timeout vb.) içeren tek bir "istemci" oluştururuz.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000, // İsteğe bağlı: 10 saniye zaman aşımı
});

// --- İstek Interceptor'ı (Request Interceptor) ---
// Bu bölüm, uygulamanızdan gönderilen HER BİR API isteğini,
// sunucuya ulaşmadan hemen önce "yakalar" ve üzerinde değişiklik yapar.
apiClient.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı al.
    // NOT: AuthContext'inizde 'token' anahtarını kullanıyorsanız burası 'token' olmalı.
    // Eğer 'authToken' kullanıyorsanız, burayı da 'authToken' yapın.
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

// --- Yanıt Interceptor'ı (Response Interceptor) ---
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
