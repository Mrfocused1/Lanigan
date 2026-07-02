"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";
import CRM from "./CRM";
import ContentEditor from "./ContentEditor";
import PortfolioManager from "./PortfolioManager";

type Tab = "enquiries" | "content" | "portfolio";
const TABS: { key: Tab; label: string }[] = [
  { key: "enquiries", label: "Enquiries" },
  { key: "content", label: "Content" },
  { key: "portfolio", label: "Portfolio" },
];

export default function AdminDashboard({ session }: { session: Session }) {
  const [tab, setTab] = useState<Tab>("enquiries");

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-9 w-auto text-brand" />
            <div className="border-l border-line pl-3 leading-none">
              <div className="font-display text-sm font-semibold text-ink">Lanigan CMS</div>
              <div className="text-[11px] text-faint">{session.user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn btn-ghost !py-2.5 !text-xs">
              View site ↗
            </Link>
            <button onClick={() => supabase.auth.signOut()} className="btn btn-primary !py-2.5 !text-xs">
              Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-[1400px] gap-1 px-5 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${
                tab === t.key ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {tab === "enquiries" && <CRM />}
      {tab === "content" && (
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          <ContentEditor />
        </div>
      )}
      {tab === "portfolio" && (
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          <PortfolioManager />
        </div>
      )}
    </div>
  );
}
