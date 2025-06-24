import { Mirador } from "@/services/miradores";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../store/userStore";
import { colors } from "../utils/theme";

export default function MiradorDetail() {
  const { mirador } = useLocalSearchParams();
  const miradorData: Mirador = JSON.parse(mirador as string);
  const currentUser = useUser();

  const isOwner = currentUser?.id === miradorData.user.id;

  const handleEdit = () => {
    router.push({
      pathname: "/CreateMirador",
      params: {
        mirador: JSON.stringify(miradorData),
        isEditing: "true",
      },
    });
  };

  const timeAgo = () => {
    const date = new Date(miradorData.createdAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `Hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    return "Hace un momento";
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{miradorData.title}</Text>
          {isOwner && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons
                name="create-outline"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.locationRow}
          onPress={() => {
            router.push({
              pathname: "/MapMiradores",
              params: { mirador: JSON.stringify(miradorData) },
            });
          }}
        >
          <View style={styles.locationIconBox}>
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.text.primary}
            />
          </View>
          <View>
            <Text style={styles.locationCity}>{miradorData.city}</Text>
            <Text style={styles.locationPlace}>{miradorData.country}</Text>
          </View>
          <Text style={styles.timeAgo}>{timeAgo()}</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: miradorData.imageUrl }}
          style={styles.mainImage}
        />

        <Text style={styles.description}>{miradorData.description}</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="heart-outline"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={styles.iconText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={styles.iconText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={styles.iconText}>0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
        style={styles.commentRow}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=1" }}
          style={styles.avatar}
        />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Añade un comentario..."
            placeholderTextColor={colors.text.secondary}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  locationIconBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCity: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  locationPlace: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  timeAgo: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: "auto",
  },
  mainImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
  },
  description: {
    color: colors.text.primary,
    fontSize: 18,
    lineHeight: 26,
    paddingHorizontal: 24,
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 24,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.background.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  inputBox: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
    paddingVertical: 12,
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: colors.background.secondary,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
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
});
