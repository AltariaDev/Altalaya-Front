import { Comment } from "./comment";

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface AuthGuardProps {
  children: React.ReactNode;
}

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export interface AnimatedViewProps {
  children: React.ReactNode;
  style?: any;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  distance?: number;
  isVisible: boolean;
}

export interface CommentsProps {
  miradorId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

export interface OptimizedImageProps {
  source: string;
  style?: any;
  placeholder?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

export interface AnimatedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
  disabled?: boolean;
  loading?: boolean;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export interface AnimatedPullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  refreshing?: boolean;
}

export interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
  variant?: "text" | "avatar" | "card" | "button";
}

export interface SkeletonListProps {
  count: number;
  itemHeight?: number;
  itemWidth?: number | string;
  spacing?: number;
  variant?: "text" | "avatar" | "card" | "button";
}

export interface SkeletonGridProps {
  rows: number;
  columns: number;
  itemHeight?: number;
  spacing?: number;
  variant?: "text" | "avatar" | "card" | "button";
}
