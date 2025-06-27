import { useErrorHandler } from "@/hooks/useErrorHandler";
import { miradoresService } from "@/services/miradores";
import { Mirador } from "@/types/mirador";
import { useCallback, useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Mirador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { handleError } = useErrorHandler();

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await miradoresService.getFavoriteMiradores();
      setFavorites(data);
    } catch (error) {
      handleError(error as string | Error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadFavorites();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `Hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    return "Hace un momento";
  };

  return {
    favorites,
    isLoading,
    isRefreshing,
    handleRefresh,
    timeAgo,
  };
}
