import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMiradorDetail } from "./useMiradorDetail";

interface CommentInputProps {
  isLoadingSocial: boolean;
}

export default function CommentInput({ isLoadingSocial }: CommentInputProps) {
  const { currentUser, commentText, setCommentText, handleSendComment } =
    useMiradorDetail();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      style={styles.commentRow}
    >
      <Image
        source={{
          uri:
            currentUser?.avatarUrl ||
            `https://i.pravatar.cc/150?u=${currentUser?.id}`,
        }}
        style={styles.avatar}
      />
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Añade un comentario..."
          placeholderTextColor={colors.text.secondary}
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !commentText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendComment}
          disabled={!commentText.trim() || isLoadingSocial}
        >
          <Ionicons
            name="send"
            size={20}
            color={
              commentText.trim() ? colors.text.primary : colors.text.secondary
            }
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: colors.background.secondary,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
