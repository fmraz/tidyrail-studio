# Continue Tidyrail Studio

Continue the existing project in `/Users/frantamraz/Documents/Software Company`.

Do not restart. Do not rename Tidyrail Studio. Do not abandon Renewal Desk. Communicate with the founder only in Czech. Write all public UI, website copy, documentation, policies, changelogs, store materials, and marketing text in English first.

## Current Project

- Company: Tidyrail Studio
- First product: Renewal Desk
- Domain: `tidyrailstudio.com`
- GitHub repository: `fmraz/tidyrail-studio`
- GitHub Pages source: `main` + `/docs`
- Website source: `website/`
- Deployment mirror: `docs/`
- Renewal Desk source: `products/renewal-desk/`
- Tauri desktop scaffold: `desktop/renewal-desk/`
- Products are free. Do not add payments, subscriptions, Pro locks, or artificial limits.

## Latest Completed Work

- Removed the unwanted four-column trust strip from the homepage and published commit `294882c`.
- Added reusable recurring-date logic in `products/renewal-desk/src/renewal-logic.js`.
- Added a Renew action for monthly, quarterly, and yearly records.
- Renew advances to the next future scheduled date, including long-overdue schedules, month ends, quarterly cycles, and leap-year yearly cycles.
- Added an eight-second Liquid Glass confirmation with Undo.
- One-time and custom cycles remain manual so the app does not guess user intent.
- Changed the first dashboard summary from `Due in 30 days` to `Needs attention`, including overdue items.
- Improved 1061-1400px layout: the main renewal table now spans the full width and secondary panels sit below it in two columns.
- Added `scripts/qa-renewal-logic.mjs`.
- Bumped the service worker cache to `renewal-desk-0.1.5` and included `src/renewal-logic.js` in the offline app shell.
- Replaced `THREE_HOUR_WORK_LOOP.md` with a comprehensive product-outcome operating prompt covering UX, domain logic, data safety, accessibility, packaging, release gates, and evidence-based QA.
- Rebuilt and synchronized the free ZIP package. Current SHA-256: `ddc238a20ff0d1613ecda0150f3d0df5b0ae93ce6536f6472a8dfc1cbf57a0eb`.
- Added a privacy-friendly calendar download that turns all valid records into standard all-day calendar events for Apple Calendar, Google Calendar, Outlook, and compatible apps.
- Calendar generation escapes user text, uses exclusive next-day event endings, rejects invalid dates, and does not transmit data.
- Added empty-state guidance when no calendar can be created.
- Bumped the service worker cache to `renewal-desk-0.1.6` and included `src/calendar-export.js` in the offline app shell.
- Added `scripts/qa-renewal-calendar-export.mjs` with nine deterministic calendar assertions.
- Updated automation `create-software-company-brand` to **Tidyrail 3-hour product loop**, running every three hours instead of hourly.

## Verified QA

- `node scripts/qa-renewal-logic.mjs` passes all six recurrence cases.
- `node scripts/qa-auth-config-safety.mjs` passes.
- `node scripts/qa-renewal-sync-adapter.mjs` passes.
- JavaScript syntax checks pass for the app and recurrence logic.
- In-app Browser desktop QA passed at 1280x900.
- Renew moved a sample monthly record from July 23, 2026 to August 23, 2026.
- Undo restored the exact previous record state.
- The 1280px table has no internal overflow and the document has no horizontal overflow.
- In-app Browser mobile QA passed at 390x844: document width equals viewport width, Renew works, the toast respects the viewport safe area, and Undo works.
- Homepage QA confirms the removed trust strip is absent, the next section has no artificial gap, the Three.js canvas is sized, and no console warnings/errors were captured.
- `unzip -t website/downloads/renewal-desk-0.1.0-mvp.zip` passes.
- Package contains `src/renewal-logic.js`.
- Checksum verification passes from `website/downloads/`.
- Changed product files match between product source, `website/`, and `docs/`.
- `node scripts/qa-renewal-calendar-export.mjs` passes all nine calendar assertions.
- Calendar export browser QA passed at 1280x900 and 390x844, including empty-state protection, three-date export feedback, no horizontal overflow, and no relevant console errors.

## HTTPS Status

- Public HTTP site returns 200.
- GitHub Pages reports `status: built`.
- GitHub Pages still reports `https_certificate.state: bad_authz` with `The ACME authorization is in a bad state. We need to start over.`
- HTTPS still fails hostname validation because the served certificate does not include `tidyrailstudio.com`.
- `https_enforced` remains false and must not be enabled yet.
- Next HTTPS action requires GitHub Pages Settings UI custom-domain reset or GitHub Support using the prepared text in `GITHUB_PAGES_SETUP.md`.

## Existing Platform State

- Renewal Desk remains local-first with browser storage, backup, restore, spreadsheet export, PWA manifest, and service worker.
- Supabase auth/sync scaffolding is disabled by default and has no committed secrets.
- A real Supabase project and two-user RLS QA are not complete.
- Local Apple Silicon Tauri DMG candidate exists for internal QA only.
- DMG structure, ad-hoc signature, mount, launch, quit, and detach checks passed previously.
- Public macOS distribution still requires full Xcode, Developer ID signing, notarization credentials, notarization, staple, and clean-machine Gatekeeper QA.
- Windows and Linux metadata readiness checks pass, but real target-OS installers do not exist.
- iOS/Android shells and widgets do not exist.

## Safety And Repository Rules

- Do not spend money or enter payment details.
- Do not publish to stores or social platforms.
- Do not hardcode or commit secrets, `.env`, `auth-config.js`, service-role keys, signing credentials, or native `target/` and `gen/` output.
- Do not claim unavailable platforms.
- Preserve the unrelated untracked file `NEXT_PROMPT 2.md`; do not edit or commit it.
- Run `node scripts/qa-auth-config-safety.mjs` before and after auth/sync work.
- Synchronize each changed public file from `website/` to `docs/`.
- Follow `THREE_HOUR_WORK_LOOP.md` and choose one measurable user outcome per cycle.

## Next Priority

1. Check Git status, GitHub Pages API, and public HTTPS.
2. If the certificate becomes valid for `tidyrailstudio.com`, enable Enforce HTTPS and verify HTTP-to-HTTPS redirect. Otherwise keep it off.
3. Continue Renewal Desk core-product QA with overdue records, one-time/custom date editing, delete confirmation, invalid backup import, offline reload, service worker update, keyboard navigation, and a VoiceOver spot check if available.
4. Test the generated calendar file in Apple Calendar on the founder machine when a non-destructive import review is convenient; do not add external events without confirmation.
5. Add a user-friendly overdue-first review flow only if QA shows it reduces missed renewals without adding clutter.
6. Review recurrence and calendar logic against the future cloud schema and preserve backward compatibility before adding any new item fields.
7. Keep Supabase disabled until approved test configuration exists; then run the two-user RLS test before implementing automatic sync.
8. Continue public macOS packaging only after approved Developer ID/notarization prerequisites. Build Windows/Linux candidates only on target OS or reviewed CI.
9. Update affected changelogs, QA report, decision log, package checksum, and this file.
10. Commit and push completed safe changes. Do not include `NEXT_PROMPT 2.md`.

## Required End Report

Respond in Czech with: completed work, website state, Renewal Desk state, user benefit, HTTPS/distribution state, changed files, tests, remaining risks, manual approvals, next best step, and the complete updated `NEXT_PROMPT.md`.
