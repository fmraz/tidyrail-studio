# Renewal Desk Release Channel Decision Brief

Prepared: 2026-06-25

Status: founder approval needed before any public release, sales setup, account creation, marketplace submission, or external posting.

## Recommendation

Use a two-step release path:

1. **Primary sales channel:** Gumroad paid digital download for the packaged Renewal Desk zip.
2. **Awareness channel after the sales/download URL exists:** Product Hunt launch page.

This is the simplest path for a first small paid utility because Gumroad can host a downloadable product, has no monthly fee, and currently presents itself as a merchant of record. Product Hunt should be treated as a traffic and feedback channel, not as the place where the product is sold.

## Why This Path

- Renewal Desk is already packaged as `dist/renewal-desk-0.1.0-mvp.zip`.
- The package checksum for founder review is stored next to the zip in `dist/renewal-desk-0.1.0-mvp.zip.sha256`.
- The product is a small downloadable static utility, so a hosted checkout/download page is enough for the first release.
- A direct sales channel avoids building custom commerce, licensing, hosting, analytics, or account systems before demand is proven.
- Product Hunt requires a live URL before launch submission, so it should come after the product page or checkout page exists.

## Current External Facts Checked

- Gumroad's official pricing page currently lists **10% + $0.50** per direct/profile transaction and **30%** when customers find and buy through Gumroad Discover.
- Gumroad currently describes itself as a merchant of record for tax management.
- Lemon Squeezy's official pricing page currently lists **5% + $0.50** platform pricing, with possible additional payment-method, international, and subscription-related fees in its docs.
- Lemon Squeezy also describes itself as a merchant of record.
- Product Hunt's official launch guide says products are submitted with a product URL, can be scheduled ahead, and newly created accounts may need time before posting.
- GitHub Releases can package release notes and downloadable binary files, but it is better suited to free/open-source distribution than a first paid checkout.

Sources checked on 2026-06-25:

- https://gumroad.com/pricing
- https://gumroad.com/help/article/66-gumroads-fees
- https://www.lemonsqueezy.com/pricing
- https://docs.lemonsqueezy.com/help/getting-started/fees
- https://www.producthunt.com/launch
- https://www.producthunt.com/launch/preparing-for-launch
- https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository

## Alternatives Considered

| Channel | Fit | Main Tradeoff | Recommendation |
|---|---|---|---|
| Gumroad | Strong fit for a first digital download | Higher direct-sale platform fee than some alternatives | Use first if founder approves |
| Lemon Squeezy | Strong fit for software sales and merchant-of-record flow | More setup complexity for a tiny first MVP | Keep as backup if Gumroad is rejected |
| Product Hunt | Useful launch/feedback surface | Needs a live URL and is not a checkout channel | Use after checkout/download page exists |
| GitHub Releases | Good for free downloadable releases | Weak fit for paid distribution and non-technical buyers | Use only for free/open-source distribution |
| Itch.io | Can host downloadable digital products | Audience and positioning skew less business-utility focused | Defer |
| Ko-fi Shop | Lightweight digital sales option | Less purpose-built for software product releases | Defer |

## Founder Approval Needed

Approve one concrete path before any external action:

1. Create a Gumroad product page for Renewal Desk.
2. Set the launch price: recommended **$12** for the MVP release candidate.
3. Use `dist/renewal-desk-0.1.0-mvp.zip` as the downloadable file.
4. Publish the Gumroad page only after founder review.
5. Prepare Product Hunt only after a live sales/download URL exists.

## Do Not Do Yet

- Do not create external accounts in automation unless the founder explicitly approves that exact action.
- Do not enter payment details.
- Do not publish a product page.
- Do not submit to Product Hunt, Reddit, marketplaces, directories, or social media.
- Do not claim users, revenue, downloads, reviews, testimonials, or outcomes.

## Next Local Work If Approval Is Delayed

- Add a founder-approved support contact before public release.
- Run one final screen-reader spot check if available.
