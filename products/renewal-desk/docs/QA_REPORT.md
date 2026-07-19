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

## 2026-07-12 Calendar Export QA

Environment: local static website served from `http://127.0.0.1:4328/` and tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Tested calendar structure, product identity, all-day start/end dates, year rollover, deterministic timestamp, comma/semicolon escaping, multiline notes, invalid-date rejection, and event count.
- Verified an empty tracker shows guidance instead of creating a meaningless calendar file.
- Loaded three sample records and used Add dates to calendar.
- Verified the live status reports three downloaded dates.
- Checked desktop and mobile button layout, document width, and console health.

## Results

- All nine calendar generation assertions passed.
- Empty-state protection passed.
- Calendar export interaction passed with three records on desktop and mobile.
- At 390px, all four export buttons remain inside the viewport at full usable width.
- No relevant console warnings or errors were captured.
- The in-app Browser did not expose its download event for the generated Blob URL, so file content was verified through deterministic unit assertions and the rendered interaction through the live status message.

## 2026-07-13 Safe Backup Restore QA

Environment: local static website served from `http://127.0.0.1:4329/`, tested with the in-app Browser at 1280x900 and 390x844, plus local Google Chrome for the native file picker.

## Checks Run

- Tested versioned backup creation and parsing, legacy array compatibility, duplicate handling, invalid-record handling, foreign-app rejection, future-version rejection, all-invalid rejection, a 10,001-record limit, and an intentional empty backup.
- Restored a test backup containing one valid record and one impossible calendar date.
- Verified the impossible date was skipped and the valid record was retained.
- Verified a foreign backup was rejected without changing the existing list.
- Verified canceling the replacement confirmation left the existing list unchanged.
- Verified accepting replacement produced clear restored/skipped feedback.
- Verified Undo restored the exact previous list.
- Checked desktop and 390px mobile geometry, touch target sizes, horizontal overflow, and browser console health.
- Re-ran recurring-date, calendar export, auth-config safety, and sync-adapter regression checks.

## Results

- All nine backup logic assertions passed.
- Existing lists are no longer replaced without confirmation.
- Invalid, foreign, oversized, and unsupported backups cannot silently overwrite current data.
- Restore Undo passed and returned all four pre-restore test records.
- At 390px, export actions are 338px wide, at least 46px high, and stay inside the viewport.
- No relevant browser console warnings or errors were captured.
- Native file selection was tested in local Chrome because the in-app Browser API does not expose a file-upload helper.

## 2026-07-16 Empty Backup Warning QA

Environment: local static website served from `http://127.0.0.1:4329/` and tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Added deterministic assertions for empty-backup and standard replacement confirmation copy.
- Verified the empty-backup warning identifies the backup as empty, states the exact number of current items that would be removed, and explains immediate Undo.
- Re-ran backup parsing, recurrence, calendar export, auth-config safety, and sync-adapter regression checks.
- Checked the Export view at desktop and 390px mobile widths.
- Checked mobile action geometry, horizontal overflow, and browser console health.

## Results

- All eleven backup logic assertions passed.
- The destructive empty-backup consequence is explicit before user data changes.
- At 390px, all export actions remain between x=26 and x=364 and are 46px high.
- No relevant browser console warnings or errors were captured.
- The synthetic file-picker interaction could not be repeated because the Mac was locked. The confirmation copy and branch selection are covered by deterministic tests; the previously verified restore and Undo flow remains unchanged.

## 2026-07-18 Offline Reload QA

Environment: fresh local origin at `http://127.0.0.1:4332/`, tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Loaded Renewal Desk once with the local server available and confirmed the complete app shell was requested by the service worker.
- Loaded three sample records and verified browser persistence across an online reload.
- Stopped the local server completely.
- Reloaded the same controlled page at desktop width with no server available.
- Reloaded again at 390px mobile width with no server available.
- Opened the Items view after the mobile offline reload to verify the cached app remained interactive.
- Checked stored records, document width, rendered structure, and browser console health after each offline reload.

## Results

- Desktop offline reload passed with the dashboard, styles, and all three stored records intact.
- Mobile offline reload passed with document width equal to the 390px viewport and all three stored records intact.
- Offline navigation to the Items view worked and displayed the stored records.
- No relevant browser console warnings or errors were captured.
- The existing network-first service worker with cached fallback passed without a product code change.

## 2026-07-18 Service Worker Upgrade QA

Environment: fresh local origin at `http://127.0.0.1:4333/`, tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Installed and activated the previous `renewal-desk-0.1.7` service worker on a fresh origin.
- Loaded three sample records and confirmed they were stored before the update.
- Switched the same origin to the current `renewal-desk-0.1.8` worker and requested a registration update.
- Confirmed the new worker activated, the `renewal-desk-0.1.7` cache was removed, and only `renewal-desk-0.1.8` remained.
- Reloaded the updated app on desktop and 390px mobile and checked the dashboard, stored records, responsive width, and browser console.
- Stopped the server completely and reloaded the updated app at 390px to verify the new cache remained usable offline.

## Results

- The service worker upgraded from `0.1.7` to `0.1.8` without losing any of the three stored records.
- The previous cache was removed after activation and only the current cache remained.
- The updated app rendered correctly on desktop and mobile with no horizontal overflow.
- The post-update offline reload preserved the complete app shell and all stored records.
- No relevant browser console warnings or errors were captured.

## 2026-07-19 Release Candidate Interaction and Focus QA

Environment: fresh local origins at `http://127.0.0.1:4334/` and `http://127.0.0.1:4335/`, tested with the in-app Browser at 1280x900 and 390x844.

## Checks Run

- Added a record, edited its cost/category/notes, renewed its monthly date, used Undo, and deleted it.
- Verified backup, calendar, and spreadsheet export actions report success without console errors.
- Verified dialog entry focus moves to Name and Add returns focus to Add Item.
- Found and fixed focus loss caused by regenerated Edit, Renew, Delete, and Undo controls.
- Verified Edit, Renew, and Undo return focus to the equivalent regenerated action; deleting the final record returns focus to Add Item.
- Checked the dashboard and item dialog at 390px for horizontal overflow, clipping, and active field visibility.
- Re-ran recurrence, calendar, backup, sync adapter, auth config, public-site, and desktop packaging preflight checks.

## Results

- Core Add/Edit/Renew/Undo/Delete and export flows passed on a fresh origin.
- Desktop and 390px mobile document widths matched their viewports.
- The mobile dialog stayed within the viewport and opened with Name focused.
- No relevant browser console warnings or errors were captured.
- The in-app Browser does not reliably expose native Blob download events or native dialog cancel behavior. Export payloads and confirmation branches remain covered by deterministic tests and prior fresh-Chrome file-picker QA.
- The rebuilt package passed archive integrity and all three checksum checks; the current digest is recorded in the external `.sha256` files beside each package copy.

## Remaining Manual Release Check

- VoiceOver spot check on a founder-controlled Mac before calling the web release stable.
