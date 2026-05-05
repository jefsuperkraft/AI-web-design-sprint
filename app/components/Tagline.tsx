"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };
const PLAYFAIR: React.CSSProperties = { fontFamily: "var(--font-playfair), serif" };

const LINE_BASE =
  "font-light uppercase whitespace-nowrap leading-[0.84]";

const DIM = "#c8c8c8";   // unfilled color
const FILL = "#1f1f1f";  // filled color

function Ampersand() {
  return (
    <span className="italic font-normal" style={PLAYFAIR}>
      &amp;
    </span>
  );
}

export default function Tagline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 55%",
        scrub: 1.5,
      };

      // Desktop lines fill in order
      gsap.timeline({ scrollTrigger: trigger })
        .to(gsap.utils.toArray(".tl-d", sectionRef.current!), {
          color: FILL,
          stagger: 0.12,
          ease: "none",
          duration: 0.4,
        });

      // Mobile lines fill in order
      gsap.timeline({ scrollTrigger: trigger })
        .to(gsap.utils.toArray(".tl-m", sectionRef.current!), {
          color: FILL,
          stagger: 0.12,
          ease: "none",
          duration: 0.4,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-12 md:py-[120px]">

      {/* Header: label + rule */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p
          className="tl-d tl-m text-right text-[14px] uppercase leading-[1.1]"
          style={{ ...MONO, color: DIM }}
        >
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]/20" />
      </div>

      {/* ── MOBILE ─────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-2 items-center text-center">
        <p className="tl-m text-[14px] leading-[1.1]" style={{ ...MONO, color: DIM }}>
          001
        </p>
        <p className={`${LINE_BASE} tl-m text-[32px]`} style={{ letterSpacing: "-0.08em", color: DIM }}>
          {`A creative director   /`}
        </p>
        <p className={`${LINE_BASE} tl-m text-[32px]`} style={{ letterSpacing: "-0.08em", color: DIM }}>
          Photographer
        </p>
        <p className={`${LINE_BASE} tl-m text-[32px]`} style={{ letterSpacing: "-0.08em", color: DIM }}>
          Born <Ampersand /> raised
        </p>
        <p className={`${LINE_BASE} tl-m text-[32px]`} style={{ letterSpacing: "-0.08em", color: DIM }}>
          on the south side
        </p>
        <p className={`${LINE_BASE} tl-m text-[32px]`} style={{ letterSpacing: "-0.08em", color: DIM }}>
          of chicago.
        </p>
        <p className="tl-m text-[14px] leading-[1.1] mt-1" style={{ ...MONO, color: DIM }}>
          [ creative freelancer ]
        </p>
      </div>

      {/* ── DESKTOP ────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col uppercase" style={{ gap: "0.56vw" }}>

        {/* Line 1 */}
        <div className="flex items-start gap-3">
          <span
            className={`${LINE_BASE} tl-d text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", whiteSpace: "pre", color: DIM }}
          >
            {`A creative director   /`}
          </span>
          <span
            className="tl-d text-[14px] leading-[1.1] pt-1 shrink-0"
            style={{ ...MONO, color: DIM }}
          >
            001
          </span>
        </div>

        {/* Line 2 — ~15.6% indent */}
        <div style={{ paddingLeft: "15.6%" }}>
          <span
            className={`${LINE_BASE} tl-d text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", color: DIM }}
          >
            Photographer
          </span>
        </div>

        {/* Line 3 — ~44.3% indent */}
        <div style={{ paddingLeft: "44.3%" }}>
          <span
            className={`${LINE_BASE} tl-d text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", color: DIM }}
          >
            Born <Ampersand /> raised
          </span>
        </div>

        {/* Line 4 — no indent */}
        <div>
          <span
            className={`${LINE_BASE} tl-d text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", color: DIM }}
          >
            on the south side
          </span>
        </div>

        {/* Line 5 — ~44% indent + label below */}
        <div className="flex flex-col items-start" style={{ paddingLeft: "44%" }}>
          <span
            className={`${LINE_BASE} tl-d text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", color: DIM }}
          >
            of chicago.
          </span>
          <span
            className="tl-d text-[14px] leading-[1.1] mt-2"
            style={{ ...MONO, color: DIM }}
          >
            [ creative freelancer ]
          </span>
        </div>

      </div>
    </section>
  );
}
