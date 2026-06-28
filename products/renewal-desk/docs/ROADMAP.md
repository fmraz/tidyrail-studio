# Renewal Desk Roadmap

## MVP

- Local dashboard.
- Add/edit/delete tracked items.
- Search and category filter.
- Upcoming table.
- Receipt status panel.
- JSON backup and import.
- CSV export.

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

- No local product QA blockers remain for the static MVP release candidate.
- Returning-browser stale-cache behavior was fixed by switching the service worker to network-first with cached fallback.
- Release channel decision brief is prepared in `docs/RELEASE_CHANNEL_DECISION.md`.
- Public release, account creation, marketplace submission, or external posting still require a concrete approved destination and action.
- Payment setup, paid downloads, subscriptions, locked Pro features, and artificial limits are out of scope for the current free-first strategy.

## Later Ideas

- Calendar `.ics` export.
- Receipt attachment support in a desktop wrapper.
- Saved views.
- Multiple currency display setting.
- Optional Tauri or native macOS wrapper.
