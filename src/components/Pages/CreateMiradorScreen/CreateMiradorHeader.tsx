import { CreateMiradorHeaderProps } from "@/types/screens";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CreateMiradorHeader({
  isEditMode,
  isLoading,
  canSubmit,
  onSubmit,
}: CreateMiradorHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        {isEditMode ? "Editar Mirador" : "Crear Mirador"}
      </Text>

      <TouchableOpacity
        onPress={onSubmit}
        style={[
          styles.submitButton,
          (!canSubmit || isLoading) && styles.submitButtonDisabled,
        ]}
        disabled={!canSubmit || isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading
            ? isEditMode
              ? "Actualizando..."
              : "Publicando..."
            : isEditMode
            ? "Actualizar"
            : "Publicar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  submitButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
