# Website Plan

## Purpose

Create a central website for Tidyrail Studio where all current and future free products can be presented, downloaded, documented, and supported.

## First Public Version

Pages:

- Homepage
- Product portfolio
- Renewal Desk product page
- Downloads
- About
- Support
- Contact
- Privacy policy
- Terms of use
- Updates
- Roadmap
- FAQ
- Press/media kit
- Account login
- Account registration
- Account dashboard
- Account settings
- Cookie policy

## Technical Approach

Static HTML/CSS/JavaScript with a small local Three.js-powered scroll scene on the homepage, Supabase-ready account UI, download platform detection, and localization scaffolding.

Reason:

- Free to host on many platforms.
- Fast.
- Low maintenance.
- Easy to deploy to GitHub Pages now and portable to VEDOS hosting, Cloudflare Pages, or Netlify later.
- No backend is required for the current public local-first release.
- Supabase is recommended for the future account and sync layer after founder approval.

## GitHub Pages Deployment

Primary deployment target: GitHub Pages for `tidyrailstudio.com`.

Repository target: `fmraz/tidyrail-studio`.

Deployment model:

- Public GitHub repository.
- GitHub Pages branch source: `main` / `/docs`.
- Source site maintained in `website/`.
- Deploy copy mirrored to `docs/` for GitHub Pages.
- Custom domain file: `docs/CNAME`.
- Jekyll disabled through `docs/.nojekyll`.

This avoids a GitHub Actions workflow because the current GitHub token does not have `workflow` scope.

## Newsletter / Waitlist

No paid newsletter service now. The first version includes a mailto-based updates link and a note that a proper newsletter may come later.

## SEO Structure

- One indexable page per major topic.
- Clear titles and meta descriptions.
- Open Graph metadata.
- Product-focused URLs.
- Honest copy with no fake claims.

## Visual Direction

- White and soft gray background.
- Charcoal text.
- Muted teal accent.
- Real product screenshots.
- Scroll-driven 3D rail elements that support the product story without blocking text.
- No fake testimonials, fake metrics, or fake customer logos.

## Current Status

- Homepage includes scroll-driven 3D presentation.
- Mobile navigation is collapsible.
- Downloads page detects OS/device and offers honest platform status.
- Account pages exist but are intentionally inactive until backend setup.
- Language selector and language detection are scaffolded.

## Next Website Priorities

1. Remove VEDOS wildcard DNS records and enable HTTPS after certificate provisioning.
2. Connect Supabase Auth in a controlled test setup.
3. Add full localized copy files.
4. Improve account dashboard once real backend exists.
5. Add PWA install prompts only after offline QA.
