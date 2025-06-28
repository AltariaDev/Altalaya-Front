import { useMiradores, useMiradoresStore } from "@/store/miradoresStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { fetchMiradores } = useMiradoresStore((state) => state.actions);
  const miradores = useMiradores();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMiradores();
  }, [fetchMiradores]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMiradores();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {miradores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="eye-outline"
            size={64}
            color={colors.text.secondary}
          />
          <Text style={styles.emptyTitle}>No se encontró ningún mirador</Text>
          <Text style={styles.emptySubtitle}>
            Sea el primero en compartir un mirador!
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/CreateMirador")}
          >
            <Ionicons name="add" size={20} color={colors.background.primary} />
            <Text style={styles.createButtonText}>Crea un mirador</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={miradores}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/MiradorDetail",
                  params: { miradorId: item.id },
                })
              }
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Ionicons name="heart" size={14} color={colors.primary} />
                    <Text style={styles.statText}>{item.likesCount || 0}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={14}
                      color={colors.text.secondary}
                    />
                    <Text style={styles.statText}>
                      {item.commentsCount || 0}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: colors.background.secondary,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.text.secondary,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  createButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: "600",
  },
});
