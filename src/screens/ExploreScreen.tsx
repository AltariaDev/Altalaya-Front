import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { miradoresService } from "../services/miradores";
import { usersService } from "../services/users";
import { colors } from "../utils/theme";

import Highlighted from "../components/Pages/ExploreScreen/Highlighted";
import PopularSearch from "../components/Pages/ExploreScreen/PopularSearch";
import SearchBar from "../components/Pages/ExploreScreen/SearchBar";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ExploreScreen() {
  const [searchType, setSearchType] = useState<"miradores" | "users">(
    "miradores"
  );
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const containerTranslateY = useSharedValue(20);

  React.useEffect(() => {
    containerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, [containerTranslateY]);

  const handleSearch = async (query: string, type: "miradores" | "users") => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchType(type);

    try {
      if (type === "miradores") {
        const response = await miradoresService.search({ q: query });
        setSearchResults(response.data);
      } else {
        const response = await usersService.searchUsers(query);
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePopularSearch = (query: string, type: "miradores" | "users") => {
    setSearchType(type);
    handleSearch(query, type);
  };

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
    >
      <SearchBar
        searchType={searchType}
        onSearch={handleSearch}
        setSearchType={setSearchType}
      />

      <PopularSearch onSearch={handlePopularSearch} searchType={searchType} />

      {isSearching && (
        <Animated.View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.text.secondary, textAlign: "center" }}>
            Buscando...
          </Text>
        </Animated.View>
      )}

      {!isSearching && searchResults.length > 0 && (
        <Animated.View style={{ marginTop: 20 }}>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 16,
            }}
          >
            Resultados de búsqueda ({searchResults.length})
          </Text>
          {searchResults.map((item, index) => (
            <View
              key={item.id || index}
              style={{
                backgroundColor: colors.background.secondary,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.detail,
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {searchType === "miradores" ? item.title : item.username}
              </Text>
              {searchType === "miradores" && item.description && (
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  {item.description}
                </Text>
              )}
              {searchType === "users" && item.bio && (
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  {item.bio}
                </Text>
              )}
            </View>
          ))}
        </Animated.View>
      )}

      {!isSearching && searchResults.length === 0 && <Highlighted />}
    </AnimatedScrollView>
  );
}

ExploreScreen.displayName = "ExploreScreen";
