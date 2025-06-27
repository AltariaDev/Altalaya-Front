import { FavoritesHeaderProps } from "@/types/screens";
import { colors } from "@/utils/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FavoritesHeader({
  favoritesCount,
}: FavoritesHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mis Favoritos</Text>
      <Text style={styles.subtitle}>
        {favoritesCount} mirador{favoritesCount !== 1 ? "es" : ""} guardado
        {favoritesCount !== 1 ? "s" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
});
