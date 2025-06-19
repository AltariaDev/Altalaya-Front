import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../../utils/theme";

const POPULAR_SEARCHES = [
  "Golden Gate Bridge",
  "San Francisco",
  "Cafeteria",
  "Nueva York",
  "Parque",
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function PopularSearch() {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const buttonAnimations = POPULAR_SEARCHES.map(() => ({
    scale: useSharedValue(0.8),
    opacity: useSharedValue(0),
    translateY: useSharedValue(50),
  }));

  useEffect(() => {
    // Animation du titre
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });

    // Animations en cascade des boutons
    buttonAnimations.forEach((animation, index) => {
      animation.opacity.value = withDelay(
        index * 100,
        withTiming(1, { duration: 600 })
      );
      animation.scale.value = withDelay(
        index * 100,
        withSpring(1, { damping: 15, stiffness: 150 })
      );
      animation.translateY.value = withDelay(
        index * 100,
        withSpring(0, { damping: 15, stiffness: 150 })
      );
    });
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const createButtonAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: buttonAnimations[index].opacity.value,
      transform: [
        { scale: buttonAnimations[index].scale.value },
        { translateY: buttonAnimations[index].translateY.value },
      ],
    }));
  };

  const handlePressIn = (index: number) => {
    buttonAnimations[index].scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = (index: number) => {
    buttonAnimations[index].scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  return (
    <>
      <Animated.Text
        style={[
          {
            color: colors.text.primary,
            fontWeight: "700",
            fontSize: 26,
            marginBottom: 20,
            letterSpacing: -0.5,
          },
          titleAnimatedStyle,
        ]}
      >
        Busquedas populares
      </Animated.Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {POPULAR_SEARCHES.map((item, index) => (
          <AnimatedTouchableOpacity
            key={item}
            style={[
              {
                backgroundColor: colors.background.secondary,
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 12,
                marginRight: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.detail,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              },
              createButtonAnimatedStyle(index),
            ]}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            activeOpacity={1}
          >
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {item}
            </Text>
          </AnimatedTouchableOpacity>
        ))}
      </View>
    </>
  );
}
