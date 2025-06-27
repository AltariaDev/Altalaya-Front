import { miradoresService } from "@/services/miradores";
import { CreateMiradorData, Mirador, UpdateMiradorData } from "@/types/mirador";
import { NearbyParams, SearchParams } from "@/types/search";
import { create } from "zustand";

interface MiradoresStateLocal {
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

  actions: {
    fetchMiradores: (params?: {
      page?: number;
      limit?: number;
    }) => Promise<void>;
    fetchMiradorById: (id: string) => Promise<void>;
    createMirador: (data: CreateMiradorData) => Promise<void>;
    updateMirador: (id: string, data: UpdateMiradorData) => Promise<void>;
    deleteMirador: (id: string) => Promise<void>;
    searchMiradores: (params: SearchParams) => Promise<void>;
    getNearbyMiradores: (params: NearbyParams) => Promise<void>;
    clearError: () => void;
    clearCurrentMirador: () => void;
    clearMiradores: () => void;
  };
}

export const useMiradoresStore = create<MiradoresStateLocal>((set, get) => ({
  miradores: [],
  currentMirador: null,
  isLoading: false,
  error: null,
  pagination: null,

  actions: {
    fetchMiradores: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const response = await miradoresService.getMiradores(params);
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
        const mirador = await miradoresService.getMiradorById(id);
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
        const mirador = await miradoresService.createMirador(data);
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

    updateMirador: async (id: string, data: UpdateMiradorData) => {
      set({ isLoading: true, error: null });
      try {
        const mirador = await miradoresService.updateMirador(id, data);
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
        await miradoresService.deleteMirador(id);
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
        const response = await miradoresService.searchMiradores(params);
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
        const response = await miradoresService.getNearbyMiradores(params);
        set({
          miradores: response.data,
          pagination: response.meta,
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

    clearMiradores: () => {
      set({ miradores: [], pagination: null });
    },
  },
}));

export const useMiradores = () => useMiradoresStore((state) => state.miradores);
export const useIsLoading = () => useMiradoresStore((state) => state.isLoading);
export const useError = () => useMiradoresStore((state) => state.error);
