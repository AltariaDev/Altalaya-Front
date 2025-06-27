import { useMiradores } from "@/store/miradoresStore";
import { Mirador } from "@/types";
import React, { useMemo } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { PERFORMANCE_CONFIG } from "../../../utils/performance";
import { colors } from "../../../utils/theme";

interface MapViewComponentProps {
  region: Region;
  miradorData: Mirador;
  selectedMarkerRef: React.RefObject<typeof Marker>;
  onRegionChangeComplete: (region: Region) => void;
}

export default function MapViewComponent({
  region,
  miradorData,
  selectedMarkerRef,
  onRegionChangeComplete,
}: MapViewComponentProps) {
  const miradores = useMiradores();

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
          />
        );
      }),
    [miradores, miradorData, selectedMarkerRef]
  );

  return (
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
  );
}
