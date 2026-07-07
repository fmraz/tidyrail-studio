# Desktop Packaging Readiness

Status: Tauri scaffold and platform icon assets prepared; local macOS internal QA `.dmg` candidate produced, not public distribution ready.

Purpose: define the minimum packaging inputs and QA gates before Renewal Desk is advertised as a macOS, Windows, or Linux desktop app.

## Product Identity

| Field | Value |
|---|---|
| Product name | Renewal Desk |
| Company | Tidyrail Studio |
| Domain | `tidyrailstudio.com` |
| Bundle identifier | `com.tidyrailstudio.renewaldesk` |
| Windows AppUserModelID | `TidyrailStudio.RenewalDesk` |
| Linux desktop id | `com.tidyrailstudio.renewaldesk` |
| Current release | `0.1.0-mvp` |
| Current distribution | Web app and static ZIP package |
| Local native candidate | macOS Apple Silicon `.dmg`, internal QA only |
| Data model | Local-first browser storage with JSON backup/import and CSV export |
| Account sync | Prepared, not public until Supabase, RLS, and HTTPS are approved |

## Shared Packaging Inputs

- Tauri scaffold path: `desktop/renewal-desk`.
- Desktop preflight helper: `scripts/qa-desktop-packaging.mjs`.
- Final app icon set in platform formats: `.icns`, `.ico`, PNG sizes, and source artwork.
- Versioned release notes.
- Checksum for every downloadable artifact.
- Privacy policy URL.
- Terms of use URL.
- Support contact URL or email.
- Tested backup/export path before any shell migration.
- No payment, subscription, Pro, or artificial free limit code.
- No service role key, local Supabase config, or secret-bearing file in any package.

## macOS Gate

Target artifact: signed and notarized `.dmg`.

Required before public listing:

- Tauri shell builds a `.app` bundle from the existing Renewal Desk web core.
- Bundle identifier is `com.tidyrailstudio.renewaldesk`.
- App icon renders correctly in Finder, Dock, and the DMG window.
- Local data path is documented and does not break existing browser export/import.
- Developer ID signing and notarization are complete.
- Gatekeeper first-launch test passes on a clean macOS profile.

Payment blocker: Apple Developer Program membership and signing setup require founder approval.

Current local candidate:

- Path: `desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg`
- SHA-256: `9e9a9772c2c394dfcf5cc6025d1179923230762547176de6f1c25f781ef7020d`
- `hdiutil verify`: passed.
- Mounted bundle contains `Renewal Desk.app`, an `Applications` symlink, `.VolumeIcon.icns`, and `.DS_Store`.
- Bundle identifier: `com.tidyrailstudio.renewaldesk`.
- `codesign --verify --deep --strict`: passed with local ad-hoc signing.
- Public readiness: blocked until Developer ID signing, notarization, and clean-machine Gatekeeper validation.

## Windows Gate

Target artifact: `.exe` installer first, `.msi` only if distribution needs it.

Required before public listing:

- Tauri shell builds and launches on a clean Windows machine or VM.
- Installer creates Start menu entry and uninstall entry.
- App icon renders correctly in Explorer, taskbar, and installer surfaces.
- AppUserModelID is `TidyrailStudio.RenewalDesk`.
- Install, launch, export, import, update, and uninstall smoke tests pass.
- Code signing path is decided before broad public promotion.

Payment blocker: a Windows code signing certificate may require founder approval.

## Linux Gate

Target artifacts: AppImage first, `.deb` only if maintenance stays reasonable.

Required before public listing:

- AppImage launches on a clean mainstream Linux desktop.
- `.desktop` metadata uses `com.tidyrailstudio.renewaldesk`.
- Icon sizes include at least 32, 64, 128, 256, and 512 px PNG.
- Export/import works from the packaged app.
- Install and removal instructions are documented.
- Package does not become a blocker for the web app release.

## Preflight Checks

Run these before any packaging candidate is promoted:

```sh
node --check products/renewal-desk/src/app.js
node --check products/renewal-desk/src/sync-adapter.js
node scripts/qa-renewal-sync-adapter.mjs
node --check products/renewal-desk/sw.js
node scripts/qa-desktop-packaging.mjs
npm run qa:native-prereqs --prefix desktop/renewal-desk
npm run qa:macos-dmg --prefix desktop/renewal-desk
npm run qa:macos-notarization --prefix desktop/renewal-desk
npm run qa:windows --prefix desktop/renewal-desk
npm run qa:linux --prefix desktop/renewal-desk
unzip -t dist/renewal-desk-0.1.0-mvp.zip
shasum -a 256 dist/renewal-desk-0.1.0-mvp.zip
```

Rust/Cargo are now installed locally through `rustup`, and the Apple Silicon macOS Tauri build can produce an internal `.dmg` candidate. The DMG QA helper verifies the image, metadata, checksum, drag-to-Applications layout, and local ad-hoc code signature. The notarization readiness helper confirms local Apple tooling is available and reports the remaining Developer ID and credential blockers without printing secrets. Native distribution remains gated by platform-specific signing, notarization, Windows/Linux build environments, and clean-machine tests.

Current icon assets live in `desktop/renewal-desk/src-tauri/icons` and were generated from `brand/icons/renewal-desk-icon-concept.png` with the Tauri icon generator. The desktop preflight checks the configured icon list, PNG dimensions, `.icns` signature, and `.ico` header before any packaging candidate can be promoted.

Windows and Linux readiness helpers validate bundle metadata, platform icon assets, configured Tauri targets, and host limitations. They do not replace real installer/package builds on Windows and Linux machines.

## Public Copy Rules

- Say "in preparation" for native installers until real artifacts pass QA.
- Do not say "available for macOS", "available for Windows", or "available for Linux" until those builds exist.
- Keep the static ZIP described as a portable browser package, not a native app.
- Keep account sync described as prepared or planned until the backend is configured, RLS is verified, HTTPS is valid, and founder approval is recorded.
