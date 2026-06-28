# External Setup Plan

Current strategy: free products first. Do not set up paid storefronts, payment processing, subscriptions, or paid downloads.

Founder instruction: domain purchase should happen through the founder's existing VEDOS account. Account credentials and payment details are stored outside the public repository.

VEDOS status on 2026-06-26: the `tidyrailstudio.com` domain is active and its root plus `www` DNS records point to GitHub Pages. Public HTTP works. HTTPS is still blocked by GitHub Pages certificate provisioning, not by VEDOS DNS.

## Recommended Setup Order

### 1. Domain

Preferred candidates:

1. `tidyrailstudio.com`
2. `tidyrail.studio`
3. `gettidyrail.com`

Notes:

- `tidyrail.com` resolved to an existing server in a DNS spot check on 2026-06-25.
- `tidyrail.studio`, `tidyrailstudio.com`, and `gettidyrail.com` did not resolve in the same DNS spot check, but this does not guarantee registrar availability.
- RDAP check on 2026-06-25:
  - `tidyrail.com`: registered; registrar shown as IONOS SE; expiration shown as 2026-12-22.
  - `tidyrail.studio`: RDAP returned `Object not found`.
  - `tidyrailstudio.com`: Verisign RDAP returned HTTP 404.
  - `gettidyrail.com`: Verisign RDAP returned HTTP 404.
- VEDOS checkout on 2026-06-25 showed `tidyrailstudio.com` at 342 CZK without VAT / 413.82 CZK with VAT for one year.
- VEDOS checkout on 2026-06-25 showed `tidyrail.studio` at 1252.35 CZK with VAT for one year, which is too high for the current "cheap essentials only" rule.
- Cloudflare Registrar markets at-cost registration and renewal with no add-on fees, but checkout availability and exact price must be confirmed in account.

The current domain choice is complete: use `tidyrailstudio.com` and do not rename Tidyrail Studio.

Payment approval is required before buying any future domain. For the current VEDOS domain, the next external setup blocker is GitHub Pages HTTPS certificate recovery.

## Future Domain Purchase Handoff

Recommended registrar:

1. VEDOS.cz, because the founder already has an account there.
2. Cloudflare/Namecheap only as fallback research references, not the preferred purchase path.

Stop before:

- Payment confirmation.
- Entering card/payment details.
- Accepting any paid add-ons.
- Buying email, hosting, logo services, SSL upsells, VPN, privacy add-ons, or marketplace extras.

Recommended settings:

- 1-year registration.
- Auto-renew off until the business has real revenue, unless the founder explicitly chooses otherwise.
- Free WHOIS privacy/redaction enabled where available.
- No hosting package.
- No paid email package yet.
- No premium DNS add-on.

### 2. Storefront

Paid storefront setup is paused.

Do not set up Lemon Squeezy, Gumroad, checkout, subscriptions, or paid downloads for the current launch.

Current distribution should use:

- Official website download.
- Free web app.
- GitHub release if a public repository is approved later.
- Product Hunt page only after the website is live.

## Free Download Setup Handoff

Recommended free product settings for first draft:

- Store name: Tidyrail Studio
- Product name: Renewal Desk
- Product type: Digital download
- Price: Free
- Fulfillment file: `dist/renewal-desk-0.1.0-mvp.zip` only after final release-candidate QA
- Support policy draft: ask users to include product version, browser, operating system, and a short issue description
- Public launch: disabled/unpublished until founder gives concrete approval
- Product draft file: `products/renewal-desk/docs/STORE_PRODUCT_DRAFT.md`

Stop before:

- Submitting tax, payout, or identity information unless the founder is present.
- Publishing the product.
- Activating paid plans or paid marketing features.
- Sending launch emails.
- Adding payment processing.

### 3. GitHub

Use GitHub only if the founder wants a public/free version, issue tracker, or open-source lead magnet. Public repository creation should wait until release copy is ready.

### 4. Product Hunt

Prepare copy now. Account creation may be useful, but launch submission requires separate approval.

### 5. Email

A support email is needed before public launch. Options:

- Temporary: use a founder-controlled existing email alias.
- Better after domain purchase: `support@tidyrailstudio.com` or equivalent.

Do not buy email hosting until domain and launch channel are approved.

## Cheap Purchase Threshold

Recommended default threshold for "cheap essential" purchases: under $20/year for domain registration or under $10 one-time for a required launch asset/tool. Even under this threshold, final payment confirmation and payment details remain founder-only.

## Sources Checked

- Namecheap domain pricing: https://www.namecheap.com/domains/
- Namecheap `.studio` pricing: https://www.namecheap.com/domains/registration/gtld/studio/
- Namecheap `.com` pricing: https://www.namecheap.com/domains/registration/gtld/com/
- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- Lemon Squeezy pricing: https://www.lemonsqueezy.com/pricing
- Lemon Squeezy fees: https://docs.lemonsqueezy.com/help/getting-started/fees
- Gumroad pricing: https://gumroad.com/pricing
- Cloudflare domain registration docs: https://developers.cloudflare.com/registrar/get-started/register-domain/
- Verisign RDAP for `.com`: https://rdap.verisign.com/com/v1/domain/tidyrail.com
