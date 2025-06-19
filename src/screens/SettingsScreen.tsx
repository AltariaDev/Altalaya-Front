import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

const SETTINGS_SECTIONS = [
  {
    title: "Cuenta",
    items: [
      {
        icon: "person-outline",
        title: "Información Personal",
        route: "/EditProfile",
      },
      {
        icon: "lock-closed-outline",
        title: "Privacidad",
        route: "/Privacy",
      },
      {
        icon: "notifications-outline",
        title: "Notificaciones",
        route: "/NotificationSettings",
      },
    ],
  },
  {
    title: "Preferencias",
    items: [
      {
        icon: "moon-outline",
        title: "Modo Oscuro",
        type: "switch",
        value: true,
      },
      {
        icon: "language-outline",
        title: "Idioma",
        value: "Español",
      },
      {
        icon: "location-outline",
        title: "Unidades de Distancia",
        value: "Kilómetros",
      },
    ],
  },
  {
    title: "Soporte",
    items: [
      {
        icon: "help-circle-outline",
        title: "Ayuda y Soporte",
        route: "/Help",
      },
      {
        icon: "document-text-outline",
        title: "Términos y Condiciones",
        route: "/Terms",
      },
      {
        icon: "shield-outline",
        title: "Política de Privacidad",
        route: "/PrivacyPolicy",
      },
    ],
  },
  {
    title: "Aplicación",
    items: [
      {
        icon: "information-circle-outline",
        title: "Acerca de",
        route: "/About",
      },
      {
        icon: "log-out-outline",
        title: "Cerrar Sesión",
        type: "danger",
      },
    ],
  },
];

export default function SettingsScreen() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace("/");
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
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {SETTINGS_SECTIONS.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.title}
                  style={[
                    styles.settingItem,
                    itemIndex !== section.items.length - 1 &&
                      styles.settingItemBorder,
                  ]}
                  onPress={() => {
                    if (item.type === "danger") {
                      handleLogout();
                    } else if (item.route) {
                      router.push(item.route);
                    }
                  }}
                >
                  <View style={styles.settingItemLeft}>
                    <View
                      style={[
                        styles.settingIcon,
                        item.type === "danger" && styles.settingIconDanger,
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={
                          item.type === "danger"
                            ? colors.error
                            : colors.text.primary
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.settingTitle,
                        item.type === "danger" && styles.settingTitleDanger,
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>

                  {item.type === "switch" ? (
                    <Switch
                      value={item.value}
                      onValueChange={() => {}}
                      trackColor={{
                        false: colors.background.secondary,
                        true: colors.detail,
                      }}
                      thumbColor={
                        item.value ? colors.text.primary : colors.text.secondary
                      }
                    />
                  ) : item.value ? (
                    <View style={styles.settingValue}>
                      <Text style={styles.settingValueText}>{item.value}</Text>
                      {!item.type && (
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color={colors.text.secondary}
                        />
                      )}
                    </View>
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.text.secondary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.version}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
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
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.detail,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.detail,
    justifyContent: "center",
    alignItems: "center",
  },
  settingIconDanger: {
    backgroundColor: "rgba(255, 77, 77, 0.1)",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  settingTitleDanger: {
    color: colors.error,
  },
  settingValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValueText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  version: {
    alignItems: "center",
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
