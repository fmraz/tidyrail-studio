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

create table public.renewal_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'subscription',
  provider text,
  renewal_date date not null,
  amount numeric(12,2),
  currency text default 'USD',
  receipt_status text default 'unknown',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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
```

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
