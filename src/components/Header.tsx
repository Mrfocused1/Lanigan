"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav, site } from "@/data/site";
import Logo from "./Logo";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useGSAP(
    () => {
      gsap.from(headerRef.current, { y: -80, autoAlpha: 0, duration: 1, ease: "power3.out", delay: 0.1 });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Full-screen overlay menu — same dynamic animation on desktop and mobile
  useGSAP(
    () => {
      const el = overlayRef.current!;
      if (open) {
        gsap.set(el, { display: "flex" });
        const tl = gsap.timeline();
        tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out" });
        tl.fromTo(
          el.querySelectorAll(".m-link .inner"),
          { yPercent: 120 },
          { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "power4.out" },
          "-=0.2"
        );
        tl.fromTo(
          el.querySelectorAll(".m-meta"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          "-=0.45"
        );
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(el, { display: "none" }),
        });
        document.body.style.overflow = "";
      }
    },
    { dependencies: [open] }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <span className={open ? "text-paper [&_*]:!text-paper" : ""}>
            <Logo />
          </span>

          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className={`btn hidden sm:inline-flex ${
                open ? "bg-paper text-ink hover:bg-lime" : "btn-primary"
              }`}
            >
              Get a quote
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`group flex items-center gap-3 ${open ? "text-paper" : "text-ink"}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="hidden text-sm font-semibold uppercase tracking-wider sm:inline">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px]">
                <span
                  className={`h-[2px] w-6 bg-current transition-all duration-300 ${
                    open ? "translate-y-[8px] rotate-45" : "group-hover:w-7"
                  }`}
                />
                <span className={`h-[2px] w-6 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-[2px] w-6 bg-current transition-all duration-300 ${
                    open ? "-translate-y-[8px] -rotate-45" : "group-hover:w-7"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-ink px-5 pb-10 pt-28 text-paper md:px-10 md:pb-14 md:pt-32"
      >
        <nav className="flex flex-col">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} className="m-link group block w-fit">
              <span className="block overflow-hidden">
                <span className="inner font-display flex items-baseline gap-4 text-[15vw] font-semibold leading-[1.05] tracking-tight transition-colors duration-300 group-hover:text-lime md:text-[7vw] md:leading-[1.02]">
                  <span className="text-[0.28em] font-medium text-faint">0{i + 1}</span>
                  {n.label}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="m-meta grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
          <div>
            <div className="eyebrow !text-faint">Call</div>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-sweep mt-1 block text-base text-paper">
              {site.phone}
            </a>
          </div>
          <div>
            <div className="eyebrow !text-faint">Email</div>
            <a href={`mailto:${site.email}`} className="link-sweep mt-1 block text-base text-paper">
              {site.email}
            </a>
          </div>
          <div>
            <div className="eyebrow !text-faint">Follow</div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-sweep mt-1 block text-base text-lime"
            >
              {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
