import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMiradores } from "../store";
import { colors } from "../utils/theme";

export default function HomeScreen() {
  const router = useRouter();
  const miradores = useMiradores();

  return (
    <View style={styles.container}>
      <FlatList
        data={miradores}
        numColumns={2}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/MiradorDetail",
                params: { mirador: JSON.stringify(item) },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.views}>{item.views} views</Text>
            </View>
          </TouchableOpacity>
        )}
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
  views: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
