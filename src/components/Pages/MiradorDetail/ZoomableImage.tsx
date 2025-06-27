import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface ZoomableImageProps {
  imageUrl: string;
  style?: any;
}

export default function ZoomableImage({ imageUrl, style }: ZoomableImageProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      // Reset position if scale is 1
      if (scale === 1) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3, prev + 0.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.5));
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setScale(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: imageUrl }} style={style} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <StatusBar hidden />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeModal}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={28} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={handleZoomIn}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={handleZoomOut}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={styles.imageContainer}>
              <Animated.Image
                source={{ uri: imageUrl }}
                style={[styles.zoomedImage, animatedStyle]}
                resizeMode="contain"
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomControls: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1000,
    flexDirection: "row",
    gap: 10,
  },
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: screenHeight,
  },
  zoomedImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
});
