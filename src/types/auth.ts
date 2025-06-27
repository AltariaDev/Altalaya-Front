// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
