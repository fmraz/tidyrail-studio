# First Product Release Checklist

Product: Renewal Desk

## Product

- [x] Product specification
- [x] MVP feature set
- [x] v1.0 feature set
- [x] UI/UX
- [x] Core functionality
- [x] Local data storage
- [x] Error and empty states
- [x] Responsive layout
- [x] README
- [x] Build/run instructions
- [x] FAQ
- [x] Privacy policy draft
- [x] Changelog
- [x] Roadmap
- [x] Store descriptions draft
- [x] Website product page copy
- [x] Download page copy
- [x] Launch checklist
- [x] QA checklist

## Still Needed Before Public Release

- [ ] Founder-machine fresh browser test.
- [ ] Optional screen-reader spot check.
- [x] Company website QA.
- [x] Domain purchase on VEDOS.
- [x] GitHub Pages hosting setup.
- [x] Root DNS public verification for `tidyrailstudio.com`.
- [ ] GitHub HTTPS certificate provisioning and Enforce HTTPS. Current blocker: GitHub Pages API reports `https_certificate.state: bad_authz`, TLS still serves `*.github.io` instead of `tidyrailstudio.com`, and API reset attempts return `The certificate has not finished being issued`; Enforce HTTPS must remain off until the certificate is valid.
- [x] Remove wildcard `*.tidyrailstudio.com` parking records in VEDOS.
- [x] Public website copy aligned with free-first/no-account release path.
- [x] Supabase setup checklist prepared without committing secrets.
- [x] Renewal Desk cloud sync plan prepared with RLS gates.
- [x] Local sync adapter scaffold added and tested without enabling cloud writes.
- [x] Test-safe two-user Supabase RLS QA runner prepared without secrets.
- [x] Supabase cloud adapter methods prepared behind an explicit disabled-by-default config gate.
- [x] Desktop packaging readiness gates documented without claiming native availability.
- [x] Tauri desktop scaffold prepared without native availability claims.
- [ ] Public release approval.

## Free-First Requirements

- [x] No payment processing.
- [x] No subscriptions.
- [x] No locked Pro features.
- [x] No artificial free limits.
- [x] No fake testimonials.
- [x] No fake download/user claims.
