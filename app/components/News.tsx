"use client";

import { useRef } from "react";
import { Fragment } from "react";
import gsap from "gsap";

const NEWS_ITEMS = [
  {
    id: 1,
    image: "https://www.figma.com/api/mcp/asset/6c5422cc-d167-458f-95c6-ed7a760a4500",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
    stagger: false,
  },
  {
    id: 2,
    image: "https://www.figma.com/api/mcp/asset/8065a921-ab46-4594-96b9-b9bee5ad4965",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
    stagger: true,
  },
  {
    id: 3,
    image: "https://www.figma.com/api/mcp/asset/fd31de8f-0ad6-4308-a6ee-04958ff7a2de",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
    stagger: false,
  },
];

function ArrowDiagonal() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4.5 13.5L13.5 4.5M13.5 4.5H7M13.5 4.5V11"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewsCard({ item }: { item: (typeof NEWS_ITEMS)[0] }) {
  const imgRef   = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(imgRef.current,   { scale: 1.06, duration: 0.55, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 2, y: -2, duration: 0.4, ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(imgRef.current,   { scale: 1, duration: 0.6, ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.5, ease: "back.out(2)" });
  }

  return (
    <div
      className="flex flex-col gap-4 w-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Portrait image — 3:4 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <img
          ref={imgRef}
          src={item.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p
        className="text-[14px] text-[#1f1f1f] leading-[1.3]"
        style={{ letterSpacing: "-0.56px" }}
      >
        {item.excerpt}
      </p>
      <a
        href={item.href}
        className="flex gap-[10px] items-center border-b border-black pb-[4px] self-start hover:opacity-60 transition-opacity duration-200"
      >
        <span
          className="text-[14px] font-medium text-black whitespace-nowrap"
          style={{ letterSpacing: "-0.56px" }}
        >
          Read more
        </span>
        <span ref={arrowRef}>
          <ArrowDiagonal />
        </span>
      </a>
    </div>
  );
}

export default function News() {
  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="hidden md:flex bg-[#f3f3f3] px-8 py-[120px] items-end gap-8">

        {/* Rotated title */}
        <div className="flex items-center justify-center shrink-0 w-[110px] h-[706px]">
          <div
            className="font-light uppercase text-black whitespace-nowrap"
            style={{
              transform: "rotate(-90deg)",
              fontSize: "64px",
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
            }}
          >
            <p>Keep up with my latest</p>
            <p>news &amp; achievements</p>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          className="scroll-hide flex-1 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-[31px] items-start">
            {NEWS_ITEMS.map((item, i) => (
              <Fragment key={item.id}>
                {i > 0 && (
                  <div className="w-px bg-black/20 self-stretch shrink-0" />
                )}
                <div style={{ flex: "1 0 353px", paddingTop: item.stagger ? "120px" : undefined }}>
                  <NewsCard item={item} />
                </div>
              </Fragment>
            ))}
          </div>
        </div>

      </section>

      {/* ── MOBILE ── */}
      <section className="md:hidden bg-[#f3f3f3] px-4 py-16">
        <div className="flex flex-col gap-8">

          <h2
            className="font-light uppercase text-black"
            style={{ fontSize: "32px", letterSpacing: "-0.08em", lineHeight: 0.86 }}
          >
            Keep up with my latest news &amp; achievements
          </h2>

          <div
            className="scroll-hide flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {NEWS_ITEMS.map((item) => (
              <div key={item.id} style={{ flex: "0 0 300px" }}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
