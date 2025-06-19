import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Modal from "../components/Modal";

interface MarkerType {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  key: string;
  title: string;
  description?: string;
}

const MapScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [newMarkerTitle, setNewMarkerTitle] = useState("");
  const [newMarkerDescription, setNewMarkerDescription] = useState("");
  const [region, setRegion] = useState<Region>({
    latitude: 36.7213,
    longitude: -4.4217,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert("Error", "Could not get location");
    } finally {
      setIsLoading(false);
    }
  };

  const onMapPress = (e: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    const coordinate = e.nativeEvent.coordinate;
    setSelectedCoordinate(coordinate);
    setIsModalVisible(true);
  };

  const handleAddMarker = () => {
    if (!selectedCoordinate || !newMarkerTitle) return;

    setMarkers([
      ...markers,
      {
        coordinate: selectedCoordinate,
        key: Date.now().toString(),
        title: newMarkerTitle,
        description: newMarkerDescription,
      },
    ]);

    setNewMarkerTitle("");
    setNewMarkerDescription("");
    setIsModalVisible(false);
    setSelectedCoordinate(null);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onLongPress={onMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>

      <Modal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedCoordinate(null);
          setNewMarkerTitle("");
          setNewMarkerDescription("");
        }}
        title="Añadir Mirador"
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del mirador"
            value={newMarkerTitle}
            onChangeText={setNewMarkerTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={newMarkerDescription}
            onChangeText={setNewMarkerDescription}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[styles.button, !newMarkerTitle && styles.buttonDisabled]}
            onPress={handleAddMarker}
            disabled={!newMarkerTitle}
          >
            <Text style={styles.buttonText}>Añadir Mirador</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
  modalContent: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
