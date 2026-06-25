# Domain Strategy

Domain purchase target: VEDOS.cz.

VEDOS account email: stored outside the public repository.

Payment details and final purchase confirmation must be completed by the founder.

Current VEDOS status on 2026-06-25: the `tidyrailstudio.com` domain registration order has been created and paid without hosting or paid add-ons. The domain is active in VEDOS and is being pointed to GitHub Pages.

## Recommended Domain

**Recommended:** `tidyrailstudio.com`

Why:

- Uses the most trusted extension.
- Matches the company name clearly enough for a first public launch.
- VEDOS checkout showed a one-year registration price of 342 CZK without VAT / 413.82 CZK with VAT on 2026-06-25.
- `tidyrail.studio` is still the cleaner brand domain, but VEDOS showed a much higher one-year price of 1252.35 CZK with VAT on 2026-06-25.
- No paid hosting or monitoring add-ons are needed for the first launch.

## Domain Options

| Domain | Memorability | Trust | Brand Fit | SEO | Availability Risk | Score | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| tidyrailstudio.com | 7 | 10 | 8 | 8 | 3 | 88 | Recommended for VEDOS purchase because the checkout price is much lower than `.studio` |
| tidyrail.studio | 9 | 8 | 10 | 7 | 3 | 82 | Best brand fit, but VEDOS checkout showed a high first-year price |
| gettidyrail.com | 8 | 9 | 8 | 7 | 3 | 82 | Good action-oriented .com |
| tidyrail.app | 8 | 9 | 8 | 7 | 5 | 78 | Good for apps, may be stricter HTTPS expectations |
| tidyrail.dev | 8 | 8 | 8 | 7 | 5 | 76 | Developer-friendly, less broad consumer feel |
| tidyrail.software | 7 | 8 | 9 | 7 | 4 | 76 | Clear but longer extension |
| tidyrailtools.com | 7 | 9 | 7 | 8 | 4 | 76 | Descriptive fallback |
| tidyrailapps.com | 7 | 9 | 7 | 7 | 4 | 74 | Clear, slightly narrower |
| tidyrail.co | 8 | 8 | 8 | 7 | 6 | 72 | Short but less standard than .com |
| tidyrail.io | 8 | 8 | 7 | 7 | 6 | 72 | Tech-friendly, often expensive |
| tidyrail.cz | 7 | 8 | 7 | 6 | 4 | 70 | Useful if Czech billing/company footprint matters |
| tidyrail.com | 10 | 10 | 10 | 9 | 10 | 40 | Unavailable; RDAP shows registered via IONOS |

Availability risk scale: lower is better. Final availability must be checked in VEDOS before purchase.

## VEDOS Purchase Status

- Domain order created on VEDOS.
- Domain paid.
- Domain active in the VEDOS domain list.
- No paid hosting selected.
- No paid monitoring selected.
- No paid ownership certificate selected.
- No domain insurance selected.
- Next step: verify that public DNS has propagated to the GitHub Pages records.

## DNS Plan After Purchase

Current hosting target: GitHub Pages.

For `tidyrailstudio.com`:

- `@` A `185.199.108.153`
- `@` A `185.199.109.153`
- `@` A `185.199.110.153`
- `@` A `185.199.111.153`
- `@` AAAA `2606:50c0:8000::153`
- `@` AAAA `2606:50c0:8001::153`
- `@` AAAA `2606:50c0:8002::153`
- `@` AAAA `2606:50c0:8003::153`
- `www` CNAME `fmraz.github.io`

Do not add wildcard DNS records.

- TXT records only if needed for GitHub domain verification or future email.

Do not configure paid email hosting until the website is live and support workflow is chosen.

## Current DNS Verification Status

As of 2026-06-25, GitHub Pages is configured for `tidyrailstudio.com`, the authoritative VEDOS nameserver returns the GitHub Pages A, AAAA, and `www` CNAME records for the root domain, and `http://tidyrailstudio.com/` returns the GitHub Pages site.

HTTPS is pending GitHub certificate provisioning. Do not enable Enforce HTTPS until `https://tidyrailstudio.com/` presents a certificate valid for `tidyrailstudio.com`.

The authoritative VEDOS nameserver still returned wildcard `*.tidyrailstudio.com` parking A records during verification. Before considering the domain clean, remove those wildcard records in VEDOS and verify that no wildcard A records remain.

## Hosting Options

Selected first:

1. GitHub Pages, because it is free for public repositories and fits the static website.
2. Cloudflare Pages as a fallback if GitHub Pages becomes limiting.
3. VEDOS hosting only if a paid hosting package is explicitly approved later.
