import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  useNotifications,
  useNotificationsLoading,
  useUnreadCount,
} from "@/store/notificationsStore";
import { Notification } from "@/types/notification";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();
  const loading = useNotificationsLoading();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationPress = async (notification: Notification) => {
    await markNotificationAsRead(notification.id);
    if (notification.type === "like" || notification.type === "comment") {
      router.push({
        pathname: "/MiradorDetail",
        params: { miradorId: notification.mirador?.id },
      });
    } else {
      router.push({
        pathname: "/UserDetail",
        params: { userId: notification.fromUser.id },
      });
    }
  };

  const handleRefresh = async () => {
    await fetchNotifications();
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead();
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t("notifications.timeAgo.now");
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)}${t(
        "notifications.timeAgo.minutes"
      )}`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}${t(
        "notifications.timeAgo.hours"
      )}`;
    return `${Math.floor(diffInSeconds / 86400)}${t(
      "notifications.timeAgo.days"
    )}`;
  };

  const getNotificationText = (notification: Notification) => {
    return t(`notifications.types.${notification.type}`);
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Image
            source={{
              uri:
                notification.fromUser.avatarUrl ||
                "https://i.pravatar.cc/300?img=1",
            }}
            style={styles.userAvatar}
          />
          <View style={styles.notificationInfo}>
            <Text style={styles.userName}>
              {notification.fromUser.username}
            </Text>
            <Text style={styles.notificationText}>
              {getNotificationText(notification)}
            </Text>
            <Text style={styles.timeText}>
              {formatTimeAgo(notification.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && notifications.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("notifications.title")}</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("notifications.loading")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("notifications.title")}</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={handleMarkAllRead}
              style={styles.markAllButton}
            >
              <Text style={styles.markAllText}>
                {t("notifications.markAll")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-outline"
              size={64}
              color={colors.text.secondary}
            />
            <Text style={styles.emptyStateTitle}>
              {t("notifications.empty")}
            </Text>
            <Text style={styles.emptyStateText}>
              {t("notifications.emptyMessage")}
            </Text>
          </View>
        ) : (
          notifications.map(renderNotification)
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  markAllButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 12,
  },
  markAllText: {
    color: colors.background.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});
