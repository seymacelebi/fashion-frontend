import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Gerçek hook'umuzu import ediyoruz

const LoginPage = () => { 
  // --- State Yönetimi ---
  // Form alanlarındaki verileri tutmak için state'ler.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Form'a özel hata mesajlarını tutmak için (örneğin, "Şifre çok kısa")
  const [formError, setFormError] = useState<string | null>(null);

  // --- Hook'lar ---
  // Global Auth context'inden gerekli fonksiyon ve state'leri alıyoruz.
  // `error: authError` ile yeniden adlandırma, formError ile karışmasını engeller.
  const { login, isLoading, error: authError, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // --- Yan Etki (Side Effect) Yönetimi ---
  // Başarılı bir girişten (isLoggedIn true olduğunda) sonra yönlendirme yapar.
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Ana sayfaya yönlendir
    }
  }, [isLoggedIn, navigate]);

  // --- Olay Yöneticisi (Event Handler) ---
  // Form gönderildiğinde çalışacak fonksiyon.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setFormError(null); // Eski hataları temizle

    // Yükleniyorsa tekrar göndermeyi engelle
    if (isLoading) return;

    try {
      // Global context'teki login fonksiyonunu çağır
      await login(email, password);
      console.log("email:", email, "password:", password);
    } catch (err) {
      // login fonksiyonu hata fırlatırsa (AuthContext'te tanımlı), yakala.
      const message = err instanceof Error ? err.message : "Giriş yapılamadı.";
      setFormError(message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sol Taraf: Form Alanı */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-2">
            Tekrar Hoş Geldin!
          </h2>
          <p className="text-stone-600 mb-8">Stilini keşfetmeye devam et.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700"
              >
                E-posta Adresi
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Hem formdan hem de context'ten gelen hata mesajlarını göster */}
            {(formError || authError) && (
              <p className="text-sm text-red-600 text-center">
                {formError || authError}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-semibold text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition duration-300 disabled:bg-stone-400"
              >
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>
            </div>
            <p className="text-center text-sm text-stone-600 pt-4">
              Hesabın yok mu?{" "}
              <Link
                to="/register"
                className="font-semibold text-stone-800 hover:underline hover:text-pink-500 transition-colors duration-200"
              >
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Sağ Taraf: Görsel Alanı */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://placehold.co/1000x1200/e7e5e4/44403c?text=Stilini+Ke%C5%9Ffet"
          alt="Giriş sayfası moda görseli"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
