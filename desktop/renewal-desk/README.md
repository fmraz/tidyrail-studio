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

## Local Preflight

```sh
npm install
npm run qa:desktop
```

`tauri:dev` and `tauri:build` require Rust, platform-specific Tauri prerequisites, and platform signing decisions. The current environment does not include Rust, so this scaffold is not yet a build artifact.

## Before First Native Build

1. Install Rust and Tauri platform prerequisites.
2. Replace default bundle icons with final Renewal Desk icon assets.
3. Confirm local data location and export/import behavior inside the shell.
4. If account sync is approved for desktop, add the exact Supabase project origin to the Tauri CSP instead of a wildcard.
5. Run platform smoke tests on clean macOS, Windows, and Linux machines or VMs.
6. Add checksums and release notes for each produced artifact.
