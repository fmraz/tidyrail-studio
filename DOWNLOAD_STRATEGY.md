# Download Strategy

Status: web and static package are live; native installers are planned.

## Current Public Downloads

- Web app: `/apps/renewal-desk/`
- Static package: `/downloads/renewal-desk-0.1.0-mvp.zip`

## Automatic Detection

The downloads page uses privacy-friendly browser information:

- `navigator.userAgentData.platform` when available
- `navigator.platform`
- `navigator.userAgent`

No fingerprinting, analytics, or server-side device profiling is used.

## Platform Behavior

| Platform | Current behavior |
|---|---|
| macOS | Show macOS .dmg as in preparation and recommend web app now |
| Windows | Show installer as in preparation and recommend web app now |
| Linux | Show AppImage/.deb as in preparation and recommend web app now |
| iOS | Show App Store as coming later |
| Android | Show Google Play as coming later |
| Unknown | Recommend web app and manual selector |

## Requirement Before Native Download Claims

Do not mark a platform as available until:

- package is built,
- package is locally tested,
- version number is documented,
- checksum is generated,
- install instructions are written,
- release notes are prepared,
- website download link points to the actual file.
