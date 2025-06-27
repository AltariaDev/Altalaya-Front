import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favoriteMiradores: string[];
  toggleFavorite: (miradorKey: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteMiradores: [],

      toggleFavorite: (miradorKey) =>
        set((state) => {
          const isFavorite = state.favoriteMiradores.includes(miradorKey);
          return {
            favoriteMiradores: isFavorite
              ? state.favoriteMiradores.filter((key) => key !== miradorKey)
              : [...state.favoriteMiradores, miradorKey],
          };
        }),
    }),
    {
      name: "altalaya-favorites",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteMiradores: state.favoriteMiradores,
      }),
    }
  )
);

export const useFavoriteMiradores = () =>
  useFavoritesStore((state) => state.favoriteMiradores);
