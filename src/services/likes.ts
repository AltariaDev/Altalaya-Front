import api from "./api";

export interface Like {
  id: string;
  mirador_id: string;
  user_id: string;
  created_at: string;
  user?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export const likesService = {
  // Like a mirador
  async like(miradorId: string): Promise<Like> {
    const response = await api.post(`/likes/mirador/${miradorId}`);
    return response.data;
  },

  // Unlike a mirador
  async unlike(miradorId: string): Promise<{ message: string }> {
    const response = await api.delete(`/likes/mirador/${miradorId}`);
    return response.data;
  },

  // Check if user liked a mirador
  async isLiked(miradorId: string): Promise<boolean> {
    try {
      const response = await api.get(`/likes/mirador/${miradorId}/check`);
      return response.data.liked;
    } catch {
      throw new Error("Failed to toggle like");
    }
  },

  // Get likes count for a mirador
  async getLikesCount(miradorId: string): Promise<number> {
    const response = await api.get(`/likes/mirador/${miradorId}/count`);
    return response.data.count;
  },

  // Get users who liked a mirador
  async getLikesByMirador(
    miradorId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    data: Like[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get(`/likes/mirador/${miradorId}`, { params });
    return response.data;
  },

  // Get user's liked miradores
  async getLikesByUser(
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    data: Like[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get(`/likes/user/${userId}`, { params });
    return response.data;
  },
};
