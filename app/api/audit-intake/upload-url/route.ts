import { NextResponse } from "next/server";
import {
  FILE_KINDS,
  MAX_FILE_BYTES,
  MAX_FILES_PER_KIND,
  createUploadUrl,
  getLead,
  isAllowedFile,
  listFiles,
  newFilePath,
  type FileKind,
} from "@/lib/audit/store";

export const dynamic = "force-dynamic";

// Hands the intake page a one-time URL to upload ONE file straight to the
// private bucket, inside that lead's own folder. Checks the lead exists,
// the file type and size, and a per-kind file cap.
export async function POST(request: Request) {
  let body: { id?: unknown; kind?: unknown; name?: unknown; size?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id : "";
  const kind = body.kind as FileKind;
  const name = typeof body.name === "string" ? body.name.slice(0, 200) : "";
  const size = typeof body.size === "number" ? body.size : -1;

  if (!FILE_KINDS.includes(kind)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  if (!isAllowedFile(name)) {
    return NextResponse.json({ error: `${name || "That file"}: only PDF, Excel (XLSX, XLS), CSV or ZIP files.` }, { status: 400 });
  }
  if (size <= 0 || size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: `${name} is larger than 50 MB. Split it up, or reply to my email and I'll help.` }, { status: 400 });
  }

  const lead = await getLead(id);
  if (!lead) return NextResponse.json({ error: "This intake link isn't valid." }, { status: 404 });

  try {
    if ((await listFiles(id, kind)).size >= MAX_FILES_PER_KIND) {
      return NextResponse.json({ error: "That's the most files this section takes. Reply to my email with any others." }, { status: 400 });
    }
    const path = newFilePath(id, kind, name);
    return NextResponse.json({ path, url: await createUploadUrl(path) });
  } catch (err) {
    console.error("[audit-intake] upload-url failed", err);
    return NextResponse.json({ error: "Upload isn't available right now. Please try again." }, { status: 502 });
  }
}
