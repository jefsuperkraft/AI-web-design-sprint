"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const logo  = logoRef.current;
    if (!panel || !logo) return;

    const tl = gsap.timeline({
      onComplete: () => { panel.style.display = "none"; },
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" })
      .to(logo,  { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" }, "+=0.55")
      .to(panel, { yPercent: -100, duration: 0.75, ease: "power3.inOut" }, "-=0.15");
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <span
        ref={logoRef}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "-0.04em",
          opacity: 0,
          transform: "translateY(10px)",
          display: "inline-block",
        }}
      >
        H.Studio
      </span>
    </div>
  );
}
