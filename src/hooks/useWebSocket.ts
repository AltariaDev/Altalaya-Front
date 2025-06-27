import { websocketService } from "@/services/websocket";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

export const useWebSocket = () => {
  const { isAuthenticated } = useAuthStore();
  const unsubscribeRefs = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      websocketService.connect();
    } else {
      websocketService.disconnect();
    }

    return () => {
      websocketService.disconnect();
      unsubscribeRefs.current.forEach((unsubscribe) => unsubscribe());
      unsubscribeRefs.current = [];
    };
  }, [isAuthenticated]);

  const subscribe = (type: string, callback: (data: any) => void) => {
    const unsubscribe = websocketService.subscribe(type, callback);
    unsubscribeRefs.current.push(unsubscribe);
    return unsubscribe;
  };

  const send = (type: string, data: any) => {
    websocketService.send(type, data);
  };

  return { subscribe, send };
};
