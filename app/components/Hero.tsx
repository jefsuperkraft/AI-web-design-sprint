"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import MagneticButton from "./MagneticButton";

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/f037f145-9158-401e-904b-291a478ce1f0";

// Single-word fit line (mobile)
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
      if (containerWidth === 0) return;
      line.style.fontSize = "100px";
      const textWidth = span.getBoundingClientRect().width;
      if (textWidth <= 0) return;
      line.style.fontSize = `${(100 * containerWidth) / textWidth}px`;
    };
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

// Two-word fit line (desktop): both words sized together to fill the container,
// but each is an inline-block span so GSAP can animate them independently.
function SplitFitLine({
  first,
  second,
  firstClass,
  secondClass,
  lineHeight = 1,
}: {
  first: string;
  second: string;
  firstClass?: string;
  secondClass?: string;
  lineHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ro: ResizeObserver | null = null;
    const fit = () => {
      const container = containerRef.current;
      const line = lineRef.current;
      const measure = measureRef.current;
      if (!container || !line || !measure) return;
      const containerWidth = container.getBoundingClientRect().width;
      if (containerWidth === 0) return;
      line.style.fontSize = "100px";
      const textWidth = measure.getBoundingClientRect().width;
      if (textWidth <= 0) return;
      line.style.fontSize = `${(100 * containerWidth) / textWidth}px`;
    };
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
        {/* measureRef wraps both words so font-size is scaled to fit them together */}
        <span ref={measureRef}>
          <span className={firstClass} style={{ display: "inline-block" }}>{first}</span>
          {" "}
          <span className={secondClass} style={{ display: "inline-block" }}>{second}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(".hero-harvey",  { x: "-35vw", ease: "none" }, 0)
        .to(".hero-specter", { x: "35vw",  ease: "none" }, 0)
        .to(".hero-hello",   { x: "-17vw", ease: "none" }, 0)
        .to(bgRef.current,   { scale: 1.12, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      className="relative h-screen min-h-[635px] flex flex-col px-4 md:px-8 overflow-hidden"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* Bottom blur/frost overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]" />

      <Navbar />

      <div className="flex-1" />

      {/* Hero content */}
      <div className="relative pb-8 md:pb-14 flex flex-col">

        <div className="w-full">
          {/* "[Hello I'm]" label */}
          <div
            className="hero-hello flex items-center justify-center md:justify-start px-[18px] mb-[-15px]"
          >
            <p
              className="text-[14px] text-white uppercase mix-blend-overlay leading-[1.1]"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              [ Hello i&apos;m ]
            </p>
          </div>

          {/* Mobile: Harvey and Specter each fill the line separately */}
          <div className="md:hidden">
            <div className="hero-harvey"><FitLine lineHeight={0.82}>Harvey</FitLine></div>
            <div className="hero-specter"><FitLine lineHeight={0.82}>Specter</FitLine></div>
          </div>

          {/* Desktop: "Harvey Specter" fills one line; each word is a separate
              inline-block span so GSAP can split them left/right on scroll */}
          <div className="hidden md:block">
            <SplitFitLine
              first="Harvey"
              second="Specter"
              firstClass="hero-harvey"
              secondClass="hero-specter"
              lineHeight={1.1}
            />
          </div>
        </div>

        {/* Description + CTA */}
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
            <MagneticButton
              href="#contact"
              className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px]"
            >
              Let&apos;s talk
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
