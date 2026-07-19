# Roadmap

## Portfolio Milestones

### Phase 1: Foundation

- [x] Define company name, positioning, product philosophy, quality standards, and ethical rules.
- [x] Create product backlog and scoring system.
- [x] Select the initial portfolio backlog.
- [x] Set up one active recurring 3-hour work loop.

### Phase 2: Renewal Desk MVP

- [x] Build the local-first static app.
- [x] Implement core tracking, recurrence, search, local persistence, safe backup/restore, CSV, and calendar export.
- [x] Write product, privacy, support, release, and maintenance documentation.
- [x] Run automated and browser QA across core flows, offline reload, service-worker update, and mobile layout.

### Phase 3: Renewal Desk Free Public Release

- [x] Polish Liquid Glass UI and responsive layout.
- [x] Add sample data, renewal completion, Undo, and recovery flows.
- [x] Publish the company website, web app, and static ZIP through GitHub Pages.
- [x] Configure `tidyrailstudio.com` DNS and custom-domain files.
- [ ] Resolve GitHub Pages `bad_authz` and enforce hostname-valid HTTPS.
- [ ] Complete a manual VoiceOver spot check.

### Phase 4: Desktop Packaging

- [x] Prepare Tauri packaging and internal Apple Silicon DMG QA.
- [x] Prepare Windows/Linux metadata and platform preflight checks.
- [ ] Sign, notarize, and clean-machine test a macOS DMG.
- [ ] Build and smoke-test Windows and Linux packages on their target systems.

### Phase 5: Second Product

- Start CleanClip Local only after Renewal Desk is release-candidate quality.
- Reuse company standards, not shared app infrastructure.

## Current Priority

Primary focus: escalate the evidence-complete GitHub Pages HTTPS failure, finish the remaining VoiceOver release check, and keep Renewal Desk documentation/package evidence current. Account drafts stay out of public navigation and discovery until valid HTTPS, approved Supabase configuration, and two-user RLS QA pass.
