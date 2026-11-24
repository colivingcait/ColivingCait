import { randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";
import type { HouseCount } from "./pricing";

// Own client for audit storage, with Next.js's fetch cache turned off:
// lead records change (reminded, completed), and a cached read would act on
// stale data, e.g. send a second reminder.
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
});

// Audit leads and their intake uploads live in one PRIVATE Supabase storage
// bucket, one folder per lead:
//
//   audit-intake/leads/<leadId>/lead.json         the lead record
//   audit-intake/leads/<leadId>/files/<kind>/...  their uploads
//
// The bucket is private (no public URLs), only this server holds the
// service-role key, and every link handed out is signed and expires. The
// lead ID is 144 random bits, so a lead's intake link can't be guessed.
// The bucket is created on first use, so there's no setup step.

export const BUCKET = "audit-intake";
export const MAX_FILE_BYTES = 50 * 1024 * 1024; // Supabase free-plan per-file limit
export const MAX_FILES_PER_KIND = 25;
export const DOWNLOAD_LINK_SECONDS = 7 * 24 * 60 * 60;

export const FILE_KINDS = ["pnl", "outside", "padsplit"] as const;
export type FileKind = (typeof FILE_KINDS)[number];
export const ALLOWED_EXTENSIONS = ["pdf", "xlsx", "xls", "csv", "zip"] as const;

export type IntakeAnswers = {
  name: string;
  phone: string;
  email: string;
  referredBy: string;
  manager: "self" | "pm";
  pmFee: string;
  pmTenure: string;
  bugging: string;
  outsidePl: string;
  anythingElse: string;
  padsplit: "access" | "zip";
};

export type StoredFile = { kind: FileKind; path: string; name: string; size: number };

export type Lead = {
  id: string;
  name: string;
  email: string;
  houses: HouseCount;
  createdAt: string;
  reminderSentAt?: string;
  intakeCompletedAt?: string;
  intake?: IntakeAnswers;
  files?: StoredFile[];
};

const ID_RE = /^[A-Za-z0-9_-]{24}$/;
export const isLeadId = (id: string) => ID_RE.test(id);
export const newLeadId = () => randomBytes(18).toString("base64url");

const storage = () => supabase.storage.from(BUCKET);
const leadPath = (id: string) => `leads/${id}/lead.json`;
export const filesPrefix = (id: string, kind: FileKind) => `leads/${id}/files/${kind}`;

let bucketReady: Promise<void> | null = null;

/** Make sure the private bucket exists (and is private). Runs once per server. */
export function ensureBucket(): Promise<void> {
  bucketReady ??= (async () => {
    const { data, error } = await supabase.storage.getBucket(BUCKET);
    if (error || !data) {
      const created = await supabase.storage.createBucket(BUCKET, {
        public: false,
        fileSizeLimit: MAX_FILE_BYTES,
      });
      // A parallel request may have created it first; that's fine.
      if (created.error && !/exist/i.test(created.error.message)) throw created.error;
    } else if (data.public) {
      const fixed = await supabase.storage.updateBucket(BUCKET, {
        public: false,
        fileSizeLimit: MAX_FILE_BYTES,
      });
      if (fixed.error) throw fixed.error;
    }
  })().catch((err) => {
    bucketReady = null; // retry on the next request
    throw err;
  });
  return bucketReady;
}

export async function saveLead(lead: Lead) {
  await ensureBucket();
  const { error } = await storage().upload(leadPath(lead.id), JSON.stringify(lead, null, 2), {
    contentType: "application/json",
    upsert: true,
  });
  if (error) throw error;
}

export async function getLead(id: string): Promise<Lead | null> {
  if (!isLeadId(id)) return null;
  await ensureBucket();
  const { data, error } = await storage().download(leadPath(id));
  if (error || !data) return null;
  try {
    const lead = JSON.parse(await data.text()) as Lead;
    return lead.id === id ? lead : null;
  } catch {
    return null;
  }
}

/** IDs of every lead folder (for the reminder sweep). */
export async function listLeadIds(): Promise<string[]> {
  await ensureBucket();
  const ids: string[] = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await storage().list("leads", { limit: 1000, offset });
    if (error) throw error;
    for (const item of data ?? []) if (isLeadId(item.name)) ids.push(item.name);
    if (!data || data.length < 1000) break;
  }
  return ids;
}

export function fileExtension(name: string) {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

export const isAllowedFile = (name: string) =>
  (ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(name));

/** A storage path for a new upload: random prefix + a cleaned-up original name. */
export function newFilePath(id: string, kind: FileKind, originalName: string) {
  const ext = fileExtension(originalName);
  const base = originalName
    .replace(/\.[^.]*$/, "")
    .replace(/[^A-Za-z0-9._ -]+/g, "")
    .replace(/\.{2,}/g, ".")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^[.-]+/, "")
    .slice(0, 60) || "file";
  return `${filesPrefix(id, kind)}/${randomBytes(4).toString("hex")}-${base}.${ext}`;
}

/** One-time URL the browser can upload a single file to, straight to Supabase. */
export async function createUploadUrl(path: string) {
  await ensureBucket();
  const { data, error } = await storage().createSignedUploadUrl(path);
  if (error || !data) throw error ?? new Error("No upload URL");
  return data.signedUrl;
}

/** Server-side upload, used as a fallback for small files. */
export async function uploadFile(path: string, body: Buffer, contentType: string) {
  await ensureBucket();
  const { error } = await storage().upload(path, body, { contentType, upsert: false });
  if (error) throw error;
}

/** Files actually present in a lead's folder for one kind: name -> size. */
export async function listFiles(id: string, kind: FileKind) {
  await ensureBucket();
  const { data, error } = await storage().list(filesPrefix(id, kind), { limit: 1000 });
  if (error) throw error;
  const found = new Map<string, number>();
  for (const item of data ?? []) {
    if (item.id) found.set(`${filesPrefix(id, kind)}/${item.name}`, Number(item.metadata?.size ?? 0));
  }
  return found;
}

/** Signed, expiring download link for one file. */
export async function downloadUrl(path: string) {
  const { data, error } = await storage().createSignedUrl(path, DOWNLOAD_LINK_SECONDS, {
    download: true,
  });
  if (error || !data) throw error ?? new Error("No download URL");
  return data.signedUrl;
}
