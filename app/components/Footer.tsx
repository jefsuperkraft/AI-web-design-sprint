import MagneticButton from "./MagneticButton";

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "x.com", href: "#" },
  { label: "Linkedin", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Licences", href: "#" },
  { label: "Privacy policy", href: "#" },
];

export default function Footer() {
  return (
    <footer data-nav-dark className="bg-black overflow-hidden sticky bottom-0 z-0" id="contact">

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col gap-[120px] px-8 pt-12">

        {/* Top: CTA + social columns + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* Left: CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p
                className="text-[24px] font-light italic text-white uppercase leading-[1.1]"
                style={{ letterSpacing: "-0.96px" }}
              >
                Have a{" "}
                <strong className="font-black not-italic">project</strong>
                {" "}in mind?
              </p>
              <MagneticButton
                href="#contact"
                className="self-start border border-white text-white text-[14px] font-medium px-4 py-3 rounded-full"
                style={{ letterSpacing: "-0.56px" }}
              >
                Let&apos;s talk
              </MagneticButton>
            </div>

            {/* Center: social */}
            <div
              className="text-center text-white text-[18px] uppercase leading-[1.1] w-[298px]"
              style={{ letterSpacing: "-0.72px" }}
            >
              {SOCIAL_LINKS.slice(0, 2).map((l) => (
                <a key={l.label} href={l.href} className="block hover:opacity-60 transition-opacity duration-200">
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right: social */}
            <div
              className="text-right text-white text-[18px] uppercase leading-[1.1] w-[298px]"
              style={{ letterSpacing: "-0.72px" }}
            >
              {SOCIAL_LINKS.slice(2).map((l) => (
                <a key={l.label} href={l.href} className="block hover:opacity-60 transition-opacity duration-200">
                  {l.label}
                </a>
              ))}
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20" />
        </div>

        {/* Bottom: H.Studio wordmark + legal links — flex row, bottom-aligned */}
        <div className="flex items-end">

          {/* Left: rotated label + wordmark */}
          <div className="flex items-center flex-1">
            <div className="shrink-0 w-[15px] self-stretch flex items-center justify-center">
              <span
                className="-rotate-90 whitespace-nowrap text-white text-[14px] uppercase"
                style={MONO}
              >
                [ Coded By Claude ]
              </span>
            </div>
            <span
              className="font-semibold capitalize text-white whitespace-nowrap leading-[0.8] pl-6"
              style={{ fontSize: "20vw", letterSpacing: "-0.06em" }}
            >
              H.Studio
            </span>
          </div>

          {/* Right: legal links — bottom-aligned, never shrinks */}
          <div className="shrink-0 flex gap-[34px] pl-8">
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white text-[12px] uppercase underline hover:opacity-60 transition-opacity duration-200"
                style={{ letterSpacing: "-0.48px" }}
              >
                {l.label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-12 px-4 pt-12">

        {/* Top: CTA + social + divider */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p
              className="text-[24px] font-light italic text-white uppercase leading-[1.1]"
              style={{ letterSpacing: "-0.96px" }}
            >
              Have a{" "}
              <strong className="font-black not-italic">project</strong>
              {" "}in mind?
            </p>
            <MagneticButton
              href="#contact"
              className="self-start border border-white text-white text-[14px] font-medium px-4 py-3 rounded-full"
              style={{ letterSpacing: "-0.56px" }}
            >
              Let&apos;s talk
            </MagneticButton>
          </div>

          {/* Social links — vertical stack */}
          <div className="flex flex-col">
            {SOCIAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white text-[18px] uppercase leading-[1.4] hover:opacity-60 transition-opacity duration-200"
                style={{ letterSpacing: "-0.72px" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20" />
        </div>

        {/* Bottom: legal + label + wordmark */}
        <div className="flex flex-col gap-3 overflow-hidden">
          <div className="flex gap-[34px]">
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white text-[12px] uppercase underline"
                style={{ letterSpacing: "-0.48px" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <p className="text-white text-[10px] uppercase" style={MONO}>
            [ Coded By Claude ]
          </p>

          {/* H.Studio — bleeds off the bottom of the page */}
          <span
            className="font-semibold capitalize text-white leading-[0.8] block"
            style={{ fontSize: "23vw", letterSpacing: "-0.06em" }}
          >
            H.Studio
          </span>
        </div>

      </div>

    </footer>
  );
}
