import { Notification } from "@/types/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationsService } from "../services/notifications";

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  notificationsLoading: boolean;
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      notificationsLoading: false,

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
    }),
    {
      name: "altalaya-notifications",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        notifications: state.notifications,
      }),
    }
  )
);

export const useNotifications = () =>
  useNotificationsStore((state) => state.notifications);
export const useUnreadCount = () =>
  useNotificationsStore((state) => state.unreadCount);
export const useNotificationsLoading = () =>
  useNotificationsStore((state) => state.notificationsLoading);

// Export actions
export const {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = useNotificationsStore.getState();
