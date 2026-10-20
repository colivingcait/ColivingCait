"use client";

import type { RawFiles } from "@/lib/rent-ledger/parse";

// The upload lives only in this browser (IndexedDB), so the magic-link round
// trip doesn't lose it. Nothing here is ever sent to the server.

export interface LeadAnswers {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  zips: Record<string, string>;
  /** Metro for the portfolio, and per-house overrides. */
  metro: string;
  metros: Record<string, string>;
  operatorType: string;
  houseCount: string;
  consentReport: boolean;
  consentContact: boolean;
}

export interface StoredState {
  files: RawFiles;
  sourceName: string;
  savedAt: string;
  lead?: LeadAnswers;
  /** True once the lead has been saved to the signed-in profile. */
  profileSaved?: boolean;
  /** savedAt of the upload whose houses were added to the benchmarks. */
  contributedFor?: string;
  rooms?: Record<string, number>;
  interests?: Record<string, boolean>;
}

const DB = "rent-ledger";
const STORE = "state";
const KEY = "current";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise<T>((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }).finally(() => db.close());
}

export async function loadState(): Promise<StoredState | null> {
  try {
    return ((await tx("readonly", (s) => s.get(KEY))) as StoredState | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function saveState(state: StoredState): Promise<void> {
  try {
    await tx("readwrite", (s) => s.put(state, KEY));
  } catch {
    // Private windows can block IndexedDB; the report still works this visit.
  }
}

export async function patchState(patch: Partial<StoredState>): Promise<void> {
  const cur = await loadState();
  if (cur) await saveState({ ...cur, ...patch });
}

export async function clearState(): Promise<void> {
  try {
    await tx("readwrite", (s) => s.delete(KEY));
  } catch {
    // ignore
  }
}
