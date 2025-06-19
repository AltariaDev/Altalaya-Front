module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Optimisations pour les performances
      "react-native-reanimated/plugin",

      // Optimisation des imports
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
          },
        },
      ],

      // Optimisation pour la production
      ...(process.env.NODE_ENV === "production"
        ? ["transform-remove-console", "transform-remove-debugger"]
        : []),
    ],
  };
};
