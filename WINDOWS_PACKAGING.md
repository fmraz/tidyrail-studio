# Windows Packaging

Status: planned, not built.

## Target

Professional Windows installer after the desktop shell is ready.

## Candidate Formats

- `.exe` installer through Tauri bundler
- `.msi` if store or enterprise distribution benefits from it

## Signing

Code signing certificate is recommended for trust and SmartScreen reputation. Certificate purchase requires founder approval.

## Release Requirements

- installer smoke test on Windows
- uninstall test
- checksum
- release notes
- privacy policy URL
- Microsoft Store draft if store distribution is pursued
