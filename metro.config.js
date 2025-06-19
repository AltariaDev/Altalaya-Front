const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Optimisations pour les performances
config.resolver.platforms = ["ios", "android", "native", "web"];

// Optimisation de la transformation
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Optimisation du resolver
config.resolver = {
  ...config.resolver,
  resolverMainFields: ["react-native", "browser", "main"],
  platforms: ["ios", "android", "native", "web"],
};

module.exports = config;
