import React, { useState } from "react";
import { ActivityIndicator, Image, ImageStyle, View } from "react-native";
import { colors } from "../utils/theme";

interface OptimizedImageProps {
  source: { uri: string } | number;
  style: ImageStyle;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = React.memo(
  ({ source, style, placeholder, onLoad, onError }: OptimizedImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    if (hasError) {
      return (
        <View
          style={[
            style,
            {
              backgroundColor: colors.background.secondary,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {placeholder}
        </View>
      );
    }

    return (
      <View style={style}>
        <Image
          source={source}
          style={[style, { opacity: isLoading ? 0 : 1 }]}
          onLoad={handleLoad}
          onError={handleError}
          resizeMode="cover"
          fadeDuration={200}
        />
        {isLoading && (
          <View
            style={[
              style,
              {
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background.secondary,
              },
            ]}
          >
            <ActivityIndicator size="small" color={colors.accent} />
          </View>
        )}
      </View>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
