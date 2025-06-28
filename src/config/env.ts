export const ENV = {
  // API Configuration
  // API_BASE_URL: __DEV__
  //   ? "http://192.168.1.143:3000"
  //   : "https://altalaya.com/api",
  API_BASE_URL: "https://altalaya.com/api",

  // WebSocket Configuration
  // WS_BASE_URL: __DEV__ ? "ws://192.168.1.143:3000" : "wss://altalaya.com/api",
  WS_BASE_URL: "wss://altalaya.com/api",

  // Cloudinary Configuration (if needed on frontend)
  CLOUDINARY_CLOUD_NAME: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || "",

  // Other configurations
  APP_NAME: "Altalaya",
  VERSION: "1.0.0",

  // Feature flags
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_REAL_TIME_UPDATES: true,
  ENABLE_ANALYTICS: __DEV__ ? false : true,
};

export default ENV;
