import { authService } from "@/services/auth";
import { User } from "@/services/users";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  actions: {
    setUser: (user: User | null) => void;
    updateUser: (user: User) => void;
    loadUser: () => Promise<void>;
  };
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  actions: {
    setUser: (user) => set({ user }),
    updateUser: (user) => {
      set({
        user: {
          ...user,
          avatarUrl: user.avatarUrl ?? "https://i.pravatar.cc/300?img=12",
        },
      });
    },
    loadUser: async () => {
      const user = await authService.getCurrentUser();

      set({
        user: {
          id: user.id,
          name: user.username,
          username: user.username,
          avatarUrl: user.avatarUrl ?? "https://i.pravatar.cc/300?img=12",
          followers: user.followers,
          following: user.following,
          bio: user.bio ?? "",
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          posts: user.posts ?? 0,
        },
      });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
