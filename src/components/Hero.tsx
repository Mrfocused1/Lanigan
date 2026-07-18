"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { handleHashLinkClick } from "@/lib/hashLink";
import { useContent } from "./ContentProvider";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { hero, settings } = useContent();

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-line .mask-inner",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
      );
      tl.from(".hero-fade", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.7");

      // slow zoom-out on load + parallax on scroll
      gsap.fromTo(".hero-img", { scale: 1.14 }, { scale: 1, duration: 2, ease: "power3.out" });
      gsap.to(".hero-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  const Line = ({ children, accent }: { children: string; accent?: boolean }) => (
    <span className="hero-line block overflow-hidden pb-[0.14em]">
      <span className={`mask-inner block ${accent ? "text-lime" : ""}`} style={{ willChange: "transform" }}>
        {children}
      </span>
    </span>
  );

  return (
    <section ref={root} className="relative min-h-[92svh] w-full overflow-hidden bg-ink">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt="Lanigan Builds — work across North London"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />
      </div>

      {/* Overlaid copy */}
      <div className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-36 md:px-10 md:pb-24">
        <h1 className="h-hero font-display text-paper">
          <Line>{hero.line1}</Line>
          <Line>{hero.line2}</Line>
          <Line accent>{hero.line3}</Line>
        </h1>

        <p className="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-paper/85">{hero.subtext}</p>

        <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="btn bg-paper text-ink hover:bg-lime">
            {hero.ctaLabel}
          </Link>
          <Link
            href="/#about"
            onClick={(e) => handleHashLinkClick(e, "/#about", pathname)}
            className="btn btn-ghost !border-white/35 !text-paper hover:!border-white"
          >
            {hero.ctaSecondaryLabel}
          </Link>
        </div>

        <div className="hero-fade mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-6 text-sm text-paper/70">
          <span>
            <strong className="text-paper">{settings.serviceArea}</strong>
          </span>
          <span>
            Roofing · Carpentry · <span className="text-paper">On-site builds</span>
          </span>
          <span>{settings.hours}</span>
        </div>
      </div>
    </section>
  );
}
