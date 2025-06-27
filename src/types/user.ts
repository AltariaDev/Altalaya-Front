// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  posts: number;
  followers: FollowData[];
  following: FollowData[];
}

export interface UpdateProfileData {
  username?: string;
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface FollowData {
  id: string;
  createdAt: string;
}

export interface UserSearchParams {
  query: string;
  page?: number;
  limit?: number;
}
