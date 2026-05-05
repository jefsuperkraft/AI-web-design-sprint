"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marko Stojković",
    company: "Ventures Co.",
    quote:
      "Working with H.Studio completely transformed our digital presence. Their design approach is both thoughtful and remarkably bold.",
    initials: "MS",
    color: "#E8E0D8",
    desktop: { left: "7.1%", top: "142px", rotate: "-6.85deg" },
    mobileRotate: "-3deg",
    parallax: { y: -65, rotDelta: 4 },
  },
  {
    id: 2,
    name: "Lukas Weber",
    company: "Tech Ventures",
    quote:
      "The team delivered beyond every expectation. Clean, modern, and deeply considered design work from start to finish.",
    initials: "LW",
    color: "#D8E0E8",
    desktop: { left: "46.9%", top: "272px", rotate: "2.9deg" },
    mobileRotate: "2.5deg",
    behindTitle: true,
    parallax: { y: -90, rotDelta: -4 },
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    company: "Creative Agency",
    quote:
      "H.Studio understands brand identity at a fundamental level. The results speak for themselves — truly impressive work.",
    initials: "SJ",
    color: "#E0E8D8",
    desktop: { left: "21.2%", top: "553px", rotate: "2.23deg" },
    mobileRotate: "-2deg",
    parallax: { y: -50, rotDelta: 3 },
  },
  {
    id: 4,
    name: "Sofia Martínez",
    company: "Design Studio",
    quote:
      "Exceptional collaboration, precise execution, and a final product that exceeded every brief we set out with.",
    initials: "SM",
    color: "#E8D8E0",
    desktop: { left: "68.5%", top: "546px", rotate: "-4.15deg" },
    mobileRotate: "3deg",
    parallax: { y: -75, rotDelta: -5 },
  },
];

function LogoPlaceholder({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-[11px] font-bold text-black/60 tracking-wider">{initials}</span>
    </div>
  );
}

function Card({
  t,
  width,
  quoteSize,
  nameSize,
}: {
  t: (typeof TESTIMONIALS)[0];
  width: string;
  quoteSize: string;
  nameSize: string;
}) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 shrink-0"
      style={{ width }}
    >
      <LogoPlaceholder initials={t.initials} color={t.color} />
      <p
        className={`${quoteSize} text-black leading-[1.3]`}
        style={{ letterSpacing: "-0.04em" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <p
        className={`${nameSize} font-black uppercase text-black`}
        style={{ letterSpacing: "-0.04em" }}
      >
        {t.name}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const desktopRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      TESTIMONIALS.forEach((t) => {
        const el = desktopRef.current?.querySelector<HTMLElement>(`.tcard-${t.id}`);
        if (!el) return;

        const baseRot = parseFloat(t.desktop.rotate);

        gsap.fromTo(
          el,
          { rotation: baseRot, y: 0 },
          {
            rotation: baseRot + t.parallax.rotDelta,
            y: t.parallax.y,
            ease: "none",
            scrollTrigger: {
              trigger: desktopRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── DESKTOP ── */}
      <section
        ref={desktopRef}
        className="hidden md:block relative bg-white overflow-hidden"
        style={{ minHeight: "900px" }}
      >
        {/* Large centered heading */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none">
          <span
            className="font-medium capitalize text-black text-center leading-none"
            style={{ fontSize: "13.75vw", letterSpacing: "-0.07em" }}
          >
            Testimonials
          </span>
        </div>

        {/* Absolutely positioned rotated cards */}
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className={`tcard-${t.id} absolute ${'behindTitle' in t && t.behindTitle ? "z-0" : "z-[2]"}`}
            style={{
              left: t.desktop.left,
              top: t.desktop.top,
              transform: `rotate(${t.desktop.rotate})`,
            }}
          >
            <Card t={t} width="353px" quoteSize="text-[18px]" nameSize="text-[16px]" />
          </div>
        ))}
      </section>

      {/* ── MOBILE ── */}
      <section className="md:hidden bg-white px-4 py-16">
        <h2
          className="font-medium capitalize text-black text-center"
          style={{ fontSize: "64px", letterSpacing: "-0.07em", lineHeight: 0.8 }}
        >
          Testimonials
        </h2>

        <div
          className="scroll-hide flex gap-6 overflow-x-auto mt-8 pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              style={{ transform: `rotate(${t.mobileRotate})` }}
            >
              <Card t={t} width="260px" quoteSize="text-[15px]" nameSize="text-[14px]" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
