# QA Checklist

## Website

- [x] Homepage loads locally.
- [x] Desktop screenshot checked.
- [x] Mobile screenshot checked.
- [x] 3D scene initializes locally.
- [x] Scroll animation changes scene progress.
- [x] ZIP download link returns a file.
- [x] Public HTTP site returns GitHub Pages content.
- [ ] Public HTTPS certificate completed. Current 2026-06-28 GitHub Pages API state: `bad_authz`; TLS still serves `*.github.io`; same-settings and remove/re-add API retries returned `The certificate has not finished being issued`, so the next retry should use the GitHub Pages Settings UI.
- [x] VEDOS wildcard DNS records removed.
- [x] Mobile menu retested after account/download changes.
- [x] Public website navigation and sitemap exclude account drafts until backend approval.
- [x] Homepage and downloads page retested locally after free-first copy changes.
- [x] iOS/macOS-inspired glass redesign checked on desktop homepage and downloads views.
- [x] Mobile overflow guardrails added for hero, sections, CTA groups, 3D canvas, screenshots, and header.
- [x] Mobile Chrome DevTools emulation verified `documentElement.scrollWidth` equals viewport width at 390px.
- [x] Mobile menu closes on outside click, link click, and Escape.
- [x] Referrer, theme-color, and mobile format-detection metadata added to public pages.
- [x] GitHub Pages HTTPS certificate provisioning retriggered by safely re-applying the custom domain.
- [x] GitHub Pages certificate state checked through API after HTTPS failure.
- [x] GitHub Pages remove/re-add API reset attempted; custom domain remained `tidyrailstudio.com`, HTTP stayed live, and HTTPS still served the wrong certificate.
- [x] GitHub Pages certificate state rechecked on 2026-06-28; DNS remains correct, HTTP stays live, HTTPS still has the wrong certificate, and Enforce HTTPS remains off.

## Renewal Desk

- [x] Core local app flow tested.
- [x] Export/import tested.
- [x] ZIP integrity tested.
- [x] Download ZIP rebuilt and checksum verified after app-shell copy update.
- [x] Download ZIP rebuilt and checksum verified after free-first documentation alignment.
- [x] Export view retested after local-first/sync-status copy update.
- [x] Local sync adapter scaffold tested in browser.
- [x] Local sync adapter scaffold covered by scripted browser-like QA.
- [x] Sync readiness report export tested locally.
- [x] Source HTML metadata aligned with public web app HTML before rebuilding the ZIP.
- [x] Renewal Desk app visual system aligned with the Tidyrail Studio website and retested on desktop/mobile.
- [x] Renewal Desk Liquid Glass app redesign checked on desktop screenshot at 1440px.
- [x] Renewal Desk mobile layout checked at 390px with `documentElement.scrollWidth` and `body.scrollWidth` equal to viewport width.
- [x] Renewal Desk mobile navigation changed to a 2x2 grid after visual QA showed horizontal nav clipping.
- [x] Renewal Desk sample data flow, dashboard stats, active view switching, and Export view were retested after the visual refresh.
- [ ] Cloud sync tested after backend setup.

## Account System

- [ ] Supabase project created.
- [ ] RLS schema applied.
- [ ] Local `website/js/auth-config.js` created only for approved testing and not committed.
- [x] Test-safe two-user RLS QA script prepared without secrets.
- [ ] Email/password tested.
- [ ] Password reset tested.
- [ ] OAuth providers tested.
- [ ] Export/delete cloud data tested.
- [ ] User A cannot read, update, or delete User B Renewal Desk rows.
- [ ] User B cannot read, update, or delete User A Renewal Desk rows.
- [ ] Anonymous users cannot read or write `renewal_items`.
- [ ] Export returns only the signed-in user's rows.
- [ ] Sign-out clears account-scoped in-memory state.

## Localization

- [ ] Full English string inventory.
- [ ] Full translation files.
- [ ] RTL QA.
- [ ] Mobile text expansion QA.

## General App QA

- Core workflow works from empty state.
- Data persists after reload when persistence is expected.
- Export works and can be imported again.
- Delete actions require confirmation or are easy to recover from.
- Error messages are clear.
- Mobile layout does not overflow.
- Keyboard focus is visible.
- No console errors in normal use.
- README instructions are accurate.
- Privacy claims match actual behavior.

## Desktop Packaging

- [x] Tauri scaffold exists under `desktop/renewal-desk`.
- [x] Desktop scaffold preflight passes without local auth config or secret-bearing files.
- [ ] Rust and platform-specific Tauri prerequisites installed.
- [ ] Final platform icon assets added.
- [ ] macOS `.dmg` build produced and notarized.
- [ ] Windows installer produced and smoke tested.
- [ ] Linux AppImage or `.deb` produced and smoke tested.

## Release Candidate QA

- Fresh browser/profile test.
- Existing data migration or reset test.
- Manual accessibility pass.
- Responsive desktop and mobile pass.
- Offline/local file usage pass where applicable.
- Packaging/opening instructions verified.
