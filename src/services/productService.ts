import apiClient from "./apiClients";

// 1. Mevsim Tanımı
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

export type Style = (typeof Style)[keyof typeof Style];

// Swagger'daki yapıya göre Brand arayüzü eklendi
export interface Brand {
  id: number;
  name: string;
  logoUrl?: string;
  affiliateLinkBase?: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  userId: number;
  color?: string;
  season?: Season;
  style?: Style;
  brand?: Brand; // Marka artık bir nesne
  price?: number;
}

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

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
};

export const getProducts = async (
  categoryId: number | null
): Promise<Product[]> => {
  let url = "/products";
  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }
  const response = await apiClient.get<Product[]>(url);
  return response.data;
};

/**
 * Ürün oluşturma fonksiyonu.
 * FormData kullanarak multipart/form-data isteği gönderir.
 */
export const createProduct = async (
  data: ProductCreateData
): Promise<Product> => {
  const formData = new FormData();

  // Basit alanları ekle
  formData.append("name", data.name);
  
  // Swagger dokümanında nesne olarak görünse de, 
  // Multipart isteğiyle yeni ürün oluştururken marka ismini gönderiyoruz.
  // Backend genellikle bu ismi "brand" veya "brandName" parametresiyle karşılar.
  formData.append("brandName", data.brandName); 
  
  formData.append("categoryId", data.categoryId.toString());
  formData.append("color", data.color);
  formData.append("season", data.season);
  formData.append("style", data.style);

  // --- DÜZELTİLEN KISIM: Tek Seferlik ve Kontrollü Gönderim ---
  if (data.imageFile) {
    // Backend'deki Controller'da @RequestParam("image") ismiyle birebir aynı olmalı
    formData.append("image", data.imageFile);
  }

  const response = await apiClient.post<Product>("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await apiClient.delete(`/products/${productId}`);
};