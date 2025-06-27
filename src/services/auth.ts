import { AuthResponse, LoginData, RegisterData, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    const { access_token } = response.data;

    const cookies = response.headers["set-cookie"];
    let cookieToken = access_token;

    if (cookies) {
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.includes("access_token=")
      );
      if (accessTokenCookie) {
        const tokenMatch = accessTokenCookie.match(/access_token=([^;]+)/);
        if (tokenMatch) {
          cookieToken = tokenMatch[1];
        }
      }
    }

    await AsyncStorage.setItem("authToken", cookieToken);

    return { access_token: cookieToken };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    const { access_token } = response.data;

    const cookies = response.headers["set-cookie"];
    let cookieToken = access_token;

    if (cookies) {
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.includes("access_token=")
      );
      if (accessTokenCookie) {
        const tokenMatch = accessTokenCookie.match(/access_token=([^;]+)/);
        if (tokenMatch) {
          cookieToken = tokenMatch[1];
        }
      }
    }

    await AsyncStorage.setItem("authToken", cookieToken);

    return { access_token: cookieToken };
  },

  async getCurrentUser(): Promise<User> {
    const userData = await AsyncStorage.getItem("user");

    if (userData) {
      return JSON.parse(userData);
    }

    const response = await api.get("/users/profile/me");
    const user = response.data;

    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return !!token;
    } catch {
      throw new Error("Failed to check authentication");
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch {
      throw new Error("Failed to get token");
    }
  },
};
