# Renewal Desk Desktop Scaffold

Status: scaffold only, no public native builds.

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
```

`tauri:dev` and `tauri:build` require Rust, platform-specific Tauri prerequisites, and platform signing decisions. The current environment does not include Rust, so this scaffold is not yet a build artifact.

Current native prerequisite status:

- Desktop scaffold preflight passes.
- Tauri CLI package is installed through `desktop/renewal-desk/package-lock.json`.
- macOS `hdiutil` is available.
- Xcode Command Line Tools are available.
- Rust/Cargo are not currently installed, so `npm run tauri:build` cannot create a `.app` or `.dmg` yet.
- Full Xcode is not selected; this is a warning for later signing/notarization workflows, not a blocker for documenting the scaffold.

## Before First Native Build

1. Install Rust and Tauri platform prerequisites.
2. Confirm local data location and export/import behavior inside the shell.
3. Visually check the generated icon in Dock/Finder, taskbar/Explorer, and Linux launcher surfaces.
4. If account sync is approved for desktop, add the exact Supabase project origin to the Tauri CSP instead of a wildcard.
5. Run platform smoke tests on clean macOS, Windows, and Linux machines or VMs.
6. Add checksums and release notes for each produced artifact.
