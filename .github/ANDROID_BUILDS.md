# Automated Android builds

The `Sync upstream and build Android APK` workflow merges `pingdotgg/t3code` into
this fork's `main` branch every four hours. Run it manually from the Actions tab
to sync sooner. If the merge changes `apps/mobile/`, it builds a universal
release APK and attaches it to a GitHub Release. The README download link always
points to the latest release.

This repository is public, so GitHub-hosted `ubuntu-latest` runners are free and
do not use a private-repository Actions minutes quota.

## Configure the signing key

Create a dedicated Android signing key and keep a secure backup of the keystore
and passwords. Do not commit the keystore to the repository.

```bash
keytool -genkeypair -v \
  -keystore t3code-release.jks \
  -alias t3code \
  -keyalg RSA -keysize 2048 -validity 10000
base64 -w 0 t3code-release.jks
```

In GitHub, open **Settings → Secrets and variables → Actions → New repository
secret** and add these four secrets:

| Secret | Value |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | The complete output of the `base64` command above |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password entered for `keytool` |
| `ANDROID_KEY_ALIAS` | `t3code`, or the alias you chose |
| `ANDROID_KEY_PASSWORD` | The key password entered for `keytool` |

The built app uses the package ID `com.jgaertig.t3code` so it can be installed
alongside the official app. APK updates must continue to use the same keystore;
losing it means Android will not install later builds as updates over this app.
