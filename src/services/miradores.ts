import api from "./api";

export interface Mirador {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface CreateMiradorData {
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  image_url?: string;
}

export interface SearchParams {
  q?: string;
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export interface NearbyParams {
  latitude: number;
  longitude: number;
  distance?: number;
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

export const miradoresService = {
  // Get all miradores with pagination
  async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Mirador>> {
    const response = await api.get("/miradores", { params });
    return response.data;
  },

  // Get mirador by ID
  async getById(id: string): Promise<Mirador> {
    const response = await api.get(`/miradores/${id}`);
    return response.data;
  },

  // Create new mirador
  async create(data: CreateMiradorData): Promise<Mirador> {
    const response = await api.post("/miradores", data);
    return response.data;
  },

  // Update mirador
  async update(id: string, data: Partial<CreateMiradorData>): Promise<Mirador> {
    const response = await api.put(`/miradores/${id}`, data);
    return response.data;
  },

  // Delete mirador
  async delete(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/miradores/${id}`);
    return response.data;
  },

  // Search miradores
  async search(params: SearchParams): Promise<PaginatedResponse<Mirador>> {
    const response = await api.get("/miradores/search", { params });
    return response.data;
  },

  // Get nearby miradores
  async getNearby(params: NearbyParams): Promise<Mirador[]> {
    const response = await api.get("/miradores/nearby", { params });
    return response.data;
  },

  // Like a mirador (placeholder for future implementation)
  async like(id: string): Promise<{ success: boolean; message: string }> {
    // This would be implemented when you add likes functionality
    throw new Error("Like functionality not implemented yet");
  },

  // Unlike a mirador (placeholder for future implementation)
  async unlike(id: string): Promise<{ success: boolean; message: string }> {
    // This would be implemented when you add likes functionality
    throw new Error("Unlike functionality not implemented yet");
  },
};
