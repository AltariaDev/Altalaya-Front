import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CreateMiradorHeader from "../components/Pages/CreateMiradorScreen/CreateMiradorHeader";
import FormInput from "../components/Pages/CreateMiradorScreen/FormInput";
import ImagePicker from "../components/Pages/CreateMiradorScreen/ImagePicker";
import LocationPicker from "../components/Pages/CreateMiradorScreen/LocationPicker";
import { useCreateMirador } from "../components/Pages/CreateMiradorScreen/useCreateMirador";
import UploadProgress from "../components/UploadProgress";
import { colors } from "../utils/theme";

export default function CreateMiradorScreen() {
  const {
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
    uploadProgress,
    pickImage,
    removeImage,
    handleMapPress,
    handleSubmit,
  } = useCreateMirador();

  return (
    <View style={styles.container}>
      <UploadProgress
        current={uploadProgress.current}
        total={uploadProgress.total}
        isVisible={
          uploadProgress.total > 0 &&
          uploadProgress.current < uploadProgress.total
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateMiradorHeader
          isEditMode={isEditMode}
          isLoading={isLoading}
          canSubmit={canSubmit}
          onSubmit={handleSubmit}
        />

        <ImagePicker
          images={images}
          onPickImage={pickImage}
          onRemoveImage={removeImage}
        />

        <View style={styles.form}>
          <FormInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            placeholder="Nombre del mirador"
          />

          <FormInput
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe este mirador..."
            multiline
            numberOfLines={4}
          />

          <LocationPicker
            region={region}
            selectedLocation={selectedLocation}
            onMapPress={handleMapPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  form: {
    padding: 20,
  },
});
