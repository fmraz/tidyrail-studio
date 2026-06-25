Continue the project in `/Users/frantamraz/Documents/Software Company`.

Do not restart. Do not rename Tidyrail Studio. Do not abandon Renewal Desk.

Communication:

- Speak to the founder only in Czech.
- Keep all public-facing product copy, UI, docs, website text, changelogs, policies, and marketing material in English first.

Current state:

- Company: Tidyrail Studio.
- First product: Renewal Desk.
- Domain: `tidyrailstudio.com`.
- GitHub repo: `fmraz/tidyrail-studio`.
- GitHub Pages source: `main` branch, `/docs`.
- Public HTTP site works: `http://tidyrailstudio.com/`.
- HTTPS is not ready yet because GitHub certificate provisioning is still pending.
- VEDOS root DNS and `www` records point to GitHub Pages.
- VEDOS wildcard records no longer resolve on the authoritative nameserver.

What has been done:

- Website has a premium scroll-driven Three.js homepage.
- Website has responsive mobile menu scaffolding.
- Downloads page has privacy-friendly OS/device detection and manual platform selector.
- Renewal Desk is available as a free web app and static package.
- Renewal Desk source now includes PWA manifest, service worker, and updated SVG icon direction.
- Account pages were added:
  - `/account/login/`
  - `/account/register/`
  - `/account/reset/`
  - `/account/dashboard/`
  - `/account/settings/`
- Auth JavaScript scaffold exists for Supabase but is intentionally inactive without config.
- Localization scaffold exists at `website/i18n/translations.json`.
- Cookie policy page exists.
- Strategic docs were added for auth, database schema, packaging, store listings, icons, localization, patching, versioning, support, and improvements.

Important files:

- `website/` - source website.
- `docs/` - GitHub Pages deploy mirror.
- `products/renewal-desk/` - Renewal Desk source app.
- `dist/renewal-desk-0.1.0-mvp.zip` - rebuilt static release package.
- `website/downloads/renewal-desk-0.1.0-mvp.zip` - public download copy.
- `AUTH_STRATEGY.md`
- `DATABASE_SCHEMA.md`
- `DOWNLOAD_STRATEGY.md`
- `DESIGN_SYSTEM.md`
- `ICON_SYSTEM.md`
- `APP_ICON_SPEC.md`
- `LOCALIZATION_PLAN.md`
- `MAC_DMG_PACKAGING.md`
- `WINDOWS_PACKAGING.md`
- `LINUX_PACKAGING.md`
- `MOBILE_WIDGET_PLAN.md`
- `PATCH_PLAN.md`
- `VERSIONING.md`
- `BUG_FIX_PROCESS.md`
- `RELEASE_NOTES_TEMPLATE.md`
- `CHANGELOG.md`
- `SUPPORT_WORKFLOW.md`
- `IMPROVEMENT_BACKLOG.md`

Unfinished:

- HTTPS certificate and Enforce HTTPS.
- Real Supabase project setup.
- Real cloud sync in Renewal Desk.
- Full localization of every website and app string.
- Native desktop builds: macOS `.dmg`, Windows installer, Linux package.
- iOS/Android app shells and widgets.
- Store submissions.

Next priority:

1. Verify DNS and HTTPS.
2. When HTTPS works, enable Enforce HTTPS in GitHub Pages.
3. Run local and public QA for homepage, mobile menu, account pages, downloads, Renewal Desk app, ZIP download, sitemap, robots, PWA manifest, and service worker.
4. If approved, create a Supabase project setup checklist with exact dashboard steps and then connect auth in a test-safe way.
5. Continue Renewal Desk cloud sync design before starting another product.

Constraints:

- Do not spend money.
- Do not enter payment details.
- Do not publish to stores or social platforms.
- Do not hardcode secrets.
- Do not expose service role keys.
- Do not claim platform availability until real builds exist.
- Do not implement payments, subscriptions, Pro features, or artificial free limits.
