-- Rent ledger tool (build spec section 12).
--
-- Users come from the NextAuth Supabase adapter (public.users), not
-- auth.users, so rl_users references public.users. The site talks to
-- Supabase only from API routes with the service-role key, so RLS is
-- enabled with no policies: the anon and authenticated keys can read or
-- write nothing, and every route checks the NextAuth session itself.
-- Benchmarks are aggregated in /api/rent-ledger/benchmarks, which returns
-- aggregates only and enforces the 5-user / 5-house minimum.

create table if not exists rl_users (
  id uuid primary key references public.users(id) on delete cascade,
  first_name text, last_name text, email text not null,
  city text, state text, operator_type text, house_count int,
  consent_report boolean not null default true,
  consent_contact boolean not null default false,
  interest_selling boolean, interest_buying boolean,
  interest_partnering boolean, interest_help boolean,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists rl_house_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references rl_users(id) on delete cascade,
  house_hash text not null,
  city text, state text, zip text,
  rooms int, price_band text,
  period_start date, period_end date, months_covered int,
  collected_per_house_month numeric, collection_rate numeric,
  breakage_rate numeric, breakage_per_house_month numeric,
  move_outs int, left_owing_rate numeric, median_balance numeric,
  avg_stay_days numeric, short_pct numeric, long_pct numeric,
  requests int, acceptance_rate numeric,
  months_to_stabilize int, events_per_year numeric,
  occupancy_avg numeric, true_room_rate numeric,
  rules_version text not null,
  created_at timestamptz default now()
);
create index if not exists rl_house_snapshots_hash_idx on rl_house_snapshots (house_hash, created_at desc);
create index if not exists rl_house_snapshots_city_idx on rl_house_snapshots (city, state);
create index if not exists rl_house_snapshots_user_idx on rl_house_snapshots (user_id);

-- "Something looks off" reports: counts and check results only.
create table if not exists rl_feedback (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null,
  created_at timestamptz default now()
);

alter table rl_users enable row level security;
alter table rl_house_snapshots enable row level security;
alter table rl_feedback enable row level security;
