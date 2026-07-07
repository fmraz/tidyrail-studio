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
  enableRenewalDeskCloudSync: false,
  redirectTo: "https://tidyrailstudio.com/account/dashboard/"
};
```

The anon key is designed to be public, but it is only safe with correct RLS policies. Never place the service role key in frontend files. Keep `enableRenewalDeskCloudSync` set to `false` until RLS QA passes and local cloud-write testing is explicitly approved.

## Test-Safe Auth Config Workflow

Use this workflow to avoid committing project keys by accident:

1. Keep `website/js/auth-config.example.js` committed as the only public template.
2. Create `website/js/auth-config.js` locally only after a Supabase test project exists.
3. Confirm `.gitignore` excludes:
   - `website/js/auth-config.js`
   - `docs/js/auth-config.js`
4. Do not copy a local test config into `docs/` until production deploy is explicitly approved.
5. Use a test Supabase project first, not the final production project.
6. Test email/password only before enabling OAuth providers.
7. Run the RLS two-user QA checklist before deploying any config.
8. Delete local test users and test rows after validation.

Prepared QA support:

- `scripts/qa-renewal-sync-adapter.mjs` verifies the Renewal Desk adapter gate and field mapping without a Supabase project.
- `scripts/qa-auth-config-safety.mjs` verifies that frontend auth config stays test-safe and uncommitted.
- `SUPABASE_RLS_QA.md` documents the test-safe two-user workflow.
- `scripts/qa-supabase-rls.mjs` runs the RLS checks with local environment variables only.

Production config should be committed or deployed only after a dedicated review confirms that:

- the key is a public anon key,
- RLS policies are enabled and tested,
- HTTPS is enforced,
- password reset redirects work,
- the privacy policy and terms match the account behavior.

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
4. Run `node scripts/qa-auth-config-safety.mjs`.
5. Add a temporary local-only `auth-config.js` with test project values.
6. Register a test user.
7. Confirm the user lands on `/account/dashboard/`.
8. Create test Renewal Desk rows through the sync adapter only after it is implemented.
9. Sign out and verify private data is not visible.
10. Log in as a second test user and verify no rows from the first user appear.
11. Remove local test config before committing unless production connection is approved.
12. Run `node scripts/qa-auth-config-safety.mjs` again before every commit.

## Auth Config Safety Check

Run before any auth-related commit:

```sh
node scripts/qa-auth-config-safety.mjs
```

The check verifies:

- `website/js/auth-config.js` is gitignored.
- `docs/js/auth-config.js` is gitignored.
- neither config file is tracked.
- no deploy mirror config exists before production approval.
- website/docs example configs match.
- example values remain placeholders.
- cloud sync is disabled in the example config.
- no unexpected service-role references exist in tracked files.

## Two-User RLS Test

Create two test users:

- `qa-user-a@example.invalid`
- `qa-user-b@example.invalid`

Expected results:

1. User A can create a Renewal Desk row.
2. User B cannot read User A's row.
3. User B can create a different Renewal Desk row.
4. User A cannot read User B's row.
5. Anonymous requests cannot read or write `renewal_items`.
6. Updating a row with another user's `user_id` is rejected.
7. Deleting another user's row is rejected.
8. Export returns only the signed-in user's rows.
9. Sign-out clears account-scoped in-memory state.
10. Local-only mode still works when Supabase config is absent.

Automated local helper:

```sh
node scripts/qa-supabase-rls.mjs
```

Required environment variables are listed in `SUPABASE_RLS_QA.md`. The script uses the public anon key and test user sessions only; it must never use a service role key.

## Rollback Plan

If auth causes errors after deploy:

1. Remove or disable `website/js/auth-config.js`.
2. Keep account pages visible with the not-configured message.
3. Redeploy static files.
4. Leave Renewal Desk local-first exports available.
