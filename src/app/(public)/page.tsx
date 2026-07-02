import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import ServicesList from "@/components/ServicesList";
import Process from "@/components/Process";
import WorkGallery from "@/components/WorkGallery";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/MaskText";
import { projects, categories } from "@/lib/portfolio";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero image="/media/C8aLy3VILak_slide1.jpg" />

      <Marquee
        items={["Roofing", "Kitchens", "Bathrooms", "Carpentry", "Flooring", "Renovations"]}
        className="mt-8"
      />

      {/* About / Studio */}
      <section id="about" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="h-section font-display max-w-2xl text-ink">
              <MaskText text="A London builder that" />{" "}
              <span className="text-brand"><MaskText text="finishes properly." delay={0.1} /></span>
            </h2>
            <Reveal className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted" y={20}>
              <p>
                Lanigan Builds is a family-run construction company with over 20 years on the tools,
                working across North London and just beyond the M25. From a slipped slate to a full
                property refurbishment, we bring the same standard to every job — clean sites, honest
                quotes and workmanship you can stand behind.
              </p>
              <p>
                No subbed-out chaos, no disappearing acts. Just real trades, doing real work, on real
                projects.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-4" y={16}>
              <Link href="/services" className="btn btn-primary">
                Our services →
              </Link>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost">
                {site.instagramHandle}
              </a>
            </Reveal>
          </div>

          <Reveal y={40}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-paper-2">
              <Image
                src="/media/Crsn4JxIJRK_slide1.jpg"
                alt="Lanigan Builds craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Stats />
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper-2/60">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section font-display max-w-xl text-ink">
              <MaskText text="What we" /> <MaskText text="build." delay={0.08} />
            </h2>
            <p className="max-w-sm text-muted">
              Six core trades, delivered under one roof — so your project stays joined-up from first fix
              to final finish.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Featured work — tabbed by trade */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="h-section font-display mt-5 text-ink">
              <MaskText text="See it" /> <MaskText text="by trade." delay={0.08} />
            </h2>
          </div>
          <Link href="/portfolio" className="btn btn-ghost">
            View all {projects.length} →
          </Link>
        </div>

        <WorkGallery
          projects={projects}
          categories={categories}
          showFilter
          includeAll={false}
          defaultCategory={categories[0]}
          limit={8}
          videosFirst
        />
      </section>

      {/* Process */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow !text-lime">How it works</p>
          <h2 className="h-section font-display mt-5 max-w-2xl text-paper">
            <MaskText text="From first call" /> <span className="text-faint"><MaskText text="to final fix." delay={0.1} /></span>
          </h2>
          <div className="mt-16 [&_.text-ink]:text-paper [&_.text-muted]:text-faint">
            <Process />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="h-section font-display mt-5 text-ink">
              <MaskText text="Tell us about" /> <span className="text-brand"><MaskText text="the project." delay={0.1} /></span>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Drop your details below and we&apos;ll get back to arrange a site visit and an honest,
              itemised quote.
            </p>

            <div className="mt-10 space-y-5 border-t border-line pt-8 text-sm">
              <div>
                <div className="eyebrow">Call</div>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-sweep mt-1 block text-lg text-ink">
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="eyebrow">Email</div>
                <a href={`mailto:${site.email}`} className="link-sweep mt-1 block text-lg text-ink">
                  {site.email}
                </a>
              </div>
              <div>
                <div className="eyebrow">Area</div>
                <p className="mt-1 text-lg text-ink">{site.serviceArea}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-line bg-card p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
