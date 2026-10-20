# Read Your Rent Ledger

Free tool at `/tools/rent-ledger`. A PadSplit host drops in their earnings export and gets a full report. Parsing and math run in the browser. The server only gets lead answers and, after the benchmark opt-in, the anonymous house summary (`summary.ts`).

## Setup

1. Run `supabase/migrations/20261020000000_rent_ledger.sql` in the Supabase SQL editor. It creates `rl_users`, `rl_house_snapshots` and `rl_feedback`.
2. Set `RENT_LEDGER_HASH_SALT` in Vercel to any long random string. Don't change it later, or existing snapshots stop deduping.
3. Optional: `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_SECRET`. By default leads go to the CRM's site-form webhook with `form: "rent_ledger"` and the tags from `lib/crm/tags.ts`.

## Files

| File | What it does |
|---|---|
| `parse.ts` | Reads the zip or CSVs, trims headers, parses dates, money and IDs |
| `classify.ts` | Section 5: resident groups, balances, credits, outliers, late-fee signals |
| `metrics.ts` | Sections 6–7: every report number |
| `checks.ts` | Section 9: blocking checks and warnings |
| `summary.ts` | Section 10: the anonymous house summary, plus the "something looks off" payload |
| `rules.ts` | Every threshold, plus `RULES_VERSION`. Change a rule, bump the version, add a changelog line |
| `benchmarks.ts` | Section 11: benchmark aggregation (pure) |
| `server.ts` | Server-only helpers for the API routes |

## Tests

`npm test` runs the rule tests and the sample-export tests. The golden tests (`tests/rent-ledger/golden.test.ts`) need the real export at `tests/fixtures/lustra-2025-01-01_2026-10-20.zip`. That folder is gitignored because the export has resident names. The golden tests skip when the file isn't there.

`npm run sample:rent-ledger` rebuilds `public/samples/rent-ledger-sample.zip`, the made-up export behind "Try with sample data".

## Judgment calls to confirm against the golden export

The spec left these open. Each one is a single spot in the code:

- **Outliers.** Outliers are removed from dollar figures: breakage, balance averages and medians, breakage rates, and the correlation. Counts and left-owing shares still include them, because the golden table counts 31 of 78 left owing (39.7%) and n = 31 for the 2+ late-fee signal with the outlier in. (`metrics.ts`, top comment)
- **Recovery.** "Owed at exit" adds back payments made more than 10 days after the last bill. That matches 35 residents / $26,102 = $24,558 + $1,545.
- **Quartiles.** Quartiles use linear interpolation (Excel `QUARTILE.INC`). The golden outlier fence is ≈ $3,065.
- **Runway.** "Balance at the 2nd consecutive late fee" uses the first run that reaches 2 fees.
- **Destabilization events.** An event runs until the house's gross is back within 10% of the trailing median from before the event. "Below normal" is measured against that same pre-event baseline.
- **Months to stabilize.** A house already running when the export starts is labeled "already running", and its summary saves `months_to_stabilize` as null.
- **PSID.** The PSID is assumed to equal billed/collected `Property ID`. If it doesn't, houses are matched by street address, and a warning lists any that stay unmatched.
- **Users table.** `rl_users` references `public.users`, the NextAuth adapter's table, not `auth.users`. RLS is on with no policies, and every route checks the NextAuth session itself.
