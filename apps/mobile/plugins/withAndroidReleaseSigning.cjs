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

    contents += `

// Apply the CI key after the Android DSL so it overrides Expo's default
// debug signingConfig for release builds.
if (System.getenv("ANDROID_KEYSTORE_PATH")) {
  android.signingConfigs.create("ciRelease") {
    storeFile file(System.getenv("ANDROID_KEYSTORE_PATH"))
    storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")
    keyAlias System.getenv("ANDROID_KEY_ALIAS")
    keyPassword System.getenv("ANDROID_KEY_PASSWORD")
  }
  android.buildTypes.release.signingConfig = android.signingConfigs.ciRelease
}
`;

    nextConfig.modResults.contents = contents;
    return nextConfig;
  });
};
