"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { processSteps } from "@/data/site";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll(".step"), {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 70%", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      <div className="process-line mb-12 hidden h-px w-full bg-brand md:block" />
      <div className="grid gap-px md:grid-cols-4">
        {processSteps.map((s) => (
          <div key={s.no} className="step">
            <div className="font-display text-sm text-brand">{s.no}</div>
            <h3 className="font-display mt-4 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
