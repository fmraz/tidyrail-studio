# GitHub Pages HTTPS Support Request

Status: prepared for founder review and manual submission. No support request has been sent.

## Subject

GitHub Pages custom-domain certificate remains in `bad_authz` after a successful domain reset

## Message

Hello GitHub Support,

Please inspect or reset ACME certificate provisioning for this GitHub Pages site:

- Repository: `fmraz/tidyrail-studio`
- Pages source: `main` branch, `/docs`
- Custom domain: `tidyrailstudio.com`
- Pages build status: `built`
- Pages certificate state: `bad_authz`
- API description: `The ACME authorization is in a bad state. We need to start over.`
- HTTPS enforcement: disabled

DNS has been verified:

- The apex has all four documented GitHub Pages A records.
- The apex has all four documented GitHub Pages AAAA records.
- `www` is a CNAME to `fmraz.github.io`.
- No wildcard response is returned.
- No CAA record is configured.
- `docs/CNAME` contains only `tidyrailstudio.com`.

Runtime behavior:

- `http://tidyrailstudio.com/` serves the expected GitHub Pages site.
- `https://tidyrailstudio.com/` fails hostname validation because the served certificate does not include `tidyrailstudio.com`.

Recovery attempts:

- Rebuilt and redeployed the Pages site.
- Removed and restored the CNAME files in an earlier controlled retry.
- Re-applied the same custom-domain setting.
- On 2026-07-19, successfully set the Pages API `cname` to `null`. The API then showed no custom domain and no custom certificate.
- Immediately re-added `tidyrailstudio.com` through the Pages API.
- GitHub immediately returned the same `bad_authz` certificate state.

Please clear or inspect the stuck ACME authorization so GitHub Pages can issue a certificate covering `tidyrailstudio.com`.

Thank you.

## Founder Submission Checklist

- [ ] Review the message.
- [ ] Submit it through GitHub Support while signed in as `fmraz`.
- [ ] Add the support ticket reference here.
- [ ] Recheck the Pages API and hostname-valid HTTPS after GitHub responds.
- [ ] Enable Enforce HTTPS only after TLS validation succeeds.
