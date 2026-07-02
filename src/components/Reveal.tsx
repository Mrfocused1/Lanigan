"use client";

import { useRef, ReactNode, ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** translate distance in px */
  y?: number;
  delay?: number;
  /** stagger direct children instead of the wrapper itself */
  stagger?: number;
  /** scrub-free entrance trigger start */
  start?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 36,
  delay = 0,
  stagger,
  start = "top 85%",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const targets = stagger ? Array.from(el.children) : el;

      gsap.set(targets, { autoAlpha: 0, y });

      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
