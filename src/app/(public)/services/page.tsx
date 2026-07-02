import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ServicesList from "@/components/ServicesList";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import MaskText from "@/components/MaskText";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Roofing, kitchens, bathrooms, carpentry, flooring and full renovations across London — delivered by Lanigan Builds.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="What we" accent="build.">
        Six core trades under one roof. Whether it&apos;s a single roof repair or a whole-property
        refurbishment, we keep your project joined-up, tidy and finished to a standard.
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <ServicesList detailed />
      </section>

      <Marquee items={["Built tidy", "Quoted honestly", "Finished properly", "London based"]} />

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow !text-lime">How it works</p>
          <h2 className="h-section font-display mt-5 max-w-2xl text-paper">
            <MaskText text="A clear, four-step" /> <span className="text-faint"><MaskText text="process." delay={0.1} /></span>
          </h2>
          <div className="mt-16 [&_.text-ink]:text-paper [&_.text-muted]:text-faint">
            <Process />
          </div>
          <div className="mt-16">
            <Link href="/contact" className="btn bg-paper text-ink hover:bg-lime">
              Get a quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
