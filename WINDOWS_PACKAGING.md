# Windows Packaging

Status: Tauri scaffold prepared, not built.

See `DESKTOP_PACKAGING_READINESS.md` for shared identity, QA gates, and copy rules.

## Target

Professional Windows installer after the desktop shell is ready.

## Candidate Formats

- `.exe` installer through Tauri bundler
- `.msi` if store or enterprise distribution benefits from it

Current scaffold: `desktop/renewal-desk`.

## Signing

Code signing certificate is recommended for trust and SmartScreen reputation. Certificate purchase requires founder approval.

## Release Requirements

- installer smoke test on Windows
- uninstall test
- checksum
- release notes
- privacy policy URL
- Microsoft Store draft if store distribution is pursued
- AppUserModelID: `TidyrailStudio.RenewalDesk`

## Local Preflight

```sh
node scripts/qa-desktop-packaging.mjs
```

The first real Windows build still requires Rust, Windows Tauri prerequisites, final icon assets, installer smoke testing, uninstall testing, and a signing decision.
