import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface UploadProgressProps {
  current: number;
  total: number;
  isVisible: boolean;
}

export default function UploadProgress({
  current,
  total,
  isVisible,
}: UploadProgressProps) {
  if (!isVisible) return null;

  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="cloud-upload" size={24} color={colors.accent} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Subiendo imágenes...</Text>
          <Text style={styles.subtitle}>
            {current} de {total} imágenes
          </Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.background.secondary,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.accent,
  },
});
