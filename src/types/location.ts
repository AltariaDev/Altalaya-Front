// ============================================================================
// LOCATION TYPES
// ============================================================================

export interface LocationState {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface UseLocationReturn {
  location: LocationState | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}
