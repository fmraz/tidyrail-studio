# Renewal Desk QA Report

## 2026-06-25

Environment: local static app opened through Google Chrome with Playwright using `file://`.

## Checks Run

- JavaScript syntax check with `node --check products/renewal-desk/src/app.js`.
- Desktop browser smoke test at 1440x1000.
- Mobile browser smoke test at 390x844.
- Sample data load.
- Add item flow.
- Dashboard search flow.
- Export screen navigation.
- Mobile overflow check.

## Results

- No JavaScript syntax errors.
- No browser console errors during tested flows.
- Search returned the expected single row for a newly added item.
- English date and currency formatting verified after locale fix.
- Mobile document width stayed within the 390px viewport after responsive table fix.

## Screenshots

- `products/renewal-desk/assets/qa-dashboard-desktop.png`
- `products/renewal-desk/assets/qa-desktop.png`
- `products/renewal-desk/assets/qa-mobile.png`

## Remaining QA Before Release Candidate

These items were carried forward into later QA passes below. Export/import and CSV content checks are now complete; founder-machine profile and optional screen-reader checks remain before public release.

## 2026-06-25 Accessibility and Release Candidate QA

Environment: local static app served from `http://127.0.0.1:4173/`.

## Checks Run

- JavaScript syntax check with `node --check products/renewal-desk/src/app.js`.
- In-app Browser smoke test at `http://127.0.0.1:4173/`.
- Page identity check: URL and title matched Renewal Desk.
- Blank-page check: dashboard content rendered.
- Framework overlay check: no error overlay found.
- Console health check: no relevant app warnings or errors.
- Add item interaction: opened dialog, verified focus moved to the Name field, saved a test item, and verified the item rendered.
- Navigation accessibility check: active nav item exposes `aria-current="page"`.
- Action label check: generated Edit and Delete buttons include item-specific accessible labels.
- Export status check: JSON and CSV export buttons showed live status messages.
- Responsive screenshot fallback with local headless Chrome at 1280x900 and 390x844.
- Favicon request check after adding `favicon.svg`.

## Results

- No JavaScript syntax errors.
- No app console errors during tested flows.
- Dialog focus management worked for the add-item flow.
- Export status messages are exposed through a polite live region.
- Desktop and mobile screenshots rendered non-empty first viewports.
- Static favicon asset resolves without a missing-file response.

## Tooling Notes

- The in-app Browser successfully validated DOM state, interactions, navigation state, and console health.
- In-app Browser screenshot capture timed out on `Page.captureScreenshot`; local headless Chrome was used only for screenshot evidence.

## Remaining QA Before Public Release

- Fresh browser profile test outside automation.
- Assistive technology spot-check with a screen reader if available.

## 2026-06-25 Export, Import, and Release Candidate QA

Environment: local static app served from `http://127.0.0.1:4173/`, checked with the in-app Browser and a fresh headless Google Chrome context through Playwright.

## Checks Run

- In-app Browser page identity check at `http://127.0.0.1:4173/`.
- In-app Browser blank-page check, framework overlay check, console health check, and screenshot capture.
- Add item flow with a release-candidate QA record.
- Search flow after saving a new record.
- JSON export download, payload parse, app marker check, and item count check.
- CSV export download, header check, item value check, and escaping check for commas, quotes, and newlines.
- Clear-all flow followed by importing the exported JSON backup.
- Post-import dashboard search to verify the imported record rendered again.
- Desktop width check at 1280x900.
- Mobile width check at 390x844.

## Results

- No JavaScript syntax errors were introduced.
- No relevant browser console warnings or errors were captured during the checked flows.
- JSON export produced a valid Renewal Desk backup with the expected item payload.
- JSON import restored the exported item into a fresh browser context.
- CSV export produced the expected header and preserved escaped comma, quote, and newline content.
- Search found the imported item after the restore flow.
- Mobile document width stayed within the 390px viewport.

## Tooling Notes

- The in-app Browser validated page identity, rendered content, console health, desktop screenshot evidence, mobile screenshot evidence, and add/search interaction.
- Fresh-context file import and download-content assertions were run with local Google Chrome because the in-app Browser API in this environment does not expose a direct file-upload helper for the hidden JSON input.

## Remaining QA Before Public Release

- Fresh browser profile test outside automation on the founder's machine.
- Assistive technology spot-check with a screen reader if available.

## 2026-06-25 Packaged Release Candidate Smoke Test

Environment: `dist/renewal-desk-0.1.0-mvp.zip` extracted into a temporary folder and opened through `file://` in a fresh local Google Chrome profile.

## Checks Run

- Release zip extraction.
- `file://` app load from the extracted package.
- Page title and initial dashboard empty-state check.
- Fresh profile storage check.
- Keyboard tab order from navigation into the search field.
- Sample data load.
- JSON export after sample data load.
- Basic accessibility structure check for unnamed visible controls, dialog labeling, live export status, and active navigation state.
- Mobile width check at 390x844.

## Results

- Extracted package opened successfully without a local server.
- Fresh profile started with zero Renewal Desk records.
- Dashboard empty state rendered correctly.
- Keyboard focus reached Dashboard first and then the search input.
- Sample data created three rows.
- JSON export contained three sample items.
- No unnamed visible buttons or fields were found by the automated structure check.
- Dialog labeling, polite status live region, and active navigation state were present.
- Mobile document width stayed within the 390px viewport.
- No relevant browser console warnings or errors were captured.

## Remaining QA Before Public Release

- Optional assistive-technology screen-reader spot check if available.

## 2026-06-25 Release Channel Documentation Package Refresh

Environment: local zip tooling and Node syntax check.

## Checks Run

- Added the release channel decision brief to the Renewal Desk product docs.
- Rebuilt `dist/renewal-desk-0.1.0-mvp.zip` from `products/renewal-desk`.
- Verified archive integrity with `unzip -t`.
- Listed archive contents and confirmed `docs/RELEASE_CHANNEL_DECISION.md` is included.
- Extracted the archive to a temporary folder and confirmed `index.html`, `src/app.js`, and the release channel brief are present.
- Re-ran `node --check products/renewal-desk/src/app.js`.
- Generated `dist/renewal-desk-0.1.0-mvp.zip.sha256` for founder review.

## Results

- No JavaScript syntax errors were found.
- The rebuilt archive passed integrity checks.
- The rebuilt archive contains 23 files including the release channel decision brief.
- No external account, public release, sales setup, marketplace submission, or posting action was performed.

## 2026-06-26 Supabase Gate and Package Refresh

Environment: local Node syntax checks, browser-like adapter mock, local HTTP server at `http://127.0.0.1:4322/`, and zip tooling.

## Checks Run

- Added gated Supabase adapter methods while keeping local storage as the default.
- Added a test-safe two-user RLS QA runner outside the packaged app.
- Checked JavaScript syntax for the Renewal Desk app, sync adapter, service worker, and website scripts.
- Ran a browser-like sync adapter smoke test for local mode, configured-but-disabled mode, enabled gate mode, local persistence, and cloud row mapping.
- Served the website locally and confirmed the homepage, Renewal Desk app, sync adapter, ZIP, checksum, and auth-config example routes returned HTTP 200.
- Rebuilt the release ZIP and verified archive integrity.
- Verified the release ZIP checksum.

## Results

- Local-first mode remains the default when no auth config is present.
- A present auth config does not enable cloud writes unless `enableRenewalDeskCloudSync: true` is set.
- The enabled gate exposes Supabase methods for future local QA but does not automatically sync local records.
- No JavaScript syntax errors were found.
- The rebuilt archive passed integrity and checksum checks.
- Cloud sync was not tested against Supabase because no approved test project is configured yet.

## 2026-06-26 Free-First Distribution Alignment and HTTPS Recheck

Environment: local documentation review, GitHub Pages API, public DNS, HTTP, and TLS checks.

## Checks Run

- Replaced active paid-release channel language with the current free-first distribution path.
- Rebuilt `dist/renewal-desk-0.1.0-mvp.zip` from `products/renewal-desk`.
- Copied the rebuilt ZIP to `website/downloads/` and `docs/downloads/`.
- Regenerated SHA-256 checksum files for all three package locations.
- Verified archive integrity and checksum validation for all package copies.
- Rechecked public `http://tidyrailstudio.com/`.
- Rechecked public `https://tidyrailstudio.com/`.
- Checked the live TLS certificate subject and subject alternative names.
- Checked GitHub Pages API status for `fmraz/tidyrail-studio`.
- Attempted a GitHub Pages custom-domain remove/re-add reset through the API while keeping `https_enforced` disabled.
- Rechecked DNS records for root `A`/`AAAA` and `www` CNAME targets.

## Results

- HTTP still returned GitHub Pages content with status 200.
- HTTPS still failed host-name validation because the served certificate is for GitHub domains, not `tidyrailstudio.com`.
- GitHub Pages API still reports `https_certificate.state: bad_authz` with description `The ACME authorization is in a bad state. We need to start over.`
- The API reset attempt returned `The certificate has not finished being issued`; custom domain configuration remained `tidyrailstudio.com`.
- Root `A`/`AAAA` records and `www` CNAME still point at GitHub Pages targets.
- The rebuilt package checksums were regenerated in the external `.sha256` files next to each ZIP copy.

## Remaining QA Before Public Release

- Retry the custom-domain certificate reset from GitHub Pages Settings UI.
- Enable HTTPS only after GitHub serves a certificate valid for `tidyrailstudio.com`.

## 2026-06-26 Service Worker Cache Hardening QA

Environment: local static website served from `http://127.0.0.1:4324/`, in-app Browser DOM/console checks, local Google Chrome headless screenshots, Node syntax checks, sync-adapter smoke test, and zip tooling.

## Checks Run

- Found that a previously used local origin could still show an older app shell through the old cache-first service worker.
- Changed the Renewal Desk service worker to network-first with cached fallback and bumped the cache to `renewal-desk-0.1.4`.
- Added immediate service worker activation and client claiming.
- Removed remaining paid-validation wording from the launch draft.
- Removed negative letter spacing from product, website, and docs app CSS copies.
- Checked JavaScript syntax for app, sync adapter, and service worker files across product, website, and docs copies.
- Ran the Renewal Desk sync-adapter smoke test.
- Rebuilt `dist/renewal-desk-0.1.0-mvp.zip`, copied it to website/docs download folders, verified archive integrity, and verified SHA-256 checksums.
- Tested a fresh local origin in the in-app Browser at desktop width: page identity, non-empty dashboard, local sync-adapter marker, add item, search, export readiness status, and console health.
- Tested mobile width at 390px in the in-app Browser and checked document width stayed within the viewport.
- Captured local Chrome screenshots for desktop and mobile visual evidence.

## Results

- No JavaScript syntax errors were found.
- Sync adapter tests passed in local mode, configured-disabled mode, enabled-gate mode, and cloud-row mapping.
- Fresh-origin browser QA reported `data-sync-adapter="local"`.
- Add item and search returned the expected Renewal Desk record.
- Export sync readiness showed the expected live status message.
- No relevant browser console warnings or errors were captured during the tested flows.
- Mobile document width stayed within the 390px viewport.
- External `.sha256` files were regenerated next to each rebuilt ZIP copy.

## Tooling Notes

- In-app Browser screenshot capture timed out on `Page.captureScreenshot`, matching an earlier local tooling limitation.
- Local Google Chrome headless wrote desktop and mobile screenshot files, but the Chrome helper process needed timeout handling after writing the mobile screenshot.

## Remaining QA Before Public Release

- Retry the custom-domain certificate reset from GitHub Pages Settings UI.
- Enable HTTPS only after GitHub serves a certificate valid for `tidyrailstudio.com`.
- Optional assistive-technology screen-reader spot check if available.

## 2026-07-07 Release Candidate Core Flow QA

Environment: local static website served from `http://127.0.0.1:4330/`, in-app Browser attempted first, then local Google Chrome headless through Playwright fallback after the in-app Browser snapshot API failed.

## Checks Run

- Rechecked GitHub Pages API and public HTTPS state for `tidyrailstudio.com`.
- Loaded Renewal Desk from the local website app route in a clean browser context.
- Checked first meaningful render, empty state, and desktop overflow.
- Tested Add Item from an empty tracker.
- Tested Edit Item from the Items view.
- Tested Download backup and confirmed the backup file contained the edited item.
- Tested Export spreadsheet and confirmed the spreadsheet file contained the edited item.
- Tested Delete Item with confirmation and verified storage was cleared.
- Tested Restore backup through the hidden file input and verified the item returned.
- Tested service worker registration/controller state.
- Tested the Add Item dialog at 390px mobile width and verified no horizontal overflow.
- Captured screenshots:
  - `/tmp/tidyrail-renewal-desktop.png`
  - `/tmp/tidyrail-renewal-after-flow.png`
  - `/tmp/tidyrail-renewal-mobile-dialog.png`

## Results

- Found and fixed a release-candidate bug caused by removing the visible sync-status button while leaving an unconditional listener for `#syncReadinessBtn`. The missing element stopped app initialization before the form submit handler was attached.
- Add/Edit/Delete passed after the listener was guarded.
- Backup download passed with `renewal-desk-backup.json`.
- Spreadsheet export passed with `renewal-desk-items.csv`.
- Restore backup passed and returned one saved item.
- Service worker support was present, controlled the page, and had one registration.
- Mobile dialog QA passed at 390px: document width and scroll width were both 390, the dialog opened, and the dialog fit within the viewport.
- No relevant console warnings or errors were captured during the passing flow.
- Rebuilt the ZIP package and copied it to website/docs download folders; current SHA-256 is `dc276d3451ce4f7f44c1ffc9dbea2d6bab4d61d71d6749f913473ec931706884`.

## 2026-07-11 Recurring Renewal Workflow QA

Environment: local static website served from `http://127.0.0.1:4327/` and tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Tested recurring-date logic for a future monthly date, a long-overdue monthly date, month-end clamping, quarterly recurrence, leap-day yearly recurrence, and manual custom cycles.
- Loaded sample data and used Renew on a monthly record.
- Verified the next date advanced from July 23, 2026 to August 23, 2026.
- Verified the confirmation appeared and Undo restored the previous date.
- Checked 1280px layout geometry, table overflow, console health, and rendered screenshot.
- Checked 390px document width, Renew visibility, toast safe-area placement, Undo, and console health.
- Rechecked the homepage after removing the trust strip: no trust-strip element, no section gap, a sized Three.js canvas, and no console warnings or errors.

## Results

- All recurring-date logic tests passed.
- Renew and Undo passed on desktop and mobile.
- At 1280px, the renewal table now spans the full content width and does not overflow.
- At 390px, document width equals viewport width and the action confirmation stays inside the viewport.
- No relevant console warnings or errors were captured.
