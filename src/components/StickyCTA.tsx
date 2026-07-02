"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";

export default function StickyCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 90,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 1.1,
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:inset-x-auto sm:right-5 sm:justify-end"
    >
      <div className="flex w-full max-w-sm gap-2 rounded-full border border-line bg-card/90 p-1.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] backdrop-blur-md sm:w-auto">
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:flex-none"
          aria-label={`Call Lanigan Builds on ${site.phone}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1L6.6 10.8z"
              fill="currentColor"
            />
          </svg>
          Call now
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink-soft sm:flex-none"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
}
