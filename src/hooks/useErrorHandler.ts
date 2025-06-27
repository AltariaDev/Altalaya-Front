import { useSettingsStore } from "@/store/settingsStore";
import { useCallback } from "react";
import { Alert } from "react-native";

export const useErrorHandler = () => {
  const { setError, clearError } = useSettingsStore();

  const handleError = useCallback(
    (error: Error | string, showAlert = true) => {
      const errorMessage = typeof error === "string" ? error : error.message;

      setError(errorMessage);

      if (showAlert) {
        Alert.alert("Error", errorMessage, [
          {
            text: "OK",
            onPress: () => clearError(),
          },
        ]);
      }

      console.error("Error handled:", error);

      if (__DEV__) {
        console.warn("Error details:", {
          message: typeof error === "string" ? error : error.message,
          stack: typeof error === "string" ? undefined : error.stack,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [setError, clearError]
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      errorMessage = "Ha ocurrido un error inesperado"
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(errorMessage + error);
        return null;
      }
    },
    [handleError]
  );

  const clearErrorState = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    handleError,
    handleAsyncError,
    clearErrorState,
  };
};
