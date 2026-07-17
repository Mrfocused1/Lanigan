import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lanigan Builds collects, uses and stores your information.",
};

export default async function PrivacyPage() {
  const { privacyPage } = await getContent();

  return (
    <>
      <PageIntro eyebrow={privacyPage.eyebrow} title={privacyPage.title} accent={privacyPage.accent}>
        {privacyPage.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <div className="max-w-2xl space-y-8 border-t border-line pt-10 text-lg leading-relaxed text-muted">
          {privacyPage.sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-3">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
