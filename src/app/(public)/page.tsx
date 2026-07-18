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
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { categories } from "@/lib/portfolio";
import { getContent, getProjects } from "@/lib/content";

export default async function Home() {
  const [content, projects] = await Promise.all([getContent(), getProjects()]);
  const { about, settings, whyChooseUs, guarantee, beforeAfter, testimonials, home } = content;
  return (
    <>
      <Hero />

      <Marquee
        items={["Roofing", "Kitchens", "Bathrooms", "Carpentry", "Flooring", "Renovations"]}
        className="mt-8"
      />

      {/* Services */}
      <section className="bg-paper-2/60">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section font-display max-w-xl text-ink">
              <MaskText text={home.servicesHeading} /> <MaskText text={home.servicesAccent} delay={0.08} />
            </h2>
            <p className="max-w-sm text-muted">{home.servicesIntro}</p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Why choose us</p>
          <h2 className="h-section font-display mt-5 text-ink">
            <MaskText text={whyChooseUs.heading} /> <span className="text-brand"><MaskText text={whyChooseUs.accent} delay={0.08} /></span>
          </h2>
        </div>
        <WhyChooseUs />
      </section>

      {/* Guarantee */}
      <section className="bg-paper-2/60">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Our promise</p>
            <h2 className="h-section font-display mt-5 text-ink">
              <MaskText text={guarantee.heading} /> <span className="text-brand"><MaskText text={guarantee.accent} delay={0.08} /></span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted">{guarantee.body}</p>
          </div>
        </div>
      </section>

      {/* Before & after */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Before &amp; after</p>
          <h2 className="h-section font-display mt-5 text-ink">
            <MaskText text={beforeAfter.heading} /> <span className="text-brand"><MaskText text={beforeAfter.accent} delay={0.08} /></span>
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {beforeAfter.items.map((item, i) => (
            <BeforeAfterSlider key={i} before={item.before} after={item.after} label={item.label} />
          ))}
        </div>
      </section>

      {/* Featured work — tabbed by trade */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{home.galleryEyebrow}</p>
            <h2 className="h-section font-display mt-5 text-ink">
              <MaskText text={home.galleryHeading} /> <MaskText text={home.galleryAccent} delay={0.08} />
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

      {/* Reviews */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Reviews</p>
          <h2 className="h-section font-display mt-5 text-ink">
            <MaskText text={testimonials.heading} /> <span className="text-brand"><MaskText text={testimonials.accent} delay={0.08} /></span>
          </h2>
        </div>
        <Testimonials />
      </section>

      {/* Process */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow !text-lime">How it works</p>
          <h2 className="h-section font-display mt-5 max-w-2xl text-paper">
            <MaskText text={home.processHeading} /> <span className="text-faint"><MaskText text={home.processAccent} delay={0.1} /></span>
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
            <p className="eyebrow">{home.contactEyebrow}</p>
            <h2 className="h-section font-display mt-5 text-ink">
              <MaskText text={home.contactHeading} /> <span className="text-brand"><MaskText text={home.contactAccent} delay={0.1} /></span>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">{home.contactIntro}</p>

            <div className="mt-10 space-y-5 border-t border-line pt-8 text-sm">
              <div>
                <div className="eyebrow">Call</div>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-sweep mt-1 block text-lg text-ink">
                  {settings.phone}
                </a>
              </div>
              <div>
                <div className="eyebrow">Email</div>
                <a href={`mailto:${settings.email}`} className="link-sweep mt-1 block break-all text-lg text-ink">
                  {settings.email}
                </a>
              </div>
              <div>
                <div className="eyebrow">Area</div>
                <p className="mt-1 text-lg text-ink">{settings.serviceArea}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-line bg-card p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* About / Studio */}
      <section id="about" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="h-section font-display max-w-2xl text-ink">
              <MaskText text={about.heading} />{" "}
              <span className="text-brand"><MaskText text={about.accent} delay={0.1} /></span>
            </h2>
            <Reveal className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted" y={20}>
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-4" y={16}>
              <Link href="/services" className="btn btn-primary">
                Our services →
              </Link>
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost">
                {settings.instagramHandle}
              </a>
            </Reveal>
          </div>

          <Reveal y={40}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-paper-2">
              <Image
                src={about.image}
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
    </>
  );
}
