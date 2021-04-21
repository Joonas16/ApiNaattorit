import "dotenv/config";

export default {
  name: "ApiNaattoriTTV",
  slug: "ApiNaattoriTTV",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/icon.png",
  },
  extra: {
    apiUrl: process.env.API_URL,
    appId: process.env.APP_ID,
    appKey: process.env.APP_KEY,
  },
};
