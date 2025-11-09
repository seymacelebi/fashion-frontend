// src/services/authService.ts
import apiClient from './apiClients';
import type { User } from '../types/auth.types';

// Backend'in başarılı bir giriş sonrası döndürmesini beklediğimiz veri yapısı
interface LoginResponse {
  token: string;
  user: User;
}

export const loginWithCredentials = async (email: string, password: string): Promise<LoginResponse> => {
  // apiClient, baseURL'i ve hata yönetimini zaten merkezi olarak hallediyor.
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    email: email, // Backend'in beklediği alan adı ne ise onu kullanın
    password: password,
  });
  return response.data; // { token: "...", user: {...} }
};

export const logoutUser = async (): Promise<void> => {
  // Sunucudaki token'ı geçersiz kılmak için bir istek atılabilir.
  // Şimdilik sadece simüle ediyoruz.
  console.log('Logout isteği sunucuya gönderildi.');
  return Promise.resolve();
};