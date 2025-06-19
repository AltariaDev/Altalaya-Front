import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

type TabPath =
  | "/"
  | "/Search"
  | "/CreateMirador"
  | "/Notifications"
  | "/Profile"
  | "/MapMiradores";

const tabs = [
  {
    label: "Inicio",
    icon: "home" as const,
    path: "/" as TabPath,
  },
  {
    label: "Mapa",
    icon: "map" as const,
    path: "/MapMiradores" as TabPath,
  },
  {
    label: "Crear",
    icon: "pluscircleo" as const,
    path: "/CreateMirador" as TabPath,
  },
  {
    label: "Notificaciones",
    icon: "notifications-outline" as const,
    path: "/Notifications" as TabPath,
  },
  {
    label: "Perfil",
    icon: "person-outline" as const,
    path: "/Profile" as TabPath,
  },
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const TabItem = React.memo(
  ({
    tab,
    isActive,
    onPress,
  }: {
    tab: (typeof tabs)[0];
    isActive: boolean;
    onPress: () => void;
  }) => {
    const scale = useSharedValue(1);
    const backgroundColor = useSharedValue(isActive ? 1 : 0);
    const textColor = useSharedValue(isActive ? 1 : 0);

    React.useEffect(() => {
      backgroundColor.value = withSpring(isActive ? 1 : 0, {
        damping: 20,
        stiffness: 200,
      });
      textColor.value = withSpring(isActive ? 1 : 0, {
        damping: 20,
        stiffness: 200,
      });
    }, [isActive, backgroundColor, textColor]);

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    }, [scale]);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    }, [scale]);

    const tabAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const iconContainerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ["transparent", colors.background.secondary]
      ),
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
      color: interpolateColor(
        textColor.value,
        [0, 1],
        [colors.text.secondary, colors.text.primary]
      ),
      fontWeight: textColor.value > 0.5 ? "600" : "500",
    }));

    const iconColor = isActive ? colors.text.primary : colors.text.secondary;

    const renderIcon = () => {
      switch (tab.icon) {
        case "home":
          return <Feather name="home" size={24} color={iconColor} />;
        case "map":
          return <Feather name="map" size={24} color={iconColor} />;
        case "pluscircleo":
          return <AntDesign name="pluscircleo" size={24} color={iconColor} />;
        case "notifications-outline":
          return (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={iconColor}
            />
          );
        case "person-outline":
          return (
            <MaterialIcons name="person-outline" size={24} color={iconColor} />
          );
        default:
          return null;
      }
    };

    return (
      <AnimatedTouchableOpacity
        style={[styles.tab, tabAnimatedStyle]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[styles.iconContainer, iconContainerAnimatedStyle]}
        >
          {renderIcon()}
        </Animated.View>
        <Animated.Text style={[styles.label, textAnimatedStyle]}>
          {tab.label}
        </Animated.Text>
      </AnimatedTouchableOpacity>
    );
  }
);

TabItem.displayName = "TabItem";

const BottomNavBar = React.memo(() => {
  const pathname = usePathname();

  const handleTabPress = useCallback(
    (path: TabPath) => {
      if (pathname !== path) {
        router.push(path as Href);
      }
    },
    [pathname]
  );

  const tabItems = useMemo(
    () =>
      tabs.map((tab) => (
        <TabItem
          key={tab.label}
          tab={tab}
          isActive={pathname === tab.path}
          onPress={() => handleTabPress(tab.path)}
        />
      )),
    [pathname, handleTabPress]
  );

  return <View style={styles.container}>{tabItems}</View>;
});

BottomNavBar.displayName = "BottomNavBar";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background.primary,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.background.secondary,
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
    backgroundColor: colors.background.secondary,
  },
  label: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: "500",
  },
  activeLabel: {
    color: colors.text.primary,
    fontWeight: "600",
  },
});

export default BottomNavBar;
