# Desktop CI Build Plan

Status: planned, not active.

Purpose: define how Renewal Desk can produce macOS, Windows, and Linux desktop artifacts without claiming public availability before each platform is tested.

## Current Position

- macOS Apple Silicon `.dmg`: local internal QA candidate exists.
- Windows installer: metadata and icon readiness pass; no installer artifact yet.
- Linux AppImage/.deb: metadata and icon readiness pass; no Linux artifact yet.
- Public native availability: not announced.

## Recommended Build Matrix

Use GitHub Actions only after the workflow is reviewed and explicitly approved.

| Platform | Runner | Artifact | Current gate |
|---|---|---|---|
| macOS Apple Silicon | local Apple Silicon Mac first | `.dmg` | Developer ID signing and notarization |
| macOS Intel | `macos-13` or equivalent | `.dmg` | Intel smoke test and signing |
| Windows x64 | `windows-latest` | NSIS `.exe` | installer smoke test and code signing decision |
| Linux x64 | `ubuntu-latest` | AppImage and `.deb` | WebKit/GTK dependencies and clean desktop smoke test |

## Safe CI Rules

- Do not store Apple, Windows, Supabase, or store credentials in tracked files.
- Do not upload public release artifacts automatically.
- Use draft artifacts for internal QA until founder approval.
- Keep the website download page unchanged until artifacts pass platform QA.
- Do not add a paid code signing certificate, Apple Developer account, or store account without founder approval.

## Pre-Build Checks

```sh
npm run qa:desktop --prefix desktop/renewal-desk
npm run qa:windows --prefix desktop/renewal-desk
npm run qa:linux --prefix desktop/renewal-desk
node --check products/renewal-desk/src/app.js
node --check products/renewal-desk/src/sync-adapter.js
```

## Platform Smoke Tests

### Windows

- Install the NSIS `.exe` on a clean Windows profile.
- Confirm Start menu entry appears.
- Launch Renewal Desk.
- Add, edit, delete, backup, restore, and spreadsheet export.
- Quit and relaunch; confirm local data persists.
- Uninstall; confirm app entry is removed.

### Linux

- Launch AppImage on a clean mainstream Linux desktop.
- Install `.deb` on a Debian/Ubuntu test machine.
- Confirm launcher icon and app name.
- Add, edit, delete, backup, restore, and spreadsheet export.
- Remove `.deb`; confirm package removal succeeds.

### macOS

- Install from `.dmg` on a clean macOS profile.
- Confirm drag-to-Applications flow.
- Confirm Gatekeeper first launch without security bypass after Developer ID signing and notarization.
- Add, edit, delete, backup, restore, and spreadsheet export.

## Release Gate

Native download buttons can be enabled only after:

- artifact exists,
- checksum is generated,
- clean install/launch test passes,
- core Renewal Desk user flow passes,
- known limitations are documented,
- website copy avoids fake platform claims,
- founder approves making the platform artifact public.
