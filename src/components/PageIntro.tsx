import MaskText from "./MaskText";

export default function PageIntro({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-36 md:px-10 md:pb-16 md:pt-44">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-hero font-display mt-6 max-w-5xl text-ink">
        <MaskText text={title} immediate />
        {accent && (
          <>
            {" "}
            <span className="text-brand">
              <MaskText text={accent} immediate delay={0.12} />
            </span>
          </>
        )}
      </h1>
      {children && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
    </section>
  );
}
