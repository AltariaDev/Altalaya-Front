// ============================================================================
// WEBSOCKET TYPES
// ============================================================================

export interface WebSocketMessage {
  type: string;
  data: any;
}

export interface WebSocketCallbacks {
  [key: string]: (data: any) => void;
}
