import { create } from "zustand";
import { authService } from "../services/auth";
import { useMiradoresStore } from "./miradoresStore";
import { useUserStore } from "./userStore";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  actions: {
    login: (email: string, password: string) => Promise<void>;
    register: (data: {
      username: string;
      email: string;
      password: string;
      bio?: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    clearError: () => void;
  };
}
const { setUser } = useUserStore.getState().actions;
const { clearMiradores } = useMiradoresStore.getState().actions;

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  actions: {
    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        await authService.login({ email, password });
        const user = await authService.getCurrentUser();

        setUser(user);

        set({
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.response?.data?.message || "Login failed",
        });
        throw error;
      }
    },

    register: async (data) => {
      set({ isLoading: true, error: null });
      try {
        await authService.register(data);
        const user = await authService.getCurrentUser();

        setUser(user);

        set({
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.response?.data?.message || "Registration failed",
        });
        throw error;
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await authService.logout();
        setUser(null);
        clearMiradores();
        set({
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      } catch {
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const isAuth = await authService.isAuthenticated();
        if (isAuth) {
          const user = await authService.getCurrentUser();
          setUser(user);
          set({
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setUser(null);
          set({
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch {
        setUser(null);
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },

    clearError: () => {
      set({ error: null });
    },
  },
}));

export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useError = () => useAuthStore((state) => state.error);
