import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsState {
  language: "es" | "en" | "fr";
  isLoading: boolean;
  error: string | null;
  setLanguage: (language: "es" | "en" | "fr") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "es",
      isLoading: false,
      error: null,

      setLanguage: (language) => set({ language }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "altalaya-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
);

export const useLanguage = () => useSettingsStore((state) => state.language);
export const useIsLoading = () => useSettingsStore((state) => state.isLoading);
export const useError = () => useSettingsStore((state) => state.error);
