import "dotenv/config";

export default {
  name: "ApiNaattoriTTV",
  slug: "ApiNaattoriTTV",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/yle.png",
  splash: {
    image: "./assets/yle.png",
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
      foregroundImage: "./assets/yle.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/yle.png",
  },
  extra: {
    apiUrl: process.env.API_URL,
    appId: process.env.APP_ID,
    appKey: process.env.APP_KEY,
  },
};
