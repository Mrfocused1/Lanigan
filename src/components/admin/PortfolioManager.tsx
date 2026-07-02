"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { categories } from "@/lib/portfolio";
import ImageField, { uploadMedia } from "./ImageField";

type MediaItem = { src: string; type: "image" | "video"; poster?: string | null };
type Row = {
  id: string;
  shortcode: string | null;
  title: string;
  caption: string;
  category: string;
  cover: string;
  media: MediaItem[];
  tags: string[];
  featured: boolean;
  hidden: boolean;
  sort_order: number;
};

const inputCls = "w-full rounded-[5px] border border-line bg-card px-3 py-2 text-sm text-ink outline-none focus:border-brand";

export default function PortfolioManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("lanigan_projects").select("*").order("sort_order", { ascending: true });
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function patchLocal(id: string, patch: Partial<Row>) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  async function persist(id: string, patch: Partial<Row>) {
    patchLocal(id, patch);
    await supabase.from("lanigan_projects").update(patch).eq("id", id);
  }

  async function saveRow(row: Row) {
    setSaving(row.id);
    await supabase.from("lanigan_projects").update({
      title: row.title, caption: row.caption, category: row.category,
      cover: row.cover, media: row.media, tags: row.tags,
    }).eq("id", row.id);
    setSaving(null);
    setEditing(null);
  }

  async function move(id: string, dir: -1 | 1) {
    const idx = rows.findIndex((r) => r.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= rows.length) return;
    const a = rows[idx], b = rows[swap];
    const next = [...rows];
    next[idx] = b; next[swap] = a;
    setRows(next);
    await Promise.all([
      supabase.from("lanigan_projects").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("lanigan_projects").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
  }

  async function del(id: string) {
    setRows((r) => r.filter((x) => x.id !== id));
    await supabase.from("lanigan_projects").delete().eq("id", id);
  }

  async function addProject() {
    const order = rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0;
    const { data } = await supabase
      .from("lanigan_projects")
      .insert({ title: "New project", category: categories[0], sort_order: order, media: [], tags: [] })
      .select("*")
      .single();
    if (data) {
      setRows((r) => [...r, data as Row]);
      setEditing((data as Row).id);
    }
  }

  if (loading) return <div className="p-10 text-sm text-muted">Loading projects…</div>;

  return (
    <div className="pb-16">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">{rows.length} projects · drag order with the arrows</p>
        <button onClick={addProject} className="btn btn-primary !py-2.5 !text-xs">+ Add project</button>
      </div>

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={row.id} className="overflow-hidden rounded-[8px] border border-line bg-card">
            <div className="flex items-center gap-3 p-3">
              <div className="flex flex-col">
                <button onClick={() => move(row.id, -1)} disabled={i === 0} className="text-xs text-muted hover:text-ink disabled:opacity-30">▲</button>
                <button onClick={() => move(row.id, 1)} disabled={i === rows.length - 1} className="text-xs text-muted hover:text-ink disabled:opacity-30">▼</button>
              </div>
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[4px] bg-paper-2">
                {row.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.cover} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink">{row.title || "Untitled"}</div>
                <div className="text-xs text-muted">{row.category} · {row.media.length} media</div>
              </div>
              <button
                onClick={() => persist(row.id, { featured: !row.featured })}
                className={`rounded-full border px-2.5 py-1 text-[11px] ${row.featured ? "border-brand bg-brand-tint text-brand" : "border-line text-muted"}`}
              >
                {row.featured ? "★ Featured" : "Feature"}
              </button>
              <button
                onClick={() => persist(row.id, { hidden: !row.hidden })}
                className={`rounded-full border px-2.5 py-1 text-[11px] ${row.hidden ? "border-stone-300 bg-stone-100 text-stone-500" : "border-line text-muted"}`}
              >
                {row.hidden ? "Hidden" : "Visible"}
              </button>
              <button onClick={() => setEditing(editing === row.id ? null : row.id)} className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink">
                {editing === row.id ? "Close" : "Edit"}
              </button>
            </div>

            {editing === row.id && (
              <div className="space-y-4 border-t border-line p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wide text-faint">Title</span>
                    <input value={row.title} onChange={(e) => patchLocal(row.id, { title: e.target.value })} className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wide text-faint">Category</span>
                    <select value={row.category} onChange={(e) => patchLocal(row.id, { category: e.target.value })} className={inputCls}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wide text-faint">Caption</span>
                  <textarea value={row.caption} onChange={(e) => patchLocal(row.id, { caption: e.target.value })} rows={2} className={`${inputCls} resize-y`} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wide text-faint">Tags (comma separated)</span>
                  <input value={row.tags.join(", ")} onChange={(e) => patchLocal(row.id, { tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} className={inputCls} />
                </label>
                <ImageField label="Cover image" value={row.cover} onChange={(v) => patchLocal(row.id, { cover: v })} />

                {/* Media gallery */}
                <div>
                  <div className="mb-1.5 text-xs uppercase tracking-wide text-faint">Gallery ({row.media.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {row.media.map((m, mi) => (
                      <div key={mi} className="relative h-16 w-16 overflow-hidden rounded-[4px] border border-line">
                        {m.type === "video" ? (
                          <video src={m.src} className="h-full w-full object-cover" muted />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.src} alt="" className="h-full w-full object-cover" />
                        )}
                        <button
                          onClick={() => patchLocal(row.id, { media: row.media.filter((_, j) => j !== mi) })}
                          className="absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-ink/80 text-[9px] text-white"
                        >✕</button>
                      </div>
                    ))}
                    <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-[4px] border border-dashed border-line-strong text-xs text-muted hover:border-ink">
                      +
                      <input
                        type="file" accept="image/*,video/*" className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0]; if (!f) return;
                          const url = await uploadMedia(f);
                          const type: MediaItem["type"] = /\.(mp4|mov|webm)$/i.test(f.name) ? "video" : "image";
                          const media = [...row.media, { src: url, type }];
                          patchLocal(row.id, { media, cover: row.cover || url });
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button onClick={() => del(row.id)} className="text-sm text-red-600 hover:underline">Delete project</button>
                  <button onClick={() => saveRow(row)} disabled={saving === row.id} className="btn btn-primary !py-2.5">
                    {saving === row.id ? "Saving…" : "Save project"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
