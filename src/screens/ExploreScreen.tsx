import React from "react";
import { ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

import Highlighted from "../components/Pages/ExploreScreen/Highlighted";
import PopularSearch from "../components/Pages/ExploreScreen/PopularSearch";
import SearchBar from "../components/Pages/ExploreScreen/SearchBar";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ExploreScreen = React.memo(() => {
  const containerTranslateY = useSharedValue(20);

  React.useEffect(() => {
    containerTranslateY.value = withSpring(0, {
      damping: 20,
      stiffness: 200,
      mass: 0.8,
    });
  }, [containerTranslateY]);

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
});

ExploreScreen.displayName = "ExploreScreen";

export default ExploreScreen;
