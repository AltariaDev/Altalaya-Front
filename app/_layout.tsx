import { Stack, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import ErrorBoundary from "../src/components/ErrorBoundary";
import "../src/i18n";
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

  const isAuthPage = pathname === "/Login" || pathname === "/Register";

  const handleError = (error: Error, errorInfo: any) => {
    // Here you could send error to crash reporting service
    console.error("App Error:", error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <View style={styles.container}>
        {!isAuthPage && <Navbar title={title} />}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            animationDuration: 200,
          }}
        />
        {!isAuthPage && <NavigationBar />}
      </View>
    </ErrorBoundary>
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
