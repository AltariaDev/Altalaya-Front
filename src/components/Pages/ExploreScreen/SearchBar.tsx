import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  ColorValue,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { debounce, PERFORMANCE_CONFIG } from "../../../utils/performance";
import { colors } from "../../../utils/theme";

interface SearchBarProps {
  searchType?: "miradores" | "users";
  onSearch?: (query: string, type: "miradores" | "users") => void;
  setSearchType: (type: "miradores" | "users") => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const SearchBar = React.memo(
  ({ searchType = "miradores", onSearch, setSearchType }: SearchBarProps) => {
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
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    }));

    const handleTogglePress = () => {
      setSearchType(searchType === "miradores" ? "users" : "miradores");
    };

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
          if (text.trim()) {
            onSearch?.(text.trim(), searchType);
          }
        }, 300),
      [onSearch, searchType]
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
    const toggleOpacity = useSharedValue(0);
    const toggleScale = useSharedValue(0.8);
    const toggleTranslateY = useSharedValue(50);

    useEffect(() => {
      toggleOpacity.value = withSpring(1, {
        damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
        stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
      });
      toggleScale.value = withSpring(1, {
        damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
        stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
      });
      toggleTranslateY.value = withSpring(0, {
        damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
        stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
      });
    }, [toggleOpacity, toggleScale, toggleTranslateY]);

    const toggleAnimatedStyle = useAnimatedStyle(() => ({
      opacity: toggleOpacity.value,
      transform: [
        { scale: toggleScale.value },
        { translateY: toggleTranslateY.value },
      ],
    }));

    const gradientStyle = useMemo(
      () => ({
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        flex: 1,
      }),
      []
    );

    const placeholder =
      searchType === "miradores" ? "Buscar miradores" : "Buscar usuarios";

    return (
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={gradientColors as [ColorValue, ColorValue, ...ColorValue[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={gradientStyle}
        >
          <View style={containerStyle}>
            <Ionicons
              name={searchType === "miradores" ? "location" : "people"}
              size={24}
              color={colors.text.secondary}
            />
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.text.secondary}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleTextChange}
              style={inputStyle as TextStyle}
            />
          </View>
        </LinearGradient>
        <AnimatedTouchableOpacity
          style={[
            {
              backgroundColor: colors.background.secondary,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: colors.detail,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            },
            toggleAnimatedStyle,
          ]}
          onPress={handleTogglePress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={searchType === "miradores" ? "location" : "people"}
            size={16}
            color={colors.text.primary}
          />
        </AnimatedTouchableOpacity>
      </Animated.View>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
