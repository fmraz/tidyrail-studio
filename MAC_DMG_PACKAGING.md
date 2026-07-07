# macOS DMG Packaging

Status: Tauri scaffold prepared, not built.

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

## Local Preflight

```sh
node scripts/qa-desktop-packaging.mjs
npm run qa:native-prereqs --prefix desktop/renewal-desk
```

The first real `.dmg` build still requires Rust/Cargo, macOS Tauri prerequisites, Developer ID signing, notarization, and a clean-machine Gatekeeper test.

Current 2026-07-07 blocker: `npm run tauri:build --prefix desktop/renewal-desk` fails before compilation because `cargo` is not installed. Do not advertise a macOS app until a real `.app` and `.dmg` are produced and tested.

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
