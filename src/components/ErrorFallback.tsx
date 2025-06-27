import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  icon?: string;
  onRetry?: () => void;
  onReport?: () => void;
  showRetry?: boolean;
  showReport?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = "¡Ups! Algo salió mal",
  message = "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
  icon = "warning-outline",
  onRetry,
  onReport,
  showRetry = true,
  showReport = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={64} color={colors.error} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          {showRetry && onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Ionicons name="refresh" size={20} color={colors.text.primary} />
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          )}

          {showReport && onReport && (
            <TouchableOpacity style={styles.reportButton} onPress={onReport}>
              <Ionicons
                name="bug-outline"
                size={20}
                color={colors.text.secondary}
              />
              <Text style={styles.reportButtonText}>Reportar Error</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  retryButton: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  retryButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  reportButton: {
    backgroundColor: colors.background.secondary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  reportButtonText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ErrorFallback;
