# GitHub Pages Setup

Public-facing site: `https://tidyrailstudio.com`

Repository target: `fmraz/tidyrail-studio`

Current status on 2026-07-19:

- GitHub repository exists.
- GitHub Pages is built.
- Publishing source is `main` branch, `/docs` folder.
- Custom domain is set to `tidyrailstudio.com`.
- HTTPS enforcement should wait until DNS and GitHub certificate provisioning are confirmed.
- VEDOS root and `www` DNS records are correct on the authoritative nameserver.
- `http://tidyrailstudio.com/` returns the GitHub Pages site.
- `https://tidyrailstudio.com/` is not ready yet because GitHub still serves a `*.github.io` certificate for the custom domain.
- Wildcard `*.tidyrailstudio.com` parking A records no longer resolve on the authoritative VEDOS nameserver.
- GitHub Pages API still reports `https_certificate.state: bad_authz` with description: `The ACME authorization is in a bad state. We need to start over.`
- A same-settings Pages update retry on 2026-06-26 returned `The certificate has not finished being issued`; Enforce HTTPS must remain off.
- TLS verification on 2026-07-07 still served a `*.github.io` certificate instead of a certificate covering `tidyrailstudio.com`.
- On 2026-07-19, the Pages API successfully removed the custom domain, cleared the custom certificate state, and accepted `tidyrailstudio.com` again. GitHub immediately returned the same `bad_authz` state, confirming that another repeated API reset is not useful.
- `GITHUB_SUPPORT_HTTPS_REQUEST.md` contains the current evidence and founder-ready support message.

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

After DNS is correct and GitHub finishes certificate provisioning, enable Enforce HTTPS. If `bad_authz` remains, use GitHub Pages settings to remove and re-add the custom domain or retry certificate issuance from the UI before enabling HTTPS enforcement.

## HTTPS Recovery Plan

GitHub's documented recovery path for stuck certificate provisioning is to remove the custom domain in repository Pages settings, save, retype the domain, and save again. The API path is currently blocked for this repository, so use the Settings UI next.

Manual UI steps:

1. Open `https://github.com/fmraz/tidyrail-studio/settings/pages`.
2. In "Custom domain", remove `tidyrailstudio.com`.
3. Save the empty custom domain field.
4. Wait until GitHub Pages confirms the setting changed.
5. Re-enter `tidyrailstudio.com`.
6. Save again.
7. Wait for the certificate state to move away from `bad_authz`.
8. Do not enable "Enforce HTTPS" until `https://tidyrailstudio.com/` serves a certificate valid for `tidyrailstudio.com`.

The controlled API reset has now completed and `bad_authz` returned immediately. Do not repeat resets in a loop. Submit `GITHUB_SUPPORT_HTTPS_REQUEST.md` through GitHub Support while continuing local release work.

Earlier concise report retained for history:

```text
Repository: fmraz/tidyrail-studio
Pages source: main /docs
Custom domain: tidyrailstudio.com
DNS status: apex A and AAAA records point to GitHub Pages; www CNAME points to fmraz.github.io; no CAA record is set; no wildcard record is returned by the authoritative VEDOS nameservers.
Runtime status: http://tidyrailstudio.com/ returns the GitHub Pages site, but https://tidyrailstudio.com/ serves a *.github.io certificate and fails hostname validation.
Pages API status: https_certificate.state is bad_authz with description "The ACME authorization is in a bad state. We need to start over."
Attempted fixes: re-applied CNAME through the repository, temporarily removed/restored CNAME files, triggered Pages rebuilds, and attempted Pages API cname null/re-add. The API reset returned "The certificate has not finished being issued."
Request: please reset or inspect the GitHub Pages ACME certificate provisioning for tidyrailstudio.com.
```

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

Manual VEDOS check before launch:

- Confirm the four GitHub Pages A records exist for the root/apex domain.
- Confirm the four GitHub Pages AAAA records exist for the root/apex domain.
- Confirm `www` is a CNAME pointing to `fmraz.github.io`.
- Confirm no wildcard `*.tidyrailstudio.com` A records remain.
- Save/apply any pending DNS change if VEDOS shows a separate confirmation state.

## Verification Commands

```bash
dig tidyrailstudio.com +noall +answer -t A
dig tidyrailstudio.com +noall +answer -t AAAA
dig www.tidyrailstudio.com +noall +answer
curl -I http://tidyrailstudio.com/
curl -I https://tidyrailstudio.com/
```

## Current Free Product Routes

- `/apps/renewal-desk/` - live free web app
- `/downloads/` - download page
- `/downloads/renewal-desk-0.1.0-mvp.zip` - free static package
