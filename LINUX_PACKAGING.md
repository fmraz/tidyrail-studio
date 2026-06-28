# Linux Packaging

Status: Tauri scaffold prepared, not built.

See `DESKTOP_PACKAGING_READINESS.md` for shared identity, QA gates, and copy rules.

## Target

Offer one portable option and one distro-friendly option if maintenance stays reasonable.

## Candidate Formats

- AppImage for broad direct download
- `.deb` for Debian/Ubuntu users

Current scaffold: `desktop/renewal-desk`.

## Requirements

- desktop file
- app icon sizes
- checksum
- install instructions
- uninstall instructions
- release notes
- desktop id: `com.tidyrailstudio.RenewalDesk`

Linux packaging should not block the web app release.

## Local Preflight

```sh
node scripts/qa-desktop-packaging.mjs
```

The first real Linux build still requires Rust, Linux Tauri prerequisites, final icon assets, and clean-desktop launch testing.
