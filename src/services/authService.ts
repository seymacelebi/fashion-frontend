// src/services/authService.ts
import apiClient from "./apiClients";
import type { User } from "../types/auth.types";

// Backend'in başarılı bir giriş sonrası döndürmesini beklediğimiz veri yapısı
interface LoginResponse {
  token: string;
  userId: number;
  email: string;
  username: string;
}
export const loginWithCredentials = async (email: string, password: string) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  const mappedData = {
    token: response.data.token,
    user: {
      id: response.data.userId,
      email: response.data.email,
      name: response.data.username,
    },
  };
  console.log("Giriş başarılı:", mappedData);

  return mappedData;
};

export const logoutUser = async (): Promise<void> => {
  // Sunucudaki token'ı geçersiz kılmak için bir istek atılabilir.
  // Şimdilik sadece simüle ediyoruz.
  console.log("Logout isteği sunucuya gönderildi.");
  return Promise.resolve();
};
