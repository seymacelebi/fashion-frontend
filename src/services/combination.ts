import apiClient from "./apiClients";
import type { ProductSummary } from "../types/index";

export const combinationService = {
  /**
   * "Beni Şaşırt" - Kullanıcının gardırobundan rastgele kombin getirir
   */
  getSurpriseOutfit: async (): Promise<ProductSummary[]> => {
    const response = await apiClient.get<ProductSummary[]>(
      "/combinations/surprise",
    );
    return response.data;
  },

  /**
   * "Bununla Kombin Yap" - Seçilen ürün ID'sine göre en uyumlu parçaları getirir
   */
  getSuggestedOutfit: async (productId: number): Promise<ProductSummary[]> => {
    const response = await apiClient.get<ProductSummary[]>(
      `/combinations/suggest/${productId}`,
    );
    return response.data;
  },
};
