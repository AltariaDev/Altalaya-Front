import { Mirador } from "@/types/mirador";
import { useLocalSearchParams } from "expo-router";
import React, { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { MapMarker } from "react-native-maps";
import LoadingOverlay from "../components/Pages/MapScreen/LoadingOverlay";
import MapViewComponent from "../components/Pages/MapScreen/MapViewComponent";
import { useMapEffects } from "../components/Pages/MapScreen/useMapEffects";
import { useMapRegion } from "../components/Pages/MapScreen/useMapRegion";
import { useLocation } from "../hooks/useLocation";

export default function MapScreen() {
  const { location, error, isLoading } = useLocation();
  const { mirador } = useLocalSearchParams();

  const miradorData: Mirador | null = mirador
    ? JSON.parse(mirador as string)
    : null;

  const { region, hasRegionChangedSignificantly } = useMapRegion({
    location,
    miradorData,
  });

  const { selectedMarkerRef, handleRegionChangeComplete } = useMapEffects({
    location,
    miradorData: miradorData as Mirador,
    region,
    hasRegionChangedSignificantly,
    error,
  });

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={isLoading} />
      <MapViewComponent
        region={region}
        miradorData={miradorData as Mirador}
        selectedMarkerRef={selectedMarkerRef as RefObject<typeof MapMarker>}
        onRegionChangeComplete={handleRegionChangeComplete}
        currentLocation={
          location
            ? { latitude: location.latitude, longitude: location.longitude }
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
