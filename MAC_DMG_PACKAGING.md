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
```

The first real `.dmg` build still requires Rust, macOS Tauri prerequisites, final icon assets, Developer ID signing, notarization, and a clean-machine Gatekeeper test.
