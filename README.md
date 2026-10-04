# T3Code Preview APK

Preview builds of the [T3 Code](https://github.com/pingdotgg/t3code) Android app, built from the official repository.

[![Download APK](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=Download+APK&secondaryLabel=universal&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=0&secondaryFontFamily=Verdana&secondaryTextTransform=lowercase&borderRadius=5)](https://github.com/j-gaertig/t3code-preview-apk/releases/latest/download/t3code-universal.apk)

**Download the latest build here:** [t3code-universal.apk](https://github.com/j-gaertig/t3code-preview-apk/releases/latest/download/t3code-universal.apk) · [All releases](https://github.com/j-gaertig/t3code-preview-apk/releases)

New builds are published automatically about once an hour whenever the official app changed. Only the latest release plus the 3 previous ones are kept.

## Install

The app uses the official package ID `com.t3tools.t3code`, but it is signed with a different key than the Play Store version. Uninstall the Play Store app first, then download the APK above and open it (allow “Install unknown apps” for your browser when asked).

## Verify

Every release lists its version, file size, SHA-256 checksum, native ABIs and signing certificate so you can check the download before installing:

```bash
sha256sum t3code-universal.apk
apksigner verify --print-certs t3code-universal.apk
```

## Source

Built from [`pingdotgg/t3code`](https://github.com/pingdotgg/t3code) (`apps/mobile`). This is an unofficial preview build with no affiliation to T3 Tools Inc. License: [LICENSE](./LICENSE).
