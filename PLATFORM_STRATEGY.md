# Platform Strategy

## Current Recommendation

Use a phased cross-platform strategy:

1. Static web app on GitHub Pages.
2. Supabase-backed account sync after approval.
3. Tauri desktop shell for macOS, Windows, and Linux.
4. Capacitor or Expo evaluation for mobile after core web sync is stable.
5. Native widgets only after mobile app value is proven.

## Why

- Web first keeps cost low and releases fastest.
- Tauri can reuse the web UI while producing smaller desktop apps than Electron.
- Supabase avoids a custom backend while still allowing RLS-protected per-user data.
- Mobile should not be rushed before the reminder workflow and sync model are stable.

## Current Availability

- Web: available.
- Static package: available.
- macOS .dmg: in preparation.
- Windows installer: in preparation.
- Linux package: in preparation.
- iOS: planned.
- Android: planned.

## Manual Approval Required

- Apple Developer Program.
- Google Play Console.
- Microsoft Partner Center.
- Code signing certificates.
- App store submissions.

Tidyrail Studio will ship products free-first and local-first. The goal is to earn trust, collect feedback, and build public credibility before monetization.

## Recommendation

Use a **web-first core with a lightweight cross-platform shell later**:

- Web app: plain static HTML/CSS/JavaScript or React/Vite when complexity grows.
- Desktop: Tauri for macOS, Windows, and Linux when native packaging is needed.
- Mobile: Capacitor or Expo/React Native after the product proves useful on web and desktop.
- Native-only stacks: SwiftUI/Kotlin only when a product requires platform-specific APIs.

## Why This Fits

### Web

Static web apps are the fastest and cheapest way to ship free tools. They can run without accounts, servers, paid APIs, or app-store review.

### macOS

Tauri is a good fit for small utilities because it can wrap a web UI with a smaller desktop footprint than Electron. It also allows direct download before Mac App Store submission.

### Windows

Tauri can produce Windows builds from the same UI layer, making direct downloads and later Microsoft Store preparation realistic.

### Linux

Tauri can target Linux packages, AppImage-style distribution, and GitHub releases later. Linux users are often comfortable with direct downloads and open release notes.

### iOS and Android

Mobile should come later. Renewal Desk is useful on mobile, but store distribution requires more account setup, review, screenshots, privacy answers, and support. A mobile shell should be prepared only after the web release is stable.

### Maintenance

The lowest-maintenance path is one shared local-first product model, one shared UI direction, and separate platform packaging only after the core product works.

### Store Distribution

Prepare copy and metadata now, but do not submit until the product has real usage feedback.

### Low Cost

This approach avoids paid backend, paid APIs, paid build services, and paid developer accounts until they are justified.

## Current Product Stack

Renewal Desk currently uses:

- Static HTML.
- CSS.
- Vanilla JavaScript.
- Browser localStorage.
- JSON/CSV export.

This is acceptable for v1.0 free web release. Tauri packaging can be added after the website and direct download flow are complete.
