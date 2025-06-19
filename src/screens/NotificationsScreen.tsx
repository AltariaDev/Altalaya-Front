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
import { NOTIFICATIONS } from "../../data/Notification";
import { colors } from "../utils/theme";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Ionicons name="heart" size={20} color={colors.error} />;
    case "comment":
      return <Ionicons name="chatbubble" size={20} color={colors.info} />;
    case "follow":
      return <Ionicons name="person-add" size={20} color={colors.success} />;
    default:
      return (
        <Ionicons
          name="notifications"
          size={20}
          color={colors.text.secondary}
        />
      );
  }
};

const getNotificationText = (notification: any) => {
  switch (notification.type) {
    case "like":
      return "le dio me gusta a tu mirador";
    case "comment":
      return "comentó en tu mirador";
    case "follow":
      return "empezó a seguirte";
    default:
      return "";
  }
};

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Marcar todas como leídas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notification}>
            <Image
              source={{ uri: notification.user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{notification.user.name}</Text>
                <Text style={styles.action}>
                  {getNotificationText(notification)}
                </Text>
                {notification.comment && (
                  <Text style={styles.comment}>{notification.comment}</Text>
                )}
                <Text style={styles.time}>{notification.time}</Text>
              </View>
              {notification.post && (
                <Image
                  source={{ uri: notification.post.image }}
                  style={styles.postImage}
                />
              )}
            </View>
            <View style={styles.iconContainer}>
              {getNotificationIcon(notification.type)}
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  markAllButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  markAllText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  notification: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  action: {
    color: colors.text.secondary,
    fontSize: 16,
    marginBottom: 4,
  },
  comment: {
    color: colors.text.primary,
    fontSize: 16,
    marginBottom: 4,
    fontStyle: "italic",
  },
  time: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
