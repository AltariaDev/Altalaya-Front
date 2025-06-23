import api from "./api";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "like" | "comment" | "follow" | "favorite" | "system";
  read: boolean;
  data?: {
    mirador_id?: string;
    comment_id?: string;
    user_id?: string;
  };
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const notificationsService = {
  // Get user notifications
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    unread_only?: boolean;
  }): Promise<PaginatedResponse<Notification>> {
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<Notification> {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<{ message: string }> {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  // Delete notification
  async delete(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const response = await api.get("/notifications/unread-count");
    return response.data.count;
  },
};
