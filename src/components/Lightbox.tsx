"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/lib/portfolio";
import { formatDate } from "@/lib/portfolio";

export default function Lightbox({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [project]);

  useEffect(() => {
    if (!project) return;
    const tl = gsap.timeline();
    tl.fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
    tl.fromTo(
      panel.current,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      "-=0.1"
    );
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, project.media.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;
  const media = project.media[index];

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm md:p-8"
      onClick={(e) => {
        if (e.target === overlay.current) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-paper transition hover:bg-white/10"
        aria-label="Close"
      >
        ✕
      </button>

      <div ref={panel} className="grid w-full max-w-6xl gap-6 md:grid-cols-[1fr_320px]">
        {/* Media stage */}
        <div className="relative flex items-center justify-center">
          <div className="relative max-h-[78vh] w-full overflow-hidden rounded-[6px] bg-black">
            {media.type === "video" ? (
              <video
                key={media.src}
                src={media.src}
                poster={media.poster ?? undefined}
                controls
                autoPlay
                playsInline
                className="mx-auto max-h-[78vh] w-auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={media.src}
                src={media.src}
                alt={project.title}
                className="mx-auto max-h-[78vh] w-auto object-contain"
              />
            )}
          </div>

          {project.media.length > 1 && (
            <>
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                disabled={index === 0}
                className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-paper disabled:opacity-0"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(i + 1, project.media.length - 1))}
                disabled={index === project.media.length - 1}
                className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-paper disabled:opacity-0"
                aria-label="Next"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col text-paper">
          <span className="eyebrow !text-lime">{project.category}</span>
          <h3 className="font-display mt-3 text-2xl font-semibold leading-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-faint">{formatDate(project.date)}</p>
          {project.caption && (
            <p className="mt-5 max-h-40 overflow-auto whitespace-pre-line text-sm leading-relaxed text-paper/80">
              {project.caption}
            </p>
          )}

          {project.media.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-14 overflow-hidden rounded-[4px] border-2 transition ${
                    i === index ? "border-lime" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.type === "video" ? m.poster || m.src : m.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {m.type === "video" && (
                    <span className="absolute inset-0 grid place-items-center text-xs text-white">▶</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="mt-auto pt-6 text-xs text-faint">
            {index + 1} / {project.media.length}
          </div>
        </div>
      </div>
    </div>
  );
}
