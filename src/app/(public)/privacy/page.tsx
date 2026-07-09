import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lanigan Builds collects, uses and stores your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy" accent="policy.">
        How we handle the information you share with us.
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <div className="max-w-2xl space-y-8 border-t border-line pt-10 text-lg leading-relaxed text-muted">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">What we collect</h2>
            <p className="mt-3">
              When you contact us through our website — by phone, email, WhatsApp or the contact
              form — we collect the details you provide, such as your name, phone number, email
              address and a description of your project.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">How we use it</h2>
            <p className="mt-3">
              We use your details only to respond to your enquiry, arrange a site visit and provide
              a quote. We do not sell or share your information with third parties.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">How long we keep it</h2>
            <p className="mt-3">
              We keep enquiry and project details only as long as needed to deliver the work and
              meet our legal and accounting obligations.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Contact us</h2>
            <p className="mt-3">
              If you have any questions about how your data is handled, or want it removed, email us
              at lanigansconstruction@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
