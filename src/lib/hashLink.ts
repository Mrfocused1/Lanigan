import { gsap } from "./gsap";

/**
 * Next.js doesn't scroll for same-page hash links (e.g. "/#about" clicked while
 * already on "/") since the pathname never changes. Handle it manually with a
 * GSAP tween (native smooth-scroll gets fought by the browser's own CSS
 * `scroll-behavior: smooth`, which GSAP's ScrollToPlugin bypasses).
 *
 * Deliberately does NOT call `history.pushState`/set `location.hash` — Next's
 * App Router patches `pushState` globally to detect navigations, and reacts to
 * it by running its own scroll-restoration, which resets scroll to (0,0) right
 * as our tween finishes. Leaving the URL as-is avoids that entirely; the visual
 * scroll is what matters here, not the address bar.
 */
export function handleHashLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
  delay = 0
) {
  if (!href.includes("#")) return;
  const [path, hash] = href.split("#");
  const targetPath = path || "/";
  if (targetPath !== pathname) return;
  const el = document.getElementById(hash);
  if (!el) return;
  e.preventDefault();
  setTimeout(() => {
    const targetY = el.getBoundingClientRect().top + window.scrollY - 88;
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    gsap.to(window, {
      scrollTo: { y: targetY },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        html.style.scrollBehavior = prevScrollBehavior;
      },
    });
  }, delay);
}
