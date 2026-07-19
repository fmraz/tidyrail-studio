# Continue Tidyrail Studio

Continue the existing project in `/Users/frantamraz/Documents/Software Company`.

Do not restart. Do not rename Tidyrail Studio. Do not abandon Renewal Desk. Do not begin a second product before Renewal Desk reaches a trustworthy public release. Communicate with the founder only in Czech. Write all public UI, website copy, documentation, policies, changelogs, store material, and marketing text in English first.

## Operating System

Read and follow `THREE_HOUR_WORK_LOOP.md` before making changes. Choose exactly one measurable user outcome per cycle. Prefer finishing, fixing, simplifying, protecting user data, and verifying release quality over brainstorming.

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
- Products are free. Do not add payments, subscriptions, Pro locks, advertising, or artificial limits.

## Latest Completed Product Work

- Renewal Desk is a free local-first web release candidate with add, edit, delete, search, category filtering, recurring Renew, Undo, calendar download, spreadsheet export, backup, and restore.
- Monthly, quarterly, and yearly renewals advance to the next future scheduled date with month-end, overdue, and leap-year handling.
- Calendar export produces standard all-day events for Apple Calendar, Google Calendar, Outlook, and compatible apps without transmitting user data.
- Backup export now writes a versioned Renewal Desk format while preserving support for older array backups.
- Restore now validates app identity, backup version, file size, record count, item name, real calendar date, enum values, cost, duplicate IDs, and usable record count before changing user data.
- Restore rejects files larger than 5 MB, foreign apps, unsupported future versions, more than 10,000 records, and backups without usable records.
- Existing data is never silently replaced: Renewal Desk asks for confirmation, reports skipped entries, and offers immediate Undo after a successful restore.
- An intentionally empty backup remains portable, but its confirmation now states that every current item will be removed, includes the exact affected count, and explains immediate Undo before the user continues.
- The reusable restore parser is in `products/renewal-desk/src/backup-logic.js` and is mirrored to the website and Pages app.
- The offline app cache is `renewal-desk-0.1.8` and includes `src/backup-logic.js`.
- The release ZIP was rebuilt and synchronized. SHA-256: `eb6c26d46d917cd1677e4574305ca1f6291627cde5c837cc8c889dcb6d410304`.
- The active studio automation runs every three hours and uses the product-outcome workflow in `THREE_HOUR_WORK_LOOP.md`.

## Verified QA

- `node scripts/qa-renewal-backup-logic.mjs` passes eleven backup-format, safety, and confirmation-copy assertions.
- `node scripts/qa-renewal-logic.mjs` passes all six recurrence cases.
- `node scripts/qa-renewal-calendar-export.mjs` passes all nine calendar assertions.
- `node scripts/qa-auth-config-safety.mjs` passes.
- `node scripts/qa-renewal-sync-adapter.mjs` passes.
- JavaScript syntax checks pass for the app and backup logic.
- Desktop browser QA passed at 1280x900 with no horizontal overflow.
- A foreign backup was rejected without changing the current list.
- Canceling restore preserved the current list.
- A backup with one valid item and one impossible date restored one item and reported one skipped entry.
- Restore Undo returned all four pre-restore records.
- Empty-backup confirmation logic identifies the destructive outcome, exact affected count, and recovery path.
- Mobile QA passed at 390x844: document width equals viewport width, export controls stay between x=26 and x=364, controls are at least 46px high, and no relevant console errors were captured.
- Returning-user offline QA passed after one successful fresh-origin load: with the server fully stopped, desktop and 390px mobile reloads preserved the complete app shell, all three stored records, responsive width, and interactive Items navigation without console errors.
- Service worker upgrade QA passed from cache `renewal-desk-0.1.7` to `renewal-desk-0.1.8`: the old cache was removed, three local records survived, desktop and mobile rendering stayed correct, and the updated cache passed a server-offline reload without console errors.
- Product source, `website/`, and `docs/` match for all changed public app files.
- All three ZIP copies are byte-identical, pass `unzip -t`, contain `src/backup-logic.js`, and pass their SHA-256 files.

## Public Website And HTTPS

- Public HTTP Renewal Desk currently returns status 200 from GitHub Pages.
- The public deployment is still behind local `main`: `src/backup-logic.js` returns 404 and the public ZIP checksum is still `ddc238a20ff0d1613ecda0150f3d0df5b0ae93ce6536f6472a8dfc1cbf57a0eb`.
- HTTPS still fails host validation because the served certificate does not include `tidyrailstudio.com`.
- Do not enable Enforce HTTPS until a certificate valid for `tidyrailstudio.com` is served.
- The GitHub CLI login for `fmraz` was invalid during the latest check, so the Pages API returned 404. Re-authentication with `gh auth login -h github.com` requires the founder to complete the browser/device authorization step.
- After GitHub authentication is restored, recheck `gh api repos/fmraz/tidyrail-studio/pages`, the latest Pages build, the public backup logic asset, and the public ZIP checksum.
- If Pages still reports `bad_authz`, use the prepared GitHub Pages Settings reset or support request in `GITHUB_PAGES_SETUP.md`; keep HTTPS enforcement off.

## Existing Platform State

- Supabase auth and sync scaffolding is disabled by default and contains no committed secrets.
- A real Supabase project and two-user RLS isolation QA are not complete.
- A local Apple Silicon Tauri DMG exists for internal QA only.
- Public macOS distribution still requires full Xcode, Developer ID signing, notarization credentials, stapling, and clean-machine Gatekeeper QA.
- Windows and Linux metadata readiness checks pass, but real target-OS installers do not exist.
- iOS and Android shells and widgets do not exist.
- Do not claim untested platform availability.

## Safety And Repository Rules

- Do not spend money or enter payment details.
- Do not publish to stores, Product Hunt, Reddit, email, or social platforms.
- Do not hardcode or commit secrets, `.env`, `auth-config.js`, service-role keys, passwords, signing credentials, or native `target/` and `gen/` output.
- Keep cloud sync disabled until approved configuration, two-user RLS isolation, account export/deletion, conflict handling, and recovery pass QA.
- Preserve the unrelated untracked founder file `NEXT_PROMPT 2.md`; do not edit, stage, or commit it.
- Synchronize every changed public file between `website/` and `docs/`.
- Rebuild all ZIP copies and checksum files whenever packaged product content changes.

## Next Priority

1. Check Git status and preserve `NEXT_PROMPT 2.md`.
2. Restore GitHub CLI authentication with the founder if it remains invalid; do not request or store the founder's password or token.
3. Verify the latest commit is pushed and GitHub Pages has built it.
4. Verify public HTTP routes for the app, `src/backup-logic.js`, ZIP, and checksum.
5. Recheck HTTPS. Enable Enforce HTTPS only after hostname-valid TLS succeeds.
6. After the founder unlocks the Mac, repeat the synthetic empty-backup file-picker smoke test and verify Cancel, Continue, and Undo; deterministic confirmation tests already pass.
7. Run the remaining Renewal Desk release-candidate resilience checks: keyboard-only backup/export navigation, delete confirmation, one-time/custom date editing, and a VoiceOver spot check if available.
8. Keep Supabase disabled. Only after approved test configuration exists, run the two-user RLS test before implementing automatic sync.
9. Continue public macOS packaging only after approved Developer ID/notarization prerequisites. Build Windows/Linux candidates only on their target OS or reviewed CI.
10. Update only affected docs, `CHANGELOG.md`, the product QA report, the decision log, checksums, and this file.
11. Commit and push completed safe changes. Never include `NEXT_PROMPT 2.md`.

## Required End Report

Respond in Czech with: completed user outcome, website state, Renewal Desk state, HTTPS/distribution state, changed files, tests and evidence, remaining risks, manual approvals, next best step, and the complete updated `NEXT_PROMPT.md`.
