import type { Product, Category, ProductCreateData } from "../types";

import apiClient from "./apiClients";

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
  formData.append("name", data.name);

  // Swagger dokümanında nesne olarak görünse de,
  // Multipart isteğiyle yeni ürün oluştururken marka ismini gönderiyoruz.
  // Backend genellikle bu ismi "brand" veya "brandName" parametresiyle karşılar.
  formData.append("brandName", data.brandName);

  formData.append("categoryId", data.categoryId.toString());
  formData.append("color", data.color);
  formData.append("season", data.season);
  formData.append("style", data.style);

  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await apiClient.post<Product>("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async (
  productId: number,
  data: ProductCreateData
): Promise<Product> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("brandName", data.brandName);
  formData.append("categoryId", data.categoryId.toString());
  formData.append("color", data.color);
  formData.append("season", data.season);
  formData.append("style", data.style);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }
  console.log(formData, "formDataUpdateeee");
  const response = await apiClient.put<Product>(
    `/products/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  console.log(productId, "productId");
  await apiClient.delete(`/products/${productId}`);
};
