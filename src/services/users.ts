import api from "./api";

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatar_url?: string;
}

export interface FollowData {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
}

export const usersService = {
  // Get user profile
  async getProfile(userId: string): Promise<User> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<User> {
    try {
      const response = await api.put("/users/profile", data);
      return response.data;
    } catch {
      throw new Error("Failed to update user");
    }
  },

  // Follow user
  async follow(userId: string): Promise<{ message: string }> {
    const response = await api.post(`/users/follow/${userId}`);
    return response.data;
  },

  // Unfollow user
  async unfollow(userId: string): Promise<{ message: string }> {
    const response = await api.delete(`/users/unfollow/${userId}`);
    return response.data;
  },

  // Check if following user
  async isFollowing(userId: string): Promise<boolean> {
    try {
      const response = await api.get(`/users/following/${userId}/check`);
      return response.data.following;
    } catch {
      return false;
    }
  },

  // Get user's followers
  async getFollowers(
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    data: FollowData[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get(`/users/${userId}/followers`, { params });
    return response.data;
  },

  // Get user's following
  async getFollowing(
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    data: FollowData[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get(`/users/${userId}/following`, { params });
    return response.data;
  },

  // Search users
  async searchUsers(
    query: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    data: User[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get("/users/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },
};
