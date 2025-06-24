import api from "./api";

export interface Mirador {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

export interface CreateMiradorData {
  title: string;
  description?: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export interface UpdateMiradorData {
  title?: string;
  description?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
}

export interface NearbyParams extends PaginationParams {
  lat: number;
  lng: number;
  radius?: number;
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
  // POST /miradores - Crear un nuevo mirador
  async createMirador(data: CreateMiradorData): Promise<Mirador> {
    const response = await api.post("/miradores", data);
    return response.data;
  },

  // GET /miradores - Obtener todos los miradores con paginación
  async getMiradores(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Mirador>> {
    const response = await api.get("/miradores", { params });
    return response.data;
  },

  // GET /miradores/search - Buscar miradores por título o ciudad
  async searchMiradores(
    params: SearchParams
  ): Promise<PaginatedResponse<Mirador>> {
    const response = await api.get("/miradores/search", { params });
    return response.data;
  },

  // GET /miradores/nearby - Buscar miradores cercanos a unas coordenadas
  async getNearbyMiradores(
    params: NearbyParams
  ): Promise<PaginatedResponse<Mirador>> {
    const response = await api.get("/miradores/nearby", { params });
    return response.data;
  },

  // GET /miradores/:id - Obtener detalles de un mirador específico
  async getMiradorById(id: string): Promise<Mirador> {
    const response = await api.get(`/miradores/${id}`);
    return response.data;
  },

  // PATCH /miradores/:id - Actualizar un mirador (solo el creador)
  async updateMirador(id: string, data: UpdateMiradorData): Promise<Mirador> {
    const response = await api.patch(`/miradores/${id}`, data);
    return response.data;
  },

  // DELETE /miradores/:id - Eliminar un mirador (solo el creador)
  async deleteMirador(id: string): Promise<void> {
    await api.delete(`/miradores/${id}`);
  },
};
