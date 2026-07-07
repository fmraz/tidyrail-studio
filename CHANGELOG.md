# Changelog

## 0.1.0-mvp

- Built the first Renewal Desk local-first web app.
- Added company website for Tidyrail Studio.
- Added GitHub Pages deployment with `tidyrailstudio.com`.
- Added public web app route and static ZIP download.
- Added scroll-driven Three.js homepage presentation.
- Added account UI scaffolding for future Supabase-backed sync.
- Added automatic platform download recommendation UI.
- Added localization scaffolding and language selector.
- Clarified Renewal Desk as a local-first free release with JSON backup and CSV export.
- Added Supabase setup and Renewal Desk sync planning docs for the future account layer.
- Added a Renewal Desk sync adapter scaffold that keeps local storage as the default and exports a sync readiness report.
- Added gated Supabase adapter methods for future Renewal Desk account sync while keeping local storage as the default.
- Added scripted local QA for the Renewal Desk sync adapter gate and cloud row mapping.
- Added a test-safe two-user Supabase RLS QA script and setup notes without committing secrets.
- Hardened the Supabase RLS QA helper with stricter response checks, wrong-owner insert verification, and cleanup warnings.
- Added desktop packaging readiness gates for future macOS, Windows, and Linux builds without publishing native installers.
- Added a Tauri desktop scaffold and desktop packaging preflight while keeping native builds unpublished.
- Added Renewal Desk desktop icon assets for Tauri macOS, Windows, Linux, iOS, and Android packaging surfaces, and tightened desktop packaging preflight around icon signatures and sizes.
- Bumped the Renewal Desk service worker cache after app-shell sync adapter changes so returning browsers refresh static assets.
- Redesigned the company website toward an original iOS/macOS-inspired glass interface.
- Improved mobile navigation with outside-click, link-click, and Escape close behavior.
- Added public-page metadata for stricter referrer behavior, mobile theme color, and safer phone-number detection handling.
- Rebuilt the Renewal Desk ZIP package with the latest HTML metadata.
- Aligned active release/distribution documentation with the free-first website and direct download strategy.
- Rebuilt the Renewal Desk ZIP package with the latest free-first documentation.
- Aligned the Renewal Desk app visual system with the Tidyrail Studio website glass design and refreshed product screenshots.
- Extended the Renewal Desk app UI into the full Tidyrail Studio Liquid Glass system across sidebar, topbar, stats, tables, panels, dialog controls, and mobile navigation.
- Rebuilt the Renewal Desk ZIP package after the app-wide visual refresh and mobile overflow fix.
- Simplified public website and Renewal Desk app copy around user outcomes: backups, restore, spreadsheet export, account sync coming later, and device-local privacy. Removed unnecessary technical wording from the main user flow and rebuilt the ZIP package; current SHA-256 is `af6db58df222e20443a2f29f9c671845412a74b9a2c5fdf34cc1dd6c55920df7`.
- Fixed Renewal Desk initialization after removing the visible sync-status button from the user flow, retested Add/Edit/Delete, backup, restore, spreadsheet export, service worker, and 390px mobile dialog behavior, then rebuilt the ZIP package; current SHA-256 is `dc276d3451ce4f7f44c1ffc9dbea2d6bab4d61d71d6749f913473ec931706884`.
- Added a native packaging prerequisite preflight for Renewal Desk desktop builds. The scaffold and Tauri CLI package pass, while Rust/Cargo are the current blockers before a local macOS `.app` or `.dmg` candidate can be produced.
