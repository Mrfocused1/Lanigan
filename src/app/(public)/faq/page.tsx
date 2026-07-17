import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about quotes, insurance, guarantees and the areas Lanigan Builds covers.",
};

export default async function FaqPage() {
  const { faq } = await getContent();

  return (
    <>
      <PageIntro eyebrow={faq.eyebrow} title={faq.heading} accent={faq.accent}>
        {faq.intro}
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <div className="border-t border-line">
          {faq.items.map((f) => (
            <details key={f.q} className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="font-display text-lg font-semibold text-ink md:text-xl">{f.q}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
