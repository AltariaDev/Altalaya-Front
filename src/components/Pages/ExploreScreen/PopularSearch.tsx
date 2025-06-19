import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const POPULAR_SEARCHES = [
  "Golden Gate Bridge",
  "San Francisco",
  "Cafeteria",
  "Nueva York",
  "Parque",
];

export default function PopularSearch() {
  return (
    <>
      <Text
        style={{
          color: "#fff",
          fontWeight: "700",
          fontSize: 26,
          marginBottom: 20,
          letterSpacing: -0.5,
        }}
      >
        Busquedas populares
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {POPULAR_SEARCHES.map((item) => (
          <TouchableOpacity
            key={item}
            style={{
              backgroundColor: "#2d353a",
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 12,
              marginRight: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: "#3d4449",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ color: "#e5e5e5", fontSize: 16, fontWeight: "500" }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
