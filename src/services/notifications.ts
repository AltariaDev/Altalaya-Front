import { Notification } from "@/types";
import api from "./api";

export const notificationsService = {
  // Get all notifications for the current user
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get("/notifications");
    return response.data;
  },

  // Mark a notification as read
  async markAsRead(id: string): Promise<void> {
    await api.put(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await api.put("/notifications/mark-all-read");
  },
};
