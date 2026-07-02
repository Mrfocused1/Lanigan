import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import WorkGallery from "@/components/WorkGallery";
import { projects, categories } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real Lanigan Builds projects across London — roofing, kitchens, bathrooms, carpentry, flooring and renovations.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro eyebrow={`The work · ${projects.length} projects`} title="Real" accent="projects.">
        Straight from site. Photos and videos of work delivered across London — tap any project to see
        the full set.
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <WorkGallery projects={projects} categories={categories} showFilter />
      </section>
    </>
  );
}
