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
npm run qa:windows --prefix desktop/renewal-desk
```

Current readiness:

- Tauri target includes `nsis` for a Windows setup executable.
- Windows `.ico` and Store logo assets are available.
- The current Mac host cannot produce or smoke test the final Windows installer.
- No Windows code signing configuration is active, which is expected before founder approval.

The first real Windows build still requires a Windows machine or CI runner, Windows Tauri prerequisites, installer smoke testing, uninstall testing, checksum generation, release notes, and a signing decision.
