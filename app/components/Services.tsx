"use client";

import { useRef } from "react";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

export type DeliverableItem = {
  _id: string;
  title: string;
  description: string;
  image: SanityImageSource;
  order?: number;
};

export function ServiceRow({ item, index }: { item: DeliverableItem; index: number }) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLParagraphElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const numRef     = useRef<HTMLParagraphElement>(null);

  const imgUrl = urlFor(item.image).auto("format").width(151).height(151).fit("crop").url();

  function onEnter() {
    gsap.to(dividerRef.current, { backgroundColor: "#ffffff", duration: 0.35, ease: "power2.out" });
    gsap.to(titleRef.current,   { x: 12, duration: 0.4, ease: "power2.out" });
    gsap.to(imgRef.current,     { scale: 1.08, duration: 0.55, ease: "power2.out" });
    gsap.to(numRef.current,     { opacity: 1, duration: 0.3, ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(dividerRef.current, { backgroundColor: "rgba(255,255,255,0.2)", duration: 0.5, ease: "power2.inOut" });
    gsap.to(titleRef.current,   { x: 0, duration: 0.6, ease: "back.out(2.5)" });
    gsap.to(imgRef.current,     { scale: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(numRef.current,     { opacity: 0.4, duration: 0.4, ease: "power2.inOut" });
  }

  return (
    <div
      className="flex flex-col gap-2 group"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Number */}
      <p
        ref={numRef}
        className="text-[14px] uppercase leading-[1.1] text-white"
        style={{ ...MONO, opacity: 0.4 }}
      >
        [ {index + 1} ]
      </p>

      {/* Divider — inline style so GSAP can animate backgroundColor directly */}
      <div
        ref={dividerRef}
        className="w-full h-px"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
      />

      {/* Content */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6 pt-2">
        <p
          ref={titleRef}
          className="font-bold italic text-[36px] leading-[1.1] text-white uppercase whitespace-nowrap shrink-0"
          style={{ letterSpacing: "-0.04em" }}
        >
          {item.title}
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          <p
            className="text-[14px] leading-[1.3] text-white md:w-[393px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            {item.description}
          </p>

          <div className="relative size-[151px] shrink-0 overflow-hidden">
            <img
              ref={imgRef}
              src={imgUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services({ items }: { items: DeliverableItem[] }) {
  return (
    <section data-nav-dark className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12">

      <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
        [ services ]
      </p>

      <div
        className="flex justify-between items-center text-white uppercase font-light whitespace-nowrap text-[32px] md:text-[6.67vw]"
        style={{ letterSpacing: "-0.08em" }}
      >
        <span>[{items.length}]</span>
        <span>Deliverables</span>
      </div>

      <div className="flex flex-col gap-12">
        {items.map((item, i) => (
          <ServiceRow key={item._id} item={item} index={i} />
        ))}
      </div>

    </section>
  );
}
