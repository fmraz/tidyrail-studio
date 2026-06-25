# Database Schema

Target backend: Supabase Postgres.

Status: design draft, not applied to a production database.

## Principles

- Every product data row has a `user_id`.
- Row Level Security must be enabled before any client reads or writes.
- No table with user data should be exposed without a policy.
- Export and deletion should be possible without manual database work.
- Store only what the product needs.

## Core Tables

```sql
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text default 'en',
  privacy_mode text default 'minimal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table public.renewal_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text,
  name text not null,
  category text not null default 'Other',
  renewal_date date not null,
  amount numeric(12,2),
  currency text default 'USD',
  cycle text default 'Custom',
  receipt_status text default 'Missing',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, client_id)
);

alter table public.renewal_items enable row level security;

create policy "renewal_items_select_own"
on public.renewal_items for select
using (auth.uid() = user_id);

create policy "renewal_items_insert_own"
on public.renewal_items for insert
with check (auth.uid() = user_id);

create policy "renewal_items_update_own"
on public.renewal_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "renewal_items_delete_own"
on public.renewal_items for delete
using (auth.uid() = user_id);

create trigger renewal_items_set_updated_at
before update on public.renewal_items
for each row execute function public.set_updated_at();

create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_at timestamptz not null default now(),
  status text not null default 'pending'
);

alter table public.account_deletion_requests enable row level security;

create policy "account_deletion_requests_insert_own"
on public.account_deletion_requests for insert
with check (auth.uid() = user_id);

create policy "account_deletion_requests_select_own"
on public.account_deletion_requests for select
using (auth.uid() = user_id);
```

## Renewal Desk Field Mapping

| Local field | Database field |
|---|---|
| `id` | `client_id` |
| `name` | `name` |
| `category` | `category` |
| `date` | `renewal_date` |
| `cost` | `amount` |
| `cycle` | `cycle` |
| `receipt` | `receipt_status` |
| `notes` | `notes` |
| `createdAt` | `created_at` |
| `updatedAt` | `updated_at` |

## Export Flow

Export should query only rows owned by the signed-in user and produce JSON:

- profile
- renewal_items
- export timestamp
- schema version

## Deletion Flow

Account deletion should:

1. Confirm the user intent.
2. Export a final backup option.
3. Delete product rows.
4. Delete profile row.
5. Request auth user deletion through a secure server-side function.

Deleting the auth user requires a privileged operation and must not be done with a client-side service role key.
