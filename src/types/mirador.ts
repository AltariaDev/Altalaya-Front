// ============================================================================
// MIRADOR TYPES
// ============================================================================

export interface Mirador {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isFavorited?: boolean;
}

// Legacy type from data file
export interface MiradorType {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  views: number;
  image: string;
  key: string;
  title: string;
  description?: string;
  city: string;
  country: string;
  comments: number;
  likes: number;
}

export interface CreateMiradorData {
  title: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export interface UpdateMiradorData {
  title?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
}
