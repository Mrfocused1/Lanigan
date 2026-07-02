"use client";

type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-line bg-paper-2/40 py-7 ${className}`}>
      <div className="marquee-track items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display whitespace-nowrap px-7 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
