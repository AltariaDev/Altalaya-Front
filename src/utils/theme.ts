export const colors = {
  primary: "#C95D2C",

  accent: "#FE7429",

  background: {
    primary: "#1F120B",
    secondary: "#2E1C12",
  },

  text: {
    primary: "#F5F5F5",
    secondary: "#C2B7AE",
  },

  detail: "#B6845C",

  highlight: "#F69B28",

  success: "#28A745",
  warning: "#F69B28",
  error: "#DC3545",
  info: "#17A2B8",

  overlay: "rgba(31, 18, 11, 0.8)",
  backdrop: "rgba(0, 0, 0, 0.5)",
};

export const theme = {
  colors,

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export default theme;
