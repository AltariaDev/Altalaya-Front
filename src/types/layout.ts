// ============================================================================
// LAYOUT TYPES
// ============================================================================

export interface TopbarProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

export type TabPath =
  | "/"
  | "/Search"
  | "/CreateMirador"
  | "/Notifications"
  | "/Profile"
  | "/MapMiradores"
  | "/Favorites"
  | "/Explore"
  | "/Favorites"
  | "/Profile";
