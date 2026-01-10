// src/types/auth.types.ts

export interface User {
  id: number; // Backend userId: number gönderdiği için number kalması daha iyi
  email: string;
  name: string;
  token?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  // YENİ: Register fonksiyonunu buraya ekliyoruz
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}
