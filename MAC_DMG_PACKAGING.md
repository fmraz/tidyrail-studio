# macOS DMG Packaging

Status: Local internal QA `.dmg` candidate produced, not public distribution ready.

See `DESKTOP_PACKAGING_READINESS.md` for shared identity, QA gates, and copy rules.

## Target

Renewal Desk should ship as a professional `.dmg`, not a ZIP, when the macOS desktop app is ready.

## Recommended Stack

Tauri desktop shell with the existing web app core.

Current scaffold: `desktop/renewal-desk`.

## DMG Requirements

- `.app` bundle inside `.dmg`
- drag-to-Applications layout if practical
- versioned filename
- checksum
- release notes
- privacy policy URL
- bundle identifier: `com.tidyrailstudio.renewaldesk`

## Signing and Notarization

Requires Apple Developer Program membership and identity verification. This requires founder approval and payment.

Manual requirements:

- Apple Developer account
- Developer ID Application certificate
- Notarization credentials
- Hardened runtime settings

Do not distribute unsigned macOS builds as the primary public download.

The current local build uses ad-hoc signing identity `"-"` for internal QA only. This can make a local bundle structurally verifiable, but it is not a substitute for Developer ID signing and notarization.

## Local Preflight

```sh
node scripts/qa-desktop-packaging.mjs
npm run qa:native-prereqs --prefix desktop/renewal-desk
```

Current 2026-07-07 status:

- Rust/Cargo were installed through `rustup` in the local user profile after founder approval to continue.
- `npm run qa:native-prereqs --prefix desktop/renewal-desk` passes with one warning: full Xcode is not selected, only Xcode Command Line Tools are active.
- `npm run tauri:build --prefix desktop/renewal-desk` produces a local Apple Silicon `.dmg`.
- `hdiutil verify` passes for the generated `.dmg`.
- `codesign --verify --deep --strict` passes for the mounted app bundle when using ad-hoc signing identity `"-"`.
- The build remains internal QA only until Developer ID signing, notarization, and clean-machine Gatekeeper testing are complete.

Do not advertise a public macOS app download until a Developer ID signed and notarized `.dmg` is produced and tested.

## First Local DMG Candidate Steps

After founder approval to install free developer tooling:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
npm install --prefix desktop/renewal-desk
npm run qa:desktop --prefix desktop/renewal-desk
npm run qa:native-prereqs --prefix desktop/renewal-desk
npm run tauri:build --prefix desktop/renewal-desk
```

Expected local artifact path after a successful Tauri macOS build:

```text
desktop/renewal-desk/src-tauri/target/release/bundle/dmg/
```

Current local candidate:

```text
desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg
```

SHA-256:

```text
9e9a9772c2c394dfcf5cc6025d1179923230762547176de6f1c25f781ef7020d
```

Validation commands used:

```sh
hdiutil verify "desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg"
codesign --verify --deep --strict --verbose=2 "/Volumes/Renewal Desk/Renewal Desk.app"
codesign -dv --verbose=4 "/Volumes/Renewal Desk/Renewal Desk.app"
spctl --assess --type execute --verbose=4 "/Volumes/Renewal Desk/Renewal Desk.app"
```

Gatekeeper note: the current local `spctl` result is not proof of public readiness because it reports a local security override. A public macOS release still needs Developer ID signing, notarization, and a clean-machine test.
