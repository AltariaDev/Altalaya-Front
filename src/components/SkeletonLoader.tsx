import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { colors } from "../utils/theme";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  variant?: "text" | "avatar" | "card" | "button";
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = 8,
  style,
  variant = "text",
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const getDefaultDimensions = () => {
    switch (variant) {
      case "avatar":
        return { width: 60, height: 60, borderRadius: 30 };
      case "card":
        return { width: "100%", height: 200, borderRadius: 16 };
      case "button":
        return { width: 120, height: 48, borderRadius: 12 };
      case "text":
      default:
        return { width: "100%", height: 16, borderRadius: 4 };
    }
  };

  const defaultDimensions = getDefaultDimensions();

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width || defaultDimensions.width,
          height: height || defaultDimensions.height,
          borderRadius: borderRadius || defaultDimensions.borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

// Composant pour les listes de skeleton
interface SkeletonListProps {
  count: number;
  itemHeight?: number;
  itemWidth?: number | string;
  spacing?: number;
  variant?: "text" | "avatar" | "card" | "button";
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  count,
  itemHeight,
  itemWidth,
  spacing = 8,
  variant = "text",
}) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonLoader
          key={index}
          width={itemWidth}
          height={itemHeight}
          variant={variant}
          style={{ marginBottom: spacing }}
        />
      ))}
    </View>
  );
};

// Composant pour les grilles de skeleton
interface SkeletonGridProps {
  rows: number;
  columns: number;
  itemHeight?: number;
  spacing?: number;
  variant?: "text" | "avatar" | "card" | "button";
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  rows,
  columns,
  itemHeight,
  spacing = 8,
  variant = "card",
}) => {
  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <View
          key={rowIndex}
          style={[styles.gridRow, { marginBottom: spacing }]}
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <SkeletonLoader
              key={`${rowIndex}-${colIndex}`}
              height={itemHeight}
              variant={variant}
              style={{
                flex: 1,
                marginRight: colIndex < columns - 1 ? spacing : 0,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.background.secondary,
  },
  listContainer: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
  },
  gridRow: {
    flexDirection: "row",
  },
});

export default SkeletonLoader;
