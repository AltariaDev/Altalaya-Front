import { Mirador } from "@/types/mirador";
import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MiradorModalProps {
  visible: boolean;
  mirador: Mirador | null;
  onClose: () => void;
  onViewMore: () => void;
  estimatedTime?: string;
}

const { width } = Dimensions.get("window");

export default function MiradorModal({
  visible,
  mirador,
  onClose,
  onViewMore,
  estimatedTime,
}: MiradorModalProps) {
  if (!mirador) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Image source={{ uri: mirador.imageUrl }} style={styles.image} />

            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {mirador.title}
              </Text>

              {mirador.description && (
                <Text style={styles.description} numberOfLines={3}>
                  {mirador.description}
                </Text>
              )}

              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color={colors.accent} />
                <Text style={styles.location}>
                  {mirador.city}, {mirador.country}
                </Text>
              </View>

              {estimatedTime && (
                <View style={styles.infoRow}>
                  <Ionicons name="time" size={16} color={colors.accent} />
                  <Text style={styles.estimatedTime}>
                    {estimatedTime} para llegar
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/dir/?api=1&destination=${mirador.latitude},${mirador.longitude}`
                      )
                    }
                  >
                    <Text style={styles.viewMoreText}>
                      <Ionicons name="navigate" size={16} color={colors.accent} />
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.viewMoreButton}
                onPress={onViewMore}
              >
                <Text style={styles.viewMoreText}>Ver más</Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  modalContainer: {
    width: width * 0.8,
    maxHeight: "60%",
    backgroundColor: colors.background.primary,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  content: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  estimatedTime: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
  },
});
