const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };
const PLAYFAIR: React.CSSProperties = { fontFamily: "var(--font-playfair), serif" };

const LINE_BASE =
  "font-light uppercase text-black whitespace-nowrap leading-[0.84]";

// The & in "Born & raised" is Playfair italic per the design
function Ampersand() {
  return (
    <span className="italic font-normal" style={PLAYFAIR}>
      &amp;
    </span>
  );
}

export default function Tagline() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-[120px]">
      {/* Header: label + rule */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p
          className="text-right text-[14px] uppercase text-[#1f1f1f] leading-[1.1]"
          style={MONO}
        >
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]/20" />
      </div>

      {/* ── MOBILE layout: everything centered ─────────────────────── */}
      <div className="md:hidden flex flex-col gap-2 items-center text-center">
        <p className="text-[14px] text-[#1f1f1f] leading-[1.1]" style={MONO}>
          001
        </p>
        <p className={`${LINE_BASE} text-[32px]`} style={{ letterSpacing: "-0.08em" }}>
          {`A creative director   /`}
        </p>
        <p className={`${LINE_BASE} text-[32px]`} style={{ letterSpacing: "-0.08em" }}>
          Photographer
        </p>
        <p className={`${LINE_BASE} text-[32px]`} style={{ letterSpacing: "-0.08em" }}>
          Born <Ampersand /> raised
        </p>
        <p className={`${LINE_BASE} text-[32px]`} style={{ letterSpacing: "-0.08em" }}>
          on the south side
        </p>
        <p className={`${LINE_BASE} text-[32px]`} style={{ letterSpacing: "-0.08em" }}>
          of chicago.
        </p>
        <p className="text-[14px] text-[#1f1f1f] leading-[1.1] mt-1" style={MONO}>
          [ creative freelancer ]
        </p>
      </div>

      {/* ── DESKTOP layout: staggered left indentation ──────────────── */}
      <div className="hidden md:flex flex-col uppercase" style={{ gap: "0.56vw" }}>
        {/* Line 1 — "A creative director /" + "001" label */}
        <div className="flex items-start gap-3">
          <span
            className={`${LINE_BASE} text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em", whiteSpace: "pre" }}
          >
            {`A creative director   /`}
          </span>
          <span
            className="text-[14px] text-[#1f1f1f] leading-[1.1] pt-1 shrink-0"
            style={MONO}
          >
            001
          </span>
        </div>

        {/* Line 2 — "Photographer" — ~15.6% indent */}
        <div style={{ paddingLeft: "15.6%" }}>
          <span
            className={`${LINE_BASE} text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em" }}
          >
            Photographer
          </span>
        </div>

        {/* Line 3 — "Born & raised" — ~44.3% indent */}
        <div style={{ paddingLeft: "44.3%" }}>
          <span
            className={`${LINE_BASE} text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em" }}
          >
            Born <Ampersand /> raised
          </span>
        </div>

        {/* Line 4 — "on the south side" — no indent */}
        <div>
          <span
            className={`${LINE_BASE} text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em" }}
          >
            on the south side
          </span>
        </div>

        {/* Line 5 — "of chicago." then "[ creative freelancer ]" below */}
        <div className="flex flex-col items-start" style={{ paddingLeft: "44%" }}>
          <span
            className={`${LINE_BASE} text-[6.67vw]`}
            style={{ letterSpacing: "-0.08em" }}
          >
            of chicago.
          </span>
          <span
            className="text-[14px] text-[#1f1f1f] leading-[1.1] mt-2"
            style={MONO}
          >
            [ creative freelancer ]
          </span>
        </div>
      </div>
    </section>
  );
}
