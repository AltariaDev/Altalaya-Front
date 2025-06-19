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

const parks = [
  {
    title: "Bernal Heights Park",
    views: "8.2k",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Twin Peaks",
    views: "9.5k",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  },
  {
    title: "Mission Dolores Park",
    views: "10.3k",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  {
    title: "Buena Vista Park",
    views: "11k",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
  },
  {
    title: "Golden Gate Park",
    views: "12k",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  },
  {
    title: "Alamo Square",
    views: "13k",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={parks}
        numColumns={2}
        keyExtractor={(_, i) => i.toString()}
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
    backgroundColor: "#121417",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1c2426",
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
    backgroundColor: "#222",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  views: {
    color: "#B6C2CF",
    fontSize: 16,
    fontWeight: "500",
  },
});
