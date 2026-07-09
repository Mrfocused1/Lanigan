import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import WorkGallery from "@/components/WorkGallery";
import { categories } from "@/lib/portfolio";
import { getContent, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real Lanigan Builds projects across London — roofing, kitchens, bathrooms, carpentry, flooring and renovations.",
};

export default async function PortfolioPage() {
  const [{ portfolioPage }, projects] = await Promise.all([getContent(), getProjects()]);
  return (
    <>
      <PageIntro eyebrow={`${portfolioPage.eyebrow} · ${projects.length} projects`} title={portfolioPage.title} accent={portfolioPage.accent}>
        {portfolioPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <WorkGallery projects={projects} categories={categories} showFilter />
      </section>
    </>
  );
}
