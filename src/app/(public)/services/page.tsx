import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ServicesList from "@/components/ServicesList";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import MaskText from "@/components/MaskText";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Roofing, kitchens, bathrooms, carpentry, flooring and full renovations across London — delivered by Lanigan Builds.",
};

export default async function ServicesPage() {
  const { servicesPage } = await getContent();

  return (
    <>
      <PageIntro eyebrow={servicesPage.eyebrow} title={servicesPage.title} accent={servicesPage.accent}>
        {servicesPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <ServicesList detailed />
      </section>

      <Marquee items={servicesPage.marquee} />

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow !text-lime">How it works</p>
          <h2 className="h-section font-display mt-5 max-w-2xl text-paper">
            <MaskText text={servicesPage.processHeading} /> <span className="text-faint"><MaskText text={servicesPage.processAccent} delay={0.1} /></span>
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
