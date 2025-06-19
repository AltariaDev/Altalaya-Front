import { Stack, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import NavigationBar from "../src/Layout/NavigationBar";
import Navbar from "../src/Layout/Topbar";
import { colors } from "../src/utils/theme";
import "./global.css";

const Layout = React.memo(() => {
  const pathname = usePathname();

  const title = useMemo(
    () => (pathname === "/" ? "Discover" : "Mirador"),
    [pathname]
  );

  return (
    <View style={styles.container}>
      <Navbar title={title} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />
      <NavigationBar />
    </View>
  );
});

Layout.displayName = "Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 35,
  },
});

export default Layout;
