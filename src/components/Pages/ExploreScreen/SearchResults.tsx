import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SearchResultsProps {
  searchResults: any[];
  searchType: "miradores" | "users";
  searchQuery: string;
}

export default function SearchResults({
  searchResults,
  searchType,
  searchQuery,
}: SearchResultsProps) {
  const handleItemPress = (item: any) => {
    if (searchType === "miradores") {
      router.push({
        pathname: "/MiradorDetail",
        params: {
          miradorId: item.mirador.id,
        },
      });
    } else {
      router.push({
        pathname: "/UserDetail",
        params: { userId: item.id, searchQuery },
      });
    }
  };

  return (
    <View>
      <Text style={styles.resultsTitle}>
        Resultados de búsqueda ({searchResults.length})
      </Text>
      {searchResults.map((item, index) => (
        <TouchableOpacity
          key={item.id || index}
          onPress={() => handleItemPress(item)}
          style={styles.resultCard}
        >
          <Image
            source={{
              uri:
                searchType === "miradores"
                  ? item.imageUrl
                  : item.avatarUrl || "https://via.placeholder.com/50",
            }}
            style={styles.resultImage}
          />
          <View style={styles.resultInfo}>
            <Text style={styles.resultTitle}>
              {searchType === "miradores" ? item.title : item.username}
            </Text>
            {searchType === "miradores" && item.description && (
              <Text style={styles.resultDescription}>{item.description}</Text>
            )}
            {searchType === "users" && item.bio && (
              <Text style={styles.resultDescription}>{item.bio}</Text>
            )}
            {searchType === "miradores" && (
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Ionicons name="heart" size={16} color={colors.primary} />
                  <Text style={styles.statText}>{item.likesCount || 0}</Text>
                </View>
                <View style={styles.stat}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={16}
                    color={colors.text.secondary}
                  />
                  <Text style={styles.statText}>{item.commentsCount || 0}</Text>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  resultsTitle: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.detail,
    flexDirection: "row",
    alignItems: "center",
    height: 150,
  },
  resultImage: {
    width: 100,
    height: "100%",
    borderRadius: 5,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "500",
  },
  resultDescription: {
    color: colors.text.secondary,
    fontSize: 18,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
});
