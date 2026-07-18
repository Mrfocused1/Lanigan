import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get a quote from Lanigan Builds — London builder for roofing, kitchens, bathrooms and renovations.",
};

export default async function ContactPage() {
  const { settings: site, contactPage } = await getContent();
  return (
    <>
      <PageIntro eyebrow={contactPage.eyebrow} title={contactPage.title} accent={contactPage.accent}>
        {contactPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-8">
            <div className="space-y-5 border-t border-line pt-8 text-sm">
              <div>
                <div className="eyebrow">Call</div>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-sweep mt-1 block text-xl text-ink">
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="eyebrow">Email</div>
                <a href={`mailto:${site.email}`} className="link-sweep mt-1 block break-all text-xl text-ink">
                  {site.email}
                </a>
              </div>
              <div>
                <div className="eyebrow">Instagram</div>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep mt-1 block text-xl text-brand"
                >
                  {site.instagramHandle}
                </a>
              </div>
              <div>
                <div className="eyebrow">Facebook</div>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep mt-1 block text-xl text-ink"
                >
                  Lanigan Builds
                </a>
              </div>
            </div>

            <div className="space-y-5 border-t border-line pt-8 text-sm">
              <div>
                <div className="eyebrow">Service area</div>
                <p className="mt-1 text-lg text-ink">{site.serviceArea}</p>
              </div>
              <div>
                <div className="eyebrow">Hours</div>
                <p className="mt-1 text-lg text-ink">{site.hours}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-line bg-card p-6 md:p-10">
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[8px] border border-line">
          <iframe
            title="Lanigan Builds service area — North London"
            src="https://www.google.com/maps?q=North+London&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
