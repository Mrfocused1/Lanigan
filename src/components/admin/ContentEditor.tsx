"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";
import ImageField from "./ImageField";

const inputCls =
  "w-full rounded-[5px] border border-line bg-card px-3 py-2 text-sm text-ink outline-none focus:border-brand";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-faint";

function Text({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${inputCls} resize-y`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[10px] border border-line bg-card p-5 md:p-6">
      <h3 className="font-display mb-5 text-lg font-semibold text-ink">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    supabase
      .from("lanigan_site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        const stored = (data?.data as Partial<SiteContent>) ?? {};
        setContent({
          settings: { ...DEFAULT_CONTENT.settings, ...(stored.settings ?? {}) },
          hero: { ...DEFAULT_CONTENT.hero, ...(stored.hero ?? {}) },
          about: { ...DEFAULT_CONTENT.about, ...(stored.about ?? {}) },
          stats: stored.stats?.length ? stored.stats : DEFAULT_CONTENT.stats,
          services: stored.services?.length ? stored.services : DEFAULT_CONTENT.services,
          process: stored.process?.length ? stored.process : DEFAULT_CONTENT.process,
        });
      });
  }, []);

  if (!content) return <div className="p-10 text-sm text-muted">Loading content…</div>;

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setContent((c) => (c ? { ...c, [key]: value } : c));

  async function save() {
    if (!content) return;
    setStatus("saving");
    const { error } = await supabase
      .from("lanigan_site_content")
      .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });
    setStatus(error ? "error" : "saved");
    if (!error) setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="space-y-5 pb-24">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Business details">
          <div className="grid grid-cols-2 gap-4">
            <Text label="Phone" value={content.settings.phone} onChange={(v) => set("settings", { ...content.settings, phone: v })} />
            <Text label="Email" value={content.settings.email} onChange={(v) => set("settings", { ...content.settings, email: v })} />
            <Text label="Instagram URL" value={content.settings.instagram} onChange={(v) => set("settings", { ...content.settings, instagram: v })} />
            <Text label="Instagram handle" value={content.settings.instagramHandle} onChange={(v) => set("settings", { ...content.settings, instagramHandle: v })} />
            <Text label="Service area" value={content.settings.serviceArea} onChange={(v) => set("settings", { ...content.settings, serviceArea: v })} />
            <Text label="Hours" value={content.settings.hours} onChange={(v) => set("settings", { ...content.settings, hours: v })} />
            <Text label="Location" value={content.settings.location} onChange={(v) => set("settings", { ...content.settings, location: v })} />
            <Text label="Legal name" value={content.settings.legalName} onChange={(v) => set("settings", { ...content.settings, legalName: v })} />
          </div>
        </Card>

        <Card title="Hero">
          <div className="grid grid-cols-3 gap-4">
            <Text label="Line 1" value={content.hero.line1} onChange={(v) => set("hero", { ...content.hero, line1: v })} />
            <Text label="Line 2" value={content.hero.line2} onChange={(v) => set("hero", { ...content.hero, line2: v })} />
            <Text label="Line 3 (green)" value={content.hero.line3} onChange={(v) => set("hero", { ...content.hero, line3: v })} />
          </div>
          <Text label="Subtext" area value={content.hero.subtext} onChange={(v) => set("hero", { ...content.hero, subtext: v })} />
          <ImageField label="Hero image" value={content.hero.image} onChange={(v) => set("hero", { ...content.hero, image: v })} />
        </Card>
      </div>

      <Card title="About section">
        <div className="grid grid-cols-2 gap-4">
          <Text label="Heading" value={content.about.heading} onChange={(v) => set("about", { ...content.about, heading: v })} />
          <Text label="Heading accent (green)" value={content.about.accent} onChange={(v) => set("about", { ...content.about, accent: v })} />
        </div>
        {content.about.paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={p}
              onChange={(e) => {
                const paras = [...content.about.paragraphs];
                paras[i] = e.target.value;
                set("about", { ...content.about, paragraphs: paras });
              }}
              rows={3}
              className={`${inputCls} resize-y`}
            />
            <button
              type="button"
              onClick={() => set("about", { ...content.about, paragraphs: content.about.paragraphs.filter((_, j) => j !== i) })}
              className="shrink-0 self-start rounded-full border border-line px-2 py-1 text-xs text-muted hover:border-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set("about", { ...content.about, paragraphs: [...content.about.paragraphs, ""] })}
          className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
        >
          + Add paragraph
        </button>
        <ImageField label="About image" value={content.about.image} onChange={(v) => set("about", { ...content.about, image: v })} />
      </Card>

      <Card title="Stats">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((s, i) => (
            <div key={i} className="space-y-2 rounded-[6px] border border-line p-3">
              <Text label="Value" value={s.value} onChange={(v) => { const a = [...content.stats]; a[i] = { ...a[i], value: v }; set("stats", a); }} />
              <Text label="Label" value={s.label} onChange={(v) => { const a = [...content.stats]; a[i] = { ...a[i], label: v }; set("stats", a); }} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Services">
        <div className="grid gap-4 md:grid-cols-2">
          {content.services.map((s, i) => (
            <div key={s.slug} className="space-y-3 rounded-[6px] border border-line p-4">
              <Text label="Title" value={s.title} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], title: v }; set("services", a); }} />
              <Text label="Short" value={s.short} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], short: v }; set("services", a); }} />
              <Text label="Description" area value={s.description} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], description: v }; set("services", a); }} />
              <Text label="Scope (comma separated)" value={s.scope.join(", ")} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], scope: v.split(",").map((x) => x.trim()).filter(Boolean) }; set("services", a); }} />
              <ImageField label="Hover image" value={s.image} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], image: v }; set("services", a); }} />
            </div>
          ))}
        </div>
      </Card>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4 px-5 py-3 md:px-8">
          {status === "saved" && <span className="text-sm text-brand">✓ Saved — changes are live</span>}
          {status === "error" && <span className="text-sm text-red-600">Save failed</span>}
          <button onClick={save} disabled={status === "saving"} className="btn btn-primary !py-2.5">
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
