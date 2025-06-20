import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useLocation } from "../hooks/useLocation";
import { useMiradores } from "../store";
import { PERFORMANCE_CONFIG } from "../utils/performance";
import { colors } from "../utils/theme";

const MapScreen = React.memo(() => {
  const { location, isLoading, error } = useLocation();
  const { mirador } = useLocalSearchParams();
  const miradores = useMiradores();
  const miradorData = mirador ? JSON.parse(mirador as string) : null;
  const selectedMarkerRef = useRef<any>(null);

  const defaultRegion: Region = useMemo(
    () => ({
      latitude: miradorData?.coordinate.latitude ?? 36.7213,
      longitude: miradorData?.coordinate.longitude ?? -4.4217,
      latitudeDelta: miradorData ? 0.01 : 0.0922,
      longitudeDelta: miradorData ? 0.01 : 0.0421,
    }),
    [miradorData]
  );

  const region = useMemo(() => {
    if (location) {
      return {
        latitude: miradorData?.coordinate.latitude ?? location.latitude,
        longitude: miradorData?.coordinate.longitude ?? location.longitude,
        latitudeDelta: miradorData ? 0.01 : 0.0922,
        longitudeDelta: miradorData ? 0.01 : 0.0421,
      };
    }
    return defaultRegion;
  }, [location, defaultRegion, miradorData]);

  const markers = useMemo(
    () =>
      miradores.map((marker) => (
        <Marker
          key={marker.key}
          ref={miradorData?.key === marker.key ? selectedMarkerRef : undefined}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          pinColor={miradorData?.key === marker.key ? colors.accent : undefined}
        />
      )),
    [miradores, miradorData]
  );

  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useEffect(() => {
    if (miradorData && selectedMarkerRef.current) {
      setTimeout(() => {
        selectedMarkerRef.current?.showCallout();
      }, 500);
    }
  }, [miradorData]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={PERFORMANCE_CONFIG.MAP_CONFIG.showsUserLocation}
        showsMyLocationButton={
          PERFORMANCE_CONFIG.MAP_CONFIG.showsMyLocationButton
        }
        loadingEnabled={PERFORMANCE_CONFIG.MAP_CONFIG.loadingEnabled}
        loadingIndicatorColor={colors.accent}
        loadingBackgroundColor={colors.background.primary}
        followsUserLocation={PERFORMANCE_CONFIG.MAP_CONFIG.followsUserLocation}
      >
        {markers}
      </MapView>
    </View>
  );
});

MapScreen.displayName = "MapScreen";

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
    borderColor: colors.detail,
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
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: colors.text.secondary,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
