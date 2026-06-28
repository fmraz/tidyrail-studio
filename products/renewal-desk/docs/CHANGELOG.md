# Changelog

## 0.1.0-mvp

- Built the first local-first Renewal Desk web app.
- Added renewal, warranty, subscription, and expiry tracking.
- Added dashboard stats, upcoming renewals, monthly calendar, receipt status, search, filters, and sample data.
- Added browser-local storage with JSON backup, JSON import, and CSV export.
- Added PWA manifest and service worker scaffold.
- Clarified that cloud sync is not connected in the first public release.
- Added a sync adapter scaffold for future Supabase-backed sync without enabling cloud writes.
- Added disabled-by-default Supabase adapter methods for local account-sync QA.
- Added a test-safe two-user RLS QA workflow outside the packaged app.
- Hardened the RLS QA helper with stricter response checks and safer cleanup reporting.
- Bumped the service worker cache after sync adapter changes so returning browsers refresh the app shell.
- Aligned release-channel, landing, roadmap, and store draft docs with the current free-first website/download strategy.
- Rebuilt the packaged ZIP with the updated free-first documentation.
- Aligned the app UI with the Tidyrail Studio website glass design system.
- Removed the remaining paid-validation wording from the launch draft to keep free-first public copy consistent.
- Changed the service worker to prefer fresh network responses while keeping cached offline fallback, so returning browsers are less likely to see a stale app shell after updates.
- Removed negative letter spacing from the Renewal Desk app typography.
- Rebuilt the packaged ZIP after the service worker and launch-copy fixes.

## 0.1.0 - MVP Release Candidate

- Added local renewal tracker dashboard.
- Added item creation, editing, deletion, search, and category filtering.
- Added localStorage persistence.
- Added JSON export/import.
- Added CSV export.
- Added receipt status and upcoming timeline panels.
- Added responsive mobile layout polish.
- Added basic accessibility labels, focus handling, active navigation state, and live export/import status messaging.
- Added release-candidate QA coverage for JSON backup restore, CSV content, fresh packaged zip launch, and mobile overflow.
