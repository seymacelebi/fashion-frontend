import apiClient from "./apiClients";

// --- Backend DTO'ları ile Eşleşen Tipler ---

// ProductDto'nuza karşılık gelir
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  userId: number;
}

// CategoryDto'nuza karşılık gelir
export interface Category {
  id: number;
  name: string;
}

// ProductCreateDto'nuza karşılık gelir
export interface ProductCreateData {
  name: string;
  imageUrl: string;
  categoryId: number;
}

// --- API Fonksiyonları ---

/**
 * Backend'den (/api/categories) tüm kategorileri çeker.
 * (Filtre sekmelerini doldurmak için)
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
};

/**
 * Backend'den (/api/products) 'currentUser'ın ürünlerini çeker.
 * Kategori ID'si (categoryId) verilirse, o kategoriye göre filtreler.
 */
export const getProducts = async (
  categoryId: number | null
): Promise<Product[]> => {
  let url = "/products";

  // Eğer bir kategori ID'si varsa, onu URL'e query param olarak ekle
  // (ProductController'daki @RequestParam'ı tetikler)
  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }

  const response = await apiClient.get<Product[]>(url);
  return response.data;
};

/**
 * Backend'e (/api/products) yeni bir parça ekler.
 * (ProductController'daki @PostMapping'i tetikler)
 */
export const createProduct = async (
  data: ProductCreateData
): Promise<Product> => {
  const response = await apiClient.post<Product>("/products", data);
  return response.data;
};

/**
 * Backend'den (/api/products/{id}) bir parçayı siler.
 * (ProductController'daki @DeleteMapping'i tetikler)
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await apiClient.delete(`/products/${productId}`);
};
