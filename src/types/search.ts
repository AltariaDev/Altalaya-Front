// ============================================================================
// SEARCH & PAGINATION TYPES
// ============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
}

export interface NearbyParams extends PaginationParams {
  lat: number;
  lng: number;
  radius?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type SearchType = "miradores" | "users";
