import React, { useEffect } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../utils/theme";
i: React.ReactNode;
  title?: string;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Modal = ({ visible, onClose, children, title }: ModalProps) => {
  const backdropOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.8);
  const modalTranslateY = useSharedValue(50);
  const closeButtonScale = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 300 });
      modalScale.value = withSpring(1, { damping: 15, stiffness: 150 });
      modalTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      modalScale.value = withSpring(0.8, { damping: 15, stiffness: 150 });
      modalTranslateY.value = withSpring(50, { damping: 15, stiffness: 150 });
    }
  }, [visible, backdropOpacity, modalScale, modalTranslateY]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: modalScale.value },
      { translateY: modalTranslateY.value },
    ],
  }));

  const closeButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: closeButtonScale.value }],
  }));

  const handleClosePressIn = () => {
    closeButtonScale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handleClosePressOut = () => {
    closeButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handleBackdropPress = () => {
    onClose();
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.centeredView, backdropAnimatedStyle]}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
        <Animated.View style={[styles.modalView, modalAnimatedStyle]}>
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            <AnimatedTouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, closeButtonAnimatedStyle]}
              onPressIn={handleClosePressIn}
              onPressOut={handleClosePressOut}
              activeOpacity={1}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </AnimatedTouchableOpacity>
          </View>
          {children}
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backdrop,
  },
  modalView: {
    width: "90%",
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.secondary,
  },
});

export default Modal;
