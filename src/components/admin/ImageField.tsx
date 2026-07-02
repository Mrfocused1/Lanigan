"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

/** Upload a file to the public storage bucket and return its public URL. */
export async function uploadMedia(file: File): Promise<string> {
  const clean = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `uploads/${Date.now()}-${clean}`;
  const { error } = await supabase.storage.from("lanigan-media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from("lanigan-media").getPublicUrl(path).data.publicUrl;
}

export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const url = await uploadMedia(file);
      onChange(url);
    } catch {
      setErr("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const isVideo = /\.(mp4|mov|webm)$/i.test(value);

  return (
    <div>
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">{label}</div>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[5px] border border-line bg-paper-2">
          {value ? (
            isVideo ? (
              <video src={value} className="h-full w-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="grid h-full w-full place-items-center text-[10px] text-faint">none</span>
          )}
        </div>
        <div className="flex-1">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/media/… or https://…"
            className="w-full rounded-[5px] border border-line bg-card px-3 py-2 text-sm text-ink outline-none focus:border-brand"
          />
          <div className="mt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink disabled:opacity-50"
            >
              {busy ? "Uploading…" : "Upload"}
            </button>
            {err && <span className="text-xs text-red-600">{err}</span>}
          </div>
        </div>
        <input ref={inputRef} type="file" accept="image/*,video/*" onChange={handleFile} className="hidden" />
      </div>
    </div>
  );
}
