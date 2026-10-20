import { classifyLedger, type Ledger } from "./classify";
import { blockingFailures, fileCheck, runChecks, type CheckResult } from "./checks";
import { parseExport, type ParseResult, type RawFiles } from "./parse";

// One call from raw CSV texts to a classified, checked ledger. The report
// itself (metrics.ts) is computed separately so options can change cheaply.

export interface Analysis {
  parsed: ParseResult;
  ledger: Ledger | null;
  checks: CheckResult[];
  blocked: boolean;
}

export function analyze(raw: RawFiles): Analysis {
  const parsed = parseExport(raw);
  if (!parsed.data) {
    return { parsed, ledger: null, checks: [fileCheck(parsed)], blocked: true };
  }
  const ledger = classifyLedger(parsed.data);
  const checks = runChecks(ledger, parsed);
  return { parsed, ledger, checks, blocked: blockingFailures(checks).length > 0 };
}
