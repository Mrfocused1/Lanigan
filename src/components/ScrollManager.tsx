"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Keeps ScrollTrigger positions accurate. Late-loading images/fonts grow the
 * page after triggers are created, leaving their start/end positions stale —
 * which can leave scroll-revealed content stuck hidden. Refresh on load,
 * after images settle, and on every route change.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    refresh();
    const timers = [setTimeout(refresh, 300), setTimeout(refresh, 1000), setTimeout(refresh, 2200)];

    window.addEventListener("load", refresh);

    const imgs = Array.from(document.images);
    const onImg = () => refresh();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImg, { once: true });
    });

    return () => {
      window.removeEventListener("load", refresh);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
