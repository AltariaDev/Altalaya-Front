import { Mirador } from "@/types/mirador";
import { useCallback, useMemo } from "react";
import { Region } from "react-native-maps";

interface UseMapRegionProps {
  location: { latitude: number; longitude: number } | null;
  miradorData: Mirador | null;
}

export function useMapRegion({ location, miradorData }: UseMapRegionProps) {
  const defaultRegion: Region = useMemo(
    () => ({
      latitude: !isNaN(Number(miradorData?.latitude))
        ? Number(miradorData?.latitude)
        : 36.7213,
      longitude: !isNaN(Number(miradorData?.longitude))
        ? Number(miradorData?.longitude)
        : -4.4217,
      latitudeDelta: miradorData ? 0.01 : 0.0922,
      longitudeDelta: miradorData ? 0.01 : 0.0421,
    }),
    [miradorData]
  );

  const region = useMemo(() => {
    if (location) {
      return {
        latitude: !isNaN(Number(miradorData?.latitude))
          ? Number(miradorData?.latitude)
          : location.latitude,
        longitude: !isNaN(Number(miradorData?.longitude))
          ? Number(miradorData?.longitude)
          : location.longitude,
        latitudeDelta: miradorData ? 0.01 : 0.0922,
        longitudeDelta: miradorData ? 0.01 : 0.0421,
      };
    }
    return defaultRegion;
  }, [location, defaultRegion, miradorData]);

  const hasRegionChangedSignificantly = useCallback(
    (newRegion: Region, lastRegion: Region | null) => {
      if (!lastRegion) return true;

      const latDiff = Math.abs(newRegion.latitude - lastRegion.latitude);
      const lngDiff = Math.abs(newRegion.longitude - lastRegion.longitude);
      const latDeltaDiff = Math.abs(
        newRegion.latitudeDelta - lastRegion.latitudeDelta
      );
      const lngDeltaDiff = Math.abs(
        newRegion.longitudeDelta - lastRegion.longitudeDelta
      );

      const significantLatChange = latDiff > lastRegion.latitudeDelta * 0.2;
      const significantLngChange = lngDiff > lastRegion.longitudeDelta * 0.2;
      const significantZoomChange =
        latDeltaDiff > lastRegion.latitudeDelta * 0.3 ||
        lngDeltaDiff > lastRegion.longitudeDelta * 0.3;

      return (
        significantLatChange || significantLngChange || significantZoomChange
      );
    },
    []
  );

  return {
    region,
    hasRegionChangedSignificantly,
  };
}
