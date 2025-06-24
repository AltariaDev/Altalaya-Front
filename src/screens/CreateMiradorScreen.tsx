import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { Mirador, miradoresService } from "../services/miradores";
import { useIsLoading, useMiradoresStore } from "../store/miradoresStore";
import { colors } from "../utils/theme";

export default function CreateMiradorScreen() {
  const { mirador, isEditing } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  const [region, setRegion] = useState({
    latitude: 36.7213,
    longitude: -4.4217,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const { createMirador } = useMiradoresStore((state) => state.actions);
  const isLoading = useIsLoading();
  const { handleError, handleAsyncError } = useErrorHandler();

  const isEditMode = isEditing === "true";
  const miradorData: Mirador | null = mirador
    ? JSON.parse(mirador as string)
    : null;

  useEffect(() => {
    if (isEditMode && miradorData && !isInitialized) {
      setTitle(miradorData.title);
      setDescription(miradorData.description || "");
      setImage(miradorData.imageUrl);
      setSelectedLocation({
        latitude: Number(miradorData.latitude),
        longitude: Number(miradorData.longitude),
        address: `${miradorData.city}, ${miradorData.country}`,
      });
      setRegion({
        latitude: Number(miradorData.latitude),
        longitude: Number(miradorData.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsInitialized(true);
    }
  }, [isEditMode, miradorData, isInitialized]);

  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos de ubicación para crear un mirador"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación actual");
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    await handleAsyncError(async () => {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const addressString = [
          address.street,
          address.city,
          address.region,
          address.country,
        ]
          .filter(Boolean)
          .join(", ");

        setSelectedLocation((prev) => ({
          ...prev!,
          address: addressString,
        }));
      }
    }, "Error al obtener la dirección");
  };

  const pickImage = async () => {
    await handleAsyncError(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }, "Error al seleccionar la imagen");
  };

  const handleSubmit = async () => {
    if (!title || !image || !selectedLocation) {
      handleError("Por favor completa todos los campos");
      return;
    }

    await handleAsyncError(
      async () => {
        // const uploadResponse = await uploadService.uploadImage(image);

        const addressParts = selectedLocation.address?.split(", ") || [];
        const city = addressParts[1] || "Málaga";
        const country = addressParts[3] || "España";

        const newMiradorData = {
          title,
          description: description || undefined,
          imageUrl: "https://i.pravatar.cc/300?img=17",
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          city,
          country,
        };

        console.log("miradorData", newMiradorData);

        if (isEditMode && miradorData) {
          await miradoresService.updateMirador(miradorData.id, newMiradorData);
        } else {
          await createMirador(newMiradorData);
        }

        router.back();
      },
      isEditMode
        ? "Error al actualizar el mirador"
        : "Error al crear el mirador"
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? "Editar Mirador" : "Crear Mirador"}
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              (!title || !image || !selectedLocation || isLoading) &&
                styles.submitButtonDisabled,
            ]}
            disabled={!title || !image || !selectedLocation || isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading
                ? isEditMode
                  ? "Actualizando..."
                  : "Publicando..."
                : isEditMode
                ? "Actualizar"
                : "Publicar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="image-outline"
                size={48}
                color={colors.text.secondary}
              />
              <Text style={styles.imagePlaceholderText}>
                Toca para seleccionar una imagen
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Nombre del mirador"
              placeholderTextColor={colors.text.secondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe este mirador..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.mapContainer}>
            <Text style={styles.label}>Ubicación</Text>
            <MapView
              style={styles.map}
              region={region}
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  key={`${selectedLocation.latitude}-${selectedLocation.longitude}`}
                  coordinate={{
                    latitude: Number(selectedLocation.latitude),
                    longitude: Number(selectedLocation.longitude),
                  }}
                  pinColor={colors.accent}
                />
              )}
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  submitButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: colors.background.secondary,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: colors.text.secondary,
    fontSize: 16,
    marginTop: 12,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 8,
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    color: colors.text.primary,
    fontSize: 16,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  locationTextInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
    marginLeft: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  mapContainer: {
    height: 350,
    marginBottom: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    padding: 10,
    borderRadius: 12,
  },
  currentLocationText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  map: {
    flex: 1,
  },
  addressText: {
    color: colors.text.primary,
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});
