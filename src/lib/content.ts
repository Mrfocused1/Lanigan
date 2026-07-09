import { createClient } from "@supabase/supabase-js";
import { site, services as defaultServices, stats as defaultStats, processSteps, type Service } from "@/data/site";
import portfolioJson from "@/data/portfolio.json";
import type { Project } from "@/lib/portfolio";

export type SiteSettings = {
  phone: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  location: string;
  serviceArea: string;
  hours: string;
  legalName: string;
};

export type SiteContent = {
  settings: SiteSettings;
  hero: { line1: string; line2: string; line3: string; subtext: string; image: string };
  about: { heading: string; accent: string; paragraphs: string[]; image: string };
  stats: { value: string; label: string }[];
  services: Service[];
  process: { no: string; title: string; body: string }[];
};

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    phone: site.phone,
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
  process: processSteps.map((p) => ({ no: p.no, title: p.title, body: p.body })),
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
    process: over.process?.length ? over.process : base.process,
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
