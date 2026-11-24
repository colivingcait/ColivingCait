import { NextResponse } from "next/server";
import { fileExtension, getLead, isLeadId, uploadFile } from "@/lib/audit/store";

export const dynamic = "force-dynamic";

// Backup upload path for small files: if the browser can't upload straight
// to storage, it sends the file here (Vercel caps request bodies at ~4.5 MB)
// along with the path /upload-url issued, and the server stores it.
const MAX_PROXY_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  csv: "text/csv",
  zip: "application/zip",
};

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const id = String(form.get("id") ?? "");
  const path = String(form.get("path") ?? "");
  const file = form.get("file");
  if (!isLeadId(id) || !(file instanceof Blob)) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  // Only paths /upload-url hands out: this lead's own files folder.
  const ok = new RegExp(`^leads/${id}/files/(pnl|outside|padsplit)/[0-9a-f]{8}-[A-Za-z0-9._-]+\\.(pdf|xlsx|xls|csv|zip)$`).test(path);
  if (!ok || file.size > MAX_PROXY_BYTES) return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 400 });
  if (!(await getLead(id))) return NextResponse.json({ error: "This intake link isn't valid." }, { status: 404 });

  try {
    await uploadFile(path, Buffer.from(await file.arrayBuffer()), TYPES[fileExtension(path)]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[audit-intake] proxy upload failed", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
