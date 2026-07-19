# Improvement Backlog

| Improvement | Priority | Effort | Impact | Risk | Timing |
|---|---|---:|---:|---:|---|
| Resolve GitHub Pages `bad_authz` or submit the prepared support request | P0 | S | High | Low | Now |
| Finish keyboard-only and VoiceOver Renewal Desk RC QA | P0 | M | High | Low | Now |
| Connect Supabase Auth in a private test project | P1 | M | High | Medium | After HTTPS and approval |
| Run real two-user Supabase RLS isolation QA | P1 | M | High | Medium | After Supabase setup |
| Implement explicit first-import and conflict-safe cloud sync | P1 | L | High | High | After RLS passes |
| Complete English/Czech string extraction and localization architecture | P1 | L | Medium | Medium | After RC QA |
| Define backward-compatible currency behavior without mixed-currency totals | P1 | M | High | Medium | After RC QA |
| Prepare signed and notarized public macOS DMG | P1 | M | High | High | Requires Apple approval |
| Build and smoke-test Windows and Linux packages on target systems | P2 | M | Medium | Medium | After web release |
| Build iOS/Android shells and useful deadline widgets | P2 | L | Medium | High | After sync is stable |
| Publish a verified GitHub Release with the static ZIP and checksum | P2 | S | Medium | Low | After final package push |

## Implemented Foundation

- Mobile navigation scaffold.
- Account UI scaffold.
- Download platform detection.
- Localization language scaffold.
- Icon concept and deterministic SVG guide.
- PWA manifest, network-first offline cache, and service-worker upgrade QA.
- Tauri desktop shell and platform icon assets.
- Internal Apple Silicon DMG build and QA workflow.
- Windows and Linux packaging metadata readiness checks.
- Supabase auth, schema, sync adapter, and two-user RLS test scaffolds kept disabled by default.
- Release documentation, version sources, platform claims, and package hashes reconciled.
- Lighthouse, route, link, SEO, responsive, and accessibility audits completed.
- Privacy-safe GitHub bug and feature request forms.
