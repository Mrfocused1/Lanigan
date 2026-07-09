"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "./ContentProvider";

export default function ServicesList({ detailed = false }: { detailed?: boolean }) {
  const { services } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(detailed ? services[0].slug : null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll(".srv-row"), {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      // Mouse-follow image preview (desktop / fine-pointer only)
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        const el = followRef.current!;
        gsap.set(el, { autoAlpha: 0, scale: 0.9, xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          xTo(e.clientX + 120);
          yTo(e.clientY);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });
    },
    { scope: ref }
  );

  // reveal/hide the floating preview as titles are hovered
  useGSAP(
    () => {
      if (!followRef.current) return;
      gsap.to(followRef.current, {
        autoAlpha: hovered ? 1 : 0,
        scale: hovered ? 1 : 0.9,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [hovered] }
  );

  return (
    <div ref={ref} className="relative border-t border-line">
      {/* Floating hover preview */}
      <div
        ref={followRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[280px] w-[220px] overflow-hidden rounded-[6px] shadow-2xl md:block"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {services.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.slug}
            src={s.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              hovered === s.slug ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
      </div>

      {services.map((s, i) => {
        const isOpen = open === s.slug;
        return (
          <div key={s.slug} className="srv-row border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : s.slug)}
              onMouseEnter={() => setHovered(s.slug)}
              onMouseLeave={() => setHovered(null)}
              className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-9"
            >
              <span className="font-display w-10 text-sm text-muted">0{i + 1}</span>
              <span className="font-display flex-1 text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand md:text-4xl">
                {s.title}
              </span>
              <span className="hidden max-w-xs flex-1 text-sm text-muted md:block">{s.short}</span>
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border border-line-strong text-ink transition-all duration-300 group-hover:border-ink ${
                  isOpen ? "rotate-45 bg-ink text-paper" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-9 md:grid-cols-[1fr_1fr] md:pl-[60px]">
                  <p className="max-w-md text-muted">{s.description}</p>
                  <ul className="flex flex-wrap content-start gap-2">
                    {s.scope.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {!detailed && (
        <div className="pt-8">
          <Link href="/services" className="btn btn-ghost">
            All services →
          </Link>
        </div>
      )}
    </div>
  );
}
