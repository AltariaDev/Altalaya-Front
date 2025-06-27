import {
  Comment,
  CreateCommentData,
  CreateMiradorData,
  Mirador,
  NearbyParams,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
  UpdateMiradorData,
} from "@/types";
import api from "./api";

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

  // Social Features - Likes
  async likeMirador(id: string): Promise<void> {
    await api.post(`/miradores/${id}/like`);
  },

  async unlikeMirador(id: string): Promise<void> {
    await api.delete(`/miradores/${id}/like`);
  },

  // Social Features - Comments
  async getComments(id: string): Promise<Comment[]> {
    const response = await api.get(`/miradores/${id}/comments`);
    return response.data;
  },

  async createComment(id: string, data: CreateCommentData): Promise<Comment> {
    const response = await api.post(`/miradores/${id}/comments`, data);
    return response.data;
  },

  // Social Features - Favorites
  async favoriteMirador(id: string): Promise<void> {
    await api.post(`/miradores/${id}/favorite`);
  },

  async unfavoriteMirador(id: string): Promise<void> {
    await api.delete(`/miradores/${id}/favorite`);
  },

  // GET /miradores/favorites - Obtener miradores favoritos del usuario
  async getFavoriteMiradores(): Promise<Mirador[]> {
    const response = await api.get("/miradores/favorites");
    return response.data;
  },
};
