// ============================================================================
// COMMENT TYPES
// ============================================================================

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

export interface CreateCommentData {
  content: string;
}
