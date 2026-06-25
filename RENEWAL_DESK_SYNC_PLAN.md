# Renewal Desk Sync Plan

Status: design ready, implementation pending Supabase approval.

Renewal Desk 0.1.x remains local-first. Cloud sync will be added only after Supabase is configured, RLS is verified, and HTTPS is enforced for the production domain.

## Goals

- Let users keep Renewal Desk records across devices.
- Keep every row scoped to one authenticated user.
- Preserve local export/import as a fallback.
- Avoid lock-in, paid limits, tracking, or forced accounts.
- Make deletion and export understandable.

## Non-Goals For The First Public Release

- No mandatory account.
- No paid sync.
- No team sharing.
- No real-time collaboration.
- No automatic import that can overwrite local data without user approval.

## Data Model Mapping

Local item field to cloud row:

| Local field | Cloud field | Notes |
|---|---|---|
| `id` | `client_id` | Local ID retained for import and conflict checks |
| `name` | `name` | Required |
| `category` | `category` | Required |
| `date` | `renewal_date` | Required date |
| `cost` | `amount` | Optional decimal |
| `cycle` | `cycle` | Monthly, Quarterly, Annual, Custom |
| `receipt` | `receipt_status` | Missing, Saved, Not needed |
| `notes` | `notes` | Optional |
| `createdAt` | `created_at` | Existing local timestamp where available |
| `updatedAt` | `updated_at` | Used for conflict checks |

## Sync States

- `local_only`: no signed-in user or sync disabled.
- `ready_to_import`: signed-in user with local rows not yet copied to cloud.
- `cloud_synced`: signed-in user using cloud rows with local cache.
- `conflict_review`: local and cloud rows differ and need user choice.
- `sync_error`: temporary error; local data stays available.

## First Sync Flow

1. User signs in.
2. Renewal Desk detects local rows and cloud rows.
3. If cloud is empty and local has rows, offer "Copy local data to account".
4. If both local and cloud have rows, offer a review screen before merging.
5. Never delete local rows automatically.
6. Keep JSON export visible before major sync actions.

## Conflict Rule

Use `updated_at` as the first conflict signal. If two rows share the same `client_id` and both changed after the last sync timestamp, show both versions and let the user choose. Do not silently overwrite notes or dates.

## Offline Behavior

- Keep a local cache of the last known cloud rows.
- Allow local edits while offline only after a queue exists.
- MVP sync can be online-only until offline queue tests are reliable.

## Privacy Controls

Required before public sync:

- Export account data as JSON.
- Delete Renewal Desk cloud rows.
- Request account deletion.
- Clear local cache on sign-out.
- Clear local cache after account deletion.

## Implementation Sequence

1. Add a sync adapter module with local and Supabase implementations.
2. Keep local storage as the default adapter.
3. Add Supabase adapter behind a configuration check.
4. Add a sync status panel inside Renewal Desk.
5. Add first-import flow.
6. Add per-user CRUD through RLS.
7. Add export/delete account data controls.
8. QA with two test users before public release.

## QA Gates

- Test user A cannot read user B rows.
- Anonymous users cannot read or write `renewal_items`.
- Password reset returns to the correct domain.
- Sign-out clears sensitive in-memory state.
- Local-only mode still works when Supabase is unavailable.
- Import/export still works without an account.

