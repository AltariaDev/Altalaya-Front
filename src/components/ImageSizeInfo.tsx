import { getImageInfo, MAX_FILE_SIZE_MB } from "@/utils/imageCompression";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ImageSizeInfoProps {
  imageUri: string;
  showDetails?: boolean;
}

interface ImageInfo {
  width: number;
  height: number;
  sizeMB: number;
}

export default function ImageSizeInfo({
  imageUri,
  showDetails = false,
}: ImageSizeInfoProps) {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImageInfo = async () => {
      try {
        setIsLoading(true);
        const info = await getImageInfo(imageUri);
        setImageInfo(info);
      } catch (error) {
        console.warn("Failed to get image info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageUri) {
      loadImageInfo();
    }
  }, [imageUri]);

  if (isLoading || !imageInfo) {
    return null;
  }

  const isLarge = imageInfo.sizeMB > MAX_FILE_SIZE_MB;
  const sizeColor = isLarge ? colors.error : colors.success;

  return (
    <View style={styles.container}>
      <View style={styles.sizeIndicator}>
        <Ionicons
          name={isLarge ? "warning" : "checkmark-circle"}
          size={16}
          color={sizeColor}
        />
        <Text style={[styles.sizeText, { color: sizeColor }]}>
          {imageInfo.sizeMB.toFixed(1)} MB
        </Text>
      </View>

      {showDetails && (
        <Text style={styles.detailsText}>
          {imageInfo.width} × {imageInfo.height}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sizeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  detailsText: {
    fontSize: 11,
    color: colors.text.secondary,
  },
});
