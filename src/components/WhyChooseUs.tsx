import Reveal from "./Reveal";

const points = [
  "Fully insured",
  "Fixed quotations",
  "Clean and tidy workmanship",
  "Photos throughout the project",
  "Reliable communication",
  "Local North London company",
  "20+ years experience",
  "No hidden extras",
];

export default function WhyChooseUs() {
  return (
    <Reveal
      as="ul"
      stagger={0.06}
      className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {points.map((p) => (
        <li key={p} className="flex items-start gap-3 text-lg text-ink-soft">
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-white">
            ✓
          </span>
          {p}
        </li>
      ))}
    </Reveal>
  );
}
