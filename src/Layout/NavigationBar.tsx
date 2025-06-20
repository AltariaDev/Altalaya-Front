import { Ionicons } from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
    labelKey: "navigation.home",
    icon: "home" as const,
    path: "/" as TabPath,
  },
  {
    labelKey: "navigation.map",
    icon: "map" as const,
    path: "/MapMiradores" as TabPath,
  },
  {
    labelKey: "navigation.create",
    icon: "add-circle-outline" as const,
    path: "/CreateMirador" as TabPath,
  },
  {
    labelKey: "navigation.notifications",
    icon: "notifications-outline" as const,
    path: "/Notifications" as TabPath,
  },
  {
    labelKey: "navigation.profile",
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
    const { t } = useTranslation();
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
    }));

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
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={isActive ? colors.text.primary : colors.text.secondary}
          />
        </Animated.View>
        <Animated.Text style={[styles.label, textAnimatedStyle]}>
          {t(tab.labelKey)}
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
          key={tab.labelKey}
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
