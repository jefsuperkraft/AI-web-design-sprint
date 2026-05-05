"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const router       = useRouter();
  const pathname     = usePathname();
  const isFirstMount = useRef(true);
  const isAnimating  = useRef(false);

  // Fade overlay out when new page lands.
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        isAnimating.current = false;
        overlay.style.pointerEvents = "none";
      },
    });
  }, [pathname]);

  // Intercept internal link clicks and fade to black before navigating.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      ) return;

      const targetPath = href.split("?")[0].split("#")[0] || "/";
      if (targetPath === window.location.pathname) return;

      if (isAnimating.current) { e.preventDefault(); return; }

      e.preventDefault();
      isAnimating.current = true;

      const overlay = overlayRef.current;
      if (!overlay) return;

      overlay.style.pointerEvents = "all";
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => router.push(href),
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
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "#000",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
