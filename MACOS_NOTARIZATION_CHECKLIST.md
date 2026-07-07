# macOS Signing and Notarization Checklist

Status: not ready for public macOS distribution.

Purpose: prepare Renewal Desk for a professional direct macOS `.dmg` download without publishing an unsigned or unnotarized app to end users.

## Current State

- Product: Renewal Desk
- Company: Tidyrail Studio
- Bundle identifier: `com.tidyrailstudio.renewaldesk`
- Local artifact: `desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg`
- Current signing: ad-hoc identity `"-"` for internal QA only
- Current public availability: web app and static ZIP package only
- Public macOS availability: not announced

## Manual Founder Requirements

These steps require founder approval, Apple account access, identity verification, payment, or private credentials:

1. Join or use an Apple Developer Program account.
2. Create or install a Developer ID Application certificate.
3. Provide notarization credentials through one approved path:
   - Apple ID, Team ID, and app-specific password; or
   - App Store Connect API key, issuer ID, and private key file.
4. Approve storing credentials in the local macOS keychain or CI secret store.
5. Approve the first public signed `.dmg` release.

Do not commit Apple credentials, private keys, app-specific passwords, API keys, provisioning profiles, exported certificates, or `.p12` files.

## Local Readiness Checks

Run:

```sh
npm run qa:native-prereqs --prefix desktop/renewal-desk
npm run qa:desktop --prefix desktop/renewal-desk
npm run tauri:build --prefix desktop/renewal-desk
npm run qa:macos-dmg --prefix desktop/renewal-desk
npm run qa:macos-notarization --prefix desktop/renewal-desk
```

Current expected notarization readiness blockers:

- No Developer ID Application signing identity is installed in the accessible keychains.
- No notarization credentials are configured.
- Full Xcode is not selected; Xcode Command Line Tools are active.

## Preferred Credential Path

Prefer App Store Connect API key credentials for repeatable release work:

```text
APPLE_API_KEY
APPLE_API_ISSUER
APPLE_API_KEY_PATH
APPLE_TEAM_ID
APPLE_SIGNING_IDENTITY
```

Alternative Apple ID app-specific password path:

```text
APPLE_ID
APPLE_TEAM_ID
APPLE_PASSWORD
APPLE_SIGNING_IDENTITY
```

Never place these values in tracked files.

## Tauri Configuration

Current internal QA config:

```json
"macOS": {
  "signingIdentity": "-"
}
```

Before public signing, replace ad-hoc signing through environment configuration rather than committing a personal identity:

```sh
export APPLE_SIGNING_IDENTITY="Developer ID Application: ..."
```

Then build:

```sh
npm run tauri:build --prefix desktop/renewal-desk
```

## Validation After Signed Build

After a Developer ID signed build:

```sh
codesign --verify --deep --strict --verbose=2 "Renewal Desk.app"
codesign -dv --verbose=4 "Renewal Desk.app"
spctl --assess --type execute --verbose=4 "Renewal Desk.app"
```

After notarization and stapling:

```sh
xcrun stapler validate "Renewal Desk.app"
xcrun stapler validate "Renewal Desk_0.1.0_aarch64.dmg"
spctl --assess --type open --context context:primary-signature --verbose=4 "Renewal Desk_0.1.0_aarch64.dmg"
```

## Public Release Gate

Do not publish the macOS `.dmg` until all are true:

- Developer ID Application signature is present.
- Notarization succeeds.
- Stapling succeeds for the distributed artifact.
- Gatekeeper test passes on a clean macOS profile.
- First-launch user flow opens the Renewal Desk dashboard.
- Add item, edit item, delete item, backup, restore, and spreadsheet export are smoke tested in the desktop shell.
- Download page copy says macOS is available only after the final signed/notarized artifact is uploaded.
- SHA-256 checksum is published next to the `.dmg`.
- Release notes mention known limitations without overclaiming sync or native platform coverage.

## References

- Apple Developer: Notarizing macOS software before distribution
- Apple Developer: Developer ID certificates
- Tauri: macOS signing and notarization
