// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatarUrl?: string;
  };
  type: "like" | "comment" | "follow";
  from_user: {
    id: string;
    username: string;
    name: string;
    avatarUrl?: string;
  };
  mirador?: {
    id: string;
    title: string;
    imageUrl: string;
  };
  read: boolean;
  created_at: string;
}

export interface NotificationUser {
  name: string;
  avatar: string;
}

export interface NotificationPost {
  title: string;
  image: string;
}
