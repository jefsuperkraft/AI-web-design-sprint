"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef   = useRef<HTMLDivElement>(null);
  const router       = useRouter();
  const pathname     = usePathname();
  const isFirstMount = useRef(true);
  const curtainReady = useRef(false); // true once curtain has fully covered the screen
  const isAnimating  = useRef(false);

  // Slide curtain off (upward) when the new pathname lands.
  useEffect(() => {
    // Skip the very first render — preloader handles the initial load.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Only slide out after the curtain has fully covered the screen.
    if (!curtainReady.current) return;
    curtainReady.current = false;

    const curtain = curtainRef.current;
    if (!curtain) return;

    gsap.to(curtain, {
      yPercent: -100,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating.current = false;
        // Reset below screen for the next navigation.
        gsap.set(curtain, { yPercent: 100 });
      },
    });
  }, [pathname]);

  // Intercept clicks on internal <a> tags.
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, same-page hashes.
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      ) return;

      // Ignore if already on the same page (strip hash/query).
      const targetPath = href.split("?")[0].split("#")[0] || "/";
      if (targetPath === window.location.pathname) return;

      // Ignore if already mid-transition.
      if (isAnimating.current) { e.preventDefault(); return; }

      e.preventDefault();
      isAnimating.current = true;

      gsap.fromTo(
        curtain,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            curtainReady.current = true;
            router.push(href);
          },
        }
      );
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <>
      {children}
      <div
        ref={curtainRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "#000",
          transform: "translateY(100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
