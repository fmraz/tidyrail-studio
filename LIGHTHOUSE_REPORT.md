# Tidyrail Studio Lighthouse Report

Date: 2026-07-19

Environment: local static website served over HTTP and audited with Lighthouse in headless Chrome. Scores are reproducible release checks, not claims about every user device or network.

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Homepage | 94 | 100 | 100 | 100 |
| Renewal Desk product page | 97 | 100 | 100 | 100 |
| Downloads | 100 | 100 | 100 | 100 |
| Renewal Desk web app | 100 | 100 | 100 | 100 |

## Improvements Made

- Replaced immediate Three.js startup with a lightweight first-frame canvas.
- Deferred the full scroll-driven Three.js scene until the first real scroll.
- Preserved a static scene for reduced-motion visitors.
- Corrected planned-status text contrast.
- Corrected brand accessible names and product heading order.
- Added the missing Renewal Desk meta description.
- Added explicit asset revisions so returning browsers receive the updated CSS and scene loader.

## Regression Gates

- Homepage performance should remain at least 90 in the local release audit.
- Accessibility, Best Practices, and SEO should remain 100 for the four audited routes.
- The fallback canvas must be nonblank before interaction.
- After the first scroll, the Three.js canvas must become visible, report scene readiness, and replace the fallback without console errors.
- Desktop and 390px mobile layouts must not overflow horizontally.
