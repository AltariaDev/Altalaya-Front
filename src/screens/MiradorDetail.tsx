import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MiradorDetail() {
  const { mirador } = useLocalSearchParams();
  const miradorData = JSON.parse(mirador as string);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{miradorData.title}</Text>
        </View>

        <View style={styles.locationRow}>
          <View style={styles.locationIconBox}>
            <Ionicons name="location-outline" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.locationCity}>San Francisco</Text>
            <Text style={styles.locationPlace}>California, USA</Text>
          </View>
          <Text style={styles.timeAgo}>Hace 2 horas</Text>
        </View>

        <Image source={{ uri: miradorData.image }} style={styles.mainImage} />

        <Text style={styles.description}>
          Una vista impresionante del puente Golden Gate desde el mirador más
          alto de San Francisco. Perfecto para disfrutar del atardecer y tomar
          fotos increíbles.
        </Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#B6C2CF" />
            <Text style={styles.iconText}>2.4k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#B6C2CF" />
            <Text style={styles.iconText}>1.2k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={24} color="#B6C2CF" />
            <Text style={styles.iconText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            style={styles.avatar}
          />
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Añade un comentario..."
              placeholderTextColor="#7a8a99"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121417",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  locationIconBox: {
    width: 48,
    height: 48,
    backgroundColor: "#23262A",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCity: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  locationPlace: {
    color: "#B6C2CF",
    fontSize: 16,
    fontWeight: "500",
  },
  timeAgo: {
    color: "#B6C2CF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: "auto",
  },
  mainImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
    paddingHorizontal: 24,
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 24,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    color: "#B6C2CF",
    fontSize: 16,
    fontWeight: "500",
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#23262A",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 12,
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: "#2d353a",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
