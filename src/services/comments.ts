import api from "./api";

export interface Comment {
  id: string;
  content: string;
  mirador_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface CreateCommentData {
  content: string;
  mirador_id: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const commentsService = {
  // Get comments for a mirador
  async getByMirador(
    miradorId: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Comment>> {
    const response = await api.get(`/comments/mirador/${miradorId}`, {
      params,
    });
    return response.data;
  },

  // Create a comment
  async create(data: CreateCommentData): Promise<Comment> {
    const response = await api.post("/comments", data);
    return response.data;
  },

  // Update a comment
  async update(id: string, content: string): Promise<Comment> {
    const response = await api.put(`/comments/${id}`, { content });
    return response.data;
  },

  // Delete a comment
  async delete(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },

  // Get user's comments
  async getByUser(
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Comment>> {
    const response = await api.get(`/comments/user/${userId}`, { params });
    return response.data;
  },
};
