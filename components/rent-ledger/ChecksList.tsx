"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CheckResult } from "@/lib/rent-ledger/checks";

const ICON = { pass: "✓", warn: "!", fail: "✕" } as const;
const WORD = { pass: "Pass", warn: "Warning", fail: "Failed" } as const;

export default function ChecksList({ checks, showNames = true }: { checks: CheckResult[]; showNames?: boolean }) {
  return (
    <ul className="divide-y divide-soft border border-brand bg-white">
      {checks.map((c) => (
        <CheckRow key={c.id} check={c} showNames={showNames} />
      ))}
    </ul>
  );
}

// Item lists for these checks name residents.
const NAMED = new Set(["unclassified", "odd_bills", "outliers"]);

function CheckRow({ check, showNames }: { check: CheckResult; showNames: boolean }) {
  const [open, setOpen] = useState(check.status === "fail");
  const items = check.items ?? [];
  const hidden = NAMED.has(check.id) && !showNames;
  return (
    <li className="px-4 py-3">
      <div className="flex items-start gap-3">
        <span
          aria-label={WORD[check.status]}
          className={cn(
            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[11px] font-bold text-white",
            check.status === "pass" && "bg-[#008300]",
            check.status === "warn" && "bg-gold-dark",
            check.status === "fail" && "bg-red-700",
          )}
        >
          {ICON[check.status]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-charcoal">
            <span className="font-medium">{check.label}</span>
            <span className="ml-2 text-[10px] uppercase tracking-eyebrow text-warmgray">
              {WORD[check.status]}
              {check.blocking ? " · required" : ""}
            </span>
          </p>
          <p className="text-sm text-warmgray leading-relaxed">{check.detail}</p>
          {items.length > 0 && check.status !== "pass" && (
            <>
              <button type="button" onClick={() => setOpen((v) => !v)} className="mt-1 text-xs text-gold-dark underline underline-offset-4">
                {open ? "Hide details" : `Show ${items.length} detail${items.length > 1 ? "s" : ""}`}
              </button>
              {open && (
                <ul className="mt-2 max-h-56 overflow-y-auto text-xs text-charcoal space-y-1">
                  {hidden ? (
                    <li className="text-warmgray">{items.length} rows. Turn on “Show names” to see them.</li>
                  ) : (
                    items.map((it, i) => <li key={i}>{it}</li>)
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
