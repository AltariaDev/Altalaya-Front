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
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  delay = 0,
  duration = 600,
  direction = "fade",
  distance = 50,
  children,
  style,
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

  // Set initial values
  useEffect(() => {
    if (initialValues.translateY !== undefined) {
      translateY.value = initialValues.translateY;
    }
    if (initialValues.translateX !== undefined) {
      translateX.value = initialValues.translateX;
    }
    if (initialValues.scale !== undefined) {
      scale.value = initialValues.scale;
    }
    opacity.value = initialValues.opacity;
  }, []);

  return (
    <Animated.View style={[style, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
