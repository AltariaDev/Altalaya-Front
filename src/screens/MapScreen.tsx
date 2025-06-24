import { Mirador } from "@/services/miradores";
import { useIsLoading } from "@/store/miradoresStore";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import LoadingOverlay from "../components/Pages/MapScreen/LoadingOverlay";
import MapViewComponent from "../components/Pages/MapScreen/MapViewComponent";
import { useMapEffects } from "../components/Pages/MapScreen/useMapEffects";
import { useMapRegion } from "../components/Pages/MapScreen/useMapRegion";
import { useLocation } from "../hooks/useLocation";

export default function MapScreen() {
  const { location, isLoading: locationLoading, error } = useLocation();
  const { mirador } = useLocalSearchParams();
  const isLoading = useIsLoading();

  const miradorData: Mirador | null = mirador
    ? JSON.parse(mirador as string)
    : null;

  const { region, hasRegionChangedSignificantly } = useMapRegion({
    location,
    miradorData,
  });

  const { selectedMarkerRef, handleRegionChangeComplete } = useMapEffects({
    location,
    miradorData,
    region,
    hasRegionChangedSignificantly,
    error,
  });

  const isAnyLoading = locationLoading || isLoading;

  return (
    <View style={styles.container}>
      <LoadingOverlay isLoading={isAnyLoading} />
      <MapViewComponent
        region={region}
        miradorData={miradorData}
        selectedMarkerRef={selectedMarkerRef}
        onRegionChangeComplete={handleRegionChangeComplete}
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
