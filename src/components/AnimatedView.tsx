import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface AnimatedViewProps extends ViewProps {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  distance?: number;
  children: React.ReactNode;
  isVisible: boolean;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  delay = 0,
  duration = 600,
  direction = "fade",
  distance = 50,
  children,
  style,
  isVisible,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    const startAnimation = () => {
      switch (direction) {
        case "up":
          translateY.value = withDelay(
            delay,
            withSpring(0, { damping: 15, stiffness: 150 })
          );
          opacity.value = withDelay(delay, withTiming(1, { duration }));
          break;
        case "down":
          translateY.value = withDelay(
            delay,
            withSpring(0, { damping: 15, stiffness: 150 })
          );
          opacity.value = withDelay(delay, withTiming(1, { duration }));
          break;
        case "left":
          translateX.value = withDelay(
            delay,
            withSpring(0, { damping: 15, stiffness: 150 })
          );
          opacity.value = withDelay(delay, withTiming(1, { duration }));
          break;
        case "right":
          translateX.value = withDelay(
            delay,
            withSpring(0, { damping: 15, stiffness: 150 })
          );
          opacity.value = withDelay(delay, withTiming(1, { duration }));
          break;
        case "scale":
          scale.value = withDelay(
            delay,
            withSpring(1, { damping: 15, stiffness: 150 })
          );
          opacity.value = withDelay(delay, withTiming(1, { duration }));
          break;
        case "fade":
        default:
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration, easing: Easing.out(Easing.cubic) })
          );
          break;
      }
    };

    startAnimation();
  }, [delay, duration, direction, distance]);

  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { translateY: distance, opacity: 0 };
      case "down":
        return { translateY: -distance, opacity: 0 };
      case "left":
        return { translateX: distance, opacity: 0 };
      case "right":
        return { translateX: -distance, opacity: 0 };
      case "scale":
        return { scale: 0.9, opacity: 0 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const initialValues = getInitialValues();

  const animatedStyle = useAnimatedStyle(() => {
    const transforms = [];

    if (direction === "scale") {
      transforms.push({ scale: scale.value });
    }
    if (direction === "up" || direction === "down") {
      transforms.push({ translateY: translateY.value });
    }
    if (direction === "left" || direction === "right") {
      transforms.push({ translateX: translateX.value });
    }

    return {
      opacity: opacity.value,
      transform: transforms,
    };
  });

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 600 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
      translateX.value = withSpring(initialValues.translateX, {
        damping: 15,
        stiffness: 150,
      });
      translateY.value = withSpring(initialValues.translateY, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [
    isVisible,
    opacity,
    scale,
    translateX,
    translateY,
    initialValues.translateX,
    initialValues.translateY,
  ]);

  useEffect(() => {
    // Reset to initial values when component mounts
    opacity.value = initialValues.opacity;
    scale.value = initialValues.scale;
    translateX.value = initialValues.translateX;
    translateY.value = initialValues.translateY;
  }, [
    initialValues.opacity,
    initialValues.scale,
    initialValues.translateX,
    initialValues.translateY,
    opacity,
    scale,
    translateX,
    translateY,
  ]);

  return (
    <Animated.View style={[style, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
