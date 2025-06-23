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

const POPULAR_MIRADORES_SEARCHES = [
  "Golden Gate Bridge",
  "San Francisco",
  "Cafeteria",
  "Nueva York",
  "Parque",
];

const POPULAR_USERS_SEARCHES = [
  "Fotógrafos",
  "Viajeros",
  "Arquitectos",
  "Artistas",
  "Exploradores",
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface PopularSearchProps {
  onSearch?: (query: string, type: "miradores" | "users") => void;
  searchType: "miradores" | "users";
}

export default function PopularSearch({
  onSearch,
  searchType,
}: PopularSearchProps) {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);

  const toggleScale = useSharedValue(0.8);
  const toggleOpacity = useSharedValue(0);
  const toggleTranslateY = useSharedValue(50);

  const button1Scale = useSharedValue(0.8);
  const button1Opacity = useSharedValue(0);
  const button1TranslateY = useSharedValue(50);

  const button2Scale = useSharedValue(0.8);
  const button2Opacity = useSharedValue(0);
  const button2TranslateY = useSharedValue(50);

  const button3Scale = useSharedValue(0.8);
  const button3Opacity = useSharedValue(0);
  const button3TranslateY = useSharedValue(50);

  const button4Scale = useSharedValue(0.8);
  const button4Opacity = useSharedValue(0);
  const button4TranslateY = useSharedValue(50);

  const button5Scale = useSharedValue(0.8);
  const button5Opacity = useSharedValue(0);
  const button5TranslateY = useSharedValue(50);

  const buttonAnimations = [
    {
      scale: button1Scale,
      opacity: button1Opacity,
      translateY: button1TranslateY,
    },
    {
      scale: button2Scale,
      opacity: button2Opacity,
      translateY: button2TranslateY,
    },
    {
      scale: button3Scale,
      opacity: button3Opacity,
      translateY: button3TranslateY,
    },
    {
      scale: button4Scale,
      opacity: button4Opacity,
      translateY: button4TranslateY,
    },
    {
      scale: button5Scale,
      opacity: button5Opacity,
      translateY: button5TranslateY,
    },
  ];

  const currentSearches =
    searchType === "miradores"
      ? POPULAR_MIRADORES_SEARCHES
      : POPULAR_USERS_SEARCHES;

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });

    toggleOpacity.value = withDelay(50, withTiming(1, { duration: 600 }));
    toggleScale.value = withDelay(
      50,
      withSpring(1, { damping: 15, stiffness: 150 })
    );
    toggleTranslateY.value = withDelay(
      50,
      withSpring(0, { damping: 15, stiffness: 150 })
    );

    buttonAnimations.forEach((animation, index) => {
      animation.opacity.value = withDelay(
        (index + 1) * 100,
        withTiming(1, { duration: 600 })
      );
      animation.scale.value = withDelay(
        (index + 1) * 100,
        withSpring(1, { damping: 15, stiffness: 150 })
      );
      animation.translateY.value = withDelay(
        (index + 1) * 100,
        withSpring(0, { damping: 15, stiffness: 150 })
      );
    });
  }, [
    buttonAnimations,
    titleOpacity,
    titleTranslateY,
    toggleOpacity,
    toggleScale,
    toggleTranslateY,
  ]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const button1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button1Opacity.value,
    transform: [
      { scale: button1Scale.value },
      { translateY: button1TranslateY.value },
    ],
  }));

  const button2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button2Opacity.value,
    transform: [
      { scale: button2Scale.value },
      { translateY: button2TranslateY.value },
    ],
  }));

  const button3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button3Opacity.value,
    transform: [
      { scale: button3Scale.value },
      { translateY: button3TranslateY.value },
    ],
  }));

  const button4AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button4Opacity.value,
    transform: [
      { scale: button4Scale.value },
      { translateY: button4TranslateY.value },
    ],
  }));

  const button5AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button5Opacity.value,
    transform: [
      { scale: button5Scale.value },
      { translateY: button5TranslateY.value },
    ],
  }));

  const buttonAnimatedStyles = [
    button1AnimatedStyle,
    button2AnimatedStyle,
    button3AnimatedStyle,
    button4AnimatedStyle,
    button5AnimatedStyle,
  ];

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

  const handleSearchPress = (query: string) => {
    onSearch?.(query, searchType);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Animated.Text
          style={[
            {
              color: colors.text.primary,
              fontWeight: "700",
              fontSize: 26,
              letterSpacing: -0.5,
            },
            titleAnimatedStyle,
          ]}
        >
          Busquedas populares
        </Animated.Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {currentSearches.map((item, index) => (
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
              buttonAnimatedStyles[index],
            ]}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            onPress={() => handleSearchPress(item)}
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
