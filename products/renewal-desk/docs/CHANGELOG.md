# Changelog

## 0.1.0-mvp

- Built the first local-first Renewal Desk web app.
- Added renewal, warranty, subscription, and expiry tracking.
- Added dashboard stats, upcoming renewals, monthly calendar, receipt status, search, filters, and sample data.
- Added saved records, backup, restore, and spreadsheet export.
- Added PWA manifest and service worker scaffold.
- Clarified that account sync is not connected in the first public release.
- Prepared future account sync work without enabling it publicly.
- Prepared disabled-by-default account sync testing hooks.
- Prepared a test-safe two-user account data isolation workflow outside the packaged app.
- Hardened account data isolation QA checks.
- Bumped the service worker cache after sync adapter changes so returning browsers refresh the app shell.
- Aligned release-channel, landing, roadmap, and store draft docs with the current free-first website/download strategy.
- Rebuilt the packaged ZIP with the updated free-first documentation.
- Aligned the app UI with the Tidyrail Studio website glass design system.
- Removed the remaining paid-validation wording from the launch draft to keep free-first public copy consistent.
- Changed the service worker to prefer fresh network responses while keeping cached offline fallback, so returning browsers are less likely to see a stale app shell after updates.
- Removed negative letter spacing from the Renewal Desk app typography.
- Rebuilt the packaged ZIP after the service worker and launch-copy fixes.
- Added a one-step Renew action for monthly, quarterly, and yearly records. Renewal Desk now calculates the next future occurrence correctly for overdue schedules, month ends, and leap years, and offers an eight-second Undo action.
- Changed the first dashboard summary to Needs attention so overdue records are included alongside dates due in the next 30 days.
- Improved medium-width desktop layout so the renewal table uses the full content width and actions no longer require horizontal scrolling.
- Bumped the offline app cache to include the reusable recurring-date logic.
- Added a privacy-friendly calendar download for all tracked dates, with standard all-day events that can be imported into common calendar apps.
- Added clear feedback when the tracker is empty and no calendar can be created.
- Bumped the offline app cache to include calendar export support.
- Added versioned backup files while keeping older array backups compatible.
- Hardened restore with a 5 MB file limit, record-count limit, app/version checks, calendar-date validation, duplicate handling, replacement confirmation, and Undo.
- Added clear feedback for canceled, rejected, partially restored, and reverted backups.
- Bumped the offline app cache to include the reusable backup validation logic.

## 0.1.0 - MVP Release Candidate

- Added local renewal tracker dashboard.
- Added item creation, editing, deletion, search, and category filtering.
- Added localStorage persistence.
- Added JSON export/import.
- Added spreadsheet export.
- Added receipt status and upcoming timeline panels.
- Added responsive mobile layout polish.
- Added basic accessibility labels, focus handling, active navigation state, and live export/import status messaging.
- Added release-candidate QA coverage for backup restore, spreadsheet export, fresh packaged launch, and mobile overflow.
