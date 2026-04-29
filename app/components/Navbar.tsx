"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
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
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <HamburgerIcon open={open} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm flex flex-col gap-5 pt-4 pb-6 px-0 border-t border-black/10 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-semibold text-[16px] tracking-[-0.64px] text-black capitalize"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px] mt-1"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </a>
        </div>
      )}
    </nav>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <>
          <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
