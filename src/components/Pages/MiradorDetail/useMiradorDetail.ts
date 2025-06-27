import { miradoresService } from "@/services/miradores";
import { useMiradoresStore } from "@/store/miradoresStore";
import { Mirador } from "@/types/mirador";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSocialFeatures } from "../../../hooks/useSocialFeatures";
import { useUser } from "../../../store/userStore";

export function useMiradorDetail() {
  const { miradorId } = useLocalSearchParams();
  const { deleteMirador } = useMiradoresStore((state) => state.actions);
  const currentUser = useUser();

  const [miradorData, setMiradorData] = useState<Mirador | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const {
    isLiked,
    isFavorited,
    likesCount,
    commentsCount,
    comments,
    isLoading: isLoadingSocial,
    isLoadingComments,
    handleLike,
    handleFavorite,
    handleComment,
    loadComments,
  } = useSocialFeatures(miradorId as string);

  const isOwner = currentUser?.id === miradorData?.user.id;

  const fetchMirador = useCallback(async () => {
    if (!miradorId) {
      setError("ID de mirador no proporcionado");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await miradoresService.getMiradorById(miradorId as string);
      setMiradorData(data);
    } catch (err) {
      console.error("Error fetching mirador:", err);
      setError("No se pudo cargar el mirador");
    } finally {
      setIsLoading(false);
    }
  }, [miradorId]);

  useEffect(() => {
    fetchMirador();
  }, [fetchMirador]);

  const handleEdit = () => {
    if (!miradorData) return;

    router.push({
      pathname: "/CreateMirador",
      params: {
        mirador: JSON.stringify(miradorData),
        isEditing: "true",
      },
    });
  };

  const handleSendComment = async () => {
    if (!commentText.trim() || !miradorData) return;

    try {
      await handleComment(commentText.trim());
      setCommentText("");
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el comentario" + error);
    }
  };

  const timeAgo = () => {
    if (!miradorData) return "";

    const date = new Date(miradorData.createdAt);
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

  const handleRetry = () => {
    fetchMirador();
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar mirador",
      "¿Estás seguro de querer eliminar este mirador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteMirador(miradorId as string);
            router.push("/Explore");
          },
        },
      ]
    );
  };

  return {
    // Data
    miradorData,
    currentUser,
    isOwner,

    // Loading states
    isLoading,
    isLoadingSocial,
    isLoadingComments,

    // Error state
    error,

    // Form state
    commentText,
    setCommentText,

    // Social features
    isLiked,
    isFavorited,
    likesCount,
    commentsCount,
    comments,

    // Actions
    handleEdit,
    handleSendComment,
    handleLike,
    handleFavorite,
    loadComments,
    handleRetry,
    handleDelete,

    // Utilities
    timeAgo,
  };
}
