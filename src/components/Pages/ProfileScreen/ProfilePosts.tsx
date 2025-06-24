import { useMiradores } from "@/store/miradoresStore";
import { Ionicons } from "@expo/vector-icons";
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
        <TouchableOpacity onPress={onViewModeChange}>
          <Ionicons
            name={viewMode === "grid" ? "grid-outline" : "list-outline"}
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.postsGrid, viewMode === "list" && styles.postsList]}>
        {userPosts.map((post, index) => (
          <ProfilePostCard
            key={post.id}
            post={post}
            viewMode={viewMode}
            animatedStyle={postAnimatedStyles[index]}
          />
        ))}
      </View>
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
});
