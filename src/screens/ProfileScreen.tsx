import { USER, USER_POSTS } from "@/data/User";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image source={{ uri: USER.avatar }} style={styles.avatar} />
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.followers}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{USER.following}</Text>
                <Text style={styles.statLabel}>Siguiendo</Text>
              </View>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.username}>{USER.username}</Text>
            <Text style={styles.bio}>{USER.bio}</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/EditProfile")}
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Miradores</Text>
            <TouchableOpacity>
              <Ionicons
                name={viewMode === "grid" ? "grid-outline" : "list-outline"}
                size={24}
                color="#fff"
                onPress={handleViewMode}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.postsGrid, viewMode === "list" && styles.postsList]}
          >
            {USER_POSTS.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={[
                  styles.postCard,
                  viewMode === "list" && styles.postCardList,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/MiradorDetail",
                    params: {
                      mirador: JSON.stringify(post),
                    },
                  })
                }
              >
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <View style={styles.postStats}>
                    <View style={styles.postStat}>
                      <Ionicons name="heart" size={16} color="#fff" />
                      <Text style={styles.postStatText}>{post.likes}</Text>
                    </View>
                    <View style={styles.postStat}>
                      <Ionicons name="chatbubble" size={16} color="#fff" />
                      <Text style={styles.postStatText}>{post.comments}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#23262A",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    color: "#B6C2CF",
    fontSize: 14,
  },
  userInfo: {
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  username: {
    color: "#B6C2CF",
    fontSize: 16,
    marginBottom: 8,
  },
  bio: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: "#23262A",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  postsList: {
    flexDirection: "column",
  },
  postCardList: {
    width: "100%",
    padding: 8,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  postCard: {
    width: "50%",
    padding: 8,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#23262A",
  },
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 16,
    justifyContent: "flex-end",
    padding: 12,
  },
  postStats: {
    flexDirection: "row",
    gap: 16,
  },
  postStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postStatText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  settingsButton: {
    backgroundColor: "#23262A",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
});
