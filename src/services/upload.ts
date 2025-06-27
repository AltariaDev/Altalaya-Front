import { UploadResponse } from "@/types";
import api from "./api";

export const uploadService = {
  async uploadImage(imageUri: string): Promise<UploadResponse> {
    const formData = new FormData();

    const imageFile = {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    } as any;

    formData.append("image", imageFile);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
