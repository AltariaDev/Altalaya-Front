import { Mirador } from "./mirador";
import { Notification } from "./notification";
import { User } from "./user";

// ============================================================================
// STORE TYPES
// ============================================================================

export interface AppState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface MiradoresState {
  miradores: Mirador[];
  favorites: Mirador[];
  loading: boolean;
  error: string | null;
  fetchMiradores: () => Promise<void>;
  addToFavorites: (mirador: Mirador) => void;
  removeFromFavorites: (miradorId: string) => void;
  toggleLike: (miradorId: string) => void;
}
