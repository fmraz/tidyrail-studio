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

## Technical Approach

Static HTML/CSS/JavaScript with a small local Three.js-powered scroll scene on the homepage.

Reason:

- Free to host on many platforms.
- Fast.
- Low maintenance.
- Easy to deploy to GitHub Pages now and portable to VEDOS hosting, Cloudflare Pages, or Netlify later.
- No backend or paid services required.

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
