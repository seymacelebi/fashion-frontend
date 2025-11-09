// Sorumluluğu: Kategori ve ürün gibi genel verilerle ilgili API çağrılarını yapmak.
// Bu dosya da merkezi apiClient'i kullanır.
import apiClient from './apiClients';
import type { Category, Product } from '../types'; // Tiplerinizi types/index.ts gibi bir yerden alın

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};
