import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMiradorDetail } from "./useMiradorDetail";

interface LocationInfoProps {
  city: string;
  country: string;
  miradorData: any;
}

export default function LocationInfo({
  city,
  country,
  miradorData,
}: LocationInfoProps) {
  const handleLocationPress = () => {
    router.push({
      pathname: "/MapMiradores",
      params: { mirador: JSON.stringify(miradorData) },
    });
  };

  const { timeAgo } = useMiradorDetail();
  return (
    <TouchableOpacity style={styles.locationRow} onPress={handleLocationPress}>
      <View style={styles.locationIconBox}>
        <Ionicons
          name="location-outline"
          size={24}
          color={colors.text.primary}
        />
      </View>
      <View>
        <Text style={styles.locationCity}>{city}</Text>
        <Text style={styles.locationPlace}>{country}</Text>
      </View>
      <Text style={styles.timeAgo}>{timeAgo()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  locationIconBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCity: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  locationPlace: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  timeAgo: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: "auto",
  },
});
