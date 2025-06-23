import { authService } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppStore } from "../store";
import { colors } from "../utils/theme";

type SettingItem =
  | {
      icon: string;
      title: string;
      route: string;
      type?: undefined;
      value?: undefined;
    }
  | {
      icon: string;
      title: string;
      type: "switch";
      value: boolean;
      route?: undefined;
    }
  | {
      icon: string;
      title: string;
      value: string;
      type?: undefined;
      route?: undefined;
    }
  | {
      icon: string;
      title: string;
      type: "danger";
      route?: undefined;
      value?: undefined;
    };

type SettingSection = {
  title: string;
  items: SettingItem[];
};

const LANGUAGES = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
];

const SETTINGS_SECTIONS: SettingSection[] = [
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
        icon: "language-outline",
        title: "Idioma",
        value: "Español",
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
        icon: "log-out-outline",
        title: "Cerrar Sesión",
        type: "danger",
      },
    ],
  },
];

export default function SettingsScreen() {
  const [settings, setSettings] = useState(SETTINGS_SECTIONS);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Español");
  const { setLanguage } = useAppStore();
  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: () => {
            authService.logout();
            router.replace("/Login");
          },
        },
      ]
    );
  };

  const trad = (key: string) => {
    switch (key) {
      case "Español":
        return "es";
      case "English":
        return "en";
      case "Français":
        return "fr";
      default:
        return "es";
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);

    setSettings((prevSettings) =>
      prevSettings.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.title === "Idioma" && !item.route && !item.type
            ? ({ ...item, value: language } as SettingItem)
            : item
        ),
      }))
    );
    setLanguage(trad(language) as "es" | "en" | "fr");
  };

  const handleSwitchToggle = (itemTitle: string, newValue: boolean) => {
    setSettings((prevSettings) =>
      prevSettings.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.title === itemTitle && item.type === "switch"
            ? ({ ...item, value: newValue } as SettingItem)
            : item
        ),
      }))
    );
  };

  const handleItemPress = (item: SettingItem) => {
    if (item.type === "danger") {
      handleLogout();
    } else if (item.route) {
      router.push(item.route as any);
    } else if (item.title === "Idioma") {
      setShowLanguageModal(true);
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
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {settings.map((section, index) => (
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
                  onPress={() => handleItemPress(item)}
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
                      onValueChange={(newValue) =>
                        handleSwitchToggle(item.title, newValue)
                      }
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

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Idioma</Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.languageList}>
              {LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    selectedLanguage === language.name &&
                      styles.languageItemSelected,
                  ]}
                  onPress={() => handleLanguageSelect(language.name)}
                >
                  <Text
                    style={[
                      styles.languageText,
                      selectedLanguage === language.name &&
                        styles.languageTextSelected,
                    ]}
                  >
                    {language.name}
                  </Text>
                  {selectedLanguage === language.name && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.detail}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  languageList: {
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  languageItemSelected: {
    backgroundColor: colors.detail,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  languageText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  languageTextSelected: {
    fontWeight: "600",
  },
});
