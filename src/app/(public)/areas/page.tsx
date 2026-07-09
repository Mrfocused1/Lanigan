import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Areas Covered",
  description:
    "Lanigan Builds covers roofing, kitchens, bathrooms, carpentry and renovations across North London — Haringey, Enfield, Barnet, Camden, Islington and beyond.",
};

const areas = [
  "Haringey",
  "Enfield",
  "Barnet",
  "Camden",
  "Islington",
  "Hackney",
  "Waltham Forest",
  "Muswell Hill",
  "Crouch End",
  "Finchley",
  "Wood Green",
  "Highgate",
  "Southgate",
];

export default function AreasPage() {
  return (
    <>
      <PageIntro eyebrow="Areas covered" title="North London," accent="and just beyond.">
        We&apos;re based in North London and cover the surrounding boroughs — if you&apos;re not sure
        we reach you, get in touch and we&apos;ll let you know.
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <Reveal as="ul" stagger={0.04} className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-10 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map((a) => (
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
