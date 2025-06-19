import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

interface AnimatedPullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing: boolean;
  threshold?: number;
}

const AnimatedPullToRefresh: React.FC<AnimatedPullToRefreshProps> = ({
  children,
  onRefresh,
  refreshing,
  threshold = 100,
}) => {
  const scrollY = useSharedValue(0);
  const refreshingValue = useSharedValue(0);
  const iconRotation = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const pullProgress = useDerivedValue(() => {
    return interpolate(
      scrollY.value,
      [0, threshold],
      [0, 1],
      Extrapolate.CLAMP
    );
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      pullProgress.value,
      [0, 1],
      [0, 360],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      pullProgress.value,
      [0, 1],
      [0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotate: `${rotation}deg` }, { scale }],
      opacity: pullProgress.value,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pullProgress.value,
      transform: [
        {
          translateY: interpolate(
            pullProgress.value,
            [0, 1],
            [20, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const handleRefresh = useCallback(async () => {
    refreshingValue.value = 1;
    await onRefresh();
    refreshingValue.value = 0;
  }, [onRefresh]);

  const refreshIndicatorStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-threshold, 0],
      [0, -threshold],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.refreshIndicator, refreshIndicatorStyle]}>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Ionicons
            name={refreshing ? "sync" : "arrow-down"}
            size={24}
            color="#007AFF"
          />
        </Animated.View>
        <Animated.Text style={[styles.refreshText, textAnimatedStyle]}>
          {refreshing ? "Actualizando..." : "Tira para actualizar"}
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(254, 116, 41, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  refreshText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default AnimatedPullToRefresh;
