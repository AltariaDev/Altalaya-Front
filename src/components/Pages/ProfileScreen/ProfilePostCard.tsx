import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../../../utils/theme";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ProfilePostCardProps {
  post: Post;
  viewMode: "grid" | "list";
  animatedStyle: any;
}

export default function ProfilePostCard({
  post,
  viewMode,
  animatedStyle,
}: ProfilePostCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/MiradorDetail",
      params: {
        mirador: JSON.stringify(post),
      },
    });
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.postCard,
        viewMode === "list" && styles.postCardList,
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      <View style={styles.postInfo}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {post.title}
        </Text>
        {/* <Text style={styles.postViews}>{post.views} views</Text> */}
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postCard: {
    width: "50%",
    padding: 8,
  },
  postCardList: {
    width: "100%",
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
});
