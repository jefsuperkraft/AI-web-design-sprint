"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

const PORTRAIT =
  "https://www.figma.com/api/mcp/asset/6559290e-0bcc-4984-84fe-71d699bba7ae";

const BIO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function CornerBrackets({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-3">
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      {children}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // Portrait reveal — each .portrait-wrapper triggers independently so the
      // mobile portrait (lower in the DOM) fires when IT enters the viewport.
      gsap.utils.toArray<HTMLElement>(".portrait-wrapper", sectionRef.current!).forEach((wrapper) => {
        const overlay = wrapper.querySelector<HTMLElement>(".portrait-overlay");
        if (!overlay) return;

        // clip-path wipe: right side of overlay disappears first → image reveals right→left
        // inset(top right bottom left): right goes 0%→100% collapses the overlay from its right edge
        gsap.to(overlay, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 70%",
            once: true,
          },
        });
      });

      // Text-box parallax — desktop only, slides left as section scrolls through
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(textBoxRef.current, {
          x: "-22vw",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 md:px-8 py-12 md:py-20"
      style={{ overflowX: "clip" }}
    >

      {/* ── MOBILE: vertical stack ── */}
      <div className="md:hidden flex flex-col gap-5">
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
          002
        </p>
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
          [ About ]
        </p>
        <CornerBrackets>
          <p className="text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
            {BIO}
          </p>
        </CornerBrackets>

        {/* Mobile portrait with reveal overlay */}
        <div
          className="portrait-wrapper relative w-full overflow-hidden"
          style={{ aspectRatio: "422/594" }}
        >
          <img src={PORTRAIT} alt="" className="w-full h-full object-cover" />
          <div className="portrait-overlay absolute inset-0 bg-black" style={{ clipPath: "inset(0 0% 0 0)" }} />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex items-start justify-between">

        {/* [ About ] label — top-left */}
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f] shrink-0" style={MONO}>
          [ About ]
        </p>

        {/* Right block — text + image, bottom-aligned */}
        <div className="flex gap-8 items-end" style={{ width: "71.4%" }}>

          {/* Text box — slides left on scroll */}
          <div ref={textBoxRef} className="flex-1 min-w-0">
            <CornerBrackets>
              <p className="text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
                {BIO}
              </p>
            </CornerBrackets>
          </div>

          {/* 002 label + portrait with reveal overlay */}
          <div className="flex gap-6 items-start shrink-0">
            <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
              002
            </p>
            <div
              className="portrait-wrapper relative overflow-hidden shrink-0"
              style={{ width: "30.3vw", aspectRatio: "436/614" }}
            >
              <img src={PORTRAIT} alt="" className="w-full h-full object-cover" />
              <div className="portrait-overlay absolute inset-0 bg-black" style={{ clipPath: "inset(0 0% 0 0)" }} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
