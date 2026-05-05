"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "News", href: "/#news" },
  { label: "Contact", href: "/#contact" },
];

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasOpened = useRef(false);

  // Color-inversion targets
  const logoRef        = useRef<HTMLAnchorElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const hamburgerRef   = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Mobile open / close animation
  useEffect(() => {
    if (!open && !hasOpened.current) return;

    const overlay = overlayRef.current;
    const links = mobileLinkRefs.current.filter(Boolean) as HTMLElement[];
    if (!overlay) return;

    gsap.killTweensOf([overlay, ...links]);

    if (open) {
      hasOpened.current = true;
      gsap.set(overlay, { visibility: "visible" });
      gsap.fromTo(overlay,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power3.inOut" }
      );
      gsap.fromTo(links,
        { opacity: 0 },
        { opacity: 1, stagger: 0.07, duration: 0.5, ease: "power1.out", delay: 0.2 }
      );
    } else {
      gsap.to(links, {
        opacity: 0,
        stagger: { each: 0.07, from: "end" },
        duration: 0.35,
        ease: "power1.in",
      });
      const staggerTotal = (links.length - 1) * 0.07 + 0.35;
      gsap.to(overlay, {
        x: "-100%",
        duration: 0.5,
        ease: "power3.inOut",
        delay: staggerTotal,
        onComplete: () => gsap.set(overlay, { visibility: "hidden" }),
      });
    }

    return () => { gsap.killTweensOf([overlay, ...links]); };
  }, [open]);

  // Nav color inversion — logo + links go white over [data-nav-dark] sections.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const darkSections = gsap.utils.toArray<Element>("[data-nav-dark]");

    // Determine whether the page starts with the nav over a dark section.
    // The nav is fixed at top:0, so a section is "behind" it when top ≤ 0 < bottom.
    const overDarkAtMount = darkSections.some((s) => {
      const { top, bottom } = (s as HTMLElement).getBoundingClientRect();
      return top <= 0 && bottom > 0;
    });

    // Mobile: hamburger is not fixed, so it only needs the initial color set —
    // no scroll tracking required (the nav scrolls out of view as the user scrolls).
    if (overDarkAtMount && hamburgerRef.current) {
      gsap.set(hamburgerRef.current, { color: "white" });
    }

    // Desktop: fixed nav needs both initial color and scroll-driven transitions.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const logo  = logoRef.current;
      const links = desktopLinksRef.current;
      if (!logo || !links) return;

      const goLight = () =>
        gsap.to([logo, links], { color: "white", duration: 0.4, ease: "power2.inOut" });
      const goDark = () =>
        gsap.to([logo, links], { color: "black", duration: 0.4, ease: "power2.inOut" });

      const activeDark = new Set<Element>();
      const update = () => (activeDark.size > 0 ? goLight() : goDark());

      // Instant initial color — avoids a visible black→white fade on page load.
      darkSections.forEach((section) => {
        const { top, bottom } = (section as HTMLElement).getBoundingClientRect();
        if (top <= 0 && bottom > 0) activeDark.add(section);
      });
      if (activeDark.size > 0) gsap.set([logo, links], { color: "white" });

      // Animated transitions as the user scrolls.
      darkSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onEnter:      () => { activeDark.add(section);    update(); },
          onLeave:      () => { activeDark.delete(section); update(); },
          onEnterBack:  () => { activeDark.add(section);    update(); },
          onLeaveBack:  () => { activeDark.delete(section); update(); },
        });
      });

      return () => { gsap.set([logo, links], { clearProps: "color" }); };
    });

    return () => mm.revert();
  }, []);

  // Desktop underline hover
  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { "--uw": 1, duration: 0.35, ease: "power2.out", overwrite: true });
  };
  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { "--uw": 0, duration: 0.25, ease: "power2.in", overwrite: true });
  };

  return (
    <>
      {/* ── Nav bar ── */}
      <nav className="relative z-20 md:fixed md:top-0 md:left-0 md:right-0 md:z-50 md:px-8 flex items-center justify-between py-6 shrink-0">
        {/* Logo */}
        <a
          ref={logoRef}
          href="/"
          className="font-semibold text-[16px] tracking-[-0.64px] text-black capitalize select-none"
        >
          H.Studio
        </a>

        {/* Desktop links */}
        <div
          ref={desktopLinksRef}
          className="hidden md:flex items-center gap-14 font-semibold text-[16px] tracking-[-0.64px] text-black capitalize"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-desktop-link"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA — intentionally not inverted */}
        <MagneticButton
          href="/#contact"
          className="hidden md:flex items-center justify-center bg-black text-white text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px]"
        >
          Let&apos;s talk
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden p-1"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        ref={overlayRef}
        className="mobile-overlay fixed inset-0 z-50 bg-black flex flex-col md:hidden"
        aria-hidden={!open}
      >
        {/* Top bar: logo + close */}
        <div className="flex items-center justify-between px-4 py-6 shrink-0">
          <span className="font-semibold text-[16px] tracking-[-0.64px] text-white capitalize select-none">
            H.Studio
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-5">
          <p className="text-white/40 text-[11px] uppercase mb-2" style={MONO}>
            [ navigation ]
          </p>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { mobileLinkRefs.current[i] = el; }}
              href={link.href}
              className="mobile-nav-link text-white font-light uppercase leading-[1] hover:opacity-50 transition-opacity duration-200"
              style={{ fontSize: "clamp(32px, 10vw, 40px)", letterSpacing: "-0.08em" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="px-8 pb-10 flex items-center gap-4">
          <MagneticButton
            href="/#contact"
            className="bg-white text-black text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-4 py-3"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </MagneticButton>
          <span className="text-white/30 text-[11px] uppercase" style={MONO}>
            H.Studio © 2026
          </span>
        </div>
      </div>
    </>
  );
}
