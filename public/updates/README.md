# Cramio self-hosted OTA updates

Cloudflare Pages serves the update manifest and immutable Capacitor web bundles from this directory.

## Files

- `version.json` is the live production manifest. Keep it disabled until the updater-enabled native APK has been distributed and a compatible bundle is available.
- `<version>.zip` contains the complete Vite `dist/` output at the ZIP root.
- Never replace an existing versioned ZIP. Publish each bundle under a new semantic version.

## Publish an update

1. In the private `ravvdevv/Cramio` repository, choose a new stable semantic bundle version. Native releases must keep `web-app/package.json` and Android `versionName` aligned and increment `versionCode`. OTA-only releases keep native Android version metadata unchanged.
2. From `web-app/`, run `bun run ota:package`.
3. From the landing-page repository root, run `node scripts/import-ota-release.mjs D:/Experimental-projects/cramio-mobile/ota-release/updates`. The importer validates the ZIP SHA-256 against the manifest and refuses to overwrite an existing versioned ZIP.
4. Commit and push the landing-page changes to `main`; Cloudflare Pages should deploy the updated static assets from its connected Git branch.
5. Verify `https://cramio.site/updates/version.json` and the versioned ZIP return HTTP 200.

The mobile packaging script calculates the ZIP SHA-256 and writes the manifest. Do not hand-edit the checksum.

## Compatibility

OTA bundles can update web assets only. Changes to Android permissions, Gradle/native code, Capacitor plugins, or other native runtime behavior require a newly signed APK. Set `minNativeVersion` to the lowest Android version that safely supports the bundle.

The Android client only accepts HTTPS bundle URLs from `cramio.site`, checks the manifest schema and semantic versions, and queues updates for the next background/restart. The current session is not interrupted.
