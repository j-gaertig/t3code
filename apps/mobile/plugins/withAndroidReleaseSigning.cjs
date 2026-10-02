const { withAppBuildGradle } = require("expo/config-plugins");

// The automated release workflow supplies a private signing key through
// environment variables. Local builds without those variables keep Expo's
// default signing behavior.
module.exports = function withAndroidReleaseSigning(config) {
  return withAppBuildGradle(config, (nextConfig) => {
    let contents = nextConfig.modResults.contents;
    if (contents.includes("ANDROID_KEYSTORE_PATH")) {
      return nextConfig;
    }

    const androidBlock = contents.indexOf("android {");
    if (androidBlock === -1) {
      throw new Error(
        "withAndroidReleaseSigning: could not find the android block in app/build.gradle.",
      );
    }

    const signingConfig = `\n  if (System.getenv("ANDROID_KEYSTORE_PATH")) {
    signingConfigs {
      release {
        storeFile file(System.getenv("ANDROID_KEYSTORE_PATH"))
        storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")
        keyAlias System.getenv("ANDROID_KEY_ALIAS")
        keyPassword System.getenv("ANDROID_KEY_PASSWORD")
      }
    }
  }\n`;
    contents =
      contents.slice(0, androidBlock + "android {".length) +
      signingConfig +
      contents.slice(androidBlock + "android {".length);

    const buildTypesBlock = contents.indexOf("buildTypes {");
    const releaseBlock = contents.indexOf("release {", buildTypesBlock);
    if (buildTypesBlock === -1 || releaseBlock === -1) {
      throw new Error(
        "withAndroidReleaseSigning: could not find buildTypes.release in app/build.gradle.",
      );
    }

    const releaseOpeningEnd = releaseBlock + "release {".length;
    contents =
      contents.slice(0, releaseOpeningEnd) +
      `\n      if (System.getenv("ANDROID_KEYSTORE_PATH")) {
        signingConfig signingConfigs.release
      }` +
      contents.slice(releaseOpeningEnd);

    nextConfig.modResults.contents = contents;
    return nextConfig;
  });
};
