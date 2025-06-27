import { LocationState } from "@/types/location";
import { PERFORMANCE_CONFIG } from "@/utils/performance";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

interface UseLocationReturnLocal {
  location: LocationState | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

export const useLocation = (): UseLocationReturnLocal => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const lastKnownLocation = await Location.getLastKnownPositionAsync({
        maxAge: PERFORMANCE_CONFIG.LOCATION_CONFIG.maxAge,
      });
      if (lastKnownLocation) {
        setLocation({
          latitude: lastKnownLocation.coords.latitude,
          longitude: lastKnownLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: PERFORMANCE_CONFIG.LOCATION_CONFIG.timeInterval,
        distanceInterval: PERFORMANCE_CONFIG.LOCATION_CONFIG.distanceInterval,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
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
