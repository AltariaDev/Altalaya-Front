import { useCallback } from "react";
import { Alert } from "react-native";
import { useAppStore } from "../store";

export const useErrorHandler = () => {
  const { setError, clearError } = useAppStore();

  const handleError = useCallback(
    (error: Error | string, showAlert = true) => {
      const errorMessage = typeof error === "string" ? error : error.message;

      // Set error in global store
      setError(errorMessage);

      // Show alert if requested
      if (showAlert) {
        Alert.alert("Error", errorMessage, [
          {
            text: "OK",
            onPress: () => clearError(),
          },
        ]);
      }

      // Log error for debugging
      console.error("Error handled:", error);

      // Here you could send error to crash reporting service
      // Example: Sentry.captureException(error);
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
        handleError(errorMessage);
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
