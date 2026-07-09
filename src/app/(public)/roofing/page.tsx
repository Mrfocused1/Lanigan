import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import WorkGallery from "@/components/WorkGallery";
import { getContent, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roofing",
  description:
    "Roof repairs, new roofs, slate and tile roofing, leadwork, chimneys, fascias, soffits, guttering and emergency roofing across North London.",
};

export default async function RoofingPage() {
  const [{ roofingPage }, projects] = await Promise.all([getContent(), getProjects()]);
  const roofingProjects = projects.filter((p) => p.category === "Roofing");

  return (
    <>
      <PageIntro eyebrow="Roofing" title={roofingPage.heading} accent={roofingPage.accent}>
        {roofingPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <Reveal as="ul" stagger={0.05} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {roofingPage.services.map((s) => (
            <li
              key={s}
              className="rounded-[6px] border border-line bg-card px-4 py-5 text-center text-sm font-semibold text-ink"
            >
              {s}
            </li>
          ))}
        </Reveal>
      </section>

      {roofingProjects.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
          <p className="eyebrow">Recent roofing work</p>
          <div className="mt-8">
            <WorkGallery projects={roofingProjects} showFilter={false} />
          </div>
        </section>
      )}

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-20 text-center md:px-10 md:py-24">
          <h2 className="h-section font-display text-paper">{roofingPage.ctaHeading}</h2>
          <p className="mx-auto mt-5 max-w-md text-paper/80">{roofingPage.ctaBody}</p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="btn bg-paper text-ink hover:bg-lime">
              Get a free quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
