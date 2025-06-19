import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const HIGHLIGHTED = [
  {
    title: "Vista del puente Golden Gate",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Cambia por la tuya
  },
  {
    title: "Empire State Building",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b", // Cambia por la tuya
  },
];

export default function Highlighted() {
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
        Miradores destacados
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {HIGHLIGHTED.map((item) => (
          <View
            key={item.title}
            style={{
              width: 280,
              marginRight: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 24,
                marginBottom: 16,
                backgroundColor: "#222",
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "600",
                letterSpacing: -0.5,
                marginLeft: 4,
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
