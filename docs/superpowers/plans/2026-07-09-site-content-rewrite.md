# Site Content & Trust-Building Rewrite — Implementation Plan

> Content/structure rewrite for a Next.js App Router + Supabase-backed marketing site. No test suite exists (content site) — verification is `next lint` + `next build` at the end, plus a visual check of the homepage and new pages.

**Goal:** Rewrite hero/about/stats copy, expand services, add trust-building sections (Why Choose Us, Guarantee, Reviews), add new pages (Roofing, Areas Covered, FAQ), clean up gallery captions, expand the footer, and add a WhatsApp button.

**Architecture:** Content lives in `src/data/site.ts` (defaults) merged with Supabase via `src/lib/content.ts` → `DEFAULT_CONTENT`. Editing defaults changes the site immediately for anyone without a Supabase override row. New pages follow the `src/app/(public)/<slug>/page.tsx` + `PageIntro` pattern already used by `/services`.

**Deferred (need user input, not in this pass):** Kitchens/Bathrooms sub-service lists, real review text, Facebook URL, before/after slider photo pairs.

---

### Task 1 — Hero copy + buttons
**Modify:** `src/lib/content.ts` (`DEFAULT_CONTENT.hero`), `src/components/Hero.tsx`
- hero.line1/line2/line3 → "Trusted roofing" / "and building" / "specialists." (accent)
- hero.subtext → "Covering North London — from roof repairs and new roofs to kitchens, bathrooms and full home renovations, we deliver quality workmanship that lasts."
- Buttons: primary "Get a free quote →" → `/contact`; secondary "About us" → `/#about` (replaces "Start a project" / "View the work")

### Task 2 — About section rewrite
**Modify:** `src/lib/content.ts` (`DEFAULT_CONTENT.about`)
- heading "Built on", accent "recommendations."
- paragraphs: company description, 20+ years line, "No salesmen. No subcontractor headaches. Just honest workmanship and clear communication from start to finish."

### Task 3 — Stats: values, labels, and non-numeric handling
**Modify:** `src/data/site.ts` (`stats`), `src/lib/content.ts` (`DEFAULT_CONTENT.stats`), `src/components/Stats.tsx`
- New 4 tiles: `20+ Years Experience`, `200+ Projects Completed`, `Fully Insured / Public Liability Cover`, `★★★★★ Rated 5 Stars by Customers`
- Stats.tsx currently assumes every value has digits to animate-count. Fix `parse()`/render so a value with no digits (e.g. "Fully Insured", "★★★★★") renders as static text — no counter, no stray trailing "0".

### Task 4 — Roofing service scope expansion
**Modify:** `src/data/site.ts` (roofing entry in `services`)
- scope → `["Roof Repairs","New Roofs","Flat Roofing","Leadwork","Chimneys","Fascias & Soffits","Guttering","Emergency Repairs","Slate Roofing","Tile Roofing"]`

### Task 5 — "Why Choose Lanigan Builds" section
**Create:** `src/components/WhyChooseUs.tsx` (8 checkmark items, Reveal-animated grid, matches existing section style)
**Modify:** `src/app/(public)/page.tsx` — insert section after Services, before Gallery

### Task 6 — Workmanship guarantee section
**Modify:** `src/app/(public)/page.tsx` — new inline section with heading "Our workmanship guarantee" + body copy, placed after Why Choose Us

### Task 7 — Reviews / testimonials section (placeholder, clearly marked)
**Create:** `src/components/Testimonials.tsx` — 3 placeholder 5-star review cards with a `{/* TODO: replace with real reviews */}` comment
**Modify:** `src/app/(public)/page.tsx` — insert between Gallery and Process (mid-page, not hidden)

### Task 8 — Final CTA copy (reuse Footer's existing CTA slot)
**Modify:** `src/components/Footer.tsx` — change heading/body to "Ready to get started?" / "Call us today for a free quotation. No obligation. Fast response." button stays "Get a free quote →"

### Task 9 — Areas Covered page + footer/nav links
**Create:** `src/app/(public)/areas/page.tsx` — `PageIntro` + list of ~13 boroughs/areas (Haringey, Enfield, Barnet, Camden, Islington, Hackney, Waltham Forest, Muswell Hill, Crouch End, Finchley, Wood Green, Highgate, Southgate)
**Modify:** `src/data/site.ts` (`nav` array — add `{ label: "Areas", href: "/areas" }`), `src/components/Footer.tsx` (add Areas column)

### Task 10 — Dedicated Roofing page
**Create:** `src/app/(public)/roofing/page.tsx` — `PageIntro`, the 10-item roofing list as feature grid, `WorkGallery` filtered to `category="Roofing"` for photos, CTA to `/contact`
**Modify:** `src/data/site.ts` `nav` (optional: keep Roofing reachable via Services + homepage marquee; do not overcrowd nav — link from homepage Services row instead)

### Task 11 — FAQ page
**Create:** `src/app/(public)/faq/page.tsx` — `PageIntro` + accordion-style Q&A (reuse the disclosure pattern from `ServicesList`), 6–8 questions (insurance, quotes, timelines, areas covered, guarantee, deposits)

### Task 12 — WhatsApp floating button
**Create:** `src/components/WhatsAppButton.tsx` — fixed-position button linking to `https://wa.me/447398231786`
**Modify:** `src/app/(public)/layout.tsx` (or root layout) — render globally

### Task 13 — Google Maps embed on Contact page
**Modify:** `src/app/(public)/contact/page.tsx` — add an `<iframe>` embed for North London service area

### Task 14 — Footer expansion
**Modify:** `src/components/Footer.tsx` — add Areas column, Privacy Policy link, keep Instagram; add Facebook placeholder only if/when URL supplied (skip for now)
**Create:** `src/app/(public)/privacy/page.tsx` — minimal privacy policy page

### Task 15 — Gallery caption cleanup
**Modify:** `src/data/portfolio.json` — rewrite all 39 `title`/`caption` fields: strip emoji/hashtags/IG-speak, replace with professional captions (e.g. "New Slate Roof", "Kitchen Renovation", "Zinc Capping Installation", "Bathroom Renovation") grouped sensibly by category

### Verification (once, at the end — broad change per speed policy)
```bash
npm run lint
npm run build
```
Then visually check homepage, `/roofing`, `/areas`, `/faq`, `/contact` in the dev server.
