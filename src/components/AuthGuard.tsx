import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { fetchNotifications } from "../store";
import {
  useAuthStore,
  useIsAuthenticated,
  useIsLoading,
} from "../store/authStore";
import { colors } from "../utils/theme";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const { checkAuth } = useAuthStore((state) => state.actions);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Initialize notifications when user is authenticated
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
