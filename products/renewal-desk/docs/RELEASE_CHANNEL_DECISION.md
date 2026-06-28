# Renewal Desk Release Channel Decision Brief

Prepared: 2026-06-25

Status: founder approval needed before any public release, account creation, marketplace submission, or external posting.

## Recommendation

Use a free-first release path:

1. **Primary channel:** Tidyrail Studio website with the hosted Renewal Desk web app and a direct free ZIP download.
2. **Secondary channel after HTTPS is stable:** GitHub Releases for transparent free downloads if the repository is approved for public release.
3. **Awareness channel after the website/download URL is final:** Product Hunt or relevant communities only after founder approval.

This matches the current Tidyrail Studio strategy: free products first under one central website, no payment processing, no subscriptions, no locked Pro features, and no artificial limits. Product Hunt should be treated as a traffic and feedback channel, not as a release host.

## Why This Path

- Renewal Desk is already packaged as `dist/renewal-desk-0.1.0-mvp.zip`.
- The package checksum for founder review is stored next to the zip in `dist/renewal-desk-0.1.0-mvp.zip.sha256`.
- The public website already has routes for the hosted web app, download page, ZIP package, and checksum.
- A direct free download avoids custom commerce, licensing, paid storefronts, analytics, and account systems before demand is proven.
- Product Hunt requires a live URL before launch submission, so it should come after the product page and download URL are stable.

## Current External State

- `tidyrailstudio.com` is configured for GitHub Pages.
- HTTP has served the GitHub Pages site in prior QA.
- HTTPS enforcement remains blocked until GitHub Pages issues a matching certificate for the custom domain.
- As of 2026-06-26, GitHub Pages API still reports `https_certificate.state: bad_authz`, HTTPS still serves a GitHub wildcard certificate, and an API remove/re-add retry returned `The certificate has not finished being issued`.
- No public launch submission, external posting, marketplace submission, or paid storefront setup has been approved.

## Alternatives Considered

| Channel | Fit | Main Tradeoff | Recommendation |
|---|---|---|---|
| Tidyrail Studio website | Best first fit for the free-first strategy | Needs stable HTTPS before broad public sharing | Use first |
| GitHub Releases | Good for transparent free downloadable releases | Requires approval for public repository/release workflow | Use after approval if public repo is desired |
| Product Hunt | Useful launch/feedback surface | Needs final live URL and founder approval before submission | Prepare only after HTTPS is stable |
| App stores | Useful later for native/mobile distribution | Requires platform builds, review, possible fees, and more QA | Defer |
| Paid storefronts | Not aligned with current strategy | Adds payments and paid-download copy | Do not use now |

## Founder Approval Needed

Approve one concrete path before any external launch action:

1. Publicly announce the Tidyrail Studio website and Renewal Desk download after HTTPS is valid.
2. Create a public GitHub Release for `dist/renewal-desk-0.1.0-mvp.zip` if transparent versioned downloads are desired.
3. Prepare Product Hunt only after the final website/download URL exists and launch copy is reviewed.

## Do Not Do Yet

- Do not create external accounts in automation unless the founder explicitly approves that exact action.
- Do not enter payment details.
- Do not add payment processing, paid downloads, subscriptions, locked Pro features, or artificial limits.
- Do not publish a product page.
- Do not submit to Product Hunt, Reddit, marketplaces, directories, or social media.
- Do not claim users, revenue, downloads, reviews, testimonials, or outcomes.

## Next Local Work If Approval Is Delayed

- Add a founder-approved support contact before public release.
- Run one final screen-reader spot check if available.
