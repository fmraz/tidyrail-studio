# GitHub Pages Setup

Public-facing site: `https://tidyrailstudio.com`

Repository target: `fmraz/tidyrail-studio`

## Deployment Model

The website source is maintained in `website/` and mirrored into `docs/` for GitHub Pages.

Important files:

- `docs/CNAME`
- `docs/.nojekyll`
- `docs/index.html`
- `docs/apps/renewal-desk/index.html`
- `docs/downloads/renewal-desk-0.1.0-mvp.zip`
- `website/index.html`
- `website/apps/renewal-desk/index.html`
- `website/downloads/renewal-desk-0.1.0-mvp.zip`

## GitHub Pages Settings

Use GitHub Pages with source set to:

```text
Branch: main
Folder: /docs
```

Custom domain:

```text
tidyrailstudio.com
```

After DNS is correct and GitHub finishes certificate provisioning, enable Enforce HTTPS.

## VEDOS DNS Records

For the apex domain `tidyrailstudio.com`, add these A records:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

Recommended IPv6 AAAA records:

```text
@  AAAA  2606:50c0:8000::153
@  AAAA  2606:50c0:8001::153
@  AAAA  2606:50c0:8002::153
@  AAAA  2606:50c0:8003::153
```

For `www.tidyrailstudio.com`, add:

```text
www  CNAME  fmraz.github.io
```

Do not add wildcard DNS records.

DNS propagation can take up to 24 hours.

## Verification Commands

```bash
dig tidyrailstudio.com +noall +answer -t A
dig tidyrailstudio.com +noall +answer -t AAAA
dig www.tidyrailstudio.com +noall +answer
```

## Current Free Product Routes

- `/apps/renewal-desk/` - live free web app
- `/downloads/` - download page
- `/downloads/renewal-desk-0.1.0-mvp.zip` - free static package
