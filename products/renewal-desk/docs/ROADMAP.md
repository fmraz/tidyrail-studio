# Renewal Desk Roadmap

## MVP

- Local dashboard.
- Add/edit/delete tracked items.
- Search and category filter.
- Upcoming table.
- Receipt status panel.
- Backup and restore.
- Spreadsheet export.

## v1.0 Candidate

- Responsive polish.
- Basic keyboard and accessibility polish.
- Better backup reminders.
- Print-friendly report.
- Landing page copy.
- Product page copy.
- Manual QA evidence.
- Packaged zip download.

## Current Release Candidate Gaps

- The free web app and static ZIP are publicly available through GitHub Pages over HTTP.
- Hostname-valid HTTPS is blocked by GitHub Pages certificate state `bad_authz`; account features remain hidden and disabled.
- Core flows, offline reload, service-worker upgrade, responsive layout, backup safety, calendar export, and focus recovery have automated evidence.
- A manual VoiceOver spot check remains before the web release is called stable.
- Native installers remain unavailable until each real package passes signing and target-platform QA.
- Payment setup, paid downloads, subscriptions, locked Pro features, and artificial limits are out of scope for the current free-first strategy.

## Later Ideas

- Optional account sync after valid HTTPS and two-user RLS isolation QA.
- Receipt attachment support in a desktop wrapper.
- Saved views.
- Multiple currency display setting.
- Signed and notarized macOS package plus tested Windows and Linux installers.
