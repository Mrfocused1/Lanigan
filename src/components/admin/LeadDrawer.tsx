"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Lead, LeadStatus } from "@/lib/supabase";

type StatusDef = { key: LeadStatus; label: string; dot: string; chip: string };

export default function LeadDrawer({
  lead,
  onClose,
  onUpdate,
  onDelete,
  statuses,
}: {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => void;
  onDelete: (id: string) => void;
  statuses: StatusDef[];
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState("");
  const [value, setValue] = useState<string>("");
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes ?? "");
      setValue(lead.value != null ? String(lead.value) : "");
      setConfirmDel(false);
    }
  }, [lead]);

  useEffect(() => {
    if (!lead) return;
    gsap.fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
    gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: "power3.out" });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lead]);

  if (!lead) return null;

  const saveValue = () => {
    const n = value.trim() === "" ? null : Number(value);
    if (n !== lead.value) onUpdate(lead.id, { value: n });
  };
  const saveNotes = () => {
    if (notes !== (lead.notes ?? "")) onUpdate(lead.id, { notes: notes || null });
  };

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlay.current) onClose();
      }}
    >
      <div
        ref={panel}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-paper shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-line p-6">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-faint">
              Lead · {new Date(lead.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </div>
            <h2 className="font-display mt-1 text-2xl font-semibold text-ink">{lead.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink hover:bg-paper-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-7 p-6">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="rounded-[6px] border border-line bg-card p-3 text-center text-sm hover:border-ink">
                📞 Call
              </a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="rounded-[6px] border border-line bg-card p-3 text-center text-sm hover:border-ink">
                ✉ Email
              </a>
            )}
          </div>

          <dl className="space-y-3 text-sm">
            {[
              ["Email", lead.email],
              ["Phone", lead.phone],
              ["Service", lead.service],
              ["Postcode", lead.postcode],
              ["Budget", lead.budget],
              ["Source", lead.source],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line pb-2">
                <dt className="text-faint">{k}</dt>
                <dd className="text-right text-ink">{v || "—"}</dd>
              </div>
            ))}
          </dl>

          {lead.message && (
            <div>
              <div className="eyebrow">Message</div>
              <p className="mt-2 whitespace-pre-line rounded-[6px] bg-paper-2 p-4 text-sm leading-relaxed text-ink-soft">
                {lead.message}
              </p>
            </div>
          )}

          {/* Status */}
          <div>
            <div className="eyebrow">Status</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onUpdate(lead.id, { status: s.key })}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
                    lead.status === s.key ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Value */}
          <div>
            <div className="eyebrow">Quote / job value (£)</div>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={saveValue}
              placeholder="0"
              className="mt-2 w-full rounded-[5px] border border-line bg-card px-4 py-3 text-ink outline-none focus:border-brand"
            />
          </div>

          {/* Notes */}
          <div>
            <div className="eyebrow">Internal notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={saveNotes}
              rows={4}
              placeholder="Add a note…"
              className="mt-2 w-full resize-none rounded-[5px] border border-line bg-card px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            />
            <p className="mt-1 text-xs text-faint">Saved automatically.</p>
          </div>

          {/* Delete */}
          <div className="border-t border-line pt-5">
            {confirmDel ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-ink">Delete this lead?</span>
                <button
                  onClick={() => onDelete(lead.id)}
                  className="rounded-full bg-red-600 px-4 py-1.5 text-xs text-white hover:bg-red-700"
                >
                  Yes, delete
                </button>
                <button onClick={() => setConfirmDel(false)} className="text-xs text-muted hover:text-ink">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirmDel(true)} className="text-sm text-red-600 hover:underline">
                Delete lead
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
