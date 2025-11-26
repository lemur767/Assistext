try {
    console.log("Attempting to require expo/metro-config...");
    const { getDefaultConfig } = require("expo/metro-config");
    console.log("expo/metro-config loaded");

    console.log("Attempting to require nativewind/metro...");
    const { withNativeWind } = require('nativewind/metro');
    console.log("nativewind/metro loaded");

    console.log("Getting default config...");
    const config = getDefaultConfig(__dirname);
    console.log("default config loaded");

    console.log("Applying withNativeWind...");
    const finalConfig = withNativeWind(config, { input: './globals.css' });
    console.log("final config created");
} catch (error) {
    console.error("Error loading config:", error);
}
