import { create } from "zustand";
import {
  CreateMiradorData,
  Mirador,
  miradoresService,
  NearbyParams,
  SearchParams,
} from "../services/miradores";

interface MiradoresState {
  miradores: Mirador[];
  currentMirador: Mirador | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;

  // Actions
  fetchMiradores: (params?: { page?: number; limit?: number }) => Promise<void>;
  fetchMiradorById: (id: string) => Promise<void>;
  createMirador: (data: CreateMiradorData) => Promise<void>;
  updateMirador: (
    id: string,
    data: Partial<CreateMiradorData>
  ) => Promise<void>;
  deleteMirador: (id: string) => Promise<void>;
  searchMiradores: (params: SearchParams) => Promise<void>;
  getNearbyMiradores: (params: NearbyParams) => Promise<void>;
  clearError: () => void;
  clearCurrentMirador: () => void;
}

export const useMiradoresStore = create<MiradoresState>((set, get) => ({
  miradores: [],
  currentMirador: null,
  isLoading: false,
  error: null,
  pagination: null,

  fetchMiradores: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await miradoresService.getAll(params);
      set({
        miradores: response.data,
        pagination: response.meta,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch miradores",
      });
    }
  },

  fetchMiradorById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const mirador = await miradoresService.getById(id);
      set({
        currentMirador: mirador,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch mirador",
      });
    }
  },

  createMirador: async (data: CreateMiradorData) => {
    set({ isLoading: true, error: null });
    try {
      const mirador = await miradoresService.create(data);
      const { miradores } = get();
      set({
        miradores: [mirador, ...miradores],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create mirador",
      });
      throw error;
    }
  },

  updateMirador: async (id: string, data: Partial<CreateMiradorData>) => {
    set({ isLoading: true, error: null });
    try {
      const mirador = await miradoresService.update(id, data);
      const { miradores } = get();
      const updatedMiradores = miradores.map((m) =>
        m.id === id ? mirador : m
      );
      set({
        miradores: updatedMiradores,
        currentMirador: mirador,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update mirador",
      });
      throw error;
    }
  },

  deleteMirador: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await miradoresService.delete(id);
      const { miradores } = get();
      const filteredMiradores = miradores.filter(
        (mirador) => mirador.id !== id
      );
      set({
        miradores: filteredMiradores,
        currentMirador: null,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete mirador",
      });
      throw error;
    }
  },

  searchMiradores: async (params: SearchParams) => {
    set({ isLoading: true, error: null });
    try {
      const response = await miradoresService.search(params);
      set({
        miradores: response.data,
        pagination: response.meta,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to search miradores",
      });
    }
  },

  getNearbyMiradores: async (params: NearbyParams) => {
    set({ isLoading: true, error: null });
    try {
      const miradores = await miradoresService.getNearby(params);
      set({
        miradores,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to fetch nearby miradores",
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentMirador: () => {
    set({ currentMirador: null });
  },
}));
