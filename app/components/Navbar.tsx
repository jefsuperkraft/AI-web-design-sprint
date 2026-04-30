"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between py-6 shrink-0">
        {/* Logo */}
        <span className="font-semibold text-[16px] tracking-[-0.64px] text-black capitalize select-none">
          H.Studio
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-14 font-semibold text-[16px] tracking-[-0.64px] text-black capitalize">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:opacity-60 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center justify-center bg-black text-white text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px] hover:opacity-80 transition-opacity duration-200"
        >
          Let&apos;s talk
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <line x1="3" y1="6"  x2="21" y2="6"  stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className="fixed inset-0 z-50 bg-black flex flex-col md:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          visibility: open ? "visible" : "hidden",
        }}
        aria-hidden={!open}
      >
        {/* Top bar: logo + close button */}
        <div className="flex items-center justify-between px-4 py-6 shrink-0">
          <span className="font-semibold text-[16px] tracking-[-0.64px] text-white capitalize select-none">
            H.Studio
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links — vertically centered, left-aligned */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-5">
          <p className="text-white/40 text-[11px] uppercase mb-2" style={MONO}>
            [ navigation ]
          </p>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white font-light uppercase leading-[1] hover:opacity-50 transition-opacity duration-200"
              style={{
                fontSize: "clamp(32px, 10vw, 40px)",
                letterSpacing: "-0.08em",
                transitionDelay: open ? `${i * 55}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 55}ms, transform 0.4s ease ${i * 55}ms`,
              }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom: CTA + small label */}
        <div className="px-8 pb-10 flex items-center gap-4">
          <a
            href="#contact"
            className="bg-white text-black text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-4 py-3 hover:opacity-80 transition-opacity"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </a>
          <span className="text-white/30 text-[11px] uppercase" style={MONO}>
            H.Studio © 2026
          </span>
        </div>
      </div>
    </>
  );
}
