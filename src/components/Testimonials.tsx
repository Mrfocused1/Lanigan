"use client";

import Reveal from "./Reveal";
import { useContent } from "./ContentProvider";

export default function Testimonials() {
  const { testimonials } = useContent();
  return (
    <Reveal as="div" stagger={0.08} className="grid gap-6 md:grid-cols-3">
      {testimonials.items.map((r, i) => (
        <div key={i} className="rounded-[8px] border border-line bg-card p-7">
          <div className="text-brand" aria-hidden="true">★★★★★</div>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">&ldquo;{r.quote}&rdquo;</p>
          <p className="mt-5 text-sm uppercase tracking-[0.14em] text-muted">{r.name}</p>
        </div>
      ))}
    </Reveal>
  );
}
