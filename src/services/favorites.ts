import api from "./api";

export interface Favorite {
  id: string;
  mirador_id: string;
  user_id: string;
  created_at: string;
  mirador?: {
    id: string;
    title: string;
    description?: string;
    image_url?: string;
    city: string;
    country: string;
  };
}

export const favoritesService = {
  // Add mirador to favorites
  async add(miradorId: string): Promise<Favorite> {
    const response = await api.post(`/favorites/mirador/${miradorId}`);
    return response.data;
  },

  // Remove mirador from favorites
  async remove(miradorId: string): Promise<{ message: string }> {
    const response = await api.delete(`/favorites/mirador/${miradorId}`);
    return response.data;
  },

  // Check if mirador is in favorites
  async isFavorited(miradorId: string): Promise<boolean> {
    try {
      const response = await api.get(`/favorites/mirador/${miradorId}/check`);
      return response.data.favorited;
    } catch {
      throw new Error("Failed to toggle favorite");
    }
  },

  // Get user's favorites
  async getUserFavorites(params?: { page?: number; limit?: number }): Promise<{
    data: Favorite[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get("/favorites", { params });
    return response.data;
  },

  // Get favorites count for a mirador
  async getFavoritesCount(miradorId: string): Promise<number> {
    const response = await api.get(`/favorites/mirador/${miradorId}/count`);
    return response.data.count;
  },
};
