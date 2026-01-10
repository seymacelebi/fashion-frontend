// // src/routes/ProtectedRoute.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const ProtectedRoute = () => {
//   const { isLoggedIn, isLoading } = useAuth();

//   // Oturum durumu kontrol edilirken bekleme ekranı göster
//   if (isLoading) {
//     return <div>Yükleniyor...</div>;
//   }

//   // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // Giriş yapmışsa, istenen sayfayı göster
//   return <Outlet />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  // Veriler LocalStorage'dan okunurken beklet
  if (isLoading) return <div>Yükleniyor...</div>;

  if (!isLoggedIn) {
    // Giriş yapmamışsa Login sayfasına at
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
