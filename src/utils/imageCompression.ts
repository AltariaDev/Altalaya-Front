import * as ImageManipulator from "expo-image-manipulator";

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: "jpeg" | "png" | "webp";
}

export const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8,
  format: "jpeg",
};

// Maximum file size in MB before compression is required
export const MAX_FILE_SIZE_MB = 5;

export async function compressImage(
  imageUri: string,
  options: CompressionOptions = {}
): Promise<string> {
  const config = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };

  try {
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          resize: {
            width: config.maxWidth!,
            height: config.maxHeight!,
          },
        },
      ],
      {
        compress: config.quality!,
        format:
          ImageManipulator.SaveFormat[
            config.format!.toUpperCase() as keyof typeof ImageManipulator.SaveFormat
          ],
      }
    );

    return result.uri;
  } catch (error) {
    console.warn("Image compression failed, using original:", error);
    return imageUri;
  }
}

export async function compressImageForUpload(
  imageUri: string
): Promise<string> {
  // More aggressive compression for uploads to prevent 413 errors
  return compressImage(imageUri, {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 0.7,
    format: "jpeg",
  });
}

export async function compressImageForThumbnail(
  imageUri: string
): Promise<string> {
  // Light compression for thumbnails
  return compressImage(imageUri, {
    maxWidth: 400,
    maxHeight: 300,
    quality: 0.6,
    format: "jpeg",
  });
}

export function getFileSizeInMB(uri: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", uri, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const size = parseInt(xhr.getResponseHeader("Content-Length") || "0");
          resolve(size / (1024 * 1024)); // Convert to MB
        } else {
          reject(new Error("Failed to get file size"));
        }
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send();
  });
}

export async function shouldCompressImage(
  imageUri: string,
  maxSizeMB: number = MAX_FILE_SIZE_MB
): Promise<boolean> {
  try {
    const sizeMB = await getFileSizeInMB(imageUri);
    return sizeMB > maxSizeMB;
  } catch (error) {
    console.warn("Could not determine file size, compressing anyway:", error);
    return true; // Compress by default if we can't determine size
  }
}

export async function validateAndCompressImage(
  imageUri: string
): Promise<string> {
  try {
    const needsCompression = await shouldCompressImage(imageUri);

    if (needsCompression) {
      console.log("Image is too large, compressing...");
      return await compressImageForUpload(imageUri);
    }

    return imageUri;
  } catch (error) {
    console.warn("Error validating image size, compressing anyway:", error);
    return await compressImageForUpload(imageUri);
  }
}

export async function getImageInfo(
  imageUri: string
): Promise<{ width: number; height: number; sizeMB: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        const sizeMB = await getFileSizeInMB(imageUri);
        resolve({
          width: img.width,
          height: img.height,
          sizeMB,
        });
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUri;
  });
}
