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
import { USER, USER_POSTS } from "../../data/User";
import { colors } from "../utils/theme";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ProfileScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const avatarScale = useSharedValue(0.8);
  const statsOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);
  const postAnimations = USER_POSTS.map(() => ({
    scale: useSharedValue(0.9),
    opacity: useSharedValue(0),
  }));

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
  }, []);

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

  const createPostAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: postAnimations[index].opacity.value,
      transform: [{ scale: postAnimations[index].scale.value }],
    }));
  };

  const handleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <View style={styles.container}>
      <AnimatedScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View style={styles.headerContent}>
            <Animated.Image
              source={{ uri: USER.avatar }}
              style={[styles.avatar, avatarAnimatedStyle]}
            />
            <Animated.View style={[styles.statsContainer, statsAnimatedStyle]}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.followers}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.following}</Text>
                <Text style={styles.statLabel}>Siguiendo</Text>
              </View>
            </Animated.View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.username}>{USER.username}</Text>
            <Text style={styles.bio}>{USER.bio}</Text>
          </View>

          <AnimatedTouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/EditProfile")}
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </AnimatedTouchableOpacity>
        </Animated.View>

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
            {USER_POSTS.map((post, index) => (
              <AnimatedTouchableOpacity
                key={post.id}
                style={[
                  styles.postCard,
                  viewMode === "list" && styles.postCardList,
                  createPostAnimatedStyle(index),
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
                <View style={styles.postOverlay}>
                  <View style={styles.postStats}>
                    <View style={styles.postStat}>
                      <Ionicons
                        name="heart"
                        size={16}
                        color={colors.text.primary}
                      />
                      <Text style={styles.postStatText}>{post.likes}</Text>
                    </View>
                    <View style={styles.postStat}>
                      <Ionicons
                        name="chatbubble"
                        size={16}
                        color={colors.text.primary}
                      />
                      <Text style={styles.postStatText}>{post.comments}</Text>
                    </View>
                  </View>
                </View>
              </AnimatedTouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </AnimatedScrollView>
    </View>
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
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
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
  userInfo: {
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
  editButton: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
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
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 16,
    justifyContent: "flex-end",
    padding: 12,
  },
  postStats: {
    flexDirection: "row",
    gap: 16,
  },
  postStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postStatText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  settingsButton: {
    backgroundColor: colors.background.secondary,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
});
