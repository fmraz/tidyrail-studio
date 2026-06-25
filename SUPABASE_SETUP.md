# Supabase Setup Checklist

Status: prepared, not connected to production.

Purpose: create the backend needed for Renewal Desk accounts and future sync without adding paid features, invasive tracking, or a custom server.

## Manual Approval Required

The founder must manually approve or complete these steps:

- Create or sign in to a Supabase account.
- Create the Supabase project.
- Choose the project region.
- Approve any paid plan or quota upgrade if the free tier becomes insufficient.
- Create OAuth apps for Google, Apple, Microsoft, GitHub, or Facebook if those providers are enabled.
- Provide production values for the public Supabase URL and anon key.

Do not commit service role keys, database passwords, OAuth secrets, or SMTP credentials.

## Recommended Project Settings

- Project name: `tidyrail-studio`
- Initial product namespace: `renewal_desk`
- Site URL after HTTPS is ready: `https://tidyrailstudio.com`
- Temporary Site URL before HTTPS: keep auth disconnected from production until GitHub Pages certificate is valid.
- Additional redirect URLs:
  - `https://tidyrailstudio.com/account/dashboard/`
  - `https://tidyrailstudio.com/account/settings/`
  - `https://tidyrailstudio.com/account/reset/`
  - `http://localhost:4322/account/dashboard/`
  - `http://localhost:4322/account/settings/`

## Dashboard Steps

1. Open Supabase and create a new project.
2. In Authentication > URL Configuration, set the Site URL and redirect URLs above.
3. In Authentication > Providers, enable email/password first.
4. Keep social providers disabled until each OAuth app is created and tested.
5. In SQL Editor, run the schema from `DATABASE_SCHEMA.md`.
6. Confirm Row Level Security is enabled on every user data table.
7. In Table Editor, verify that anonymous users cannot read or write product rows without a signed-in session.
8. Copy only the project URL and anon public key into a local production config review note.
9. Create `website/js/auth-config.js` from `website/js/auth-config.example.js` only when ready to connect auth.
10. Run local QA before deploying the config.

## Frontend Config Shape

Create this file only after backend approval:

```js
window.TIDYRAIL_AUTH = {
  supabaseUrl: "https://PROJECT_REF.supabase.co",
  supabaseAnonKey: "PUBLIC_ANON_KEY",
  redirectTo: "https://tidyrailstudio.com/account/dashboard/"
};
```

The anon key is designed to be public, but it is only safe with correct RLS policies. Never place the service role key in frontend files.

## Provider Setup Order

1. Email/password
2. Password reset
3. Google Sign-In
4. Sign in with Apple
5. GitHub login
6. Microsoft account
7. Facebook Login only if there is clear user demand

## Production Safety Gates

Auth can be enabled publicly only after:

- HTTPS works for `tidyrailstudio.com`.
- Enforce HTTPS is enabled in GitHub Pages.
- RLS tests pass for separate test users.
- Password reset returns to the correct domain.
- Export and deletion flows are documented.
- Privacy policy and terms mention account data accurately.
- No secrets are committed.

## Local Test Plan

1. Run the website locally.
2. Load `/account/register/`.
3. Confirm the page shows a not-configured message when `auth-config.js` is absent.
4. Add a temporary local-only `auth-config.js` with test project values.
5. Register a test user.
6. Confirm the user lands on `/account/dashboard/`.
7. Create test Renewal Desk rows through the sync adapter only after it is implemented.
8. Sign out and verify private data is not visible.
9. Log in as a second test user and verify no rows from the first user appear.
10. Remove local test config before committing unless production connection is approved.

## Rollback Plan

If auth causes errors after deploy:

1. Remove or disable `website/js/auth-config.js`.
2. Keep account pages visible with the not-configured message.
3. Redeploy static files.
4. Leave Renewal Desk local-first exports available.

