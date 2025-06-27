import { useCallback, useEffect } from "react";
import { fetchNotifications, useNotifications, useUnreadCount } from "../store";

export const useNotificationsHook = () => {
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();

  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, []);

  useEffect(() => {
    // Fetch notifications when the hook is first used
    refreshNotifications();
  }, [refreshNotifications]);

  return {
    notifications,
    unreadCount,
    refreshNotifications,
    loading: false, // This will be managed by the store
  };
};
