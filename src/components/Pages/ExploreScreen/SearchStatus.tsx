import { colors } from "@/utils/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SearchStatusProps {
  isSearching: boolean;
  hasResults: boolean;
  hasQuery: boolean;
}

export default function SearchStatus({
  isSearching,
  hasResults,
  hasQuery,
}: SearchStatusProps) {
  if (isSearching) {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Buscando...</Text>
      </View>
    );
  }

  if (hasQuery && !hasResults) {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>No se encontraron resultados</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    color: colors.text.secondary,
    textAlign: "center",
  },
});
