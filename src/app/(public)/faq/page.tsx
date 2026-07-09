import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about quotes, insurance, guarantees and the areas Lanigan Builds covers.",
};

const faqs = [
  {
    q: "Are you fully insured?",
    a: "Yes — we carry public liability insurance for every project we take on, big or small.",
  },
  {
    q: "How much will my project cost?",
    a: "We visit the site and give a clear, itemised quote before any work starts. No vague numbers, no hidden extras added later.",
  },
  {
    q: "Do you offer a guarantee on your work?",
    a: "We stand behind every project we complete. If something isn't right because of our workmanship, we'll come back and put it right.",
  },
  {
    q: "What areas do you cover?",
    a: "We're based in North London and cover the surrounding boroughs — Haringey, Enfield, Barnet, Camden, Islington and beyond. See our Areas Covered page for the full list.",
  },
  {
    q: "How long will my project take?",
    a: "It depends on scope — we'll give you a realistic timeline during the consultation and keep you updated with progress throughout.",
  },
  {
    q: "Do I need to pay a deposit?",
    a: "For most jobs we ask for a deposit to secure materials and your slot, with the balance staged across the project. This is set out clearly in your quote.",
  },
  {
    q: "Do you use subcontractors?",
    a: "No — our own trades carry out the work, so there's no subcontractor handover chaos and one point of contact throughout.",
  },
  {
    q: "Can I see photos of previous work?",
    a: "Yes — check out our Portfolio page, or follow us on Instagram where we post progress photos throughout every project.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title="Common" accent="questions.">
        Everything you need to know before getting in touch. Can&apos;t find your answer? Give us a
        call.
      </PageIntro>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <div className="border-t border-line">
          {faqs.map((f) => (
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
