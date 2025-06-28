import { useMiradores } from "@/store/miradoresStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../../../utils/theme";
import ProfilePostCard from "./ProfilePostCard";

interface ProfilePostsProps {
  viewMode: "grid" | "list";
  onViewModeChange: () => void;
  contentAnimatedStyle: any;
  postAnimatedStyles: any[];
}

const EmptyMiradores = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <Ionicons name="camera-outline" size={64} color={colors.text.secondary} />
    </View>
    <Text style={styles.emptyTitle}>No tienes miradores aún</Text>
    <Text style={styles.emptySubtitle}>
      Comparte tus vistas favoritas con la comunidad
    </Text>
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => router.push("/CreateMirador")}
    >
      <Ionicons name="add" size={20} color={colors.background.primary} />
      <Text style={styles.createButtonText}>Crear mi primer mirador</Text>
    </TouchableOpacity>
  </View>
);

export default function ProfilePosts({
  viewMode,
  onViewModeChange,
  contentAnimatedStyle,
  postAnimatedStyles,
}: ProfilePostsProps) {
  const miradores = useMiradores();
  const userPosts = miradores.slice(0, 6);

  return (
    <Animated.View style={[styles.content, contentAnimatedStyle]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis Miradores</Text>
        {userPosts.length > 0 && (
          <TouchableOpacity onPress={onViewModeChange}>
            <Ionicons
              name={viewMode === "grid" ? "grid-outline" : "list-outline"}
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {userPosts.length === 0 ? (
        <EmptyMiradores />
      ) : (
        <View
          style={[styles.postsGrid, viewMode === "list" && styles.postsList]}
        >
          {userPosts.map((post, index) => (
            <ProfilePostCard
              key={post.id}
              post={post}
              viewMode={viewMode}
              animatedStyle={postAnimatedStyles[index]}
            />
          ))}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  postsList: {
    flexDirection: "column",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  createButtonText: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
