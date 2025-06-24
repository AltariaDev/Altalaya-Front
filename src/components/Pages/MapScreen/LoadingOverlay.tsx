import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../../utils/theme";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
