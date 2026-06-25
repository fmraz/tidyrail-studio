# macOS DMG Packaging

Status: planned, not built.

## Target

Renewal Desk should ship as a professional `.dmg`, not a ZIP, when the macOS desktop app is ready.

## Recommended Stack

Tauri desktop shell with the existing web app core.

## DMG Requirements

- `.app` bundle inside `.dmg`
- drag-to-Applications layout if practical
- versioned filename
- checksum
- release notes
- privacy policy URL

## Signing and Notarization

Requires Apple Developer Program membership and identity verification. This requires founder approval and payment.

Manual requirements:

- Apple Developer account
- Developer ID Application certificate
- Notarization credentials
- Hardened runtime settings

Do not distribute unsigned macOS builds as the primary public download.
