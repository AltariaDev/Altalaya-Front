import { colors } from "@/utils/theme";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CreatorInfoProps {
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

export default function CreatorInfo({ user }: CreatorInfoProps) {
  const handleCreatorPress = () => {
    router.push({
      pathname: "/UserDetail",
      params: { id: user.id },
    });
  };

  return (
    <TouchableOpacity style={styles.creatorRow} onPress={handleCreatorPress}>
      <Image
        source={{
          uri: user?.avatarUrl || "https://i.pravatar.cc/300?img=12",
        }}
        style={styles.creatorAvatar}
      />
      <Text style={styles.creatorName}>{user?.username}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
