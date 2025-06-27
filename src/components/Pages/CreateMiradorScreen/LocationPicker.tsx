import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
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

export default function LocationPicker({
  region,
  selectedLocation,
  onMapPress,
}: LocationPickerProps) {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.label}>Ubicación</Text>
      <MapView style={styles.map} region={region} onPress={onMapPress}>
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
  label: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 8,
  },
  map: {
    flex: 1,
  },
});
