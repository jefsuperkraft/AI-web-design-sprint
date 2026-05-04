"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMAGE =
  "https://www.figma.com/api/mcp/asset/ba504f8d-e081-4a0e-a5db-f5f53545e3da";

export default function FullBleed() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { filter: "blur(24px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            // starts blurry when bottom of section enters viewport
            start: "top bottom",
            // fully sharp when section top hits 50% of viewport height
            end: "top center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      className="w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900] bg-white"
    >
      <img
        ref={imgRef}
        src={IMAGE}
        alt=""
        className="w-full h-full object-cover object-center"
        style={{ willChange: "filter" }}
      />
    </section>
  );
}
