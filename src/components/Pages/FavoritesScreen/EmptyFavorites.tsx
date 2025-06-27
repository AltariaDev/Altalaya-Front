import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyFavorites() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="bookmark-outline"
        size={64}
        color={colors.text.secondary}
      />
      <Text style={styles.emptyTitle}>No tienes favoritos aún</Text>
      <Text style={styles.emptySubtitle}>
        Guarda los miradores que más te gusten para encontrarlos fácilmente
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push("/Explore")}
      >
        <Text style={styles.exploreButtonText}>Explorar Miradores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  exploreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
