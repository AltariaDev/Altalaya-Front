import { LocationState } from "./location";
import { Mirador } from "./mirador";
import { SearchType } from "./search";
import { User } from "./user";

// ============================================================================
// PROFILE SCREEN TYPES
// ============================================================================

export interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
}

export interface ProfileStatsProps {
  posts: number;
  followers: number;
  following: number;
}

export interface ProfilePostsProps {
  posts: any[];
  onPostPress: (post: any) => void;
}

export interface ProfilePostCardProps {
  post: any;
  onPress: () => void;
}

// ============================================================================
// CREATE MIRADOR SCREEN TYPES
// ============================================================================

export interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
}

export interface LocationPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
  initialLocation?: { latitude: number; longitude: number };
}

export interface ImagePickerProps {
  onImageSelect: (imageUri: string) => void;
  selectedImage?: string;
  multiple?: boolean;
  maxImages?: number;
  images: string[];
  onPickImage: () => void;
  onRemoveImage: (index: number) => void;
}

export interface CreateMiradorHeaderProps {
  onBack: () => void;
  onSave: () => void;
  loading?: boolean;
  isEditMode: boolean;
  isLoading: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
}

// ============================================================================
// MAP SCREEN TYPES
// ============================================================================

export interface MapViewComponentProps {
  miradores: Mirador[];
  onMiradorPress: (mirador: Mirador) => void;
  userLocation?: LocationState;
}

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export interface UseMapEffectsProps {
  miradores: Mirador[];
  onMiradorPress: (mirador: Mirador) => void;
}

export interface UseMapRegionProps {
  initialRegion?: LocationState;
  userLocation?: LocationState;
}

// ============================================================================
// FAVORITES SCREEN TYPES
// ============================================================================

export interface FavoriteMiradorCardProps {
  mirador: Mirador;
  onPress: () => void;
  onRemove: () => void;
  timeAgo: (dateString: string) => string;
}

export interface FavoritesHeaderProps {
  title: string;
  subtitle?: string;
  favoritesCount: number;
}

// ============================================================================
// EXPLORE SCREEN TYPES
// ============================================================================

export interface SearchBarProps {
  onSearch?: (query: string, type: SearchType) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  placeholder?: string;
}

export interface PopularSearchProps {
  onSearch?: (query: string, type: SearchType) => void;
  searchType: SearchType;
}
