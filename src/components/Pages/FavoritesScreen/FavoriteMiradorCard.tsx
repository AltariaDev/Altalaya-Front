import { FavoriteMiradorCardProps } from "@/types";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FavoriteMiradorCard({
  mirador,
  timeAgo,
}: FavoriteMiradorCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/MiradorDetail",
      params: { mirador: JSON.stringify(mirador) },
    });
  };

  const handleUserPress = () => {
    router.push({
      pathname: "/UserDetail",
      params: { id: mirador.user.id },
    });
  };
  return (
    <TouchableOpacity style={styles.miradorCard} onPress={handlePress}>
      <Image source={{ uri: mirador.imageUrl }} style={styles.miradorImage} />
      <View style={styles.miradorInfo}>
        <Text style={styles.miradorTitle}>{mirador.title}</Text>
        <Text style={styles.miradorLocation}>
          {mirador.city}, {mirador.country}
        </Text>
        <TouchableOpacity onPress={handleUserPress} style={styles.miradorMeta}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri:
                  mirador.user.avatarUrl ||
                  `https://i.pravatar.cc/150?u=${mirador.user.id}`,
              }}
              style={styles.userAvatar}
            />
            <Text style={styles.username}>{mirador.user.username}</Text>
          </View>
          <Text style={styles.timeAgo}>{timeAgo(mirador.createdAt)}</Text>
        </TouchableOpacity>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="heart" size={16} color={colors.primary} />
            <Text style={styles.statText}>{mirador.likesCount || 0}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={colors.text.secondary}
            />
            <Text style={styles.statText}>{mirador.commentsCount || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  miradorCard: {
    backgroundColor: colors.background.secondary,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  miradorImage: {
    width: "100%",
    height: 200,
  },
  miradorInfo: {
    padding: 16,
  },
  miradorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  miradorLocation: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  miradorMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: "500",
  },
  timeAgo: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
