// import { MiradorType } from "data/Mirdaores";
// import { create } from "zustand";

// interface MiradoresState {
//   miradores: Mirador[];
//   currentMirador: Mirador | null;
//   isLoading: boolean;
//   error: string | null;
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   } | null;

//   // Actions
//   fetchMiradores: (params?: { page?: number; limit?: number }) => Promise<void>;
//   fetchMiradorById: (id: string) => Promise<void>;
//   createMirador: (data: CreateMiradorData) => Promise<void>;
//   updateMirador: (
//     id: string,
//     data: Partial<CreateMiradorData>
//   ) => Promise<void>;
//   deleteMirador: (id: string) => Promise<void>;
//   searchMiradores: (params: SearchParams) => Promise<void>;
//   getNearbyMiradores: (params: NearbyParams) => Promise<void>;
//   clearError: () => void;
//   clearCurrentMirador: () => void;
// }

// export const useMiradoresStore = create<MiradoresState>((set, get) => ({
//   miradores: [],
//   currentMirador: null,
//   isLoading: false,
//   error: null,
//   pagination: null,

//   fetchMiradores: async (params) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await miradoresService.getAll(params);
//       set({
//         miradores: response.data,
//         pagination: response.meta,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to fetch miradores",
//       });
//     }
//   },

//   fetchMiradorById: async (id: string) => {
//     set({ isLoading: true, error: null });
//     try {
//       const mirador = await miradoresService.getById(id);
//       set({
//         currentMirador: mirador,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to fetch mirador",
//       });
//     }
//   },

//   createMirador: async (data: CreateMiradorData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const mirador = await miradoresService.create(data);
//       const { miradores } = get();
//       set({
//         miradores: [mirador, ...miradores],
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to create mirador",
//       });
//       throw error;
//     }
//   },

//   updateMirador: async (id: string, data: Partial<CreateMiradorData>) => {
//     set({ isLoading: true, error: null });
//     try {
//       const mirador = await miradoresService.update(id, data);
//       const { miradores } = get();
//       const updatedMiradores = miradores.map((m) =>
//         m.id === id ? mirador : m
//       );
//       set({
//         miradores: updatedMiradores,
//         currentMirador: mirador,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to update mirador",
//       });
//       throw error;
//     }
//   },

//   loadMiradores: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await miradoresService.getAll();

//       const transformedMiradores: MiradorType[] = response.data.map(
//         (mirador: Mirador) => ({
//           key: mirador.id,
//           title: mirador.title,
//           description: mirador.description,
//           image:
//             mirador.image_url ||
//             "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
//           coordinate: {
//             latitude: mirador.latitude,
//             longitude: mirador.longitude,
//           },
//           city: mirador.city,
//           country: mirador.country,
//           views: 0, // Backend doesn't provide views yet
//           comments: 0, // Backend doesn't provide comments yet
//           likes: 0, // Backend doesn't provide likes yet
//         })
//       );
//       set({ miradores: transformedMiradores, isLoading: false });
//     } catch (error) {
//       console.error("Error loading miradores:", error);
//       set({
//         error: "Error al cargar los miradores",
//         isLoading: false,
//       });
//     }
//   },

//   deleteMirador: async (id: string) => {
//     set({ isLoading: true, error: null });
//     try {
//       await miradoresService.delete(id);
//       const { miradores } = get();
//       const filteredMiradores = miradores.filter(
//         (mirador) => mirador.id !== id
//       );
//       set({
//         miradores: filteredMiradores,
//         currentMirador: null,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to delete mirador",
//       });
//       throw error;
//     }
//   },

//   searchMiradores: async (params: SearchParams) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await miradoresService.search(params);
//       set({
//         miradores: response.data,
//         pagination: response.meta,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Failed to search miradores",
//       });
//     }
//   },

//   getNearbyMiradores: async (params: NearbyParams) => {
//     set({ isLoading: true, error: null });
//     try {
//       const miradores = await miradoresService.getNearby(params);
//       set({
//         miradores,
//         isLoading: false,
//       });
//     } catch (error: any) {
//       set({
//         isLoading: false,
//         error:
//           error.response?.data?.message || "Failed to fetch nearby miradores",
//       });
//     }
//   },

//   clearError: () => {
//     set({ error: null });
//   },

//   clearCurrentMirador: () => {
//     set({ currentMirador: null });
//   },
// }));

// export const useMiradores = () => useMiradoresStore((state) => state.miradores);
