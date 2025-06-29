import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMiradorDetail } from "./useMiradorDetail";

interface SocialActionsProps {
  isLoadingSocial: boolean;
}

export default function SocialActions({ isLoadingSocial }: SocialActionsProps) {
  const {
    isLiked,
    isFavorited,
    likesCount,
    commentsCount,
    handleLike,
    handleFavorite,
  } = useMiradorDetail();

  return (
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

      <TouchableOpacity style={styles.iconButton}>
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
        <Text style={[styles.iconText, isFavorited && styles.favoritedText]}>
          {isFavorited ? "Guardado" : "Guardar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
