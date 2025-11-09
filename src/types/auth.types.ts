// Bu dosyayı src/types klasörü içine oluşturun.
// Sorumluluğu: Kimlik doğrulama ile ilgili tüm tipleri tanımlamak.

export interface User {
  id: string;
  email: string;
  name: string;
  // Gerçek bir JWT token'ı da burada saklanabilir.
  token?: string; 
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

// Context'in hem state'i hem de fonksiyonları içermesi için
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
