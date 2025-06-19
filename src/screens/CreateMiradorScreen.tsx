import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { colors } from "../utils/theme";

export default function CreateMiradorScreen() {
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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos",
          "Se necesitan permisos de ubicación para esta función"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    try {
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
    } catch (error) {
      console.log("Error reverse geocoding:", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement post creation with location data
    console.log("Creating mirador with:", {
      title,
      description,
      location: selectedLocation,
      image,
    });
    router.back();
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
          <Text style={styles.headerTitle}>Crear Mirador</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              (!title || !image || !selectedLocation) &&
                styles.submitButtonDisabled,
            ]}
            disabled={!title || !image || !selectedLocation}
          >
            <Text style={styles.submitButtonText}>Publicar</Text>
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
              placeholder="Nombre del mirador"
              placeholderTextColor={colors.text.secondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.mapContainer}>
            <View style={styles.mapHeader}>
              <Text style={styles.mapTitle}>Selecciona la ubicación</Text>
              <TouchableOpacity
                onPress={getCurrentLocation}
                style={styles.currentLocationButton}
              >
                <Ionicons name="locate" size={20} color={colors.text.primary} />
                <Text style={styles.currentLocationText}>Mi ubicación</Text>
              </TouchableOpacity>
            </View>
            <MapView
              style={styles.map}
              initialRegion={region}
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  title="Ubicación seleccionada"
                  description={selectedLocation.address}
                />
              )}
            </MapView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe el mirador..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
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
    backgroundColor: colors.background.secondary,
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
    marginBottom: 8,
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
});
