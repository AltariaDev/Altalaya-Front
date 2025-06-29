import { uploadService } from "@/services/upload";
import { usersService } from "@/services/users";
import { useUser } from "@/store/userStore";
import {
  compressImageForUpload,
  validateAndCompressImage,
} from "@/utils/imageCompression";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

export default function EditProfileScreen() {
  const user = useUser();
  const [avatar, setAvatar] = useState(user?.avatarUrl);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      try {
        const processedUri = await validateAndCompressImage(
          result.assets[0].uri
        );
        setLocalAvatar(processedUri);
        setAvatar(processedUri);
      } catch (error) {
        console.warn("Failed to process image, using original:", error);
        setLocalAvatar(result.assets[0].uri);
        setAvatar(result.assets[0].uri);
      }
    }
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);

      let finalAvatarUrl = avatar;

      // If there's a local avatar, compress and upload it to Cloudinary first
      if (localAvatar) {
        try {
          const compressedUri = await compressImageForUpload(localAvatar);
          const uploadResponse = await uploadService.uploadImage(compressedUri);
          finalAvatarUrl = uploadResponse.url;
        } catch (error) {
          console.error("Failed to compress/upload avatar:", error);
          // Try with original if compression fails
          const uploadResponse = await uploadService.uploadImage(localAvatar);
          finalAvatarUrl = uploadResponse.url;
        }
      }

      await usersService.updateMyProfile({
        name,
        username,
        email,
        bio,
        avatarUrl: finalAvatarUrl,
      });
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, isUploading && styles.saveButtonDisabled]}
          disabled={isUploading}
        >
          <Text style={styles.saveButtonText}>
            {isUploading ? "Guardando..." : "Guardar"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={colors.text.primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.text.secondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={colors.text.secondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={colors.text.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Biografía</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholderTextColor={colors.text.secondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
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
  saveButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 16,
    right: "50%",
    marginRight: -60,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    color: colors.text.primary,
    fontSize: 16,
  },
  bioInput: {
    height: 120,
    textAlignVertical: "top",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 12,
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: "600",
  },
});
