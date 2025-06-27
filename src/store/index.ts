import { Notification } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationsService } from "../services/notifications";

interface AppStateLocal {
  favoriteMiradores: string[];

  notifications: Notification[];
  unreadCount: number;
  notificationsLoading: boolean;

  language: "es" | "en" | "fr";

  isLoading: boolean;
  error: string | null;

  toggleFavorite: (miradorKey: string) => void;
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  setLanguage: (language: "es" | "en" | "fr") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStateLocal>()(
  persist(
    (set, get) => ({
      favoriteMiradores: [],
      notifications: [],
      unreadCount: 0,
      notificationsLoading: false,
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

      fetchNotifications: async () => {
        set({ notificationsLoading: true });
        try {
          const notifications = await notificationsService.getNotifications();
          const unreadCount = notifications.filter((n) => !n.read).length;
          set({ notifications, unreadCount, notificationsLoading: false });
        } catch (error) {
          console.error("Error fetching notifications:", error);
          set({ notificationsLoading: false });
        }
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),

      markNotificationAsRead: async (id) => {
        try {
          await notificationsService.markAsRead(id);
          set((state) => ({
            notifications: state.notifications.map((notif) =>
              notif.id === id ? { ...notif, read: true } : notif
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          }));
        } catch (error) {
          console.error("Error marking notification as read:", error);
        }
      },

      markAllNotificationsAsRead: async () => {
        try {
          await notificationsService.markAllAsRead();
          set((state) => ({
            notifications: state.notifications.map((notif) => ({
              ...notif,
              read: true,
            })),
            unreadCount: 0,
          }));
        } catch (error) {
          console.error("Error marking all notifications as read:", error);
        }
      },

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
export const useNotificationsLoading = () =>
  useAppStore((state) => state.notificationsLoading);
export const useLanguage = () => useAppStore((state) => state.language);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);

// Export actions
export const {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = useAppStore.getState();
