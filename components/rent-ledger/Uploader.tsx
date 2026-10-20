"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { readZip, sortFiles, type RawFiles } from "@/lib/rent-ledger/parse";

// Drop the PadSplit zip or the four CSVs. Everything is read here, in the
// browser; the file never leaves the device.

export default function Uploader({
  onFiles,
  compact = false,
}: {
  onFiles: (files: RawFiles, sourceName: string) => void;
  compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(list: FileList | File[]) {
    const files = [...list];
    if (!files.length) return;
    setBusy(true);
    setError(null);
    try {
      const zip = files.find((f) => /\.zip$/i.test(f.name));
      const raw = zip
        ? await readZip(zip)
        : sortFiles(await Promise.all(files.map(async (f) => ({ name: f.name, text: await f.text() }))));
      onFiles(raw, zip?.name ?? files.map((f) => f.name).join(", "));
    } catch {
      setError("We couldn't open that file. Drop the zip PadSplit gave you, or its four CSV files.");
    } finally {
      setBusy(false);
    }
  }

  async function sample() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/samples/rent-ledger-sample.zip");
      onFiles(await readZip(await res.blob()), "Sample export (made-up houses)");
    } catch {
      setError("The sample didn't load. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files);
        }}
        className={cn(
          "cursor-pointer border-2 border-dashed text-center transition-colors",
          compact ? "px-6 py-8" : "px-6 py-14 md:py-20",
          over ? "border-gold bg-gold/[0.06]" : "border-gold/40 bg-white hover:border-gold",
        )}
      >
        <p className="font-heading text-2xl md:text-3xl text-charcoal">
          {busy ? "Reading your export…" : "Drop your PadSplit earnings export here"}
        </p>
        <p className="mt-3 text-sm text-warmgray">
          The zip named <code className="text-charcoal">earning_details_…zip</code>, or its four CSV files. Or click to choose.
        </p>
        <p className="mt-4 text-xs text-warmgray">
          Your file is read in this browser and never uploaded.
        </p>
        <input
          ref={input}
          type="file"
          multiple
          accept=".zip,.csv"
          className="hidden"
          onChange={(e) => e.target.files && handle(e.target.files)}
        />
      </div>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      {!compact && (
        <p className="mt-4 text-sm text-warmgray">
          No export handy?{" "}
          <button type="button" onClick={sample} className="text-gold-dark underline underline-offset-4" disabled={busy}>
            Try with sample data
          </button>
          .
        </p>
      )}
    </div>
  );
}
