import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function useExploreAnimations() {
  const containerTranslateY = useSharedValue(20);

  useEffect(() => {
    containerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, [containerTranslateY]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: containerTranslateY.value }],
  }));

  return {
    containerAnimatedStyle,
  };
}
