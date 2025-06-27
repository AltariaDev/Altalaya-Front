import { Notification } from "../types";

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Ahora";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  return `${Math.floor(diffInSeconds / 86400)}d`;
};

export const getNotificationText = (notification: Notification): string => {
  switch (notification.type) {
    case "like":
      return "le gustó tu mirador";
    case "comment":
      return "comentó en tu mirador";
    case "follow":
      return "empezó a seguirte";
    default:
      return "interactuó contigo";
  }
};

export const getNotificationIcon = (type: Notification["type"]): string => {
  switch (type) {
    case "like":
      return "heart";
    case "comment":
      return "chatbubble";
    case "follow":
      return "person-add";
    default:
      return "notifications";
  }
};
