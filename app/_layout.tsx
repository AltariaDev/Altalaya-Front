import { Stack, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthGuard from "../src/components/AuthGuard";
import ErrorBoundary from "../src/components/ErrorBoundary";
import "../src/i18n";
import NavigationBar from "../src/Layout/NavigationBar";
import Navbar from "../src/Layout/Topbar";
import { colors } from "../src/utils/theme";
import "./global.css";

const Layout = React.memo(() => {
  const pathname = usePathname();

  const isAuthPage = pathname === "/Login" || pathname === "/Register";
  const isPublicPage =
    isAuthPage ||
    pathname === "/Terms" ||
    pathname === "/Privacy" ||
    pathname === "/Help";

  const handleError = (error: Error, errorInfo: any) => {
    console.error("App Error:", error, errorInfo);
  };

  const title =
    pathname === "/"
      ? "Dashboard"
      : pathname === "/MapMiradores"
      ? "Mapa"
      : pathname === "/Profile"
      ? "Perfil"
      : pathname === "/Explore"
      ? "Explorar"
      : pathname === "/Settings"
      ? "Configuración"
      : pathname === "/CreateMirador"
      ? "Crear mirador"
      : pathname === "/EditMirador"
      ? "Editar mirador"
      : pathname === "/ViewMirador"
      ? "Ver mirador"
      : pathname === "/Settings"
      ? "Configuración"
      : pathname === "/Notifications"
      ? "Notificaciones"
      : "";

  const content = (
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
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary onError={handleError}>
        {isPublicPage ? content : <AuthGuard>{content}</AuthGuard>}
      </ErrorBoundary>
    </GestureHandlerRootView>
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
