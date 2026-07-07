# Authentication Strategy

Status: architecture prepared, not connected to production.

## Recommendation

Use Supabase Auth + Supabase Postgres for the first account system.

Why:

- It supports email/password, password reset, OAuth providers, and hosted auth flows.
- It pairs authentication with Postgres Row Level Security, which is the simplest way to keep each user's product data separated.
- It can run behind a static GitHub Pages frontend without building a custom server first.
- It is free-tier friendly for early validation, but current limits and pricing must be verified before launch.

Sources checked on 2026-06-25:

- Supabase pricing: https://supabase.com/pricing
- Supabase Auth docs: https://supabase.com/docs/guides/auth
- Supabase Row Level Security docs: https://supabase.com/docs/guides/database/postgres/row-level-security
- Firebase pricing/auth docs: https://firebase.google.com/pricing
- Clerk pricing: https://clerk.com/pricing
- Auth0 pricing: https://auth0.com/pricing

## Options Compared

| Option | Pros | Cons | Recommendation |
|---|---|---|---|
| Supabase | Auth, Postgres, RLS, export-friendly SQL, static-site friendly | Requires project setup, OAuth provider setup, careful RLS | Best first choice |
| Firebase | Mature auth, broad platform SDK support | Firestore rules and export model are less natural for relational app data | Good fallback |
| Clerk | Excellent hosted auth UI and social login | Database still needed separately; future paid plan risk | Good if auth UI speed matters more than cost |
| Auth0 | Mature identity platform | More enterprise-oriented; can be heavier than needed | Not first choice |
| Custom auth | Full control | High security burden, password storage risk, maintenance cost | Avoid |

## Supported Sign-In Methods

Prepare:

- Email and password
- Password reset
- Google OAuth
- Apple OAuth
- GitHub OAuth
- Microsoft OAuth through Azure provider
- Facebook OAuth only if it adds real user value

Manual setup required:

- Supabase project
- Site URL: `https://tidyrailstudio.com`
- Redirect URLs:
  - `https://tidyrailstudio.com/account/dashboard/`
  - `https://tidyrailstudio.com/account/settings/`
  - `http://localhost:*` for local testing only
- OAuth apps/secrets for each social provider
- Apple Developer account for Sign in with Apple in native apps

## Secret Handling

- Never commit service role keys.
- Public Supabase anon key may be used client-side only with RLS enabled.
- OAuth client secrets stay in provider dashboards and Supabase dashboard.
- Use `website/js/auth-config.example.js` as a template only.
- Production config must be generated during deploy or manually added after review.
- Run `node scripts/qa-auth-config-safety.mjs` before auth-related commits.

## Current Website State

The website includes account UI routes:

- `/account/login/`
- `/account/register/`
- `/account/reset/`
- `/account/dashboard/`
- `/account/settings/`

These pages are prepared for Supabase but intentionally show a clear not-configured message until the backend is approved and connected.

The first public Renewal Desk release should still be described as local-first. Account sync is a prepared next step, not a live feature.

## Implementation Gate

Before connecting auth in production:

- Confirm `https://tidyrailstudio.com` has a valid GitHub Pages certificate.
- Enable Enforce HTTPS in GitHub Pages.
- Complete `SUPABASE_SETUP.md`.
- Apply and test `DATABASE_SCHEMA.md`.
- Test two separate users against Row Level Security.
- Update the privacy policy and terms from local-only language to account-data language.
