import { Ionicons } from "@expo/vector-icons";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/theme";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Here you could send error to crash reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleReportError = () => {
    // Here you could implement error reporting
    console.log("Reporting error:", this.state.error);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Ionicons name="warning-outline" size={64} color={colors.error} />
            <Text style={styles.title}>¡Ups! Algo salió mal</Text>
            <Text style={styles.message}>
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorTitle}>Error details (dev only):</Text>
                <Text style={styles.errorText}>{this.state.error.message}</Text>
                <Text style={styles.errorStack}>{this.state.error.stack}</Text>
              </View>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={this.handleRetry}
              >
                <Ionicons
                  name="refresh"
                  size={20}
                  color={colors.text.primary}
                />
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reportButton}
                onPress={this.handleReportError}
              >
                <Ionicons
                  name="bug-outline"
                  size={20}
                  color={colors.text.secondary}
                />
                <Text style={styles.reportButtonText}>Reportar Error</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

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
  errorDetails: {
    backgroundColor: colors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: "100%",
  },
  errorTitle: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  errorText: {
    color: colors.text.primary,
    fontSize: 12,
    marginBottom: 8,
  },
  errorStack: {
    color: colors.text.secondary,
    fontSize: 10,
    fontFamily: "monospace",
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

export default ErrorBoundary;
