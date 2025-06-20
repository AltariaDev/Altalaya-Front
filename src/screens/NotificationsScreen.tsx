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
import {
  markNotificationAsRead,
  useNotifications,
  useUnreadCount,
} from "../store";
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

export default function NotificationsScreen() {
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();

  const handleNotificationPress = (id: string) => {
    markNotificationAsRead(id);
  };

  const renderNotification = (notification: any) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(notification.id)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Image
            source={{ uri: notification.user.avatar }}
            style={styles.userAvatar}
          />
          <View style={styles.notificationInfo}>
            <Text style={styles.userName}>{notification.user.name}</Text>
            <Text style={styles.notificationText}>
              {notification.type === "like" && "le gustó tu mirador"}
              {notification.type === "comment" && "comentó en tu mirador"}
              {notification.type === "follow" && "empezó a seguirte"}
            </Text>
            {notification.comment && (
              <Text style={styles.commentText}>"{notification.comment}"</Text>
            )}
            <Text style={styles.timeText}>{notification.time}</Text>
          </View>
        </View>
        {notification.post && (
          <Image
            source={{ uri: notification.post.image }}
            style={styles.postImage}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off"
              size={64}
              color={colors.text.secondary}
            />
            <Text style={styles.emptyStateTitle}>No hay notificaciones</Text>
            <Text style={styles.emptyStateText}>
              Cuando recibas notificaciones, aparecerán aquí
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map(renderNotification)}
          </View>
        )}
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
  badge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 12,
  },
  badgeText: {
    color: colors.background.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
  },
  userName: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationText: {
    color: colors.text.secondary,
    fontSize: 16,
    marginBottom: 4,
  },
  commentText: {
    color: colors.text.primary,
    fontSize: 16,
    marginBottom: 4,
    fontStyle: "italic",
  },
  timeText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 16,
  },
  emptyStateText: {
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
  },
  notificationsList: {
    flex: 1,
  },
  unreadNotification: {
    backgroundColor: colors.background.secondary,
  },
});
