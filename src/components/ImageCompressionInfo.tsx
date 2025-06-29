import { MAX_FILE_SIZE_MB } from "@/utils/imageCompression";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ImageCompressionInfoProps {
  showDetails?: boolean;
}

export default function ImageCompressionInfo({
  showDetails = false,
}: ImageCompressionInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="information-circle" size={16} color={colors.info} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Compresión automática</Text>
        <Text style={styles.description}>
          Las imágenes se comprimirán automáticamente si superan{" "}
          {MAX_FILE_SIZE_MB}MB
        </Text>
        {showDetails && (
          <Text style={styles.details}>
            • Máximo: 1200×800 píxeles{"\n"}• Calidad: 70%{"\n"}• Formato: JPEG
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 8,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 16,
  },
  details: {
    color: colors.text.secondary,
    fontSize: 11,
    marginTop: 8,
    lineHeight: 14,
  },
});
