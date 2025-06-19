import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { PERFORMANCE_CONFIG } from "../utils/performance";

interface LocationState {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number | null;
}

interface UseLocationReturn {
  location: LocationState | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Vérifier les permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Essayer d'abord la dernière position connue (plus rapide)
      const lastKnownLocation = await Location.getLastKnownPositionAsync({
        maxAge: PERFORMANCE_CONFIG.LOCATION_CONFIG.maxAge,
      });

      if (lastKnownLocation) {
        setLocation({
          latitude: lastKnownLocation.coords.latitude,
          longitude: lastKnownLocation.coords.longitude,
          accuracy: lastKnownLocation.coords.accuracy,
          timestamp: lastKnownLocation.timestamp,
        });
        return;
      }

      // Fallback vers la position actuelle
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: PERFORMANCE_CONFIG.LOCATION_CONFIG.timeInterval,
        distanceInterval: PERFORMANCE_CONFIG.LOCATION_CONFIG.distanceInterval,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
        timestamp: currentLocation.timestamp,
      });
    } catch (err) {
      console.warn("Location error:", err);
      setError("Could not get location");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    await getLocation();
  }, [getLocation]);

  useEffect(() => {
    // Délai pour éviter de bloquer le rendu initial
    const timer = setTimeout(() => {
      getLocation();
    }, 100);

    return () => clearTimeout(timer);
  }, [getLocation]);

  return {
    location,
    isLoading,
    error,
    refreshLocation,
  };
};
