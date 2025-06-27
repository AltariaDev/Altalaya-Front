import { miradoresService } from "@/services/miradores";
import { Comment } from "@/types/comment";
import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "./useErrorHandler";

export const useSocialFeatures = (miradorId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { handleError } = useErrorHandler();

  const loadMiradorData = useCallback(async () => {
    try {
      const mirador = await miradoresService.getMiradorById(miradorId);
      setIsLiked(mirador.isLiked || false);
      setIsFavorited(mirador.isFavorited || false);
      setLikesCount(mirador.likesCount || 0);
      setCommentsCount(mirador.commentsCount || 0);
    } catch (error) {
      handleError(error as string | Error);
    }
  }, [miradorId, handleError]);

  const loadComments = useCallback(async () => {
    try {
      setIsLoadingComments(true);
      const commentsData = await miradoresService.getComments(miradorId);
      setComments(commentsData);
      setCommentsCount(commentsData.length || 0);
    } catch (error) {
      handleError(error as string | Error);
    } finally {
      setIsLoadingComments(false);
    }
  }, [miradorId, handleError]);

  useEffect(() => {
    loadMiradorData();
    loadComments();
  }, [loadMiradorData, loadComments]);

  const handleLike = async () => {
    try {
      setIsLoading(true);
      if (isLiked) {
        await miradoresService.unlikeMirador(miradorId);
        setLikesCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await miradoresService.likeMirador(miradorId);
        setLikesCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      handleError(error as string | Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      setIsLoading(true);
      if (isFavorited) {
        await miradoresService.unfavoriteMirador(miradorId);
        setIsFavorited(false);
      } else {
        await miradoresService.favoriteMirador(miradorId);
        setIsFavorited(true);
      }
    } catch (error) {
      handleError(error as string | Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComment = async (content: string) => {
    try {
      setIsLoading(true);
      const newComment = await miradoresService.createComment(miradorId, {
        content,
      });
      setComments((prev) => [newComment, ...prev]);
      setCommentsCount((prev) => prev + 1);
      return newComment;
    } catch (error) {
      handleError(error as string | Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    isFavorited,
    likesCount,
    commentsCount,
    comments,
    isLoading,
    isLoadingComments,
    handleLike,
    handleFavorite,
    handleComment,
    loadComments,
  };
};
