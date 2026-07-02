# Lanigan Builds

Marketing site + lead CRM for **Lanigan Builds**, a London builder (roofing, kitchens, bathrooms, carpentry, flooring, renovations).

Built with **Next.js 16 (App Router) · React 19 · Tailwind v4 · GSAP · Supabase**. Light/minimal architectural design with the brand green accent. All portfolio media is scraped from the [@laniganbuilds](https://instagram.com/laniganbuilds) Instagram (39 posts → 125 images + 21 videos).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Environment variables live in `.env.local` (Supabase URL + publishable key).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — GSAP hero, services, stats, featured work, process, contact form |
| `/services` | Services with expandable detail + process |
| `/portfolio` | Filterable work gallery (39 projects) with image/video lightbox |
| `/contact` | Contact details + enquiry form |
| `/admin` | **CRM dashboard** (Supabase Auth gated) |

## Admin CRM

Sign in at `/admin` with the Supabase Auth admin account (credentials kept out of source control — set/rotate them in Supabase).

The dashboard shows live leads from the website contact form: stat cards (total, needs-action, open pipeline £, won £), a pipeline bar, status filters, search, and an editable lead drawer (status / quote value / internal notes).

## Data layer (Supabase)

- Table `public.lanigan_leads` with RLS:
  - **public/anon** may `INSERT` (the contact form)
  - **authenticated** (admin) may `SELECT / UPDATE / DELETE`
- Contact form inserts with `return=minimal` so the public role never needs read access.

## Media

`public/media/` holds the scraped Instagram images/videos. `src/data/portfolio.json` is the generated, categorised project index consumed by the gallery.
