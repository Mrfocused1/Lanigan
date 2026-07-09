"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMedia } from "./ImageField";

type FileEntry = { name: string; url: string; isVideo: boolean; createdAt: string | null };

export default function MediaLibrary() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.storage.from("lanigan-media").list("uploads", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!error && data) {
      setFiles(
        data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => {
            const path = `uploads/${f.name}`;
            const url = supabase.storage.from("lanigan-media").getPublicUrl(path).data.publicUrl;
            return {
              name: f.name,
              url,
              isVideo: /\.(mp4|mov|webm)$/i.test(f.name),
              createdAt: f.created_at ?? null,
            };
          })
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadMedia(file);
      await load();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function del(name: string) {
    if (!confirm(`Delete ${name}? This can't be undone, and anything on the site still referencing this URL will break.`)) return;
    await supabase.storage.from("lanigan-media").remove([`uploads/${name}`]);
    setFiles((f) => f.filter((x) => x.name !== name));
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1500);
  }

  if (loading) return <div className="p-10 text-sm text-muted">Loading media…</div>;

  return (
    <div className="pb-16">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          {files.length} uploaded file{files.length === 1 ? "" : "s"} · copy a URL to paste into any image field
        </p>
        <label className="btn btn-primary !py-2.5 !text-xs cursor-pointer">
          {uploading ? "Uploading…" : "+ Upload media"}
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {files.length === 0 ? (
        <p className="rounded-[8px] border border-dashed border-line p-8 text-center text-sm text-muted">
          No uploads yet. Files you upload from any image field across the CMS (or here) will show up in this
          library so you can reuse or delete them.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {files.map((f) => (
            <div key={f.name} className="group relative overflow-hidden rounded-[6px] border border-line bg-paper-2">
              <div className="relative aspect-square">
                {f.isVideo ? (
                  <video src={f.url} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex items-center justify-between gap-1 border-t border-line bg-card p-2">
                <button onClick={() => copy(f.url)} className="truncate text-[11px] text-muted hover:text-ink" title={f.url}>
                  {copiedUrl === f.url ? "Copied ✓" : "Copy URL"}
                </button>
                <button onClick={() => del(f.name)} className="shrink-0 text-[11px] text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
