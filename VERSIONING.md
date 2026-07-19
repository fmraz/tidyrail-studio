# Versioning

Use semantic versioning.

- `0.1.0`: early MVP release candidate
- `0.9.0`: release candidate with accounts/packaging nearly ready
- `1.0.0`: first stable public release
- Patch versions for bug fixes
- Minor versions for backward-compatible improvements
- Major versions for breaking data or platform changes

Renewal Desk current version: `0.1.0-mvp`.

## Version Sources

- Product version: user-visible release version shared by the package, changelog, Tauri config, and release notes.
- Service-worker cache revision: internal static asset cache identifier. It is not a product version and may advance independently.
- Data format version: backup/schema compatibility number. It changes only when import or storage migration rules change.

Current state:

- Product: `0.1.0-mvp`.
- Tauri package: `0.1.0`.
- Service-worker cache: `renewal-desk-0.1.10`.
- Public ZIP filename: `renewal-desk-0.1.0-mvp.zip`.

## Release Rules

- Keep the current public ZIP URL available when a newer version is introduced.
- Do not rename the public package until the replacement package, website links, checksums, release notes, and rollback copy are ready together.
- Use `0.9.0` only after the local-first web release has valid HTTPS and completed release-candidate QA.
- Accounts, native packaging, and mobile apps do not have to block a stable local-first web `1.0.0` if their unavailable status is explicit.
- Never present a service-worker cache revision as a product update.
