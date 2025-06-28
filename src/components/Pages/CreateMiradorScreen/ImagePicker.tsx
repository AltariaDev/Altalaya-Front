import { ImagePickerProps } from "@/types/screens";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MAX_IMAGES = 5;

export default function ImagePicker({
  images,
  onPickImage,
  onRemoveImage,
}: ImagePickerProps) {
  const canAddMore = images.length < MAX_IMAGES;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemoveImage(index)}
            >
              <Ionicons name="close-circle" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
        ))}

        {canAddMore && (
          <TouchableOpacity onPress={onPickImage} style={styles.addButton}>
            <Ionicons
              name="add-circle-outline"
              size={48}
              color={colors.text.secondary}
            />
            <Text style={styles.addButtonText}>Agregar imagen</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {images.length === 0 && (
        <TouchableOpacity onPress={onPickImage} style={styles.imagePlaceholder}>
          <Ionicons
            name="image-outline"
            size={48}
            color={colors.text.secondary}
          />
          <Text style={styles.imagePlaceholderText}>
            Toca para seleccionar imágenes
          </Text>
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <Text style={styles.imageCount}>
          {images.length}/{MAX_IMAGES} imágenes
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -2,
    right: -8,
    backgroundColor: colors.background.primary,
    borderRadius: 12,
  },
  addButton: {
    width: 120,
    height: 80,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.text.secondary,
    borderStyle: "dashed",
  },
  addButtonText: {
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  imagePlaceholder: {
    aspectRatio: 16 / 9,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 8,
  },
  imagePlaceholderText: {
    color: colors.text.secondary,
    fontSize: 16,
    marginTop: 12,
  },
  imageCount: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
