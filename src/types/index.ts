export interface MenuItem {
  name: string;
  path?: string;
  title?: string;
  children?: MenuItem[];
}

export interface MenuState {
  menu: MenuItem[];
  getClaimPages: string[];
  getModulePages: string[];
  getFreePages: string[];
}

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}


// Backend'deki Product entity'sine karşılık gelen tip
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  category: Category; // Product'ın bir kategorisi olduğunu belirtiyoruz.
}

// Sorumluluğu: Sadece Kategori veri modelini tanımlamak.
export interface Category {
  id: number;
  name: string;
}

// Sorumluluğu: Sadece Kombin veri modelini tanımlamak.

// Frontend'de kombinasyonları temsil etmek için kullanılacak tip
export interface Combination {
  id: number;
  name: string;
  category: string; // Veya Category tipi de olabilir
  imageUrl: string;
}



// Gelecekte diğer tipleriniz de buraya eklenebilir:
// export interface User { ... }
// export interface Product { ... }
