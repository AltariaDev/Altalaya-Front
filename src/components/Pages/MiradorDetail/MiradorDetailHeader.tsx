import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMiradorDetail } from "./useMiradorDetail";

interface MiradorDetailHeaderProps {
  title: string;
}

export default function MiradorDetailHeader({
  title,
}: MiradorDetailHeaderProps) {
  const { isOwner, handleEdit, handleDelete } = useMiradorDetail();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {isOwner && (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons
              name="create-outline"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.trashButton} onPress={handleDelete}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "70%",
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  editButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  trashButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.error,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
