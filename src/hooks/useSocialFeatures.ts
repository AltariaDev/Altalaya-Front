import { Comment, miradoresService } from "@/services/miradores";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    loadMiradorData();
    loadComments();
  }, [miradorId]);

  const loadMiradorData = async () => {
    try {
      const mirador = await miradoresService.getMiradorById(miradorId);
      setIsLiked(mirador.isLiked || false);
      setIsFavorited(mirador.isFavorited || false);
      setLikesCount(mirador.likesCount || 0);
      setCommentsCount(mirador.commentsCount || 0);
    } catch (error) {
      handleError(error);
    }
  };

  const loadComments = async () => {
    try {
      setIsLoadingComments(true);
      const commentsData = await miradoresService.getComments(miradorId);
      setComments(commentsData);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoadingComments(false);
    }
  };

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
      handleError(error);
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
      handleError(error);
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
      handleError(error);
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
