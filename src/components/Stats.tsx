"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "./ContentProvider";

function parse(value: string) {
  const hasDigits = /\d/.test(value);
  const num = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const prefix = value.match(/^\D*/)?.[0] ?? "";
  const suffix = value.match(/\D*$/)?.[0] ?? "";
  return { hasDigits, num, prefix, suffix };
}

export default function Stats() {
  const { stats } = useContent();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current!.querySelectorAll(".stat");
      gsap.from(items, {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      gsap.from(ref.current!.querySelectorAll(".stat-bar"), {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });

      ref.current!.querySelectorAll<HTMLElement>(".stat-num[data-num]").forEach((el) => {
        const target = Number(el.dataset.num || "0");
        if (!target) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-4"
    >
      {stats.map((s) => {
        const { hasDigits, num, prefix, suffix } = parse(s.value);
        return (
          <div
            key={s.label}
            className="stat group relative bg-card p-7 transition-colors duration-300 hover:bg-paper-2/60 md:p-9"
          >
            <div className="stat-bar mb-6 h-[3px] w-9 rounded-full bg-brand transition-all duration-300 group-hover:w-14" />
            <div className="font-display flex items-end text-4xl font-semibold leading-none text-ink md:text-5xl">
              {hasDigits ? (
                <>
                  <span>{prefix}</span>
                  <span className="stat-num" data-num={num}>
                    {num}
                  </span>
                  <span className="text-brand">{suffix}</span>
                </>
              ) : (
                <span className="text-brand">{s.value}</span>
              )}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
