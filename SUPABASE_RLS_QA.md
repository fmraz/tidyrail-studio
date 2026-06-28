# Supabase RLS QA

Status: prepared, waiting for a test Supabase project.

Purpose: verify that Renewal Desk account data is private per user before any production auth or sync configuration is committed.

## Safety Rules

- Use a test Supabase project first.
- Do not use a service role key in browser code, QA scripts, shell history snippets, docs, or commits.
- Run the SQL from `DATABASE_SCHEMA.md` before testing.
- Keep email confirmation disabled only in the temporary test project, or manually confirm both test users before running the script.
- Keep `website/js/auth-config.js` and `docs/js/auth-config.js` uncommitted.
- Do not enable production account sync until HTTPS is valid and enforced for `tidyrailstudio.com`.

## Test Users

Create two test users in Supabase Auth:

- `qa-user-a@example.invalid`
- `qa-user-b@example.invalid`

Use local-only passwords that are not reused anywhere else.

## Environment Variables

Set these values in the terminal session that runs QA:

```sh
export SUPABASE_URL="https://PROJECT_REF.supabase.co"
export SUPABASE_ANON_KEY="PUBLIC_ANON_KEY"
export QA_USER_A_EMAIL="qa-user-a@example.invalid"
export QA_USER_A_PASSWORD="LOCAL_TEST_PASSWORD_A"
export QA_USER_B_EMAIL="qa-user-b@example.invalid"
export QA_USER_B_PASSWORD="LOCAL_TEST_PASSWORD_B"
```

The anon key is public by design, but it is only safe after RLS policies are correct. Do not commit a filled config file or shell export file.

## Run

```sh
node scripts/qa-supabase-rls.mjs
```

Expected result: every check prints `PASS`.

The script verifies:

- user A and user B can create and read their own profile rows;
- user B cannot read user A's profile;
- user A cannot update user B's profile;
- anonymous users cannot insert `renewal_items`;
- user A can create and read user A rows;
- user B can create and read user B rows;
- anonymous users cannot read user A rows;
- user A cannot read, update, or delete user B rows;
- user B cannot read user A rows;
- user A cannot insert a row with user B as owner.
- failed wrong-owner insert attempts do not leave a row visible to the targeted owner.
- user A can create a pending `account_deletion_requests` row;
- user B cannot read user A's deletion request.

The helper also checks that REST select responses are arrays and reports cleanup warnings without hiding the main test results.

## Local Frontend Config

Only after the RLS script passes, create a local uncommitted file from the example:

```sh
cp website/js/auth-config.example.js website/js/auth-config.js
```

Fill `supabaseUrl` and `supabaseAnonKey` with test project values. Keep `enableRenewalDeskCloudSync: false` while testing account pages only. Set it to `true` only for local Renewal Desk sync-adapter QA after the founder approves testing cloud writes in the test project.

Do not copy this file into `docs/` and do not commit it until production enablement is explicitly approved.

## Cleanup

After QA:

1. Delete rows created by the test users if the script did not finish cleanup.
2. Delete the two test users from Supabase Auth.
3. Remove `website/js/auth-config.js`.
4. Confirm `git status --short` does not show any config file or secret-bearing local notes.
