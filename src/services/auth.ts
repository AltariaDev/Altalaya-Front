import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export const authService = {
  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    const { user, access_token } = response.data;

    // Store token and user data
    await AsyncStorage.setItem("authToken", access_token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },

  // Register user
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    const { user, access_token } = response.data;

    // Store token and user data
    await AsyncStorage.setItem("authToken", access_token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    const response = await api.get("/auth/me");
    const user = response.data;

    // Update stored user data
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  // Logout user
  async logout(): Promise<void> {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
  },

  // Get stored user data
  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting stored user:", error);
      return null;
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return !!token;
    } catch {
      throw new Error("Failed to check authentication");
    }
  },

  // Get auth token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch {
      throw new Error("Failed to get token");
    }
  },
};
