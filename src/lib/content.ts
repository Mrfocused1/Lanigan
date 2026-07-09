import { createClient } from "@supabase/supabase-js";
import { site, services as defaultServices, stats as defaultStats, processSteps, type Service } from "@/data/site";
import portfolioJson from "@/data/portfolio.json";
import type { Project } from "@/lib/portfolio";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  location: string;
  serviceArea: string;
  hours: string;
  legalName: string;
};

export type Testimonial = { quote: string; name: string };
export type BeforeAfter = { before: string; after: string; label: string };
export type FaqItem = { q: string; a: string };

export type SiteContent = {
  settings: SiteSettings;
  hero: { line1: string; line2: string; line3: string; subtext: string; image: string; ctaLabel: string; ctaSecondaryLabel: string };
  about: { heading: string; accent: string; paragraphs: string[]; image: string };
  stats: { value: string; label: string }[];
  services: Service[];
  whyChooseUs: { heading: string; accent: string; points: string[] };
  guarantee: { heading: string; accent: string; body: string };
  beforeAfter: { heading: string; accent: string; items: BeforeAfter[] };
  testimonials: { heading: string; accent: string; items: Testimonial[] };
  process: { no: string; title: string; body: string }[];
  cta: { eyebrow: string; heading: string; accent: string; body: string };
  footer: { areas: string[] };
  faq: { heading: string; accent: string; intro: string; items: FaqItem[] };
  areasPage: { heading: string; accent: string; intro: string; areas: string[] };
  roofingPage: { heading: string; accent: string; intro: string; services: string[] };
  privacyPage: { intro: string; sections: { title: string; body: string }[] };
};

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    phone: site.phone,
    whatsapp: "447398231786",
    email: site.email,
    instagram: site.instagram,
    instagramHandle: site.instagramHandle,
    facebook: site.facebook,
    location: site.location,
    serviceArea: site.serviceArea,
    hours: site.hours,
    legalName: site.legalName,
  },
  hero: {
    line1: "Trusted roofing",
    line2: "and building",
    line3: "specialists.",
    subtext:
      "Covering North London — from roof repairs and new roofs to kitchens, bathrooms and full home renovations, we deliver quality workmanship that lasts.",
    image: "/media/C8aLy3VILak_slide1.jpg",
    ctaLabel: "Get a free quote →",
    ctaSecondaryLabel: "About us",
  },
  about: {
    heading: "Built on",
    accent: "recommendations.",
    paragraphs: [
      "Lanigan Builds is a North London building company specialising in roofing, kitchens, bathrooms, carpentry and home renovations.",
      "With over 20 years of experience on the tools, we believe in turning up when we say we will, keeping sites tidy and delivering work we're proud to put our name on.",
      "No salesmen. No subcontractor headaches. Just honest workmanship and clear communication from start to finish.",
    ],
    image: "/media/Crsn4JxIJRK_slide1.jpg",
  },
  stats: defaultStats.map((s) => ({ value: s.value, label: s.label })),
  services: defaultServices,
  whyChooseUs: {
    heading: "Why choose",
    accent: "Lanigan Builds?",
    points: [
      "Fully insured",
      "Fixed quotations",
      "Clean and tidy workmanship",
      "Photos throughout the project",
      "Reliable communication",
      "Local North London company",
      "20+ years experience",
      "No hidden extras",
    ],
  },
  guarantee: {
    heading: "Our workmanship",
    accent: "guarantee.",
    body: "We stand behind every project we complete. If something isn't right because of our workmanship, we'll come back and put it right.",
  },
  beforeAfter: {
    heading: "Drag to see",
    accent: "the difference.",
    items: [
      { before: "/media/before-after-roof-before.jpg", after: "/media/before-after-roof-after.jpg", label: "Slate roof re-cover" },
      { before: "/media/before-after-kitchen-before.jpg", after: "/media/before-after-kitchen-after.jpg", label: "Kitchen floor transformation" },
    ],
  },
  testimonials: {
    heading: "What customers",
    accent: "say.",
    items: [
      { quote: "Fantastic workmanship from start to finish — turned up when they said they would and left the site spotless every day.", name: "Google Review" },
      { quote: "Reliable, honest and easy to reach throughout the whole project. Would use Lanigan Builds again without hesitation.", name: "Google Review" },
      { quote: "Really pleased with the finish on our roof and kitchen. Clear communication and no surprises on price.", name: "Google Review" },
    ],
  },
  process: processSteps.map((p) => ({ no: p.no, title: p.title, body: p.body })),
  cta: {
    eyebrow: "Ready to get started?",
    heading: "Call us today for",
    accent: "a free quotation.",
    body: "No obligation. Fast response.",
  },
  footer: {
    areas: ["Haringey", "Enfield", "Barnet", "Islington"],
  },
  faq: {
    heading: "Common",
    accent: "questions.",
    intro: "Everything you need to know before getting in touch. Can't find your answer? Give us a call.",
    items: [
      { q: "Are you fully insured?", a: "Yes — we carry public liability insurance for every project we take on, big or small." },
      { q: "How much will my project cost?", a: "We visit the site and give a clear, itemised quote before any work starts. No vague numbers, no hidden extras added later." },
      { q: "Do you offer a guarantee on your work?", a: "We stand behind every project we complete. If something isn't right because of our workmanship, we'll come back and put it right." },
      { q: "What areas do you cover?", a: "We're based in North London and cover the surrounding boroughs — Haringey, Enfield, Barnet, Camden, Islington and beyond. See our Areas Covered page for the full list." },
      { q: "How long will my project take?", a: "It depends on scope — we'll give you a realistic timeline during the consultation and keep you updated with progress throughout." },
      { q: "Do I need to pay a deposit?", a: "For most jobs we ask for a deposit to secure materials and your slot, with the balance staged across the project. This is set out clearly in your quote." },
      { q: "Do you use subcontractors?", a: "No — our own trades carry out the work, so there's no subcontractor handover chaos and one point of contact throughout." },
      { q: "Can I see photos of previous work?", a: "Yes — check out our Portfolio page, or follow us on Instagram where we post progress photos throughout every project." },
    ],
  },
  areasPage: {
    heading: "North London,",
    accent: "and just beyond.",
    intro: "We're based in North London and cover the surrounding boroughs — if you're not sure we reach you, get in touch and we'll let you know.",
    areas: [
      "Haringey", "Enfield", "Barnet", "Camden", "Islington", "Hackney",
      "Waltham Forest", "Muswell Hill", "Crouch End", "Finchley", "Wood Green", "Highgate", "Southgate",
    ],
  },
  roofingPage: {
    heading: "North London",
    accent: "roofing specialists.",
    intro: "From a single slipped slate to a full re-roof, we cover every part of the job — repairs, new roofs, leadwork and everything that keeps a roof watertight for the long term.",
    services: [
      "Roof Repairs", "New Roofs", "Slate Roofing", "Tile Roofing", "Leadwork",
      "Emergency Roofing", "Ridge Repairs", "Chimney Repairs", "Guttering", "Flat Roofing",
    ],
  },
  privacyPage: {
    intro: "How we handle the information you share with us.",
    sections: [
      { title: "What we collect", body: "When you contact us through our website — by phone, email, WhatsApp or the contact form — we collect the details you provide, such as your name, phone number, email address and a description of your project." },
      { title: "How we use it", body: "We use your details only to respond to your enquiry, arrange a site visit and provide a quote. We do not sell or share your information with third parties." },
      { title: "How long we keep it", body: "We keep enquiry and project details only as long as needed to deliver the work and meet our legal and accounting obligations." },
      { title: "Contact us", body: "If you have any questions about how your data is handled, or want it removed, email us at lanigansconstruction@gmail.com." },
    ],
  },
};

function readClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

/** Deep-merge a stored content doc over the defaults so missing fields fall back. */
function merge(base: SiteContent, over: Partial<SiteContent> | null | undefined): SiteContent {
  if (!over) return base;
  return {
    settings: { ...base.settings, ...(over.settings ?? {}) },
    hero: { ...base.hero, ...(over.hero ?? {}) },
    about: { ...base.about, ...(over.about ?? {}) },
    stats: over.stats?.length ? over.stats : base.stats,
    services: over.services?.length ? over.services : base.services,
    whyChooseUs: { ...base.whyChooseUs, ...(over.whyChooseUs ?? {}) },
    guarantee: { ...base.guarantee, ...(over.guarantee ?? {}) },
    beforeAfter: {
      ...base.beforeAfter,
      ...(over.beforeAfter ?? {}),
      items: over.beforeAfter?.items?.length ? over.beforeAfter.items : base.beforeAfter.items,
    },
    testimonials: {
      ...base.testimonials,
      ...(over.testimonials ?? {}),
      items: over.testimonials?.items?.length ? over.testimonials.items : base.testimonials.items,
    },
    process: over.process?.length ? over.process : base.process,
    cta: { ...base.cta, ...(over.cta ?? {}) },
    footer: { ...base.footer, ...(over.footer ?? {}) },
    faq: {
      ...base.faq,
      ...(over.faq ?? {}),
      items: over.faq?.items?.length ? over.faq.items : base.faq.items,
    },
    areasPage: {
      ...base.areasPage,
      ...(over.areasPage ?? {}),
      areas: over.areasPage?.areas?.length ? over.areasPage.areas : base.areasPage.areas,
    },
    roofingPage: {
      ...base.roofingPage,
      ...(over.roofingPage ?? {}),
      services: over.roofingPage?.services?.length ? over.roofingPage.services : base.roofingPage.services,
    },
    privacyPage: {
      ...base.privacyPage,
      ...(over.privacyPage ?? {}),
      sections: over.privacyPage?.sections?.length ? over.privacyPage.sections : base.privacyPage.sections,
    },
  };
}

export async function getContent(): Promise<SiteContent> {
  try {
    const { data } = await readClient()
      .from("lanigan_site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return merge(DEFAULT_CONTENT, (data?.data as Partial<SiteContent>) ?? null);
  } catch {
    return DEFAULT_CONTENT;
  }
}

const fallbackProjects = portfolioJson as Project[];

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await readClient()
      .from("lanigan_projects")
      .select("*")
      .eq("hidden", false)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return fallbackProjects;
    return data.map((r) => ({
      shortcode: r.shortcode,
      title: r.title,
      caption: r.caption ?? "",
      category: r.category,
      date: r.date ?? "",
      type: r.type,
      cover: r.cover,
      media: (r.media as Project["media"]) ?? [],
      tags: (r.tags as string[]) ?? [],
    }));
  } catch {
    return fallbackProjects;
  }
}
