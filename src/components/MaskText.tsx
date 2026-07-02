"use client";

import { useRef, ElementType, Fragment } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** play immediately (hero) instead of on scroll */
  immediate?: boolean;
  stagger?: number;
};

/** Word-by-word mask-up reveal. No paid plugins. */
export default function MaskText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  immediate = false,
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const inners = ref.current!.querySelectorAll<HTMLElement>(".mask-inner");
      const tween = gsap.fromTo(
        inners,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          delay,
          stagger,
          scrollTrigger: immediate
            ? undefined
            : { trigger: ref.current, start: "top 90%", once: true },
        }
      );
      // Fail-safe: if the ScrollTrigger never fires (stale positions after
      // late image/font load), force the text visible so headings can't vanish.
      if (!immediate) {
        const t = window.setTimeout(() => {
          if (tween.progress() === 0) gsap.set(inners, { yPercent: 0, clearProps: "visibility" });
        }, 2500);
        return () => window.clearTimeout(t);
      }
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <span className="mask-inner" style={{ display: "inline-block", willChange: "transform" }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
