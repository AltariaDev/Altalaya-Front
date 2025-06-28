import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

interface UploadProgressProps {
  current: number;
  total: number;
  isVisible: boolean;
}

export default function UploadProgress({
  current,
  total,
  isVisible,
}: UploadProgressProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;

      if (translationY < -50) {
        // Scrolled up significantly, hide the component
        Animated.spring(translateY, {
          toValue: -100,
          useNativeDriver: true,
        }).start();
      } else {
        // Return to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  if (!isVisible) return null;

  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.content}>
          <Ionicons name="cloud-upload" size={24} color={colors.accent} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Subiendo imágenes...</Text>
            <Text style={styles.subtitle}>
              {current} de {total} imágenes
            </Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.background.secondary,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.accent,
  },
});
