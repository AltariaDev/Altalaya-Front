import { AnimatedButtonProps } from "@/types/components";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const handlePressIn = (event: any) => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    pressed.value = withSpring(1, { damping: 15, stiffness: 300 });
    if (onPressIn) onPressIn(event);
  };

  const handlePressOut = (event: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    pressed.value = withSpring(0, { damping: 15, stiffness: 300 });
    if (onPressOut) onPressOut(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "primary":
        return [...baseStyle, styles.primary];
      case "secondary":
        return [...baseStyle, styles.secondary];
      case "outline":
        return [...baseStyle, styles.outline];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case "primary":
        return [...baseStyle, styles.primaryText];
      case "secondary":
        return [...baseStyle, styles.secondaryText];
      case "outline":
        return [...baseStyle, styles.outlineText];
      default:
        return baseStyle;
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[getButtonStyle(), animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      {...props}
    >
      {children}
      <Text style={getTextStyle()}>{title}</Text>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    fontWeight: "600",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: colors.text.primary,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary,
  },
});

export default AnimatedButton;
