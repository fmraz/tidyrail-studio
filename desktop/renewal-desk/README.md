# Renewal Desk Desktop Scaffold

Status: local internal QA macOS `.dmg` candidate exists; no public native builds yet.

This folder prepares a Tauri desktop shell for Renewal Desk while keeping the current release web-first and local-first.

## Safety Rules

- Do not publish native installers until the platform QA gates in `DESKTOP_PACKAGING_READINESS.md` pass.
- Do not add `website/js/auth-config.js`, `docs/js/auth-config.js`, service role keys, database passwords, OAuth secrets, or `.env` files to this package.
- Do not claim macOS, Windows, or Linux availability until real signed or tested artifacts exist.
- Keep account sync disabled by default unless Supabase, RLS QA, HTTPS, and founder approval are complete.

## Current Inputs

- Web core: `../../products/renewal-desk`
- Bundle identifier: `com.tidyrailstudio.renewaldesk`
- Product name: `Renewal Desk`
- Company: `Tidyrail Studio`
- Icon set: `src-tauri/icons`, generated from `../../brand/icons/renewal-desk-icon-concept.png`

## Local Preflight

```sh
npm install
npm run qa:desktop
npm run qa:native-prereqs
npm run tauri:build
npm run qa:macos-dmg
```

`tauri:dev` and `tauri:build` require Rust, platform-specific Tauri prerequisites, and platform signing decisions. Rust/Cargo are installed in the current local user profile through `rustup`, so this Mac can produce an internal Apple Silicon `.dmg` candidate.

Current native prerequisite status:

- Desktop scaffold preflight passes.
- Tauri CLI package is installed through `desktop/renewal-desk/package-lock.json`.
- macOS `hdiutil` is available.
- Xcode Command Line Tools are available.
- Rust/Cargo are installed locally.
- `npm run tauri:build` produces a local Apple Silicon `.dmg` candidate.
- `npm run qa:macos-dmg` verifies the local `.dmg`, bundle metadata, drag-to-Applications layout, checksum, and strict local code signature.
- Full Xcode is not selected; this is a warning for later signing/notarization workflows, not a blocker for documenting the scaffold.

## Current Internal macOS Candidate

Path:

```text
src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg
```

SHA-256:

```text
98d55d03d02fec5726ee55205be78ddc89c0edd165d1a0755e4cf7759f12542f
```

This candidate is for internal QA only. It uses ad-hoc signing and must not be promoted as the public macOS download.

## Before Public Native Release

1. Confirm local data location and export/import behavior inside the shell.
2. Visually check the generated icon in Dock/Finder, taskbar/Explorer, and Linux launcher surfaces.
3. If account sync is approved for desktop, add the exact Supabase project origin to the Tauri CSP instead of a wildcard.
4. Complete Developer ID signing and notarization for macOS.
5. Run Gatekeeper first-launch testing on a clean macOS profile.
6. Run platform smoke tests on clean Windows and Linux machines or VMs.
7. Add checksums and release notes for each produced artifact.
