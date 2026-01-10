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

export const Season = {
  SUMMER: "SUMMER",
  WINTER: "WINTER",
  SPRING: "SPRING",
  AUTUMN: "AUTUMN",
} as const;

export type Season = (typeof Season)[keyof typeof Season];

// 2. Tarz Tanımı
export const Style = {
  CASUAL: "CASUAL",
  CLASSIC: "CLASSIC",
  SPORT: "SPORT",
  PARTY: "PARTY",
} as const;

export interface Brand {
  id: number;
  name: string;
  logoUrl?: string;
  affiliateLinkBase?: string;
}

export type Style = (typeof Style)[keyof typeof Style];

// Backend'deki Product entity'sine karşılık gelen tip
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  userId: number;
  color?: string;
  season?: Season;
  style?: Style;
 // brand?: Brand; 
  brandName?: string;
  price?: number;
}

// Sorumluluğu: Sadece Kategori veri modelini tanımlamak.
export interface Category {
  id: number;
  name: string;
}

export interface ProductCreateData {
  name: string;
  brandName: string; 
  categoryId: number;
  color: string;
  season: Season;
  style: Style;
  imageFile: File | null; 
}

// Sorumluluğu: Sadece Kombin veri modelini tanımlamak.

// Frontend'de kombinasyonları temsil etmek için kullanılacak tip
export interface Combination {
  id: number;
  name: string;
  category: string; // Veya Category tipi de olabilir
  imageUrl: string;
}
