import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Areas Covered",
  description:
    "Lanigan Builds covers roofing, kitchens, bathrooms, carpentry and renovations across North London — Haringey, Enfield, Barnet, Camden, Islington and beyond.",
};

export default async function AreasPage() {
  const { areasPage } = await getContent();

  return (
    <>
      <PageIntro eyebrow={areasPage.eyebrow} title={areasPage.heading} accent={areasPage.accent}>
        {areasPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <Reveal as="ul" stagger={0.04} className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-10 sm:grid-cols-3 lg:grid-cols-4">
          {areasPage.areas.map((a) => (
            <li key={a} className="font-display text-xl font-semibold text-ink md:text-2xl">
              {a}
            </li>
          ))}
        </Reveal>

        <div className="mt-16">
          <Link href="/contact" className="btn btn-primary">
            Get a free quote →
          </Link>
        </div>
      </section>
    </>
  );
}
