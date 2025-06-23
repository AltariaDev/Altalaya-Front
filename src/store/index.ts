import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  post?: {
    title: string;
    image: string;
  };
  comment?: string;
  time: string;
  read: boolean;
}

interface AppState {
  favoriteMiradores: string[];

  notifications: Notification[];
  unreadCount: number;

  language: "es" | "en" | "fr";

  isLoading: boolean;
  error: string | null;

  toggleFavorite: (miradorKey: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  setLanguage: (language: "es" | "en" | "fr") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favoriteMiradores: [],
      notifications: [],
      unreadCount: 0,
      language: "es",
      isLoading: false,
      error: null,

      toggleFavorite: (miradorKey) =>
        set((state) => {
          const isFavorite = state.favoriteMiradores.includes(miradorKey);
          return {
            favoriteMiradores: isFavorite
              ? state.favoriteMiradores.filter((key) => key !== miradorKey)
              : [...state.favoriteMiradores, miradorKey],
          };
        }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notif) => ({
            ...notif,
            read: true,
          })),
          unreadCount: 0,
        })),

      setLanguage: (language) => set({ language }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "altalaya-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteMiradores: state.favoriteMiradores,
        notifications: state.notifications,
        language: state.language,
      }),
    }
  )
);

export const useFavoriteMiradores = () =>
  useAppStore((state) => state.favoriteMiradores);
export const useNotifications = () =>
  useAppStore((state) => state.notifications);
export const useUnreadCount = () => useAppStore((state) => state.unreadCount);
export const useLanguage = () => useAppStore((state) => state.language);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
