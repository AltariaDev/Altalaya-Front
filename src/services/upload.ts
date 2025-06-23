import api from "./api";

export interface UploadResponse {
  url: string;
  public_id: string;
  secure_url: string;
}

export const uploadService = {
  // Upload image to Cloudinary
  async uploadImage(imageUri: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Delete image from Cloudinary
  async deleteImage(publicId: string): Promise<{ message: string }> {
    const response = await api.delete(`/upload/image/${publicId}`);
    return response.data;
  },
};
