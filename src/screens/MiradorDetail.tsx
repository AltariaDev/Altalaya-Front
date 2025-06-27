import { miradoresService } from "@/services/miradores";
import { Mirador } from "@/types/mirador";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Comments } from "../components/Comments";
import { useSocialFeatures } from "../hooks/useSocialFeatures";
import { useUser } from "../store/userStore";
import { colors } from "../utils/theme";

export default function MiradorDetail() {
  const { miradorId } = useLocalSearchParams();
  const [miradorData, setMiradorData] = useState<Mirador | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useUser();
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

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

  useEffect(() => {
    const fetchMirador = async () => {
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
    };

    fetchMirador();
  }, [miradorId]);

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
      Alert.alert("Error", "No se pudo enviar el comentario");
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando mirador...</Text>
      </View>
    );
  }

  if (error || !miradorData) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
        <Text style={styles.errorText}>
          {error || "No se pudo cargar el mirador"}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setIsLoading(true);
            setError(null);
            if (miradorId) {
              miradoresService
                .getMiradorById(miradorId as string)
                .then(setMiradorData)
                .catch(() => setError("No se pudo cargar el mirador"))
                .finally(() => setIsLoading(false));
            }
          }}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{miradorData.title}</Text>
          {isOwner && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons
                name="create-outline"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.locationRow}
          onPress={() => {
            router.push({
              pathname: "/MapMiradores",
              params: { mirador: JSON.stringify(miradorData) },
            });
          }}
        >
          <View style={styles.locationIconBox}>
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.text.primary}
            />
          </View>
          <View>
            <Text style={styles.locationCity}>{miradorData.city}</Text>
            <Text style={styles.locationPlace}>{miradorData.country}</Text>
          </View>
          <Text style={styles.timeAgo}>{timeAgo()}</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: miradorData.imageUrl }}
          style={styles.mainImage}
        />

        <TouchableOpacity
          style={styles.creatorRow}
          onPress={() => {
            router.push({
              pathname: "/UserDetail",
              params: { id: miradorData.user.id },
            });
          }}
        >
          <Image
            source={{
              uri:
                miradorData.user?.avatarUrl ||
                "https://i.pravatar.cc/300?img=12",
            }}
            style={styles.creatorAvatar}
          />
          <Text style={styles.creatorName}>{miradorData.user?.username}</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{miradorData.description}</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleLike}
            disabled={isLoadingSocial}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? colors.primary : colors.text.secondary}
            />
            <Text style={[styles.iconText, isLiked && styles.likedText]}>
              {likesCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowComments(!showComments)}
          >
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={styles.iconText}>{commentsCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleFavorite}
            disabled={isLoadingSocial}
          >
            <Ionicons
              name={isFavorited ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isFavorited ? colors.primary : colors.text.secondary}
            />
            <Text
              style={[styles.iconText, isFavorited && styles.favoritedText]}
            >
              {isFavorited ? "Guardado" : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>

        {showComments && (
          <View style={styles.commentsSection}>
            <Comments
              comments={comments}
              isLoading={isLoadingComments}
              onRefresh={loadComments}
            />
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
        style={styles.commentRow}
      >
        <Image
          source={{
            uri:
              currentUser?.avatarUrl ||
              `https://i.pravatar.cc/150?u=${currentUser?.id}`,
          }}
          style={styles.avatar}
        />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Añade un comentario..."
            placeholderTextColor={colors.text.secondary}
            style={styles.input}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !commentText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendComment}
            disabled={!commentText.trim() || isLoadingSocial}
          >
            <Ionicons
              name="send"
              size={20}
              color={
                commentText.trim() ? colors.text.primary : colors.text.secondary
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
    paddingHorizontal: 24,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  locationIconBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCity: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  locationPlace: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  timeAgo: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: "auto",
  },
  mainImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
  },
  description: {
    color: colors.text.primary,
    fontSize: 18,
    lineHeight: 26,
    paddingHorizontal: 24,
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 24,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  likedText: {
    color: colors.primary,
  },
  favoritedText: {
    color: colors.primary,
  },
  commentsSection: {
    marginBottom: 32,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.background.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  inputBox: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
    paddingVertical: 12,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: colors.background.secondary,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  editButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creatorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  creatorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  creatorName: {
    color: colors.text.primary,
  },
  creatorLabel: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
