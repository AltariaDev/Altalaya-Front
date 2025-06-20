import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

const NOTIFICATION_TYPES = [
  {
    id: "new_miradores",
    icon: "location-outline",
    title: "Nuevos Miradores",
    description:
      "Recibe notificaciones cuando se agreguen nuevos miradores cerca de ti",
    category: "general",
  },
  {
    id: "likes_comments",
    icon: "heart-outline",
    title: "Me gusta y Comentarios",
    description: "Notificaciones cuando alguien interactúe con tus miradores",
    category: "social",
  },
  {
    id: "followers",
    icon: "people-outline",
    title: "Nuevos Seguidores",
    description: "Avisos cuando alguien te siga",
    category: "social",
  },
  {
    id: "nearby_activity",
    icon: "trending-up-outline",
    title: "Actividad Cercana",
    description: "Actividad de otros usuarios en miradores cercanos",
    category: "general",
  },
  {
    id: "weather_alerts",
    icon: "partly-sunny-outline",
    title: "Alertas Meteorológicas",
    description: "Condiciones climáticas que pueden afectar las visitas",
    category: "alerts",
  },
  {
    id: "maintenance",
    icon: "construct-outline",
    title: "Mantenimiento",
    description: "Actualizaciones sobre el estado de los miradores",
    category: "alerts",
  },
  {
    id: "promotions",
    icon: "gift-outline",
    title: "Promociones",
    description: "Ofertas especiales y eventos relacionados con miradores",
    category: "marketing",
  },
  {
    id: "newsletter",
    icon: "mail-outline",
    title: "Boletín Informativo",
    description: "Noticias y artículos sobre miradores y destinos",
    category: "marketing",
  },
];

const NOTIFICATION_PREFERENCES = [
  {
    id: "quiet_hours",
    icon: "moon-outline",
    title: "Horas Silenciosas",
    description: "No recibir notificaciones entre 22:00 y 8:00",
    type: "switch",
  },
  {
    id: "sound",
    icon: "volume-high-outline",
    title: "Sonidos",
    description: "Reproducir sonidos para las notificaciones",
    type: "switch",
  },
  {
    id: "vibration",
    icon: "phone-portrait-outline",
    title: "Vibración",
    description: "Vibrar al recibir notificaciones",
    type: "switch",
  },
  {
    id: "badge_count",
    icon: "notifications-outline",
    title: "Contador de Notificaciones",
    description: "Mostrar número de notificaciones en el icono de la app",
    type: "switch",
  },
];

export default function NotificationSettingsScreen() {
  const [notificationStates, setNotificationStates] = useState<
    Record<string, boolean>
  >({
    new_miradores: true,
    likes_comments: true,
    followers: true,
    nearby_activity: false,
    weather_alerts: true,
    maintenance: true,
    promotions: false,
    newsletter: false,
    quiet_hours: true,
    sound: true,
    vibration: true,
    badge_count: true,
  });

  const toggleNotification = (id: string) => {
    setNotificationStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "general":
        return "Notificaciones Generales";
      case "social":
        return "Interacciones Sociales";
      case "alerts":
        return "Alertas Importantes";
      case "marketing":
        return "Marketing y Promociones";
      default:
        return "Otros";
    }
  };

  const groupedNotifications = NOTIFICATION_TYPES.reduce(
    (acc, notification) => {
      if (!acc[notification.category]) {
        acc[notification.category] = [];
      }
      acc[notification.category].push(notification);
      return acc;
    },
    {} as Record<string, typeof NOTIFICATION_TYPES>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Tipos de Notificaciones</Text>

          {Object.entries(groupedNotifications).map(
            ([category, notifications]) => (
              <View key={category} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>
                  {getCategoryTitle(category)}
                </Text>
                <View style={styles.sectionContent}>
                  {notifications.map((notification, index) => (
                    <View
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        index !== notifications.length - 1 &&
                          styles.notificationItemBorder,
                      ]}
                    >
                      <View style={styles.notificationItemLeft}>
                        <View style={styles.notificationIcon}>
                          <Ionicons
                            name={notification.icon as any}
                            size={20}
                            color={colors.text.primary}
                          />
                        </View>
                        <View style={styles.notificationText}>
                          <Text style={styles.notificationTitle}>
                            {notification.title}
                          </Text>
                          <Text style={styles.notificationDescription}>
                            {notification.description}
                          </Text>
                        </View>
                      </View>
                      <Switch
                        value={notificationStates[notification.id]}
                        onValueChange={() =>
                          toggleNotification(notification.id)
                        }
                        trackColor={{
                          false: colors.background.secondary,
                          true: colors.detail,
                        }}
                        thumbColor={
                          notificationStates[notification.id]
                            ? colors.text.primary
                            : colors.text.secondary
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            )
          )}

          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>Preferencias</Text>
            <View style={styles.sectionContent}>
              {NOTIFICATION_PREFERENCES.map((preference, index) => (
                <View
                  key={preference.id}
                  style={[
                    styles.notificationItem,
                    index !== NOTIFICATION_PREFERENCES.length - 1 &&
                      styles.notificationItemBorder,
                  ]}
                >
                  <View style={styles.notificationItemLeft}>
                    <View style={styles.notificationIcon}>
                      <Ionicons
                        name={preference.icon as any}
                        size={20}
                        color={colors.text.primary}
                      />
                    </View>
                    <View style={styles.notificationText}>
                      <Text style={styles.notificationTitle}>
                        {preference.title}
                      </Text>
                      <Text style={styles.notificationDescription}>
                        {preference.description}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationStates[preference.id]}
                    onValueChange={() => toggleNotification(preference.id)}
                    trackColor={{
                      false: colors.background.secondary,
                      true: colors.detail,
                    }}
                    thumbColor={
                      notificationStates[preference.id]
                        ? colors.text.primary
                        : colors.text.secondary
                    }
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoSection}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.text.secondary}
            />
            <Text style={styles.infoText}>
              Puedes cambiar estas configuraciones en cualquier momento. Algunas
              notificaciones importantes pueden seguir apareciendo
              independientemente de estas configuraciones.
            </Text>
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
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  notificationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.detail,
  },
  notificationItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.detail,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
});
