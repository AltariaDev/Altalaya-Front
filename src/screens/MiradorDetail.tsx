import { Mirador } from "@/services/miradores";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
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
  const { mirador } = useLocalSearchParams();
  const miradorData: Mirador = JSON.parse(mirador as string);
  const currentUser = useUser();
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const {
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
  } = useSocialFeatures(miradorData.id);

  const isOwner = currentUser?.id === miradorData.user.id;

  const handleEdit = () => {
    router.push({
      pathname: "/CreateMirador",
      params: {
        mirador: JSON.stringify(miradorData),
        isEditing: "true",
      },
    });
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    try {
      await handleComment(commentText.trim());
      setCommentText("");
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el comentario");
    }
  };

  const timeAgo = () => {
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={!commentText.trim() || isLoading}
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
