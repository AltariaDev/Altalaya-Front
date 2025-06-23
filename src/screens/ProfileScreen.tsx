import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useMiradores, useUser } from "../store";
import { colors } from "../utils/theme";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUser();
  const miradores = useMiradores();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter user's miradores (for now, just show all miradores)
  const userPosts = miradores.slice(0, 6); // Show first 6 as user posts

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const avatarScale = useSharedValue(0.8);
  const statsOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);

  // Create shared values for each post individually (max 6 posts)
  const post1Scale = useSharedValue(0.9);
  const post1Opacity = useSharedValue(0);
  const post2Scale = useSharedValue(0.9);
  const post2Opacity = useSharedValue(0);
  const post3Scale = useSharedValue(0.9);
  const post3Opacity = useSharedValue(0);
  const post4Scale = useSharedValue(0.9);
  const post4Opacity = useSharedValue(0);
  const post5Scale = useSharedValue(0.9);
  const post5Opacity = useSharedValue(0);
  const post6Scale = useSharedValue(0.9);
  const post6Opacity = useSharedValue(0);

  // Group post animations
  const postAnimations = [
    { scale: post1Scale, opacity: post1Opacity },
    { scale: post2Scale, opacity: post2Opacity },
    { scale: post3Scale, opacity: post3Opacity },
    { scale: post4Scale, opacity: post4Opacity },
    { scale: post5Scale, opacity: post5Opacity },
    { scale: post6Scale, opacity: post6Opacity },
  ];

  useEffect(() => {
    // Header animations
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });

    // Avatar animation
    avatarScale.value = withDelay(
      200,
      withSpring(1, { damping: 15, stiffness: 150 })
    );

    // Stats animations
    statsOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    // Content animations
    contentOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    contentTranslateY.value = withDelay(
      600,
      withSpring(0, { damping: 15, stiffness: 150 })
    );

    // Post animations in cascade
    postAnimations.forEach((animation, index) => {
      animation.opacity.value = withDelay(
        800 + index * 100,
        withTiming(1, { duration: 600 })
      );
      animation.scale.value = withDelay(
        800 + index * 100,
        withSpring(1, { damping: 15, stiffness: 150 })
      );
    });
  }, [
    postAnimations,
    headerOpacity,
    headerTranslateY,
    avatarScale,
    statsOpacity,
    contentOpacity,
    contentTranslateY,
  ]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  // Create animated styles for each post individually
  const post1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post1Opacity.value,
    transform: [{ scale: post1Scale.value }],
  }));

  const post2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post2Opacity.value,
    transform: [{ scale: post2Scale.value }],
  }));

  const post3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post3Opacity.value,
    transform: [{ scale: post3Scale.value }],
  }));

  const post4AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post4Opacity.value,
    transform: [{ scale: post4Scale.value }],
  }));

  const post5AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post5Opacity.value,
    transform: [{ scale: post5Scale.value }],
  }));

  const post6AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post6Opacity.value,
    transform: [{ scale: post6Scale.value }],
  }));

  const postAnimatedStyles = [
    post1AnimatedStyle,
    post2AnimatedStyle,
    post3AnimatedStyle,
    post4AnimatedStyle,
    post5AnimatedStyle,
    post6AnimatedStyle,
  ];

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
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Animated.Image
          source={{ uri: user.avatar }}
          style={[styles.avatar, avatarAnimatedStyle]}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </Animated.View>

      {/* Stats */}
      <Animated.View style={[styles.stats, statsAnimatedStyle]}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.posts}</Text>
          <Text style={styles.statLabel}>Miradores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Siguiendo</Text>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis Miradores</Text>
          <TouchableOpacity onPress={handleViewMode}>
            <Ionicons
              name={viewMode === "grid" ? "grid-outline" : "list-outline"}
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[styles.postsGrid, viewMode === "list" && styles.postsList]}
        >
          {userPosts.map((post, index) => (
            <AnimatedTouchableOpacity
              key={post.key}
              style={[
                styles.postCard,
                viewMode === "list" && styles.postCardList,
                postAnimatedStyles[index],
              ]}
              onPress={() =>
                router.push({
                  pathname: "/MiradorDetail",
                  params: {
                    mirador: JSON.stringify(post),
                  },
                })
              }
            >
              <Image source={{ uri: post.image }} style={styles.postImage} />
              <View style={styles.postInfo}>
                <Text style={styles.postTitle} numberOfLines={2}>
                  {post.title}
                </Text>
                <Text style={styles.postViews}>{post.views} views</Text>
              </View>
            </AnimatedTouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </AnimatedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  name: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  username: {
    color: colors.text.secondary,
    fontSize: 16,
    marginBottom: 8,
  },
  bio: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: 14,
  },
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
  postCardList: {
    width: "100%",
    padding: 8,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  postCard: {
    width: "50%",
    padding: 8,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
  },
  postInfo: {
    padding: 12,
  },
  postTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  postViews: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  errorText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
