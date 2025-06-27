import EmptyFavorites from "@/components/Pages/FavoritesScreen/EmptyFavorites";
import FavoriteMiradorCard from "@/components/Pages/FavoritesScreen/FavoriteMiradorCard";
import FavoritesHeader from "@/components/Pages/FavoritesScreen/FavoritesHeader";
import { useFavorites } from "@/components/Pages/FavoritesScreen/useFavorites";
import { colors } from "@/utils/theme";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites, isLoading, isRefreshing, handleRefresh, timeAgo } =
    useFavorites();

  const renderMirador = ({ item }: { item: any }) => (
    <FavoriteMiradorCard mirador={item} timeAgo={timeAgo} />
  );

  if (favorites.length === 0 && !isLoading) {
    return (
      <View style={styles.container}>
        <FavoritesHeader favoritesCount={favorites.length} />
        <EmptyFavorites />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FavoritesHeader favoritesCount={favorites.length} />
      <FlatList
        data={favorites}
        renderItem={renderMirador}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  listContainer: {
    paddingVertical: 16,
  },
});
