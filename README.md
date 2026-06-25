# Tidyrail Studio

Tidyrail Studio is an independent software studio building small, polished, privacy-respecting utilities for everyday administrative work.

## Current Portfolio

- **Renewal Desk:** local tracker for renewals, warranties, subscriptions, and expiry dates.
- **CleanClip Local:** private text and clipboard cleaner.
- **FolderForge:** reusable folder template creator.
- **CSV Tidy:** local CSV cleanup tool.
- **Packwise Lists:** local checklist generator for packing and preparation.

## Current Build Focus

The first product is `products/renewal-desk`, currently prepared as a free static release candidate with PWA scaffolding.

Open `products/renewal-desk/index.html` in a browser to run the MVP.

The public website lives in `website/`.

Local website preview:

```bash
python3 -m http.server 4317 --directory website
```

Then open:

```text
http://127.0.0.1:4317/
```

Public deployment target:

- Domain: `tidyrailstudio.com`
- Hosting: GitHub Pages
- Source path: `website/`
- GitHub Pages deployment path: `docs/`
- Free web app route: `/apps/renewal-desk/`
- Free download route: `/downloads/renewal-desk-0.1.0-mvp.zip`
- Account routes: `/account/login/`, `/account/register/`, `/account/dashboard/`
- Auth backend: prepared for Supabase, not connected yet

## Architecture Notes

- Static website on GitHub Pages.
- Source website in `website/`.
- Deploy mirror in `docs/`.
- Renewal Desk remains local-first until backend setup is approved.
- Account UI is prepared for sync, export, deletion, and privacy controls.
- Do not commit Supabase service role keys or OAuth secrets.

## Operating Rules

- Accounts are allowed as an optional sync/privacy layer, not as a paywall.
- No paid infrastructure without explicit approval.
- Necessary low-cost/no-cost setup accounts may be created under standing founder approval when no payment details or irreversible publication are required.
- No public launch, external posting, marketplace submission, payment confirmation, or irreversible action without explicit approval for the concrete destination and action.
- Product-facing copy is written in English.
- Founder progress reports are written in Czech.
