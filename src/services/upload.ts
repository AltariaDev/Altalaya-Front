import { UploadResponse } from "@/types/upload";
import api from "./api";

/**
 * Service for handling image uploads to Cloudinary via the backend API
 */
export const uploadService = {
  /**
   * Uploads an image to Cloudinary
   * @param imageUri - Local URI of the image to upload
   * @param retries - Number of retry attempts for failed uploads (default: 3)
   * @returns Promise<UploadResponse> - Object containing the uploaded image URL and public ID
   * @throws Error if upload fails after all retry attempts
   */
  async uploadImage(imageUri: string, retries = 3): Promise<UploadResponse> {
    const formData = new FormData();

    let fileType = "image/jpeg";
    let fileName = "image.jpg";

    if (imageUri.includes(".png")) {
      fileType = "image/png";
      fileName = "image.png";
    } else if (imageUri.includes(".gif")) {
      fileType = "image/gif";
      fileName = "image.gif";
    } else if (imageUri.includes(".webp")) {
      fileType = "image/webp";
      fileName = "image.webp";
    }

    const imageFile = {
      uri: imageUri,
      type: fileType,
      name: fileName,
    } as any;

    formData.append("image", imageFile);

    try {
      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      const uploadResponse: UploadResponse = {
        url: response.data.url || response.data.image_url,
        publicId:
          response.data.publicId ||
          response.data.public_id ||
          `upload-${Date.now()}`,
      };

      return uploadResponse;
    } catch (error: any) {
      if (
        retries > 0 &&
        (error.code === "ECONNABORTED" || error.response?.status >= 500)
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.uploadImage(imageUri, retries - 1);
      }

      throw new Error(
        `Failed to upload image: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
};
