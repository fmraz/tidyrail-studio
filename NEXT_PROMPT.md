# Tidyrail Studio - Continuation Prompt

Continue the existing project in `/Users/frantamraz/Documents/Software Company`.

Do not restart, rename Tidyrail Studio, replace Renewal Desk, rewrite Git history, or begin a second product before Renewal Desk satisfies the release gates below. Preserve unrelated founder work, especially the untracked file `NEXT_PROMPT 2.md`; never edit, stage, delete, or commit it.

Communicate with the founder only in Czech. Write all customer-facing UI, website copy, product documentation, policies, release notes, support text, store material, and marketing copy in clear English first. Localization may follow only after the English source strings are stable.

## Company Mission

Tidyrail Studio builds focused, free, privacy-respecting tools that remove recurring effort, missed deadlines, scattered information, and avoidable stress. Every product must solve one understandable problem, save time or confusion, work without a large user base, avoid unnecessary infrastructure, and remain maintainable by a small independent studio.

Current strategy: earn trust and real usage with genuinely useful free products. Do not implement payments, subscriptions, Pro locks, artificial limits, ads, fake urgency, fake testimonials, fake metrics, or speculative monetization. Future monetization remains documentation only.

## Current Verified State - 2026-07-19

- Company: Tidyrail Studio.
- First product: Renewal Desk.
- Domain: `tidyrailstudio.com`, registered through VEDOS.
- GitHub repository: `fmraz/tidyrail-studio`.
- GitHub Pages source: `main` branch, `/docs` directory.
- The audited public release content is present at commit `7872050`; recheck local and remote `main` before editing because this continuation prompt may be committed afterward.
- Public HTTP homepage, web app, and ZIP download return 200.
- Public app: `http://tidyrailstudio.com/apps/renewal-desk/`.
- Public package: `http://tidyrailstudio.com/downloads/renewal-desk-0.1.0-mvp.zip`.
- Current package SHA-256: `eb6c26d46d917cd1677e4574305ca1f6291627cde5c837cc8c889dcb6d410304`.
- `website/` and `docs/` are currently identical.
- GitHub Pages reports `status: built`, but `https_certificate.state: bad_authz` and `https_enforced: false`.
- HTTPS serves a certificate that does not include `tidyrailstudio.com`; never enable Enforce HTTPS until hostname validation passes.
- DNS apex A/AAAA records and `www` CNAME point to GitHub Pages. No CAA record or wildcard response was found in the latest audit.
- GitHub CLI API access currently works.
- Both Tidyrail three-hour automations currently exist but are paused. Do not create another duplicate.
- Repository is clean except the founder-owned untracked `NEXT_PROMPT 2.md`.

## Renewal Desk - Implemented And Verified

- Responsive local-first web application with Tidyrail Studio Liquid Glass design.
- Add, edit, delete, search, category filter, dashboard summaries, timeline, and receipt status.
- Monthly, quarterly, and yearly Renew action with eight-second Undo.
- Tested month-end, overdue, quarterly, yearly, and leap-day recurrence behavior.
- One-time and custom schedules remain manual by design.
- Browser local storage with no required account or analytics.
- Versioned JSON backup plus backward-compatible legacy restore.
- Restore validation for app identity, version, date validity, duplicate IDs, record count, usable rows, and 5 MB file size.
- Replacement confirmation, partial-import feedback, destructive empty-backup warning, and immediate restore Undo.
- Spreadsheet-friendly CSV export.
- Privacy-friendly `.ics` calendar export for common calendar apps.
- PWA manifest and network-first service worker with cached offline fallback.
- Returning-user offline reload passed on desktop and 390px mobile.
- Service-worker upgrade from cache `0.1.7` to `0.1.8` passed with old-cache cleanup and preserved records.
- Public source, web mirror, deployment mirror, ZIP integrity, and checksums pass.
- Deterministic QA passes for recurrence, calendar export, backup safety, sync adapter gate, auth config safety, and packaging metadata.

## Website - Implemented

- Homepage with an original scroll-driven Three.js scene.
- Responsive Liquid Glass visual system shared with Renewal Desk.
- Compact mobile navigation with outside-click, link-click, and Escape close behavior.
- Products, Renewal Desk product page, web app, downloads, about, support, contact, FAQ, roadmap, updates, press, privacy, security, terms, and cookies pages.
- Privacy-friendly platform detection and a manual platform selector.
- Honest platform states: web available; native platforms planned.
- SEO titles, descriptions, Open Graph metadata, sitemap, robots, CNAME, and local Three.js asset.
- No advertising pixels or invasive analytics.
- Account routes exist but are hidden from public navigation and blocked in robots until the backend is safe.

## Prepared But Not Live

- Supabase Auth UI and disabled-by-default configuration scaffold.
- Email/password and OAuth architecture documentation.
- Postgres schema draft with per-user ownership and RLS policies.
- Two-user RLS QA script and setup checklist.
- Renewal Desk Supabase adapter methods behind `enableRenewalDeskCloudSync: true` in an ignored local config.
- Account export and deletion-request adapter surfaces.
- Localization scaffold for 31 languages, currently only eight shared strings per language.
- Tauri desktop scaffold with icons for macOS, Windows, Linux, iOS, and Android packaging surfaces.
- Internally tested Apple Silicon DMG at `desktop/renewal-desk/src-tauri/target/release/bundle/dmg/Renewal Desk_0.1.0_aarch64.dmg`.
- DMG internal SHA-256: `9e9a9772c2c394dfcf5cc6025d1179923230762547176de6f1c25f781ef7020d`.
- Windows and Linux packaging metadata readiness checks.
- Store listing drafts, packaging documents, icon specifications, widget plan, support workflow, release templates, and future monetization plan.

## Confirmed Blockers And Why They Exist

1. **HTTPS is invalid - P0.** GitHub's ACME authorization is stuck in `bad_authz`; DNS and CNAME currently look correct, so the remaining failure is certificate issuance/retry on GitHub Pages. HTTP works, but browsers correctly mark it insecure. Accounts, passwords, OAuth, sync, and Enforce HTTPS must remain disabled until this is fixed.
2. **Automation is paused - P0 operational.** Two Tidyrail automations exist and both are paused. The reason is not recorded. Only one should be reactivated to avoid duplicate work.
3. **Accounts and cloud sync are not real - P0 after HTTPS.** No Supabase project or approved frontend config exists. RLS has not been tested against two real users. Enabling the scaffold now could risk mixed or exposed user data.
4. **Native macOS distribution is not public-ready - P1.** The DMG is ad-hoc signed for internal QA. Full Xcode is not selected, no Developer ID Application identity exists, notarization credentials are absent, and clean-machine Gatekeeper QA has not passed.
5. **Windows and Linux packages do not exist - P1.** Tauri metadata is ready, but real NSIS/AppImage/deb builds must be produced and smoke-tested on their target OS or reviewed CI runners.
6. **iOS, Android, and widgets do not exist - P2.** Icons are present, but there is no mobile application shell, store build, widget target, signing setup, or simulator QA.
7. **Localization is only a scaffold - P1.** Thirty-one languages contain only eight shared strings. Renewal Desk UI, validation, metadata, legal pages, and editorial content are not localized or QA-tested, including RTL behavior.
8. **Legal documents are drafts - P1 before accounts/stores.** Privacy, terms, and cookie documents are useful drafts but are not legal advice and must be updated for real account processing and reviewed before account/store launch.
9. **Documentation has drift - P0 cleanup.** `BRAND.md` conflicts with the current Liquid Glass system; some changelog lines call obsolete hashes current; `RENEWAL_DESK_SYNC_PLAN.md` describes a visible readiness action that was removed; release checklists still contain obsolete approval wording; the public FAQ contains `No. No.`.
10. **Version naming is inconsistent - P1.** The product/package is `0.1.0-mvp`, while service-worker cache revisions reached `0.1.8`. Define one release version source before the next package rename; do not confuse cache versions with product versions.
11. **No formal feedback/release channel exists - P2.** GitHub Issues is linked, but there are no open issues, GitHub Releases, release announcement, analytics, or structured feedback form. Do not add tracking merely to obtain metrics.
12. **Current international usability is limited - P1 product.** Renewal Desk formats costs as USD only. A future currency setting requires a backward-compatible data migration and correct handling of mixed-currency totals.

## Hard Safety Rules

- Do not spend money, enter payment details, purchase memberships, create paid accounts, submit stores, publish social posts, send emails, or make irreversible external changes without explicit founder approval for that exact action.
- Do not commit passwords, tokens, service-role keys, OAuth secrets, `.env`, `auth-config.js`, signing credentials, Apple API keys, or personal registration data.
- Never expose a Supabase service-role key to browser code.
- Keep cloud sync disabled until HTTPS, approved configuration, schema deployment, two-user RLS isolation, export/deletion, conflict handling, and recovery pass QA.
- Never claim macOS, Windows, Linux, iOS, or Android availability until a real package passes platform-specific installation and smoke testing.
- Preserve local-first use, JSON backup, spreadsheet export, and account-optional behavior.
- Do not replace the simple static architecture merely for trend alignment. Add framework complexity only when it measurably improves maintainability or product capability.
- Keep user-facing copy focused on tasks and outcomes. Do not expose RLS, Supabase, service workers, checksums, package internals, cache versions, or backend readiness in ordinary UI.
- Keep the visual language original. Do not copy Apple branding, protected assets, layouts, logos, or claim affiliation.

## Required Execution Order

### Phase 0 - Establish One Reliable Work Loop

1. Read `THREE_HOUR_WORK_LOOP.md`, this file, `ROADMAP.md`, `IMPROVEMENT_BACKLOG.md`, `DECISION_LOG.md`, and relevant product files.
2. Inspect both existing Tidyrail automations with the Codex automation tool.
3. With this prompt as founder authorization, reactivate exactly one three-hour Tidyrail automation and keep the duplicate paused or remove it only if deletion is clearly safe.
4. Keep one measurable user outcome per automation cycle. Never run two agents against the same working tree concurrently.

### Phase 1 - Repair Public HTTPS

1. Recheck `gh api repos/fmraz/tidyrail-studio/pages`, latest Pages build, `dig` A/AAAA/CNAME/CAA, wildcard behavior, both CNAME files, HTTP, and hostname-valid HTTPS.
2. Confirm no extra apex A/AAAA/ALIAS/ANAME records, no wrong `www` record, and no restrictive CAA record exist.
3. Verify the custom domain in GitHub account Pages settings if possible.
4. Use the documented GitHub Pages Settings recovery flow in `GITHUB_PAGES_SETUP.md`: remove and re-add the custom domain through the UI when API reset remains blocked. Preserve `docs/CNAME` and `website/CNAME` consistency.
5. If GitHub still returns `bad_authz` after a clean retry and propagation window, prepare a concise GitHub Support request with repository, domain, correct DNS evidence, Pages build status, and the exact ACME error. Do not guess that DNS is wrong when evidence says otherwise.
6. Enable Enforce HTTPS only after `curl -I https://tidyrailstudio.com/` validates the hostname. Then verify HTTP-to-HTTPS redirect, homepage, app, ZIP, sitemap, service worker, and account routes.

### Phase 2 - Remove Release-Candidate Inconsistencies

1. Fix the public FAQ duplication `No. No.`.
2. Align `BRAND.md`, `DESIGN_SYSTEM.md`, and website/app implementation around the current original Liquid Glass direction.
3. Update `IMPROVEMENT_BACKLOG.md` to remove completed PWA/Tauri items and accurately rank remaining work.
4. Reconcile `CHANGELOG.md`, product changelog, release checklists, sync plan, website plan, and package hashes with actual behavior.
5. Define product version, cache version, package filename, and release-note rules in `VERSIONING.md`. Keep existing public URLs working when introducing a new version.
6. Run a claim audit: no native availability, account availability, sync, notifications, localization, signing, notarization, or store status may be overstated.

### Phase 3 - Close Renewal Desk RC QA

1. Run keyboard-only navigation for Add, Edit, Delete, Renew, Undo, Backup, Restore, Calendar, and Spreadsheet export.
2. Verify focus order, visible focus, dialog focus entry/return, Escape behavior, accessible names, status announcements, and no keyboard traps.
3. Test delete confirmation and cancellation without losing records.
4. Test one-time and custom date editing without unintended recurrence.
5. Repeat the synthetic empty-backup file-picker flow: Cancel, Continue, and Undo.
6. Perform a VoiceOver spot check on dashboard, mobile navigation, item dialog, data rows/cards, and export status.
7. Re-test fresh, populated, overdue, empty, invalid-import, offline, service-worker update, reduced-motion, 1280px desktop, tablet, and 390px mobile states.
8. Check browser console, horizontal overflow, clipping, text expansion, touch targets, and screenshot fidelity.
9. Run all deterministic scripts, JS syntax checks, source/mirror comparisons, ZIP integrity, and all three checksums.
10. Fix discovered defects; update only affected documentation; rebuild and synchronize the ZIP after packaged changes.

### Phase 4 - Stabilize The Public Website

1. Run Lighthouse or equivalent checks for performance, accessibility, best practices, and SEO on homepage, product page, downloads, and app.
2. Ensure Three.js is lazy, nonblocking, nonblank, responsive, and disabled or simplified for reduced motion and weak devices.
3. Verify every public route, internal link, Open Graph asset, sitemap URL, robots rule, canonical URL, favicon, PWA manifest, and download link.
4. Add a useful custom 404 page if absent.
5. Keep account preview routes out of navigation and search until accounts are real.
6. Keep technical status details in support/internal docs, not homepage/product UI.

### Phase 5 - Make Account Sync Safe

Start only after valid enforced HTTPS and explicit founder approval to create/use a Supabase project.

1. Follow `SUPABASE_SETUP.md` without committing secrets.
2. Apply and review `DATABASE_SCHEMA.md`; add constraints for allowed category, cycle, receipt status, currency format, lengths, and sane amount ranges before production.
3. Run two-user RLS QA: anonymous blocked; user A cannot read/write/delete user B; wrong-owner inserts fail; cleanup succeeds.
4. Test email registration, verification, login, logout, reset, session restoration, expired sessions, rate-limit messaging, and account deletion request.
5. Implement first sync as an explicit user-controlled import: local only, cloud only, both populated, conflict, network error, sign-out, and retry.
6. Never silently overwrite local or cloud records. Offer backup before migration and preserve a recovery path.
7. Implement account data export and a secure server-side auth-user deletion mechanism. Do not perform privileged deletion from the browser.
8. Update privacy, terms, cookies, support, and account UI before exposing account links publicly.

### Phase 6 - Internationalization And Product Usability

1. Inventory every website and Renewal Desk UI string; remove hardcoded user-facing strings.
2. Establish one English source catalog with stable keys and interpolation rules.
3. Complete English and Czech first, then Slovak, German, Polish, French, Spanish, Italian, Portuguese, and Dutch; expand to the remaining planned languages in reviewed batches.
4. Preserve all 31 planned locales, but do not claim full support until each passes completeness and layout QA.
5. Test RTL for Arabic/Hebrew, CJK line breaking, long German/Finnish strings, pluralization, dates, decimal separators, currency, and validation messages.
6. Add a backward-compatible product currency preference or per-item currency only after defining how annual totals behave. Never sum unlike currencies as one misleading value.

### Phase 7 - Desktop Distribution

1. Keep the current Apple Silicon DMG internal-only.
2. Install/select full Xcode only with founder approval for the system change.
3. Treat Apple Developer membership, Developer ID certificates, notarization credentials, and payment as founder-only manual steps.
4. Build a release DMG, sign with Developer ID, notarize, staple, verify, and test on a clean Mac before publishing.
5. Build Windows NSIS/MSI on Windows or reviewed CI; install/uninstall and SmartScreen-test it before availability claims.
6. Build Linux AppImage/deb on Linux or reviewed CI; test permissions, desktop entry, icons, launch, and uninstall guidance.
7. Generate checksums, release notes, install guides, known limitations, and honest download states for every real artifact.
8. Consider GitHub Releases only after artifacts are verified and founder approves public release creation.

### Phase 8 - Mobile And Widgets

Start only after the web data model and sync behavior are stable.

1. Evaluate Capacitor versus Expo/React Native using code reuse, native UX, offline storage, auth redirects, widgets, maintenance, and store compliance.
2. Build the smallest useful iOS/Android shell with native-feeling navigation, local cache, login, export, and sync recovery.
3. Add a widget only when it gives immediate value: next deadline, overdue count, or quick add. Do not add decorative widgets.
4. Complete simulator/device QA, accessibility, privacy manifests/data-safety answers, screenshots, signing, and store metadata before submission.
5. Never submit to Apple App Store or Google Play without explicit founder approval and required paid memberships/identity steps.

### Phase 9 - Feedback And Launch Preparation

1. Keep products free and account-optional.
2. Create a structured GitHub issue template for bugs and feature requests without requesting sensitive data.
3. Prepare, but do not publish, release notes, Product Hunt copy, community posts, short demo scripts, onboarding copy, and support templates.
4. Use no analytics until a privacy-respecting measurement plan is approved and disclosed. Prefer direct feedback and aggregate server-free signals where possible.
5. Do not start CleanClip Local until Renewal Desk has valid HTTPS, completed RC QA, accurate docs, a stable public package, and no P0/P1 data-safety defects.

## Portfolio After Renewal Desk

Planned order remains:

1. Renewal Desk - finish first.
2. CleanClip Local - private text and clipboard cleanup.
3. FolderForge - reusable folder structure builder.
4. CSV Tidy - local CSV cleanup with parser-based safety.
5. Packwise Lists - reusable packing and preparation lists.

For every future product: validate the user problem, define one-sentence value, build web-first, keep data local/exportable, reuse visual standards but avoid technical coupling, include error/empty/offline states, test desktop/mobile/accessibility, prepare truthful docs and policies, and finish one release candidate before beginning another.

## Verification And Repository Discipline

- Use `rg` for discovery and existing scripts before inventing new tooling.
- Use small pure modules and deterministic tests for dates, validation, migration, sorting, conflicts, and exports.
- Test the exact changed user flow in the in-app browser at desktop and 390px mobile.
- For UI changes, capture visual evidence and check console, overflow, reduced motion, and accessibility.
- Keep `products/renewal-desk/`, `website/apps/renewal-desk/`, and `docs/apps/renewal-desk/` synchronized.
- Keep `website/` and `docs/` synchronized, including CNAME and public assets.
- Rebuild all ZIP copies and SHA-256 files after packaged changes.
- Never commit generated `target/`, mobile `gen/`, credentials, ignored auth config, or the founder's `NEXT_PROMPT 2.md`.
- Run `git diff --check`, review staged files, commit intentionally, push safe work, and verify GitHub Pages after every public change.
- Update this file at the end of every work session so completed work is removed from priorities and new evidence replaces assumptions.

## Immediate Next Session

Choose exactly one primary outcome: **restore hostname-valid HTTPS for `tidyrailstudio.com`, or produce an evidence-complete GitHub Support handoff if GitHub prevents the retry**.

Do not mix this with product feature development until the certificate workflow has either succeeded or reached a documented external blocker. If blocked, use the remaining session for the Phase 2 documentation/release consistency cleanup, not for a second product.

## Required Czech End Report

Report concisely:

1. Co bylo dokončeno.
2. Jaký konkrétní uživatelský přínos vznikl.
3. Aktuální stav webu a Renewal Desk.
4. HTTPS, GitHub Pages a distribuce.
5. Změněné soubory a commity.
6. Testy a důkazy.
7. Zbývající problémy, příčina a riziko.
8. Co vyžaduje founderův ruční zásah, účet, identitu nebo platbu.
9. Další jediný nejlepší krok.
10. Aktualizovaný obsah `NEXT_PROMPT.md`.
