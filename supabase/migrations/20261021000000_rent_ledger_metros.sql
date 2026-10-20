-- Rent ledger: metros, and house addresses for Caitlyn's admin view.
--
-- Uploading and unlocking the report adds a host's houses to the benchmarks
-- (no opt-out). Other hosts only ever get aggregates from
-- /api/rent-ledger/benchmarks (5+ operators and 5+ houses per group).
-- house_address is read only by the admin page (/tools/rent-ledger/admin).

alter table rl_users add column if not exists metro text;
alter table rl_house_snapshots add column if not exists metro text;
alter table rl_house_snapshots add column if not exists house_address text;
create index if not exists rl_house_snapshots_metro_idx on rl_house_snapshots (metro);
