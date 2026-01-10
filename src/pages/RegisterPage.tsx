import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    try {
      console.log(formData, "bbbb");
      await register(formData.username, formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Kayıt sırasında bir hata oluştu.";
      console.log(err.response?.data?.message, "aaaa");
      setError(message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sağ Taraf: Görsel Alanı (Görsel tutarlılığı için Login ile aynı yapıda) */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000"
          alt="Yeni Stil Yolculuğu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center">
          <h1 className="text-white text-6xl font-serif font-bold tracking-tighter bg-white/10 backdrop-blur-md px-8 py-4 rounded-lg">
            Stilini Tasarla
          </h1>
        </div>
      </div>

      {/* Sol Taraf: Form Alanı */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-stone-50">
        <div className="w-full max-w-md">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-2">
            Aramıza Katıl!
          </h2>
          <p className="text-stone-600 mb-8">
            Yeni bir stil yolculuğuna hazır mısın?
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Ad Soyad
              </label>
              <input
                type="text"
                name="username" 
                value={
                  formData.username
                } 
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all outline-none"
                placeholder="seymayilmaz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                E-posta Adresi
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all outline-none"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Şifre Tekrar
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center animate-pulse">
                {error}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-semibold text-white bg-stone-900 hover:bg-black transform transition hover:-translate-y-0.5 active:scale-95 disabled:bg-stone-400"
              >
                {isLoading ? "Kaydediliyor..." : "Hesap Oluştur"}
              </button>
            </div>

            <p className="text-center text-sm text-stone-600 pt-4">
              Zaten bir hesabın var mı?{" "}
              <Link
                to="/login"
                className="font-semibold text-stone-800 hover:underline transition-all"
              >
                Giriş Yap
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
