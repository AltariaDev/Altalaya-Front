import { useUserStore } from "@/store/userStore";
import { FollowData, UpdateProfileData, User, UserSearchParams } from "@/types";
import api from "./api";

export const usersService = {
  async getProfileByUserId(userId: string): Promise<User> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  async updateMyProfile(data: UpdateProfileData): Promise<User> {
    try {
      const response = await api.put("/users/profile", data);

      const { updateUser } = useUserStore.getState().actions;
      updateUser({
        ...response.data,
        avatarUrl: response.data.avatarUrl || "",
      });

      return response.data;
    } catch {
      throw new Error("Failed to update user");
    }
  },

  async followUserById(userId: string): Promise<{ message: string }> {
    const response = await api.post(`/users/follow/${userId}`);
    return response.data;
  },

  async unfollowUserById(userId: string): Promise<{ message: string }> {
    const response = await api.delete(`/users/unfollow/${userId}`);
    return response.data;
  },

  // async isFollowing(userId: string): Promise<boolean> {
  //   try {
  //     const response = await api.get(`/users/following/${userId}/check`);
  //     return response.data.following;
  //   } catch {
  //     return false;
  //   }
  // },

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

  async searchUsers(params: UserSearchParams): Promise<{
    data: User[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const response = await api.get("/users/search", { params });
    return response.data;
  },
};
