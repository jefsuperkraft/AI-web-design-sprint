"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LETTERS = ["M", "S", "K", "N", "S"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Line expands first
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 1, transformOrigin: "left center" },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }
      )
      // Letters drop in with stagger
      .fromTo(
        lettersRef.current,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.4)",
        },
        "-=0.2"
      )
      // Line fades out
      .to(lineRef.current, { opacity: 0, duration: 0.4 }, "+=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center bg-black gap-6"
    >
      <div
        ref={lineRef}
        className="fixed top-0 left-0 h-1 w-full bg-white origin-left"
        style={{ opacity: 0 }}
      />
      <h1
        className="text-8xl font-black tracking-widest text-white flex"
        style={{ perspective: "600px" }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            style={{ opacity: 0, display: "inline-block" }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </main>
  );
}
