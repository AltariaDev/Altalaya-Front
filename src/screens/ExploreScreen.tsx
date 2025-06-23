import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useMiradores } from "../store";
import { colors } from "../utils/theme";

import Highlighted from "../components/Pages/ExploreScreen/Highlighted";
import PopularSearch from "../components/Pages/ExploreScreen/PopularSearch";
import SearchBar from "../components/Pages/ExploreScreen/SearchBar";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ExploreScreen() {
  const miradores = useMiradores();
  const containerTranslateY = useSharedValue(20);

  React.useEffect(() => {
    containerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, [containerTranslateY]);

  // Fetch miradores on component mount
  useEffect(() => {
    // Fetch miradores logic here if needed
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: containerTranslateY.value }],
  }));

  return (
    <AnimatedScrollView
      style={[
        { flex: 1, backgroundColor: colors.background.primary },
        containerAnimatedStyle,
      ]}
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      windowSize={10}
    >
      {/* Search Bar */}
      <SearchBar />

      {/* Popular Searches */}
      <PopularSearch />

      {/* Highlighted */}
      <Highlighted />
    </AnimatedScrollView>
  );
}

ExploreScreen.displayName = "ExploreScreen";
