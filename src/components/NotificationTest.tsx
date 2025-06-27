import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNotificationsStore } from "../store/notificationsStore";
import { Notification } from "../types";
import { colors } from "../utils/theme";

const NotificationTest: React.FC = () => {
  const { addNotification } = useNotificationsStore();

  const createTestNotification = (type: Notification["type"]) => {
    const testNotification: Notification = {
      id: `test-${Date.now()}`,
      user: {
        id: "current-user",
        username: "currentuser",
        name: "Usuario Actual",
        avatarUrl: "https://i.pravatar.cc/300?img=1",
      },
      type,
      from_user: {
        id: "test-user",
        username: "testuser",
        name: "Usuario de Prueba",
        avatarUrl: "https://i.pravatar.cc/300?img=2",
      },
      mirador:
        type !== "follow"
          ? {
              id: "test-mirador",
              title: "Mirador de Prueba",
              imageUrl:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            }
          : undefined,
      read: false,
      created_at: new Date().toISOString(),
    };

    addNotification(testNotification);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Notifications</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createTestNotification("like")}
      >
        <Text style={styles.buttonText}>Add Like Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createTestNotification("comment")}
      >
        <Text style={styles.buttonText}>Add Comment Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createTestNotification("follow")}
      >
        <Text style={styles.buttonText}>Add Follow Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: colors.background.primary,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default NotificationTest;
