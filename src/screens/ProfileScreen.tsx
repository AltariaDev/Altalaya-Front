import ProfileHeader from "@/components/Pages/ProfileScreen/ProfileHeader";
import ProfilePosts from "@/components/Pages/ProfileScreen/ProfilePosts";
import ProfileStats from "@/components/Pages/ProfileScreen/ProfileStats";
import { useProfileAnimations } from "@/components/Pages/ProfileScreen/useProfileAnimations";
import { useUser } from "@/store/userStore";
import { colors } from "@/utils/theme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ProfileScreen() {
  const user = useUser();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    headerAnimatedStyle,
    avatarAnimatedStyle,
    statsAnimatedStyle,
    contentAnimatedStyle,
    postAnimatedStyles,
  } = useProfileAnimations();

  const handleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Usuario no encontrado</Text>
      </View>
    );
  }

  return (
    <AnimatedScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        headerAnimatedStyle={headerAnimatedStyle}
        avatarAnimatedStyle={avatarAnimatedStyle}
      />

      <ProfileStats statsAnimatedStyle={statsAnimatedStyle} />

      <ProfilePosts
        viewMode={viewMode}
        onViewModeChange={handleViewMode}
        contentAnimatedStyle={contentAnimatedStyle}
        postAnimatedStyles={postAnimatedStyles}
      />
    </AnimatedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  errorText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
