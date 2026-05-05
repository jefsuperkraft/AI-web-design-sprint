"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MagneticButton from "@/app/components/MagneticButton";
import { ServiceRow, type DeliverableItem } from "@/app/components/Services";

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

// ─── Types ────────────────────────────────────────────────────────────────────
export type ServicePackage = {
  _key: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  includes: string[];
};

export type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type ServicesPageData = {
  heroTagline?: string;
  heroDescription?: string;
  heroStats?: { _key: string; value: string; label: string }[];
  packages?: ServicePackage[];
  faq?: FaqItem[];
  ctaHeading?: string;
  ctaDescription?: string;
};

// ─── Fallbacks ────────────────────────────────────────────────────────────────
const FALLBACK: Required<ServicesPageData> = {
  heroTagline: "A full-service creative studio.",
  heroDescription:
    "From brand identity to web design, we craft experiences that endure. Our process is deliberate, our execution obsessive — and the results speak for themselves.",
  heroStats: [
    { _key: "a", value: "7",    label: "Core services" },
    { _key: "b", value: "120+", label: "Projects delivered" },
    { _key: "c", value: "2016", label: "Est. Chicago, IL" },
  ],
  packages: [
    {
      _key: "1",
      name: "Essentials",
      tagline: "Brand foundations for emerging studios.",
      description:
        "Everything you need to launch with confidence — a clean visual identity and a digital presence that means business.",
      featured: false,
      includes: ["Logo & wordmark", "Colour & type system", "Brand guidelines", "1-page web presence", "2 revision rounds"],
    },
    {
      _key: "2",
      name: "Studio",
      tagline: "The full creative partnership.",
      description:
        "Our most popular engagement. A deep collaboration spanning brand direction, photography, and a fully custom web experience.",
      featured: true,
      includes: [
        "Full brand identity",
        "Photography direction",
        "Custom web design & build",
        "Motion & micro-interactions",
        "Ongoing support (3 months)",
        "Unlimited revisions",
      ],
    },
    {
      _key: "3",
      name: "Enterprise",
      tagline: "Scaled systems for growing brands.",
      description:
        "Built for organisations that need a cohesive creative system across multiple channels — from internal tooling to global campaigns.",
      featured: false,
      includes: [
        "Multi-brand system",
        "Campaign art direction",
        "Web platform design",
        "Design system documentation",
        "Dedicated creative lead",
        "12-month retainer option",
      ],
    },
  ],
  faq: [
    {
      _key: "1",
      question: "How long does a typical project take?",
      answer:
        "Most brand identity projects run 6–10 weeks. Full studio engagements (brand + web) typically span 12–16 weeks. We'll scope your project precisely during our discovery call.",
    },
    {
      _key: "2",
      question: "Do you work with clients outside Chicago?",
      answer:
        "Absolutely. We work with clients globally and collaborate primarily through video calls, shared Figma files, and async updates. Distance has never been a barrier to good work.",
    },
    {
      _key: "3",
      question: "What does your onboarding process look like?",
      answer:
        "We start with a 60-minute discovery call to understand your goals, audience, and constraints. From there we scope the project, agree on a timeline, and kick off with a comprehensive brand audit.",
    },
    {
      _key: "4",
      question: "Can I hire you for just one service?",
      answer:
        "Yes. While our packages bundle the most common combinations, we're happy to scope a standalone photography project, a web redesign, or a brand refresh. Reach out and we'll figure out what fits.",
    },
    {
      _key: "5",
      question: "What are your payment terms?",
      answer:
        "We invoice 50% upfront and 50% on delivery. For retainer arrangements we invoice monthly. We accept bank transfer and all major cards.",
    },
  ],
  ctaHeading: "Ready to make something worth remembering?",
  ctaDescription:
    "Every great project starts with a conversation. Tell us about your brand, your goals, and the audience you want to reach.",
};

function get<K extends keyof ServicesPageData>(
  data: ServicesPageData | null,
  key: K
): Required<ServicesPageData>[K] {
  const val = data?.[key];
  return (
    val !== undefined &&
    val !== null &&
    (typeof val !== "string" || val.trim() !== "")
      ? val
      : FALLBACK[key]
  ) as Required<ServicesPageData>[K];
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function HeroSection({ data }: { data: ServicesPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTagline    = get(data, "heroTagline");
  const heroDescription = get(data, "heroDescription");
  const heroStats      = get(data, "heroStats");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".svc-hero-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".svc-hero-meta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.55,
      });
      gsap.from(".svc-hero-stat", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.75,
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

      <div className="flex-1 flex flex-col justify-end pb-12 md:pb-20 mt-8 md:mt-0 gap-10 md:gap-14">
        <div>
          <p className="svc-hero-meta text-[14px] uppercase text-white/40 mb-5" style={MONO}>
            [ 001 — Services ]
          </p>
          <h1
            className="text-white uppercase font-bold leading-[0.88]"
            style={{ fontSize: "clamp(52px, 11vw, 160px)", letterSpacing: "-0.06em" }}
          >
            <span className="svc-hero-line block">Services &amp;</span>
            <span className="svc-hero-line block italic">Deliverables</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16 md:items-start">
          <p className="svc-hero-meta text-white/40 text-[12px] uppercase shrink-0 pt-1" style={MONO}>
            {heroTagline}
          </p>
          <p
            className="svc-hero-meta text-white/70 text-[16px] leading-[1.55] md:max-w-[520px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {heroDescription}
          </p>
        </div>

        <div className="flex gap-8 md:gap-16 border-t border-white/10 pt-8">
          {heroStats.map((stat) => (
            <div key={stat._key} className="svc-hero-stat flex flex-col gap-1">
              <span
                className="text-white font-bold text-[32px] md:text-[40px]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </span>
              <span className="text-white/40 text-[11px] uppercase" style={MONO}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 2. Deliverables ──────────────────────────────────────────────────────────
function DeliverablesSection({ items }: { items: DeliverableItem[] }) {
  return (
    <section data-nav-dark className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12">
      <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
        [ 002 — What we do ]
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

// ─── 3. Packages ─────────────────────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: ServicePackage }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    if (!pkg.featured) {
      gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: "power2.out" });
    }
  }
  function onLeave() {
    if (!pkg.featured) {
      gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "back.out(2)" });
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`flex flex-col justify-between p-8 rounded-[20px] min-h-[500px] ${
        pkg.featured ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col gap-6">
        {pkg.featured && (
          <span className="text-[11px] uppercase tracking-widest text-white/50" style={MONO}>
            [ Most popular ]
          </span>
        )}
        <div>
          <h3
            className="font-bold uppercase text-[36px] leading-[1]"
            style={{ letterSpacing: "-0.04em" }}
          >
            {pkg.name}
          </h3>
          <p
            className={`text-[14px] mt-2 leading-[1.4] ${pkg.featured ? "text-white/50" : "text-black/50"}`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {pkg.tagline}
          </p>
        </div>

        <p
          className={`text-[14px] leading-[1.55] ${pkg.featured ? "text-white/70" : "text-black/60"}`}
          style={{ letterSpacing: "-0.02em" }}
        >
          {pkg.description}
        </p>

        <ul className="flex flex-col gap-2.5">
          {pkg.includes.map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 text-[13px] leading-[1.4] ${
                pkg.featured ? "text-white/60" : "text-black/55"
              }`}
            >
              <span
                className={`size-1 rounded-full shrink-0 ${pkg.featured ? "bg-white/40" : "bg-black/30"}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <MagneticButton
        href="/#contact"
        className={`mt-10 flex items-center justify-center text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[16px] py-[12px] ${
          pkg.featured ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        Get started
      </MagneticButton>
    </div>
  );
}

function PackagesSection({ data }: { data: ServicesPageData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const packages   = get(data, "packages");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".pkg-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f5f0] px-4 md:px-8 py-16 md:py-24">
      <p className="text-[14px] uppercase text-black/40 mb-6" style={MONO}>
        [ 003 — Packages ]
      </p>
      <h2
        className="font-bold uppercase text-black mb-12 md:mb-16"
        style={{
          fontSize: "clamp(36px, 5.5vw, 80px)",
          letterSpacing: "-0.05em",
          lineHeight: 0.95,
        }}
      >
        Choose your<br />engagement.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._key} className="pkg-card">
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 4. FAQ ───────────────────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const answerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function toggle(key: string) {
    const prevKey = openKey;
    const nextKey = prevKey === key ? null : key;

    if (prevKey) {
      const el = answerRefs.current.get(prevKey);
      if (el) gsap.to(el, { height: 0, duration: 0.4, ease: "power2.inOut" });
    }
    if (nextKey) {
      const el = answerRefs.current.get(nextKey);
      if (el) gsap.to(el, { height: "auto", duration: 0.5, ease: "power2.inOut" });
    }

    setOpenKey(nextKey);
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const isOpen = openKey === item._key;
        return (
          <div key={item._key} className="border-t border-black/10">
            <button
              onClick={() => toggle(item._key)}
              className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
            >
              <span
                className="font-semibold text-[17px] md:text-[21px] text-black"
                style={{ letterSpacing: "-0.03em" }}
              >
                {item.question}
              </span>
              <span
                className="size-8 rounded-full border border-black/20 flex items-center justify-center shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              ref={(el) => {
                if (el) answerRefs.current.set(item._key, el);
                else answerRefs.current.delete(item._key);
              }}
              style={{ height: 0, overflow: "hidden" }}
            >
              <p
                className="text-black/55 text-[15px] leading-[1.65] pb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
      <div className="border-t border-black/10" />
    </div>
  );
}

function FaqSection({ data }: { data: ServicesPageData | null }) {
  const faq = get(data, "faq");

  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="md:w-[38%] shrink-0">
          <p className="text-[14px] uppercase text-black/40 mb-4" style={MONO}>
            [ 004 — FAQ ]
          </p>
          <h2
            className="font-bold uppercase text-black"
            style={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
            }}
          >
            Questions,<br />answered.
          </h2>
        </div>
        <div className="flex-1 pt-1">
          <FaqAccordion items={faq} />
        </div>
      </div>
    </section>
  );
}

// ─── 5. CTA ───────────────────────────────────────────────────────────────────
function CtaSection({ data }: { data: ServicesPageData | null }) {
  const sectionRef    = useRef<HTMLElement>(null);
  const ctaHeading    = get(data, "ctaHeading");
  const ctaDescription = get(data, "ctaDescription");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".svc-cta-el", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark
      className="bg-black px-4 md:px-8 py-20 md:py-32 flex flex-col items-start gap-10"
    >
      <p className="svc-cta-el text-[14px] uppercase text-white/40" style={MONO}>
        [ 005 — Start a project ]
      </p>
      <h2
        className="svc-cta-el font-bold uppercase text-white"
        style={{
          fontSize: "clamp(40px, 8vw, 112px)",
          letterSpacing: "-0.06em",
          lineHeight: 0.9,
        }}
      >
        {ctaHeading}
      </h2>
      <p
        className="svc-cta-el text-white/55 text-[16px] leading-[1.55] md:max-w-[480px]"
        style={{ letterSpacing: "-0.02em" }}
      >
        {ctaDescription}
      </p>
      <MagneticButton
        href="/#contact"
        className="svc-cta-el bg-white text-black text-[14px] font-medium tracking-[-0.56px] rounded-[24px] px-[20px] py-[14px]"
      >
        Let&apos;s talk
      </MagneticButton>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ServicesClient({
  data,
  deliverables,
}: {
  data: ServicesPageData | null;
  deliverables: DeliverableItem[];
}) {
  return (
    <>
      <div className="relative z-[1]">
        <HeroSection data={data} />
        <DeliverablesSection items={deliverables} />
        <PackagesSection data={data} />
        <FaqSection data={data} />
        <CtaSection data={data} />
      </div>
      <Footer />
    </>
  );
}
