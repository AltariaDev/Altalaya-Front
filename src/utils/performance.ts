import { Platform } from "react-native";

// Configuration des performances
export const PERFORMANCE_CONFIG = {
  // Configuration pour les listes
  LIST_CONFIG: {
    removeClippedSubviews: true,
    maxToRenderPerBatch: 5,
    windowSize: 10,
    initialNumToRender: 5,
    updateCellsBatchingPeriod: 50,
  },

  // Configuration pour les animations
  ANIMATION_CONFIG: {
    damping: 20,
    stiffness: 200,
    mass: 0.8,
    duration: 300,
  },

  // Configuration pour les images
  IMAGE_CONFIG: {
    cachePolicy: "memory-disk",
    priority: "normal",
  },

  // Configuration pour la géolocalisation
  LOCATION_CONFIG: {
    accuracy: "balanced",
    timeInterval: 5000,
    distanceInterval: 10,
    maxAge: 60000, // 1 minute
  },

  // Configuration pour les maps
  MAP_CONFIG: {
    loadingEnabled: true,
    showsUserLocation: true,
    showsMyLocationButton: true,
    followsUserLocation: false,
  },
};

// Fonction pour optimiser les re-renders
export const shouldComponentUpdate = (
  prevProps: any,
  nextProps: any,
  keys: string[]
) => {
  return keys.some((key) => prevProps[key] !== nextProps[key]);
};

// Fonction pour debounce
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Fonction pour throttle
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Configuration spécifique à la plateforme
export const getPlatformConfig = () => {
  if (Platform.OS === "ios") {
    return {
      ...PERFORMANCE_CONFIG,
      ANIMATION_CONFIG: {
        ...PERFORMANCE_CONFIG.ANIMATION_CONFIG,
        damping: 15,
        stiffness: 150,
      },
    };
  }

  if (Platform.OS === "android") {
    return {
      ...PERFORMANCE_CONFIG,
      ANIMATION_CONFIG: {
        ...PERFORMANCE_CONFIG.ANIMATION_CONFIG,
        damping: 25,
        stiffness: 250,
      },
    };
  }

  return PERFORMANCE_CONFIG;
};
