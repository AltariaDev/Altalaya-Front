import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Mirador, miradoresService } from "../../../services/miradores";
import { useIsLoading, useMiradoresStore } from "../../../store/miradoresStore";

export function useCreateMirador() {
  const { mirador, isEditing } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  const [region, setRegion] = useState({
    latitude: 36.7213,
    longitude: -4.4217,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const { createMirador } = useMiradoresStore((state) => state.actions);
  const isLoading = useIsLoading();
  const { handleError, handleAsyncError } = useErrorHandler();

  const isEditMode = isEditing === "true";
  const miradorData: Mirador | null = mirador
    ? JSON.parse(mirador as string)
    : null;

  const canSubmit = Boolean(title && images.length > 0 && selectedLocation);

  useEffect(() => {
    if (isEditMode && miradorData && !isInitialized) {
      setTitle(miradorData.title);
      setDescription(miradorData.description || "");
      setImages(miradorData.imageUrl ? [miradorData.imageUrl] : []);
      setSelectedLocation({
        latitude: Number(miradorData.latitude),
        longitude: Number(miradorData.longitude),
        address: `${miradorData.city}, ${miradorData.country}`,
      });
      setRegion({
        latitude: Number(miradorData.latitude),
        longitude: Number(miradorData.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsInitialized(true);
    }
  }, [isEditMode, miradorData, isInitialized]);

  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos de ubicación para crear un mirador"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación actual");
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    await handleAsyncError(async () => {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const addressString = [
          address.street,
          address.city,
          address.region,
          address.country,
        ]
          .filter(Boolean)
          .join(", ");

        setSelectedLocation((prev) => ({
          ...prev!,
          address: addressString,
        }));
      }
    }, "Error al obtener la dirección");
  };

  const pickImage = async () => {
    await handleAsyncError(async () => {
      const MAX_IMAGES = 5;

      if (images.length >= MAX_IMAGES) {
        handleError(`Máximo ${MAX_IMAGES} imágenes permitidas`);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
        const totalImages = images.length + newImages.length;

        if (totalImages > MAX_IMAGES) {
          const allowedImages = newImages.slice(0, MAX_IMAGES - images.length);
          setImages((prev) => [...prev, ...allowedImages]);
          handleError(
            `Solo se agregaron ${allowedImages.length} imágenes. Máximo ${MAX_IMAGES} permitidas.`
          );
        } else {
          setImages((prev) => [...prev, ...newImages]);
        }
      }
    }, "Error al seleccionar las imágenes");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || images.length === 0 || !selectedLocation) {
      handleError("Por favor completa todos los campos");
      return;
    }

    await handleAsyncError(
      async () => {
        const addressParts = selectedLocation.address?.split(", ") || [];
        const city = addressParts[1] || "Málaga";
        const country = addressParts[3] || "España";

        const newMiradorData = {
          title,
          description: description || undefined,
          imageUrl: images[0],
          images: images,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          city,
          country,
        };

        if (isEditMode && miradorData) {
          await miradoresService.updateMirador(miradorData.id, newMiradorData);
        } else {
          await createMirador(newMiradorData);
        }

        router.back();
      },
      isEditMode
        ? "Error al actualizar el mirador"
        : "Error al crear el mirador"
    );
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    images,
    selectedLocation,
    region,

    isEditMode,
    isLoading,
    canSubmit,

    pickImage,
    removeImage,
    handleMapPress,
    handleSubmit,
  };
}
