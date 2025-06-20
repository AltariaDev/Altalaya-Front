import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { miradores, MiradorType } from "../../data/Mirdaores";

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  avatar: string;
  followers: string;
  following: string;
  posts: number;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  user: {
    name: string;
    avatar: string;
  };
  post?: {
    title: string;
    image: string;
  };
  comment?: string;
  time: string;
  read: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;

  miradores: MiradorType[];
  favoriteMiradores: string[];

  notifications: Notification[];
  unreadCount: number;

  language: "es" | "en" | "fr";

  isLoading: boolean;
  error: string | null;

  setUser: (user: User) => void;
  logout: () => void;
  addMirador: (mirador: MiradorType) => void;
  updateMirador: (key: string, updates: Partial<MiradorType>) => void;
  deleteMirador: (key: string) => void;
  toggleFavorite: (miradorKey: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  setLanguage: (language: "es" | "en" | "fr") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const initialUser: User = {
  id: "1",
  name: "Alex Johnson",
  username: "@alexj",
  bio: "Fotógrafo y explorador de miradores urbanos. Compartiendo las mejores vistas de la ciudad.",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/300?img=12",
  followers: "2.4k",
  following: "1.2k",
  posts: 48,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: initialUser,
      isAuthenticated: true,
      miradores: miradores,
      favoriteMiradores: [],
      notifications: [],
      unreadCount: 0,
      language: "es",
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          notifications: [],
          unreadCount: 0,
          favoriteMiradores: [],
        }),

      addMirador: (mirador) =>
        set((state) => ({
          miradores: [...state.miradores, mirador],
        })),

      updateMirador: (key, updates) =>
        set((state) => ({
          miradores: state.miradores.map((mirador) =>
            mirador.key === key ? { ...mirador, ...updates } : mirador
          ),
        })),

      deleteMirador: (key) =>
        set((state) => ({
          miradores: state.miradores.filter((mirador) => mirador.key !== key),
          favoriteMiradores: state.favoriteMiradores.filter(
            (fav) => fav !== key
          ),
        })),

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
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        favoriteMiradores: state.favoriteMiradores,
        notifications: state.notifications,
        language: state.language,
      }),
    }
  )
);

export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated);
export const useMiradores = () => useAppStore((state) => state.miradores);
export const useFavoriteMiradores = () =>
  useAppStore((state) => state.favoriteMiradores);
export const useNotifications = () =>
  useAppStore((state) => state.notifications);
export const useUnreadCount = () => useAppStore((state) => state.unreadCount);
export const useLanguage = () => useAppStore((state) => state.language);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
