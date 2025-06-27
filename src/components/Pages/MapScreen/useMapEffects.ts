import { useMiradoresStore } from "@/store/miradoresStore";
import { Mirador } from "@/types/mirador";
import { useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { Marker, Region } from "react-native-maps";

interface UseMapEffectsProps {
  location: { latitude: number; longitude: number } | null;
  miradorData: Mirador;
  region: Region;
  hasRegionChangedSignificantly: (
    newRegion: Region,
    lastRegion: Region | null
  ) => boolean;
  error: string | null;
}

export function useMapEffects({
  location,
  miradorData,
  region,
  hasRegionChangedSignificantly,
  error,
}: UseMapEffectsProps) {
  const { getNearbyMiradores } = useMiradoresStore((state) => state.actions);
  const lastRegionRef = useRef<Region | null>(null);
  const selectedMarkerRef = useRef<typeof Marker>(null);

  const handleRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      if (hasRegionChangedSignificantly(newRegion, lastRegionRef.current)) {
        lastRegionRef.current = newRegion;

        if (!miradorData) {
          getNearbyMiradores({
            lat: newRegion.latitude,
            lng: newRegion.longitude,
            radius: 1000,
          });
        }
      }
    },
    [hasRegionChangedSignificantly, getNearbyMiradores, miradorData]
  );

  // Initial load effect
  useEffect(() => {
    if (!miradorData && location) {
      getNearbyMiradores({
        lat: region.latitude,
        lng: region.longitude,
        radius: 1000,
      });
    }
  }, [location, miradorData, region, getNearbyMiradores]);

  // Error handling effect
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  // Selected marker effect
  useEffect(() => {
    if (miradorData && selectedMarkerRef.current) {
      setTimeout(() => {
        selectedMarkerRef.current?.showCallout();
      }, 500);
    }
  }, [miradorData]);

  return {
    selectedMarkerRef,
    handleRegionChangeComplete,
  };
}
