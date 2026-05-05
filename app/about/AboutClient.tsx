"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MagneticButton from "@/app/components/MagneticButton";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AboutPageData = {
  name?: string;
  portrait?: SanityImageSource;
  heroTagline?: string;
  heroTags?: string[];
  pullQuote?: string;
  bio?: string;
  stats?: { _key: string; value: string; label: string }[];
  expertise?: { _key: string; title: string; description: string }[];
  philosophyLines?: string[];
  processSteps?: { _key: string; title: string; description: string }[];
  awards?: { _key: string; year: string; award: string; org: string }[];
};

// ─── Fallbacks (used until the CMS document is published) ────────────────────
const FALLBACK_PORTRAIT = "https://www.figma.com/api/mcp/asset/6559290e-0bcc-4984-84fe-71d699bba7ae";

const FALLBACK: Required<AboutPageData> = {
  name: "Harvey Specter",
  portrait: null as unknown as SanityImageSource,
  heroTagline: "Eight years of brand direction, photography, and digital design — all in service of work that endures.",
  heroTags: ["Creative Director", "Photographer", "Chicago, IL"],
  pullQuote: "Design is not just how it looks — it's how it makes people feel.",
  bio: "Born and raised on the south side of Chicago, I grew up surrounded by raw creativity — street murals, jazz, architecture that refused to be ordinary. That environment shaped the way I see the world and, ultimately, the way I work.\n\nOver the past eight years, I've collaborated with brands ranging from independent artists to global studios, helping them distil their identity into something people actually remember. My process is rigorous and intuitive in equal measure.\n\nToday, H.Studio is my vehicle for that work. A full-service creative studio where brand direction, photography, and web design converge into experiences that endure.",
  stats: [
    { _key: "a", value: "8+",   label: "Years experience" },
    { _key: "b", value: "120+", label: "Projects delivered" },
    { _key: "c", value: "40+",  label: "Brands elevated" },
  ],
  expertise: [
    { _key: "1", title: "Photography",    description: "Documenting culture, people, and ideas through a lens that captures the unseen moment before it disappears." },
    { _key: "2", title: "Brand Direction", description: "Building visual identities that speak with authority and resonate deeply with the right audience." },
    { _key: "3", title: "Web Design",     description: "Crafting digital experiences that are as functional as they are breathtaking to move through." },
    { _key: "4", title: "Art Direction",  description: "Leading creative vision across campaigns, editorial shoots, and long-form brand systems." },
    { _key: "5", title: "Motion Design",  description: "Bringing static design to life with purposeful, elegant animation that adds meaning — never noise." },
  ],
  philosophyLines: [
    "Great design",
    "is never an accident —",
    "it is the result of",
    "intention,",
    "craft & obsession.",
  ],
  processSteps: [
    { _key: "1", title: "Discover", description: "Before a single pixel is drawn, we go deep. Your brand, your goals, your audience — and the space you want to own." },
    { _key: "2", title: "Define",   description: "Insight becomes direction. We align on creative strategy, visual language, and what success actually looks like." },
    { _key: "3", title: "Design",   description: "The craft phase. Obsessive, pixel-perfect execution across every touchpoint and every deliverable." },
    { _key: "4", title: "Deliver",  description: "Launch with intention. We refine, test, and hand off work built to last — then stay in your corner." },
  ],
  awards: [
    { _key: "1", year: "2024", award: "Site of the Day",   org: "Awwwards" },
    { _key: "2", year: "2024", award: "Best Portfolio",    org: "CSS Design Awards" },
    { _key: "3", year: "2023", award: "Site of the Month", org: "FWA" },
    { _key: "4", year: "2023", award: "Developer Award",   org: "Awwwards" },
    { _key: "5", year: "2022", award: "Featured Project",  org: "Behance" },
  ],
};

function get<K extends keyof AboutPageData>(
  data: AboutPageData | null,
  key: K
): Required<AboutPageData>[K] {
  const val = data?.[key];
  return (val !== undefined && val !== null && (typeof val !== 'string' || val.trim() !== '')
    ? val
    : FALLBACK[key]) as Required<AboutPageData>[K];
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };
const PHIL_INDENTS = ["0%", "14%", "38%", "0%", "26%"];

// ─── Expertise row ────────────────────────────────────────────────────────────
function ExpertiseRow({
  item,
  index,
}: {
  item: { _key: string; title: string; description: string };
  index: number;
}) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLParagraphElement>(null);
  const numRef     = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(dividerRef.current, { backgroundColor: "#ffffff",              duration: 0.35, ease: "power2.out" });
    gsap.to(titleRef.current,   { x: 12,                                   duration: 0.4,  ease: "power2.out" });
    gsap.to(numRef.current,     { opacity: 1,                              duration: 0.3,  ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(dividerRef.current, { backgroundColor: "rgba(255,255,255,0.2)", duration: 0.5,  ease: "power2.inOut" });
    gsap.to(titleRef.current,   { x: 0,                                    duration: 0.6,  ease: "back.out(2.5)" });
    gsap.to(numRef.current,     { opacity: 0.4,                            duration: 0.4,  ease: "power2.inOut" });
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="flex flex-col gap-2" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <span ref={numRef} className="text-[14px] uppercase text-white" style={{ ...MONO, opacity: 0.4 }}>
        [ {num} ]
      </span>
      <div ref={dividerRef} className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-6 pt-2">
        <p
          ref={titleRef}
          className="font-bold italic text-[36px] leading-[1.1] text-white uppercase shrink-0"
          style={{ letterSpacing: "-0.04em" }}
        >
          {item.title}
        </p>
        <p className="text-[14px] leading-[1.4] text-white/70 md:max-w-[420px]" style={{ letterSpacing: "-0.02em" }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────
function HeroSection({ data }: { data: AboutPageData | null }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  const name       = get(data, "name");
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");
  const tags      = get(data, "heroTags");
  const tagline   = get(data, "heroTagline");

  const portraitSrc = data?.portrait
    ? urlFor(data.portrait).auto("format").width(900).height(1200).fit("crop").url()
    : FALLBACK_PORTRAIT;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power3.inOut",
        delay: 0.2,
      });
      gsap.from(".hero-line", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(portraitRef.current, {
          y: "-12vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      className="relative bg-black min-h-screen flex flex-col px-4 md:px-8 overflow-hidden"
    >
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row md:items-end gap-10 md:gap-16 pb-12 md:pb-20 mt-20 md:mt-0">

        {/* Left — name + intro */}
        <div className="flex flex-col gap-6 md:w-[52%]">
          <p className="hero-line text-[14px] uppercase text-white/40" style={MONO}>
            [ 001 — About ]
          </p>
          <h1
            className="text-white uppercase leading-[0.88] font-bold italic"
            style={{ fontSize: "clamp(54px, 8.5vw, 122px)", letterSpacing: "-0.05em" }}
          >
            <span className="hero-line block">{first}</span>
            {last && (
              <span className="hero-line block" style={{ paddingLeft: "16%" }}>{last}</span>
            )}
          </h1>
          <div className="hero-line flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/20 text-white/40 text-[12px] uppercase px-3 py-[5px] rounded-full"
                style={MONO}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="hero-line text-white/50 text-[14px] leading-[1.5] max-w-[340px]" style={{ letterSpacing: "-0.02em" }}>
            {tagline}
          </p>
          <div className="hero-line">
            <MagneticButton
              href="/#contact"
              className="self-start bg-white text-black text-[14px] font-medium px-5 py-3 rounded-full"
              style={{ letterSpacing: "-0.04em" }}
            >
              Let&apos;s work together
            </MagneticButton>
          </div>
        </div>

        {/* Right — portrait */}
        <div ref={portraitRef} className="md:flex-1 shrink-0">
          <div
            className="relative overflow-hidden w-full"
            style={{ aspectRatio: "436/614", maxWidth: "460px" }}
          >
            <img src={portraitSrc} alt={name} className="w-full h-full object-cover" />
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black"
              style={{ clipPath: "inset(0 0% 0 0)" }}
            />
          </div>
        </div>

      </div>

      <span className="absolute bottom-12 right-8 hidden md:block text-white/25 text-[14px]" style={MONO}>
        001 / 005
      </span>
    </section>
  );
}

// ─── 2. Bio ───────────────────────────────────────────────────────────────────
function BioSection({ data }: { data: AboutPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);

  const pullQuote = get(data, "pullQuote");
  const bio       = get(data, "bio");
  const stats     = get(data, "stats");
  const paragraphs = bio.split(/\n\n+/).filter(Boolean);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".bio-el", {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-16 md:py-[120px]">
      <div className="flex items-start justify-between mb-10 md:mb-16">
        <p className="bio-el text-[14px] uppercase text-[#1f1f1f]" style={MONO}>[ Story ]</p>
        <p className="bio-el text-[14px] uppercase text-[#1f1f1f]/30" style={MONO}>002</p>
      </div>
      <div className="w-full h-px bg-[#1f1f1f]/10 mb-10 md:mb-16" />
      <div className="flex flex-col md:flex-row gap-12 md:gap-20">

        {/* Pull quote */}
        <div className="md:w-[45%] shrink-0">
          <p
            className="bio-el font-bold italic text-[#1f1f1f] leading-[0.92]"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(28px, 3.5vw, 52px)",
              letterSpacing: "-0.04em",
            }}
          >
            &ldquo;{pullQuote}&rdquo;
          </p>
        </div>

        {/* Body + stats */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            {paragraphs.map((para, i) => (
              <p key={i} className="bio-el text-[15px] leading-[1.65] text-[#1f1f1f]/70" style={{ letterSpacing: "-0.02em" }}>
                {para}
              </p>
            ))}
          </div>
          <div className="bio-el flex gap-10 md:gap-16 pt-6 border-t border-[#1f1f1f]/10">
            {stats.map((s) => (
              <div key={s._key} className="flex flex-col gap-1">
                <span
                  className="font-bold text-[#1f1f1f] leading-none"
                  style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-0.06em" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] uppercase text-[#1f1f1f]/40" style={MONO}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── 3. Expertise ─────────────────────────────────────────────────────────────
function ExpertiseSection({ data }: { data: AboutPageData | null }) {
  const expertise = get(data, "expertise");
  return (
    <section data-nav-dark className="bg-black px-4 md:px-8 py-16 md:py-[120px] flex flex-col gap-10 md:gap-14">
      <div className="flex items-start justify-between">
        <p className="text-[14px] uppercase text-white" style={MONO}>[ Expertise ]</p>
        <p className="text-[14px] uppercase text-white/30" style={MONO}>003</p>
      </div>
      <div
        className="font-light uppercase text-white leading-[1]"
        style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
      >
        Disciplines
      </div>
      <div className="flex flex-col gap-10 md:gap-14">
        {expertise.map((item, i) => (
          <ExpertiseRow key={item._key} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── 4. Philosophy ────────────────────────────────────────────────────────────
function PhilosophySection({ data }: { data: AboutPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lines = get(data, "philosophyLines");

  const DIM  = "#c8c8c8";
  const FILL = "#1f1f1f";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1.5,
        },
      }).to(".phil-line", { color: FILL, stagger: 0.12, ease: "none", duration: 0.4 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-16 md:py-[120px]">
      <div className="flex flex-col gap-3 items-end mb-8">
        <p className="phil-line text-right text-[14px] uppercase leading-[1.1]" style={{ ...MONO, color: DIM }}>
          [ Philosophy ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]/20" />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col" style={{ gap: "0.5vw" }}>
        {lines.map((text, i) => (
          <div key={i} style={{ paddingLeft: PHIL_INDENTS[i % PHIL_INDENTS.length] }}>
            <span
              className="phil-line font-light uppercase whitespace-nowrap leading-[0.86]"
              style={{ fontSize: "clamp(32px, 5.5vw, 80px)", letterSpacing: "-0.08em", color: DIM }}
            >
              {text}
            </span>
          </div>
        ))}
        <div style={{ paddingLeft: "44%" }}>
          <span className="phil-line text-[14px]" style={{ ...MONO, color: DIM }}>[ H.Studio ]</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-2 items-center text-center">
        {lines.map((text, i) => (
          <p
            key={i}
            className="phil-line font-light uppercase leading-[0.9] text-[32px]"
            style={{ letterSpacing: "-0.08em", color: DIM }}
          >
            {text}
          </p>
        ))}
        <p className="phil-line text-[14px] mt-2" style={{ ...MONO, color: DIM }}>[ H.Studio ]</p>
      </div>
    </section>
  );
}

// ─── 5. Process ───────────────────────────────────────────────────────────────
function ProcessSection({ data }: { data: AboutPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const steps = get(data, "processSteps");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".process-step", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-16 md:py-[120px] border-t border-[#1f1f1f]/10">
      <div className="flex items-start justify-between mb-12 md:mb-20">
        <p className="text-[14px] uppercase text-[#1f1f1f]" style={MONO}>[ Process ]</p>
        <p className="text-[14px] uppercase text-[#1f1f1f]/30" style={MONO}>004</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 md:gap-y-14">
        {steps.map((step, i) => (
          <div key={step._key} className="process-step flex gap-6 items-start">
            <span className="text-[14px] text-[#1f1f1f]/30 shrink-0 mt-[6px]" style={MONO}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-3 flex-1">
              <div className="w-full h-px bg-[#1f1f1f]/12" />
              <p
                className="font-bold italic uppercase text-[#1f1f1f] leading-none"
                style={{ fontSize: "clamp(22px, 2.4vw, 34px)", letterSpacing: "-0.04em" }}
              >
                {step.title}
              </p>
              <p className="text-[14px] leading-[1.5] text-[#1f1f1f]/55" style={{ letterSpacing: "-0.02em" }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 6. Awards ────────────────────────────────────────────────────────────────
function AwardsSection({ data }: { data: AboutPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const awards = get(data, "awards");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".award-row", sectionRef.current!).forEach((row, i) => {
        gsap.from(row, {
          x: -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-dark className="bg-black px-4 md:px-8 py-16 md:py-[120px]">
      <div className="flex items-start justify-between mb-10 md:mb-16">
        <p className="text-[14px] uppercase text-white" style={MONO}>[ Recognition ]</p>
        <p className="text-[14px] uppercase text-white/30" style={MONO}>005</p>
      </div>
      <div
        className="font-light uppercase text-white mb-12 md:mb-16"
        style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em", lineHeight: 1 }}
      >
        Awards
      </div>
      <div className="flex flex-col">
        {awards.map((award) => (
          <div key={award._key} className="award-row">
            <div className="w-full h-px bg-white/12" />
            <div className="flex items-center gap-4 md:gap-8 py-5 md:py-6">
              <span className="text-white/35 text-[14px] shrink-0 w-12" style={MONO}>{award.year}</span>
              <p
                className="font-bold italic uppercase text-white flex-1"
                style={{ fontSize: "clamp(16px, 1.9vw, 26px)", letterSpacing: "-0.04em" }}
              >
                {award.award}
              </p>
              <span className="text-white/50 text-[14px] text-right shrink-0" style={{ letterSpacing: "-0.02em" }}>
                {award.org}
              </span>
            </div>
          </div>
        ))}
        <div className="w-full h-px bg-white/12" />
      </div>
      <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p
          className="font-light italic text-white uppercase leading-[1.1]"
          style={{ fontSize: "clamp(20px, 2.4vw, 32px)", letterSpacing: "-0.05em" }}
        >
          Have a <strong className="font-black not-italic">project</strong> in mind?
        </p>
        <MagneticButton
          href="/#contact"
          className="self-start md:self-auto border border-white text-white text-[14px] font-medium px-5 py-3 rounded-full"
          style={{ letterSpacing: "-0.04em" }}
        >
          Let&apos;s talk
        </MagneticButton>
      </div>
    </section>
  );
}

// ─── Root client component ────────────────────────────────────────────────────
export default function AboutClient({ data }: { data: AboutPageData | null }) {
  return (
    <>
      <div className="relative z-[1]">
        <HeroSection data={data} />
        <BioSection data={data} />
        <ExpertiseSection data={data} />
        <PhilosophySection data={data} />
        <ProcessSection data={data} />
        <AwardsSection data={data} />
      </div>
      <Footer />
    </>
  );
}
