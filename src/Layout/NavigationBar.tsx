import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabPath =
  | "/"
  | "/Search"
  | "/CreateMirador"
  | "/Notifications"
  | "/Profile"
  | "/MapMiradores";

const tabs: { label: string; icon: React.ReactElement; path: TabPath }[] = [
  {
    label: "Inicio",
    icon: <Feather name="home" size={24} color="#AAB7B8" />,
    path: "/",
  },
  {
    label: "Mapa",
    icon: <Feather name="map" size={24} color="#AAB7B8" />,
    path: "/MapMiradores",
  },
  {
    label: "Crear",
    icon: <AntDesign name="pluscircleo" size={24} color="#AAB7B8" />,
    path: "/CreateMirador",
  },
  {
    label: "Notificaciones",
    icon: <Ionicons name="notifications-outline" size={24} color="#AAB7B8" />,
    path: "/Notifications",
  },
  {
    label: "Perfil",
    icon: <MaterialIcons name="person-outline" size={24} color="#AAB7B8" />,
    path: "/Profile",
  },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={styles.tab}
          onPress={() => {
            if (pathname !== tab.path) {
              router.push(tab.path as Href);
            }
          }}
        >
          <View
            style={[
              styles.iconContainer,
              pathname === tab.path && styles.activeIconContainer,
            ]}
          >
            {React.cloneElement(tab.icon, {
              color: pathname === tab.path ? "#fff" : "#AAB7B8",
            })}
          </View>
          <Text
            style={[styles.label, pathname === tab.path && styles.activeLabel]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1c2426",
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#23262A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  tab: {
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconContainer: {
    backgroundColor: "#23262A",
  },
  label: {
    color: "#AAB7B8",
    fontSize: 12,
    fontWeight: "500",
  },
  activeLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});
