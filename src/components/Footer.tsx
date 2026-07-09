"use client";

import Link from "next/link";
import { nav } from "@/data/site";
import { useContent } from "./ContentProvider";
import MaskText from "./MaskText";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const { settings, services, cta, footer } = useContent();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        {/* CTA */}
        <div className="border-b border-white/10 pb-16">
          <p className="eyebrow !text-lime">{cta.eyebrow}</p>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,7vw,6.5rem)] font-semibold leading-[0.95]">
            <MaskText text={cta.heading} /> <br />
            <span className="text-faint"><MaskText text={cta.accent} delay={0.15} /></span>
          </h2>
          <p className="mt-6 max-w-md text-paper/80">{cta.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="btn bg-paper text-ink hover:bg-lime hover:text-ink"
            >
              Get a quote →
            </Link>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-ghost !border-white/25 !text-paper">
              {settings.phone}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="py-16">
          <BrandLogo className="h-16 w-auto text-paper" />
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <div>
            <p className="eyebrow !text-faint">Menu</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-sweep text-sm text-paper/90 hover:text-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="link-sweep text-sm text-paper/90 hover:text-paper">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-faint">Services</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href="/services" className="link-sweep text-sm text-paper/90 hover:text-paper">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-faint">Areas covered</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/90">
              {footer.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li>
                <Link href="/areas" className="link-sweep text-lime">
                  See all areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-faint">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/90">
              <li>
                <a href={`mailto:${settings.email}`} className="link-sweep break-all">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-sweep">
                  {settings.phone}
                </a>
              </li>
              <li>{settings.serviceArea}</li>
              <li>
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="link-sweep text-lime">
                  {settings.instagramHandle}
                </a>
              </li>
              <li>
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="link-sweep">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-faint md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {settings.legalName}. All rights reserved.</span>
          <span className="flex items-center gap-6">
            <Link href="/privacy" className="link-sweep">
              Privacy Policy
            </Link>
            <Link href="/admin" className="link-sweep">
              Admin
            </Link>
            <span>Built in London.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
