import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <LinearGradient
      colors={["#2d353a", "#23262A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 20,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 60,
        }}
      >
        <Ionicons name="search" size={24} color="#7a8a99" />
        <TextInput
          placeholder="Buscar miradores"
          placeholderTextColor="#7a8a99"
          style={{
            flex: 1,
            color: "#e5e5e5",
            fontSize: 18,
            marginLeft: 12,
            fontWeight: "500",
          }}
        />
      </View>
    </LinearGradient>
  );
}
