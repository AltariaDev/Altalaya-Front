import { Easing } from "react-native-reanimated";
import { colors } from "./theme";

// Configuration des animations réutilisables
export const animationConfig = {
  // Animations d'entrée
  fadeIn: {
    duration: 600,
    easing: Easing.out(Easing.cubic),
  },
  slideUp: {
    duration: 800,
    damping: 15,
    stiffness: 150,
  },
  slideIn: {
    duration: 700,
    damping: 15,
    stiffness: 150,
  },
  scaleIn: {
    duration: 600,
    damping: 15,
    stiffness: 150,
  },

  // Animations d'interaction
  press: {
    duration: 150,
    damping: 15,
    stiffness: 300,
  },
  bounce: {
    duration: 300,
    damping: 10,
    stiffness: 200,
  },

  // Animations de transition
  transition: {
    duration: 400,
    easing: Easing.inOut(Easing.cubic),
  },

  // Délais pour les animations en cascade
  cascade: {
    small: 50,
    medium: 100,
    large: 200,
  },
};

// Fonctions utilitaires pour les animations
export const createStaggeredAnimation = (
  count: number,
  baseDelay: number = 0,
  delayIncrement: number = 100
) => {
  return Array.from(
    { length: count },
    (_, index) => baseDelay + index * delayIncrement
  );
};

// Configuration des couleurs pour les transitions
export const colorTransitions = {
  primary: {
    from: colors.primary,
    to: colors.accent,
  },
  secondary: {
    from: colors.background.secondary,
    to: colors.detail,
  },
  success: {
    from: colors.success,
    to: "#1E7E34",
  },
  danger: {
    from: colors.error,
    to: "#C82333",
  },
};

// Configuration des transformations
export const transforms = {
  scale: {
    pressed: 0.95,
    hover: 1.05,
    normal: 1,
  },
  translate: {
    small: 5,
    medium: 10,
    large: 20,
  },
  rotate: {
    small: 5,
    medium: 15,
    large: 45,
  },
};

// Configuration des opacités
export const opacity = {
  hidden: 0,
  visible: 1,
  disabled: 0.5,
  overlay: 0.5,
};

// Configuration des durées par type d'animation
export const durations = {
  fast: 200,
  normal: 400,
  slow: 800,
  verySlow: 1200,
};

// Configuration des easings
export const easings = {
  linear: Easing.linear,
  ease: Easing.inOut(Easing.cubic),
  easeIn: Easing.in(Easing.cubic),
  easeOut: Easing.out(Easing.cubic),
  bounce: Easing.bounce,
  elastic: Easing.elastic(1),
};
