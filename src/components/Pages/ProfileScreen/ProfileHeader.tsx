import { useUser } from "@/store/userStore";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../../../utils/theme";

interface ProfileHeaderProps {
  headerAnimatedStyle: any;
  avatarAnimatedStyle: any;
}
export default function ProfileHeader({
  headerAnimatedStyle,
  avatarAnimatedStyle,
}: ProfileHeaderProps) {
  const user = useUser();

  if (!user) return null;

  return (
    <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <Animated.Image
        source={{ uri: user.avatarUrl }}
        style={[styles.avatar, avatarAnimatedStyle]}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
});
