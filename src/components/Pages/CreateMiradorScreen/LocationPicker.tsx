import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapPressEvent, MapType, Marker } from "react-native-maps";
import { colors } from "../../../utils/theme";

interface LocationPickerProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  selectedLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null;
  onMapPress: (event: MapPressEvent) => void;
}

const mapTypes: { type: MapType; label: string }[] = [
  { type: "standard", label: "Estándar" },
  { type: "satellite", label: "Satélite" },
  { type: "hybrid", label: "Híbrido" },
];

export default function LocationPicker({
  region,
  selectedLocation,
  onMapPress,
}: LocationPickerProps) {
  const [currentMapTypeIndex, setCurrentMapTypeIndex] = useState(0);

  const toggleMapType = () => {
    setCurrentMapTypeIndex((prev) => (prev + 1) % mapTypes.length);
  };

  return (
    <View style={styles.mapContainer}>
      <View style={styles.header}>
        <Text style={styles.label}>Ubicación</Text>
        <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
          <Text style={styles.mapTypeButtonText}>
            {mapTypes[currentMapTypeIndex].label}
          </Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={region}
        onPress={onMapPress}
        mapType={mapTypes[currentMapTypeIndex].type}
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
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 350,
    marginBottom: 24,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  label: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  mapTypeButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapTypeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  map: {
    flex: 1,
  },
});
