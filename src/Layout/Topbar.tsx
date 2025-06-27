import { useUser, useUserStore } from "@/store/userStore";
import { TopbarProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useCallback, useEffect, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/theme";

const Topbar = React.memo(({ title }: TopbarProps) => {
  const pathname = usePathname();
  const { loadUser } = useUserStore((state) => state.actions);
  const user = useUser();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const nonProfileAvatar = useMemo(() => ["/Profile", "/Settings"], []);
  const showAvatar = useMemo(
    () => !nonProfileAvatar.includes(pathname),
    [nonProfileAvatar, pathname]
  );

  const handleProfilePress = useCallback(() => {
    router.push("/Profile");
  }, []);

  const handleSearchPress = useCallback(() => {
    router.push("/Explore");
  }, []);

  const handleSettingsPress = useCallback(() => {
    router.push("/Settings");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {showAvatar && user && (
          <TouchableOpacity onPress={handleProfilePress}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.settingsButton}>
        <TouchableOpacity onPress={handleSearchPress}>
          <Ionicons name="search" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

Topbar.displayName = "Topbar";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  settingsButton: {
    flexDirection: "row",
    gap: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Topbar;
