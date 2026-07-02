"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/lib/portfolio";
import Lightbox from "./Lightbox";

export default function WorkGallery({
  projects,
  categories,
  showFilter = true,
  includeAll = true,
  defaultCategory,
  limit,
  videosFirst = false,
}: {
  projects: Project[];
  categories?: string[];
  showFilter?: boolean;
  /** include an "All" tab (off for category-only tab strips) */
  includeAll?: boolean;
  /** start on this category instead of "All" */
  defaultCategory?: string;
  /** cap the number of cards shown */
  limit?: number;
  /** sort video projects to the front */
  videosFirst?: boolean;
}) {
  const [active, setActive] = useState<string>(defaultCategory ?? "All");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let r = active === "All" ? projects : projects.filter((p) => p.category === active);
    if (videosFirst) {
      const hasVideo = (p: Project) => p.media.some((m) => m.type === "video");
      r = [...r].sort((a, b) => Number(hasVideo(b)) - Number(hasVideo(a)));
    }
    if (limit) r = r.slice(0, limit);
    return r;
  }, [active, projects, videosFirst, limit]);

  const filters = useMemo(
    () => (includeAll ? ["All", ...(categories ?? [])] : [...(categories ?? [])]),
    [categories, includeAll]
  );

  // Reveal cards on mount and on every tab change (no ScrollTrigger so cards
  // can never get stuck hidden if positions shift after images load).
  useGSAP(
    () => {
      gsap.fromTo(
        gridRef.current!.querySelectorAll(".work-card"),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }
      );
    },
    { dependencies: [active], scope: gridRef }
  );

  return (
    <>
      {showFilter && filters.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === f
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-ink-soft hover:border-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {filtered.map((p) => {
          return (
            <button
              key={p.shortcode}
              className="work-card group relative block overflow-hidden rounded-[5px] bg-paper-2 text-left"
              onClick={() => setSelected(p)}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* title */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display line-clamp-2 text-sm font-semibold leading-tight text-paper md:text-base">
                    {p.title}
                  </h3>
                  <span className="mt-1.5 inline-flex translate-y-2 items-center gap-2 text-xs text-lime opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    View project →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
