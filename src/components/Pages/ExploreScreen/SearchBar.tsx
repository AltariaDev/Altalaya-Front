import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useMemo } from "react";
import { TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { debounce, PERFORMANCE_CONFIG } from "../../../utils/performance";
import { colors } from "../../../utils/theme";

const SearchBar = React.memo(() => {
  const scale = useSharedValue(0.9);
  const focusScale = useSharedValue(1);
  const isFocused = useSharedValue(false);

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
      stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * focusScale.value }],
  }));

  const handleFocus = useCallback(() => {
    isFocused.value = true;
    focusScale.value = withSpring(1.01, {
      damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
      stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
    });
  }, [isFocused, focusScale]);

  const handleBlur = useCallback(() => {
    isFocused.value = false;
    focusScale.value = withSpring(1, {
      damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
      stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
    });
  }, [isFocused, focusScale]);

  const handleTextChange = useMemo(
    () =>
      debounce((text: string) => {
        // Handle search logic here
        console.log("Searching for:", text);
      }, 300),
    []
  );

  const gradientColors = useMemo(
    () => [colors.background.secondary, colors.detail],
    []
  );

  const inputStyle = useMemo(
    () => ({
      flex: 1,
      color: colors.text.primary,
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "500",
    }),
    []
  );

  const containerStyle = useMemo(
    () => ({
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: 20,
      height: 60,
    }),
    []
  );

  const gradientStyle = useMemo(
    () => ({
      borderRadius: 20,
      marginBottom: 32,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    }),
    []
  );

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={gradientStyle}
      >
        <View style={containerStyle}>
          <Ionicons name="search" size={24} color={colors.text.secondary} />
          <TextInput
            placeholder="Buscar miradores"
            placeholderTextColor={colors.text.secondary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            style={inputStyle}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
