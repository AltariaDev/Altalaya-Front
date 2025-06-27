import Highlighted from "@/components/Pages/ExploreScreen/Highlighted";
import PopularSearch from "@/components/Pages/ExploreScreen/PopularSearch";
import SearchBar from "@/components/Pages/ExploreScreen/SearchBar";
import SearchResults from "@/components/Pages/ExploreScreen/SearchResults";
import SearchStatus from "@/components/Pages/ExploreScreen/SearchStatus";
import { useExploreAnimations } from "@/components/Pages/ExploreScreen/useExploreAnimations";
import { useExploreSearch } from "@/components/Pages/ExploreScreen/useExploreSearch";
import { colors } from "@/utils/theme";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ExploreScreen() {
  const {
    searchType,
    setSearchType,
    searchResults,
    isSearching,
    searchQuery,
    handleSearch,
    handlePopularSearch,
  } = useExploreSearch();

  const { containerAnimatedStyle } = useExploreAnimations();

  return (
    <AnimatedScrollView
      style={[styles.container, containerAnimatedStyle]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <SearchBar
        searchQuery={searchQuery}
        searchType={searchType}
        onSearch={handleSearch}
        setSearchType={setSearchType}
      />

      <PopularSearch onSearch={handlePopularSearch} searchType={searchType} />

      <SearchStatus
        isSearching={isSearching}
        hasResults={searchResults.length > 0}
        hasQuery={!!searchQuery}
      />

      {!isSearching && searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          searchType={searchType}
          searchQuery={searchQuery}
        />
      )}

      {!isSearching && searchResults.length === 0 && !searchQuery && (
        <Highlighted />
      )}
    </AnimatedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    padding: 20,
  },
});
