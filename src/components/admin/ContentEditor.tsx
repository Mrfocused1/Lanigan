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

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[10px] border border-line bg-card p-5 md:p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

/** Editable list of plain strings — add / edit / remove. */
function StringListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => { const a = [...items]; a[i] = e.target.value; onChange(a); }}
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 rounded-full border border-line px-2.5 text-xs text-muted hover:border-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
      >
        + Add
      </button>
    </div>
  );
}

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [section, setSection] = useState("hero");

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
          whyChooseUs: { ...DEFAULT_CONTENT.whyChooseUs, ...(stored.whyChooseUs ?? {}) },
          guarantee: { ...DEFAULT_CONTENT.guarantee, ...(stored.guarantee ?? {}) },
          beforeAfter: {
            ...DEFAULT_CONTENT.beforeAfter,
            ...(stored.beforeAfter ?? {}),
            items: stored.beforeAfter?.items?.length ? stored.beforeAfter.items : DEFAULT_CONTENT.beforeAfter.items,
          },
          testimonials: {
            ...DEFAULT_CONTENT.testimonials,
            ...(stored.testimonials ?? {}),
            items: stored.testimonials?.items?.length ? stored.testimonials.items : DEFAULT_CONTENT.testimonials.items,
          },
          process: stored.process?.length ? stored.process : DEFAULT_CONTENT.process,
          cta: { ...DEFAULT_CONTENT.cta, ...(stored.cta ?? {}) },
          footer: { ...DEFAULT_CONTENT.footer, ...(stored.footer ?? {}) },
          faq: {
            ...DEFAULT_CONTENT.faq,
            ...(stored.faq ?? {}),
            items: stored.faq?.items?.length ? stored.faq.items : DEFAULT_CONTENT.faq.items,
          },
          areasPage: {
            ...DEFAULT_CONTENT.areasPage,
            ...(stored.areasPage ?? {}),
            areas: stored.areasPage?.areas?.length ? stored.areasPage.areas : DEFAULT_CONTENT.areasPage.areas,
          },
          roofingPage: {
            ...DEFAULT_CONTENT.roofingPage,
            ...(stored.roofingPage ?? {}),
            services: stored.roofingPage?.services?.length ? stored.roofingPage.services : DEFAULT_CONTENT.roofingPage.services,
          },
          privacyPage: {
            ...DEFAULT_CONTENT.privacyPage,
            ...(stored.privacyPage ?? {}),
            sections: stored.privacyPage?.sections?.length ? stored.privacyPage.sections : DEFAULT_CONTENT.privacyPage.sections,
          },
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

  const SECTIONS = [
    { key: "business", label: "Business details" },
    { key: "hero", label: "Hero" },
    { key: "about", label: "About" },
    { key: "stats", label: "Stats" },
    { key: "services", label: "Services" },
    { key: "why", label: "Why choose us" },
    { key: "guarantee", label: "Guarantee" },
    { key: "beforeafter", label: "Before & after" },
    { key: "testimonials", label: "Reviews" },
    { key: "process", label: "How it works" },
    { key: "cta", label: "Final CTA" },
    { key: "footer", label: "Footer" },
    { key: "faq", label: "FAQ page" },
    { key: "areas", label: "Areas page" },
    { key: "roofing", label: "Roofing page" },
    { key: "privacy", label: "Privacy page" },
  ] as const;

  return (
    <div className="grid gap-6 pb-24 lg:grid-cols-[200px_1fr]">
      {/* Section nav */}
      <nav className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`shrink-0 rounded-[6px] px-3 py-2 text-left text-sm transition ${
                section === s.key ? "bg-ink text-paper" : "text-muted hover:bg-paper-2"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="space-y-5">
        {section === "business" && (
          <Card title="Business details">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Phone" value={content.settings.phone} onChange={(v) => set("settings", { ...content.settings, phone: v })} />
              <Text label="WhatsApp number (digits, country code, no +)" value={content.settings.whatsapp} onChange={(v) => set("settings", { ...content.settings, whatsapp: v })} />
              <Text label="Email" value={content.settings.email} onChange={(v) => set("settings", { ...content.settings, email: v })} />
              <Text label="Instagram URL" value={content.settings.instagram} onChange={(v) => set("settings", { ...content.settings, instagram: v })} />
              <Text label="Instagram handle" value={content.settings.instagramHandle} onChange={(v) => set("settings", { ...content.settings, instagramHandle: v })} />
              <Text label="Facebook URL" value={content.settings.facebook} onChange={(v) => set("settings", { ...content.settings, facebook: v })} />
              <Text label="Service area" value={content.settings.serviceArea} onChange={(v) => set("settings", { ...content.settings, serviceArea: v })} />
              <Text label="Hours" value={content.settings.hours} onChange={(v) => set("settings", { ...content.settings, hours: v })} />
              <Text label="Location" value={content.settings.location} onChange={(v) => set("settings", { ...content.settings, location: v })} />
              <Text label="Legal name" value={content.settings.legalName} onChange={(v) => set("settings", { ...content.settings, legalName: v })} />
            </div>
          </Card>
        )}

        {section === "hero" && (
          <Card title="Hero" description="The full-bleed banner at the top of the homepage.">
            <div className="grid grid-cols-3 gap-4">
              <Text label="Line 1" value={content.hero.line1} onChange={(v) => set("hero", { ...content.hero, line1: v })} />
              <Text label="Line 2" value={content.hero.line2} onChange={(v) => set("hero", { ...content.hero, line2: v })} />
              <Text label="Line 3 (green)" value={content.hero.line3} onChange={(v) => set("hero", { ...content.hero, line3: v })} />
            </div>
            <Text label="Subtext" area value={content.hero.subtext} onChange={(v) => set("hero", { ...content.hero, subtext: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Text label="Primary button label" value={content.hero.ctaLabel} onChange={(v) => set("hero", { ...content.hero, ctaLabel: v })} />
              <Text label="Secondary button label" value={content.hero.ctaSecondaryLabel} onChange={(v) => set("hero", { ...content.hero, ctaSecondaryLabel: v })} />
            </div>
            <ImageField label="Hero image" value={content.hero.image} onChange={(v) => set("hero", { ...content.hero, image: v })} />
          </Card>
        )}

        {section === "about" && (
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
        )}

        {section === "stats" && (
          <Card title="Stats" description="The stat tiles under the about section.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((s, i) => (
                <div key={i} className="space-y-2 rounded-[6px] border border-line p-3">
                  <Text label="Value" value={s.value} onChange={(v) => { const a = [...content.stats]; a[i] = { ...a[i], value: v }; set("stats", a); }} />
                  <Text label="Label" value={s.label} onChange={(v) => { const a = [...content.stats]; a[i] = { ...a[i], label: v }; set("stats", a); }} />
                  <button
                    type="button"
                    onClick={() => set("stats", content.stats.filter((_, j) => j !== i))}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => set("stats", [...content.stats, { value: "", label: "" }])}
              className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
            >
              + Add stat
            </button>
          </Card>
        )}

        {section === "services" && (
          <Card title="Services" description="Shown on the homepage and /services, each expands to show scope tags.">
            <div className="grid gap-4 md:grid-cols-2">
              {content.services.map((s, i) => (
                <div key={s.slug || i} className="space-y-3 rounded-[6px] border border-line p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Text label="Title" value={s.title} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], title: v }; set("services", a); }} />
                    <Text
                      label="Slug (URL-safe id)"
                      value={s.slug}
                      onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], slug: v.toLowerCase().replace(/[^a-z0-9-]+/g, "-") }; set("services", a); }}
                    />
                  </div>
                  <Text label="Short" value={s.short} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], short: v }; set("services", a); }} />
                  <Text label="Description" area value={s.description} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], description: v }; set("services", a); }} />
                  <Text label="Scope (comma separated)" value={s.scope.join(", ")} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], scope: v.split(",").map((x) => x.trim()).filter(Boolean) }; set("services", a); }} />
                  <ImageField label="Hover image" value={s.image} onChange={(v) => { const a = [...content.services]; a[i] = { ...a[i], image: v }; set("services", a); }} />
                  <button
                    type="button"
                    onClick={() => set("services", content.services.filter((_, j) => j !== i))}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove service
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => set("services", [...content.services, { slug: `service-${content.services.length + 1}`, title: "New service", short: "", description: "", scope: [], image: "" }])}
              className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
            >
              + Add service
            </button>
          </Card>
        )}

        {section === "why" && (
          <Card title="Why choose us" description="Checklist section on the homepage.">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.whyChooseUs.heading} onChange={(v) => set("whyChooseUs", { ...content.whyChooseUs, heading: v })} />
              <Text label="Heading accent (green)" value={content.whyChooseUs.accent} onChange={(v) => set("whyChooseUs", { ...content.whyChooseUs, accent: v })} />
            </div>
            <StringListEditor label="Points" items={content.whyChooseUs.points} onChange={(v) => set("whyChooseUs", { ...content.whyChooseUs, points: v })} />
          </Card>
        )}

        {section === "guarantee" && (
          <Card title="Workmanship guarantee">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.guarantee.heading} onChange={(v) => set("guarantee", { ...content.guarantee, heading: v })} />
              <Text label="Heading accent (green)" value={content.guarantee.accent} onChange={(v) => set("guarantee", { ...content.guarantee, accent: v })} />
            </div>
            <Text label="Body" area value={content.guarantee.body} onChange={(v) => set("guarantee", { ...content.guarantee, body: v })} />
          </Card>
        )}

        {section === "beforeafter" && (
          <Card title="Before & after slider" description="Drag-to-compare images on the homepage.">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.beforeAfter.heading} onChange={(v) => set("beforeAfter", { ...content.beforeAfter, heading: v })} />
              <Text label="Heading accent (green)" value={content.beforeAfter.accent} onChange={(v) => set("beforeAfter", { ...content.beforeAfter, accent: v })} />
            </div>
            <div className="space-y-4">
              {content.beforeAfter.items.map((it, i) => (
                <div key={i} className="space-y-3 rounded-[6px] border border-line p-4">
                  <Text label="Label" value={it.label} onChange={(v) => { const a = [...content.beforeAfter.items]; a[i] = { ...a[i], label: v }; set("beforeAfter", { ...content.beforeAfter, items: a }); }} />
                  <div className="grid grid-cols-2 gap-4">
                    <ImageField label="Before image" value={it.before} onChange={(v) => { const a = [...content.beforeAfter.items]; a[i] = { ...a[i], before: v }; set("beforeAfter", { ...content.beforeAfter, items: a }); }} />
                    <ImageField label="After image" value={it.after} onChange={(v) => { const a = [...content.beforeAfter.items]; a[i] = { ...a[i], after: v }; set("beforeAfter", { ...content.beforeAfter, items: a }); }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => set("beforeAfter", { ...content.beforeAfter, items: content.beforeAfter.items.filter((_, j) => j !== i) })}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove pair
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("beforeAfter", { ...content.beforeAfter, items: [...content.beforeAfter.items, { before: "", after: "", label: "" }] })}
                className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
              >
                + Add before/after pair
              </button>
            </div>
          </Card>
        )}

        {section === "testimonials" && (
          <Card title="Reviews" description="Customer testimonial cards on the homepage.">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.testimonials.heading} onChange={(v) => set("testimonials", { ...content.testimonials, heading: v })} />
              <Text label="Heading accent (green)" value={content.testimonials.accent} onChange={(v) => set("testimonials", { ...content.testimonials, accent: v })} />
            </div>
            <div className="space-y-4">
              {content.testimonials.items.map((t, i) => (
                <div key={i} className="space-y-3 rounded-[6px] border border-line p-4">
                  <Text label="Quote" area value={t.quote} onChange={(v) => { const a = [...content.testimonials.items]; a[i] = { ...a[i], quote: v }; set("testimonials", { ...content.testimonials, items: a }); }} />
                  <Text label="Reviewer name / source" value={t.name} onChange={(v) => { const a = [...content.testimonials.items]; a[i] = { ...a[i], name: v }; set("testimonials", { ...content.testimonials, items: a }); }} />
                  <button
                    type="button"
                    onClick={() => set("testimonials", { ...content.testimonials, items: content.testimonials.items.filter((_, j) => j !== i) })}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove review
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("testimonials", { ...content.testimonials, items: [...content.testimonials.items, { quote: "", name: "" }] })}
                className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
              >
                + Add review
              </button>
            </div>
          </Card>
        )}

        {section === "process" && (
          <Card title="How it works" description="Step-by-step process shown on the homepage and /services.">
            <div className="grid gap-4 md:grid-cols-2">
              {content.process.map((p, i) => (
                <div key={i} className="space-y-2 rounded-[6px] border border-line p-3">
                  <Text label="Number" value={p.no} onChange={(v) => { const a = [...content.process]; a[i] = { ...a[i], no: v }; set("process", a); }} />
                  <Text label="Title" value={p.title} onChange={(v) => { const a = [...content.process]; a[i] = { ...a[i], title: v }; set("process", a); }} />
                  <Text label="Body" area value={p.body} onChange={(v) => { const a = [...content.process]; a[i] = { ...a[i], body: v }; set("process", a); }} />
                  <button
                    type="button"
                    onClick={() => set("process", content.process.filter((_, j) => j !== i))}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove step
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => set("process", [...content.process, { no: String(content.process.length + 1).padStart(2, "0"), title: "", body: "" }])}
              className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
            >
              + Add step
            </button>
          </Card>
        )}

        {section === "cta" && (
          <Card title="Final CTA" description="Shown in the footer, on every page.">
            <Text label="Eyebrow" value={content.cta.eyebrow} onChange={(v) => set("cta", { ...content.cta, eyebrow: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.cta.heading} onChange={(v) => set("cta", { ...content.cta, heading: v })} />
              <Text label="Heading accent" value={content.cta.accent} onChange={(v) => set("cta", { ...content.cta, accent: v })} />
            </div>
            <Text label="Body" value={content.cta.body} onChange={(v) => set("cta", { ...content.cta, body: v })} />
          </Card>
        )}

        {section === "footer" && (
          <Card title="Footer" description="Areas preview shown in the footer's Areas Covered column.">
            <StringListEditor label="Areas (footer preview)" items={content.footer.areas} onChange={(v) => set("footer", { ...content.footer, areas: v })} />
          </Card>
        )}

        {section === "faq" && (
          <Card title="FAQ page">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.faq.heading} onChange={(v) => set("faq", { ...content.faq, heading: v })} />
              <Text label="Heading accent" value={content.faq.accent} onChange={(v) => set("faq", { ...content.faq, accent: v })} />
            </div>
            <Text label="Intro" area value={content.faq.intro} onChange={(v) => set("faq", { ...content.faq, intro: v })} />
            <div className="space-y-4">
              {content.faq.items.map((f, i) => (
                <div key={i} className="space-y-3 rounded-[6px] border border-line p-4">
                  <Text label="Question" value={f.q} onChange={(v) => { const a = [...content.faq.items]; a[i] = { ...a[i], q: v }; set("faq", { ...content.faq, items: a }); }} />
                  <Text label="Answer" area value={f.a} onChange={(v) => { const a = [...content.faq.items]; a[i] = { ...a[i], a: v }; set("faq", { ...content.faq, items: a }); }} />
                  <button
                    type="button"
                    onClick={() => set("faq", { ...content.faq, items: content.faq.items.filter((_, j) => j !== i) })}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove question
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("faq", { ...content.faq, items: [...content.faq.items, { q: "", a: "" }] })}
                className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
              >
                + Add question
              </button>
            </div>
          </Card>
        )}

        {section === "areas" && (
          <Card title="Areas covered page">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.areasPage.heading} onChange={(v) => set("areasPage", { ...content.areasPage, heading: v })} />
              <Text label="Heading accent" value={content.areasPage.accent} onChange={(v) => set("areasPage", { ...content.areasPage, accent: v })} />
            </div>
            <Text label="Intro" area value={content.areasPage.intro} onChange={(v) => set("areasPage", { ...content.areasPage, intro: v })} />
            <StringListEditor label="Areas" items={content.areasPage.areas} onChange={(v) => set("areasPage", { ...content.areasPage, areas: v })} />
          </Card>
        )}

        {section === "roofing" && (
          <Card title="Roofing page">
            <div className="grid grid-cols-2 gap-4">
              <Text label="Heading" value={content.roofingPage.heading} onChange={(v) => set("roofingPage", { ...content.roofingPage, heading: v })} />
              <Text label="Heading accent" value={content.roofingPage.accent} onChange={(v) => set("roofingPage", { ...content.roofingPage, accent: v })} />
            </div>
            <Text label="Intro" area value={content.roofingPage.intro} onChange={(v) => set("roofingPage", { ...content.roofingPage, intro: v })} />
            <StringListEditor label="Service chips" items={content.roofingPage.services} onChange={(v) => set("roofingPage", { ...content.roofingPage, services: v })} />
          </Card>
        )}

        {section === "privacy" && (
          <Card title="Privacy policy page">
            <Text label="Intro" area value={content.privacyPage.intro} onChange={(v) => set("privacyPage", { ...content.privacyPage, intro: v })} />
            <div className="space-y-4">
              {content.privacyPage.sections.map((s, i) => (
                <div key={i} className="space-y-3 rounded-[6px] border border-line p-4">
                  <Text label="Section title" value={s.title} onChange={(v) => { const a = [...content.privacyPage.sections]; a[i] = { ...a[i], title: v }; set("privacyPage", { ...content.privacyPage, sections: a }); }} />
                  <Text label="Body" area value={s.body} onChange={(v) => { const a = [...content.privacyPage.sections]; a[i] = { ...a[i], body: v }; set("privacyPage", { ...content.privacyPage, sections: a }); }} />
                  <button
                    type="button"
                    onClick={() => set("privacyPage", { ...content.privacyPage, sections: content.privacyPage.sections.filter((_, j) => j !== i) })}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove section
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("privacyPage", { ...content.privacyPage, sections: [...content.privacyPage.sections, { title: "", body: "" }] })}
                className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink hover:border-ink"
              >
                + Add section
              </button>
            </div>
          </Card>
        )}
      </div>

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
