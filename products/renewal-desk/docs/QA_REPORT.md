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
