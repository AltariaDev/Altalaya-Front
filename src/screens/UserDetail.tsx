import { usersService } from "@/services/users";
import { useUser } from "@/store/userStore";
import { User } from "@/types/user";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function UserDetail() {
  const { userId } = useLocalSearchParams();
  const currentUser = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const containerTranslateY = useSharedValue(20);

  useEffect(() => {
    containerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, [containerTranslateY]);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const userData = await usersService.getProfileByUserId(userId as string);
      setUser(userData);
      setFollowersCount(userData.followers.length);
      setFollowingCount(userData.following.length);

      // if (currentUser?.id !== userData.id) {
      //   const following = await usersService.isFollowing(userData.id);
      //   setIsFollowing(following);
      // }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "No se pudo cargar la información del usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user || !currentUser) return;

    try {
      if (isFollowing) {
        await usersService.unfollowUserById(user.id);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await usersService.followUserById(user.id);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
      Alert.alert("Error", "No se pudo completar la acción");
    }
  };

  const handleMessage = () => {
    // TODO: Implement messaging functionality
    Alert.alert("Mensajes", "Funcionalidad de mensajes próximamente");
  };

  const handleViewFollowers = () => {
    if (!user) return;
    // TODO: Navigate to followers list
    Alert.alert("Seguidores", "Lista de seguidores próximamente");
  };

  const handleViewFollowing = () => {
    if (!user) return;
    // TODO: Navigate to following list
    Alert.alert("Siguiendo", "Lista de usuarios seguidos próximamente");
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: containerTranslateY.value }],
  }));

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Usuario no encontrado</Text>
      </View>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <AnimatedScrollView
      style={[styles.container, containerAnimatedStyle]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerRight}>
          {!isOwnProfile && (
            <TouchableOpacity
              style={styles.messageButton}
              onPress={handleMessage}
            >
              <Ionicons
                name="mail-outline"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`,
          }}
          style={styles.avatar}
        />

        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>

        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={handleViewFollowers}
          >
            <Text style={styles.statNumber}>{followersCount}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={handleViewFollowing}
          >
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </TouchableOpacity>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.posts ?? 0}</Text>
            <Text style={styles.statLabel}>Miradores</Text>
          </View>
        </View>

        {!isOwnProfile && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollow}
            >
              <Ionicons
                name={isFollowing ? "checkmark" : "add"}
                size={20}
                color={
                  isFollowing ? colors.text.primary : colors.background.primary
                }
              />
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Siguiendo" : "Seguir"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isOwnProfile && (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => router.push("/EditProfile")}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.text.primary}
            />
            <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Miradores</Text>

        {user.posts === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="camera-outline"
              size={48}
              color={colors.text.secondary}
            />
            <Text style={styles.emptyStateText}>
              {isOwnProfile
                ? "Aún no has creado ningún mirador"
                : `${user.name} aún no ha creado ningún mirador`}
            </Text>
            {isOwnProfile && (
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push("/CreateMirador")}
              >
                <Text style={styles.createButtonText}>Crear Mirador</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.postsGrid}>
            <Text style={styles.comingSoonText}>
              Lista de miradores próximamente
            </Text>
          </View>
        )}
      </View>
    </AnimatedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  errorText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.detail,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  followingButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.detail,
  },
  followButtonText: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  followingButtonText: {
    color: colors.text.primary,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.detail,
    gap: 8,
  },
  editProfileButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  postsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createButtonText: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  postsGrid: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  comingSoonText: {
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
  },
});

UserDetail.displayName = "UserDetail";
