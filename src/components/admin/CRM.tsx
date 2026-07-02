"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { gsap, useGSAP } from "@/lib/gsap";
import { supabase, type Lead, type LeadStatus } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";
import LeadDrawer from "./LeadDrawer";

const STATUSES: { key: LeadStatus; label: string; dot: string; chip: string }[] = [
  { key: "new", label: "New", dot: "bg-blue-500", chip: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "contacted", label: "Contacted", dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "quoted", label: "Quoted", dot: "bg-violet-500", chip: "bg-violet-50 text-violet-700 border-violet-200" },
  { key: "won", label: "Won", dot: "bg-brand", chip: "bg-brand-tint text-brand border-brand/30" },
  { key: "lost", label: "Lost", dot: "bg-stone-400", chip: "bg-stone-100 text-stone-500 border-stone-200" },
];

export const statusMeta = (s: LeadStatus) => STATUSES.find((x) => x.key === s)!;

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export default function CRM({ session }: { session: Session }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Lead | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("lanigan_leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length;
    const sum = (s: LeadStatus) =>
      leads.filter((l) => l.status === s).reduce((a, l) => a + (l.value ?? 0), 0);
    return {
      total: leads.length,
      newCount: count("new"),
      pipeline: sum("quoted") + sum("contacted"),
      won: sum("won"),
    };
  }, [leads]);

  const filtered = useMemo(() => {
    let r = filter === "all" ? leads : leads.filter((l) => l.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          (l.email ?? "").toLowerCase().includes(q) ||
          (l.service ?? "").toLowerCase().includes(q) ||
          (l.postcode ?? "").toLowerCase().includes(q)
      );
    }
    return r;
  }, [leads, filter, query]);

  useGSAP(
    () => {
      if (!statsRef.current) return;
      gsap.from(statsRef.current.querySelectorAll(".stat-card"), {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { dependencies: [loading], scope: statsRef }
  );

  async function updateLead(id: string, patch: Partial<Lead>) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    setActive((a) => (a && a.id === id ? { ...a, ...patch } : a));
    await supabase.from("lanigan_leads").update(patch).eq("id", id);
  }

  async function deleteLead(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setActive(null);
    await supabase.from("lanigan_leads").delete().eq("id", id);
  }

  const cards = [
    { label: "Total leads", value: String(stats.total), sub: "all time" },
    { label: "Needs action", value: String(stats.newCount), sub: "new enquiries" },
    { label: "Open pipeline", value: gbp(stats.pipeline), sub: "quoted + contacted" },
    { label: "Won", value: gbp(stats.won), sub: "value delivered" },
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-9 w-auto text-brand" />
            <div className="border-l border-line pl-3 leading-none">
              <div className="font-display text-sm font-semibold text-ink">Lanigan CRM</div>
              <div className="text-[11px] text-faint">{session.user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-ghost !py-2.5 !text-xs">
              View site ↗
            </Link>
            <button onClick={() => supabase.auth.signOut()} className="btn btn-primary !py-2.5 !text-xs">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="font-display mt-2 text-3xl font-semibold text-ink md:text-4xl">Leads</h1>
          </div>
          <button onClick={load} className="btn btn-ghost !py-2.5 !text-xs">
            ↻ Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div ref={statsRef} className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="stat-card rounded-[8px] border border-line bg-card p-5">
              <div className="text-xs uppercase tracking-wide text-faint">{c.label}</div>
              <div className="font-display mt-2 text-3xl font-semibold text-ink">{c.value}</div>
              <div className="mt-1 text-xs text-muted">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline bar */}
        <div className="mt-4 overflow-hidden rounded-[8px] border border-line bg-card p-5">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="uppercase tracking-wide text-faint">Pipeline</span>
            <span>{stats.total} leads</span>
          </div>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-paper-2">
            {STATUSES.map((s) => {
              const n = leads.filter((l) => l.status === s.key).length;
              const pct = stats.total ? (n / stats.total) * 100 : 0;
              return pct > 0 ? (
                <div key={s.key} className={s.dot} style={{ width: `${pct}%` }} title={`${s.label}: ${n}`} />
              ) : null;
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
            {STATUSES.map((s) => (
              <span key={s.key} className="flex items-center gap-1.5 text-muted">
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.label} · {leads.filter((l) => l.status === s.key).length}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                filter === "all" ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink"
              }`}
            >
              All · {leads.length}
            </button>
            {STATUSES.map((s) => (
              <button
                key={s.key}
                onClick={() => setFilter(s.key)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition ${
                  filter === s.key ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, service…"
            className="ml-auto w-full max-w-xs rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-brand md:w-64"
          />
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-[8px] border border-line bg-card">
          <div className="hidden grid-cols-[1.4fr_1.4fr_1fr_0.9fr_0.8fr_0.8fr] gap-4 border-b border-line px-5 py-3 text-[11px] uppercase tracking-wide text-faint md:grid">
            <span>Name</span>
            <span>Contact</span>
            <span>Service</span>
            <span>Status</span>
            <span>Value</span>
            <span>Date</span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-muted">Loading leads…</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted">No leads match.</div>
          ) : (
            filtered.map((l) => {
              const m = statusMeta(l.status);
              return (
                <button
                  key={l.id}
                  onClick={() => setActive(l)}
                  className="grid w-full grid-cols-1 gap-1 border-b border-line px-5 py-4 text-left transition last:border-0 hover:bg-paper-2/60 md:grid-cols-[1.4fr_1.4fr_1fr_0.9fr_0.8fr_0.8fr] md:items-center md:gap-4"
                >
                  <span className="font-medium text-ink">{l.name}</span>
                  <span className="truncate text-sm text-muted">{l.email || l.phone || "—"}</span>
                  <span className="text-sm text-muted">{l.service || "—"}</span>
                  <span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${m.chip}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                      {m.label}
                    </span>
                  </span>
                  <span className="text-sm text-ink">{l.value ? gbp(l.value) : "—"}</span>
                  <span className="text-sm text-muted">
                    {new Date(l.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <LeadDrawer
        lead={active}
        onClose={() => setActive(null)}
        onUpdate={updateLead}
        onDelete={deleteLead}
        statuses={STATUSES}
      />
    </div>
  );
}
