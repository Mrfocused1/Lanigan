"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav } from "@/data/site";
import { useContent } from "./ContentProvider";
import Logo from "./Logo";

const menuImages: Record<string, string> = {
  "/": "/media/C8aLy3VILak_slide1.jpg",
  "/portfolio": "/media/DVy6lxRDcmf_thumb.jpg",
  "/services": "/media/C0ecESxouna_slide1.jpg",
  "/#about": "/media/Crsn4JxIJRK_slide1.jpg",
  "/contact": "/media/Ck1TTq7oBWK_slide1.jpg",
};

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuHover, setMenuHover] = useState<string | null>(null);
  const pathname = usePathname();
  const { settings } = useContent();

  // The homepage hero is a dark full-bleed image — use light header styling over it.
  const lightHeader = open || (pathname === "/" && !scrolled);

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

  useEffect(() => {
    if (!open) setMenuHover(null);
  }, [open]);

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
          <span className={lightHeader ? "text-paper [&_*]:!text-paper" : ""}>
            <Logo />
          </span>

          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className={`btn hidden sm:inline-flex ${
                lightHeader ? "bg-paper text-ink hover:bg-lime" : "btn-primary"
              }`}
            >
              Get a quote
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`group flex items-center gap-3 ${lightHeader ? "text-paper" : "text-ink"}`}
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
        <nav
          className="flex flex-col"
          onMouseLeave={() => setMenuHover(null)}
        >
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="m-link group block w-fit"
              onMouseEnter={() => setMenuHover(n.href)}
            >
              <span className="block overflow-hidden">
                <span
                  className={`inner font-display flex items-baseline gap-4 text-[15vw] font-semibold leading-[1.05] tracking-tight transition-colors duration-300 md:text-[7vw] md:leading-[1.02] ${
                    menuHover && menuHover !== n.href ? "lg:text-white/25" : ""
                  } group-hover:text-lime`}
                >
                  <span className="text-[0.28em] font-medium text-faint">0{i + 1}</span>
                  {n.label}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Hover image preview (desktop) */}
        <div
          className={`pointer-events-none absolute right-[6%] top-1/2 hidden aspect-[3/4] w-[24vw] max-w-[360px] -translate-y-1/2 overflow-hidden rounded-[10px] shadow-2xl transition-all duration-500 ease-out lg:block ${
            menuHover ? "opacity-100 scale-100" : "scale-95 opacity-0"
          }`}
          aria-hidden="true"
        >
          {nav.map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={n.href}
              src={menuImages[n.href] || menuImages["/"]}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                menuHover === n.href ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        <div className="m-meta grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
          <div>
            <div className="eyebrow !text-faint">Call</div>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-sweep mt-1 block text-base text-paper">
              {settings.phone}
            </a>
          </div>
          <div>
            <div className="eyebrow !text-faint">Email</div>
            <a href={`mailto:${settings.email}`} className="link-sweep mt-1 block text-base text-paper">
              {settings.email}
            </a>
          </div>
          <div>
            <div className="eyebrow !text-faint">Follow</div>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-sweep mt-1 block text-base text-lime"
            >
              {settings.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
