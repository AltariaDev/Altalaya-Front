import { useUser } from "@/store/userStore";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../../../utils/theme";

interface ProfileStatsProps {
  statsAnimatedStyle: any;
}
export default function ProfileStats({
  statsAnimatedStyle,
}: ProfileStatsProps) {
  const user = useUser();

  if (!user) return null;

  return (
    <Animated.View style={[styles.stats, statsAnimatedStyle]}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.posts ?? 0}</Text>
        <Text style={styles.statLabel}>Miradores</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.followers.length}</Text>
        <Text style={styles.statLabel}>Seguidores</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.following.length}</Text>
        <Text style={styles.statLabel}>Siguiendo</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/Favorites")}
        style={styles.statItem}
      >
        <Text style={styles.statNumber}>0</Text>
        <Text style={styles.statLabel}>Favoritos</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
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
});
