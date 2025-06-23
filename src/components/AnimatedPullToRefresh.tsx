import React, { useCallback, useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

interface AnimatedPullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  style?: any;
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function AnimatedPullToRefresh({
  children,
  onRefresh,
  refreshing = false,
  style,
}: AnimatedPullToRefreshProps) {
  const refreshingValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const handleRefresh = useCallback(async () => {
    refreshingValue.value = withTiming(1, { duration: 300 });
    scaleValue.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    opacityValue.value = withTiming(0.7, { duration: 200 });

    try {
      await onRefresh();
    } finally {
      refreshingValue.value = withTiming(0, { duration: 300 });
      scaleValue.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacityValue.value = withTiming(1, { duration: 200 });
    }
  }, [onRefresh, refreshingValue, scaleValue, opacityValue]);

  useEffect(() => {
    if (refreshing) {
      refreshingValue.value = withTiming(1, { duration: 300 });
    } else {
      refreshingValue.value = withTiming(0, { duration: 300 });
    }
  }, [refreshing, refreshingValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  return (
    <AnimatedScrollView
      style={[styles.container, style, animatedStyle]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.text.secondary}
          colors={[colors.text.secondary]}
          progressBackgroundColor={colors.background.secondary}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {children}
    </AnimatedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
