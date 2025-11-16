// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // Oturum durumu kontrol edilirken bekleme ekranı göster
  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Giriş yapmışsa, istenen sayfayı göster
  return <Outlet />;
};

export default ProtectedRoute;
