import Reveal from "./Reveal";

// TODO: replace with real Google reviews once supplied by the client.
const reviews = [
  {
    quote: "Fantastic workmanship from start to finish — turned up when they said they would and left the site spotless every day.",
    name: "Google Review",
  },
  {
    quote: "Reliable, honest and easy to reach throughout the whole project. Would use Lanigan Builds again without hesitation.",
    name: "Google Review",
  },
  {
    quote: "Really pleased with the finish on our roof and kitchen. Clear communication and no surprises on price.",
    name: "Google Review",
  },
];

export default function Testimonials() {
  return (
    <Reveal as="div" stagger={0.08} className="grid gap-6 md:grid-cols-3">
      {reviews.map((r, i) => (
        <div key={i} className="rounded-[8px] border border-line bg-card p-7">
          <div className="text-brand" aria-hidden="true">★★★★★</div>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">&ldquo;{r.quote}&rdquo;</p>
          <p className="mt-5 text-sm uppercase tracking-[0.14em] text-muted">{r.name}</p>
        </div>
      ))}
    </Reveal>
  );
}
