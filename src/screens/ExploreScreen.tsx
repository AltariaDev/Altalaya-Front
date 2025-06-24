import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { miradoresService } from "../services/miradores";
import { usersService } from "../services/users";
import { colors } from "../utils/theme";

import { router } from "expo-router";
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
  const [searchQuery, setSearchQuery] = useState("");

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
      setSearchQuery("");
      return;
    }

    setIsSearching(true);
    setSearchType(type);
    setSearchQuery(query);

    try {
      if (type === "miradores") {
        const response = await miradoresService.searchMiradores({ query });
        setSearchResults(response.data);
      } else {
        const response = await usersService.searchUsers({ query });
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
        searchQuery={searchQuery}
        searchType={searchType}
        onSearch={handleSearch}
        setSearchType={setSearchType}
      />

      <PopularSearch onSearch={handlePopularSearch} searchType={searchType} />
      {!isSearching && searchQuery && searchResults.length === 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.text.secondary, textAlign: "center" }}>
            No se encontraron resultados
          </Text>
        </View>
      )}

      {isSearching && (
        <Animated.View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.text.secondary, textAlign: "center" }}>
            Buscando...
          </Text>
        </Animated.View>
      )}

      {!isSearching && searchResults.length > 0 && (
        <Animated.View>
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
            <TouchableOpacity
              key={item.id || index}
              onPress={() => {
                if (searchType === "miradores") {
                  router.push({
                    pathname: "/MiradorDetail",
                    params: {
                      mirador: JSON.stringify(item),
                    },
                  });
                } else {
                  router.push({
                    pathname: "/UserDetail",
                    params: { id: item.id, searchQuery },
                  });
                }
              }}
              style={{
                backgroundColor: colors.background.secondary,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.detail,
                flexDirection: "row",
                alignItems: "center",
                height: 150,
              }}
            >
              <Image
                source={{
                  uri:
                    searchType === "miradores"
                      ? item.imageUrl
                      : item.avatarUrl || "https://via.placeholder.com/50",
                }}
                style={{
                  width: 100,
                  height: "100%",
                  borderRadius: 5,
                  marginRight: 12,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 24,
                    fontWeight: "500",
                  }}
                >
                  {searchType === "miradores" ? item.title : item.username}
                </Text>
                {searchType === "miradores" && item.description && (
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 18,
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
                      fontSize: 18,
                      marginTop: 4,
                    }}
                  >
                    {item.bio}
                  </Text>
                )}
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 16,
                    marginTop: 4,
                    fontWeight: "500",
                    textDecorationLine: "underline",
                    textDecorationColor: colors.detail,
                    textDecorationStyle: "solid",
                  }}
                >
                  Ver más
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {!isSearching && searchResults.length === 0 && !searchQuery && (
        <Highlighted />
      )}
    </AnimatedScrollView>
  );
}

ExploreScreen.displayName = "ExploreScreen";
