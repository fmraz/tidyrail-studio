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
- desktop id: `com.tidyrailstudio.renewaldesk`

Linux packaging should not block the web app release.

## Local Preflight

```sh
node scripts/qa-desktop-packaging.mjs
npm run qa:linux --prefix desktop/renewal-desk
```

Current readiness:

- Tauri targets include `appimage` and `deb`.
- Linux icon PNG sizes are available.
- Desktop id is aligned with the Tauri identifier: `com.tidyrailstudio.renewaldesk`.
- The current Mac host cannot produce or smoke test final Linux packages.

The first real Linux build still requires a Linux machine or CI runner, Linux Tauri prerequisites, AppImage/.deb artifact generation, clean-desktop launch testing, install/removal notes, checksums, and release notes.
