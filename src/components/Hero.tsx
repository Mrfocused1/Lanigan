"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "./ContentProvider";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const { hero, settings } = useContent();

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // headline lines mask up
      tl.fromTo(
        ".hero-line .mask-inner",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
      );
      tl.from(".hero-fade", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.7");
      tl.fromTo(
        imgWrap.current,
        { autoAlpha: 0, scale: 1.08, y: 30 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.3, ease: "power3.out" },
        "-=1.1"
      );

      // parallax on the hero image
      gsap.to(".hero-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  const Line = ({ children }: { children: string }) => (
    <span className="hero-line block overflow-hidden pb-[0.14em]">
      <span className="mask-inner block" style={{ willChange: "transform" }}>
        {children}
      </span>
    </span>
  );

  return (
    <section ref={root} className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-[1600px] gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 className="h-hero font-display text-ink">
            <Line>{hero.line1}</Line>
            <Line>{hero.line2}</Line>
            <span className="hero-line block overflow-hidden pb-[0.14em]">
              <span className="mask-inner block text-brand" style={{ willChange: "transform" }}>
                {hero.line3}
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-md text-lg leading-relaxed text-muted">
            {hero.subtext}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Start a project →
            </Link>
            <Link href="/portfolio" className="btn btn-ghost">
              View the work
            </Link>
          </div>
        </div>

        {/* Image — sits between copy and details on mobile, tall on the right for desktop */}
        <div ref={imgWrap} className="relative -mx-5 sm:mx-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-square w-full overflow-hidden bg-paper-2 sm:aspect-[4/5] sm:rounded-[8px] lg:aspect-auto lg:h-full">
            <Image
              src={hero.image}
              alt="Lanigan Builds on site in London"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="hero-img object-cover object-[center_72%] lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          </div>
        </div>

        {/* Details */}
        <div className="hero-fade flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6 text-sm text-muted lg:col-start-1 lg:row-start-2">
          <span>
            <strong className="text-ink">{settings.serviceArea}</strong>
          </span>
          <span>
            Roofing · Carpentry · <span className="text-ink">On-site builds</span>
          </span>
          <span>{settings.hours}</span>
        </div>
      </div>
    </section>
  );
}
