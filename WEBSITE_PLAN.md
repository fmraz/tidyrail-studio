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

Static HTML/CSS/JavaScript with a small local Three.js-powered scroll scene on the homepage, Supabase-ready account UI, download platform detection, localization scaffolding, and iOS/macOS-inspired responsive glass UI.

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

- Cool white and pale silver background.
- Deep graphite text.
- iOS-style blue primary accent with teal identity details.
- Original liquid-glass inspired panels, floating header, pill CTAs, and premium depth.
- Real product screenshots and scroll-driven 3D rail elements that support the product story without blocking text.
- No fake testimonials, fake metrics, or fake customer logos.

## Current Status

- Homepage includes scroll-driven 3D presentation.
- Mobile navigation is collapsible and closes on outside click, link click, and Escape.
- Downloads page detects OS/device and offers honest platform status.
- Account pages exist but are intentionally inactive until backend setup.
- Language selector and language detection are scaffolded.
- Public pages include referrer policy, theme-color, and mobile format-detection metadata.
- GitHub Pages custom domain is configured, but HTTPS certificate provisioning is still pending at GitHub.
- A custom 404 page and repeatable internal link/asset audit are present.
- GitHub bug and feature request forms explicitly warn users not to share sensitive data.
- Homepage uses a lightweight first-frame canvas and loads the full Three.js scene on first scroll, preserving the premium motion while keeping initial loading fast.
- The 2026-07-19 local Lighthouse release audit scored 94/100/100/100 for performance and 100 across accessibility, best practices, and SEO on all four audited routes.

## Next Website Priorities

1. Submit the prepared evidence to GitHub Support because a clean custom-domain reset immediately reproduces `bad_authz`.
2. Enable Enforce HTTPS only after the certificate matches `tidyrailstudio.com`, then recheck every critical route.
3. Complete a manual VoiceOver spot check and performance audit.
4. Connect Supabase Auth only after valid HTTPS and explicit backend approval.
5. Complete English/Czech localization before expanding the remaining locale catalog.
