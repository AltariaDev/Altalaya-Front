import { useMiradores } from "@/store/miradoresStore";
import { Mirador } from "@/types/mirador";
import { PERFORMANCE_CONFIG } from "@/utils/performance";
import { colors } from "@/utils/theme";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import MiradorModal from "./MiradorModal";

interface MapViewComponentProps {
  region: Region;
  miradorData: Mirador;
  selectedMarkerRef: React.RefObject<typeof Marker>;
  onRegionChangeComplete: (region: Region) => void;
  currentLocation?: { latitude: number; longitude: number } | null;
}

export default function MapViewComponent({
  region,
  miradorData,
  selectedMarkerRef,
  onRegionChangeComplete,
  currentLocation,
}: MapViewComponentProps) {
  const miradores = useMiradores();
  const [selectedMirador, setSelectedMirador] = useState<Mirador | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = (mirador: Mirador) => {
    setSelectedMirador(mirador);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMirador(null);
  };

  const handleViewMore = () => {
    if (selectedMirador) {
      router.push({
        pathname: "/MiradorDetail",
        params: { miradorId: selectedMirador.id },
      });
    }
    handleCloseModal();
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateEstimatedTime = (mirador: Mirador): string => {
    if (!currentLocation) return "Tiempo no disponible";

    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      Number(mirador.latitude),
      Number(mirador.longitude)
    );

    const walkingTimeMinutes = Math.round(distance * 12);

    if (walkingTimeMinutes < 1) return "Menos de 1 min";
    if (walkingTimeMinutes < 60) return `${walkingTimeMinutes} min`;

    const hours = Math.floor(walkingTimeMinutes / 60);
    const minutes = walkingTimeMinutes % 60;

    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  const markers = useMemo(
    () =>
      miradores.map((marker) => {
        return (
          <Marker
            key={marker.id}
            ref={miradorData?.id === marker.id ? selectedMarkerRef : undefined}
            coordinate={{
              latitude: Number(marker.latitude),
              longitude: Number(marker.longitude),
            }}
            title={marker.title}
            description={marker.description}
            pinColor={miradorData?.id === marker.id ? colors.accent : undefined}
            onPress={() => handleMarkerPress(marker)}
          />
        );
      }),
    [miradores, miradorData, selectedMarkerRef]
  );

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={PERFORMANCE_CONFIG.MAP_CONFIG.showsUserLocation}
        showsMyLocationButton={
          PERFORMANCE_CONFIG.MAP_CONFIG.showsMyLocationButton
        }
        loadingEnabled={PERFORMANCE_CONFIG.MAP_CONFIG.loadingEnabled}
        loadingIndicatorColor={colors.accent}
        loadingBackgroundColor={colors.background.primary}
        followsUserLocation={PERFORMANCE_CONFIG.MAP_CONFIG.followsUserLocation}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {markers}
      </MapView>

      <MiradorModal
        visible={modalVisible}
        mirador={selectedMirador}
        onClose={handleCloseModal}
        onViewMore={handleViewMore}
        estimatedTime={
          selectedMirador ? calculateEstimatedTime(selectedMirador) : undefined
        }
      />
    </>
  );
}
