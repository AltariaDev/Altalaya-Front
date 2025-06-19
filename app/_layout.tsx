import Navbar from "@/src/Layout/Topbar";
import NavigationBar from "@/src/Layout/NavigationBar";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import "./global.css";

export default function Layout() {
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <Navbar title={pathname === "/" ? "Discover" : "Mirador"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121417",
    paddingTop: 35,
  },
});
