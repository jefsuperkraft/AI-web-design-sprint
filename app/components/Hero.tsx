"use client";

import { useRef, useEffect } from "react";
import Navbar from "./Navbar";

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/f037f145-9158-401e-904b-291a478ce1f0";

// Scales the font-size so the text fills the container width exactly.
// Uses an inner inline <span> to measure natural text width, avoiding
// the block-element scrollWidth trap (block elements fill their container).
function FitLine({
  children,
  lineHeight = 1,
}: {
  children: string;
  lineHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ro: ResizeObserver | null = null;

    const fit = () => {
      const container = containerRef.current;
      const line = lineRef.current;
      const span = spanRef.current;
      if (!container || !line || !span) return;

      const containerWidth = container.getBoundingClientRect().width;
      if (containerWidth === 0) return; // element is hidden (display:none)

      line.style.fontSize = "100px";
      const textWidth = span.getBoundingClientRect().width;
      if (textWidth <= 0) return;

      line.style.fontSize = `${(100 * containerWidth) / textWidth}px`;
    };

    // Measure only after the actual font is loaded
    document.fonts.ready.then(() => {
      fit();
      ro = new ResizeObserver(fit);
      if (containerRef.current) ro.observe(containerRef.current);
    });

    return () => ro?.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div
        ref={lineRef}
        className="text-white mix-blend-overlay capitalize font-medium whitespace-nowrap"
        style={{ letterSpacing: "-0.07em", lineHeight, fontSize: "14vw" }}
      >
        <span ref={spanRef}>{children}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[635px] flex flex-col px-4 md:px-8 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* Bottom blur/frost overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]" />

      {/* Navbar */}
      <Navbar />

      {/* Push content toward bottom */}
      <div className="flex-1" />

      {/* Hero content */}
      <div className="relative pb-8 md:pb-14 flex flex-col">

        {/* Name block */}
        <div className="w-full">
          {/* "[Hello I'm]" label */}
          <div className="flex items-center justify-center md:justify-start px-[18px] mb-[-15px]">
            <p
              className="text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              [ Hello i&apos;m ]
            </p>
          </div>

          {/* Mobile: two lines, each word fills container width */}
          <div className="md:hidden">
            <FitLine lineHeight={0.82}>Harvey</FitLine>
            <FitLine lineHeight={0.82}>Specter</FitLine>
          </div>

          {/* Desktop: single line fills container width */}
          <div className="hidden md:block">
            <FitLine lineHeight={1.1}>Harvey Specter</FitLine>
          </div>
        </div>

        {/* Description + CTA — right on desktop, left on mobile */}
        <div className="flex md:justify-end justify-start w-full mt-6 md:mt-0">
          <div className="flex flex-col gap-[17px] w-[293px] md:w-[294px]">
            <p className="font-bold italic uppercase text-[#1f1f1f] text-[14px] tracking-[-0.56px] leading-[1.1]">
              H.Studio is a{" "}
              <span className="font-normal not-italic">full-service</span>{" "}
              creative studio creating beautiful digital experiences and
              products. We are an{" "}
              <span className="font-normal not-italic">award winning</span>{" "}
              design and art group specializing in branding, web design and
              engineering.
            </p>
            <a
              href="#contact"
              className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px] hover:opacity-80 transition-opacity duration-200"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
