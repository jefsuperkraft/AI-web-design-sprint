const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

const PORTRAIT =
  "https://www.figma.com/api/mcp/asset/6559290e-0bcc-4984-84fe-71d699bba7ae";

const BIO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function CornerBrackets({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-3">
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20">

      {/* ── MOBILE: vertical stack ── */}
      <div className="md:hidden flex flex-col gap-5">
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
          002
        </p>
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
          [ About ]
        </p>
        <CornerBrackets>
          <p className="text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
            {BIO}
          </p>
        </CornerBrackets>
        <div className="w-full overflow-hidden" style={{ aspectRatio: "422/594" }}>
          <img src={PORTRAIT} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ── DESKTOP: [ About ] left  |  text (bottom) + 002+image (right) ── */}
      <div className="hidden md:flex items-start justify-between">

        {/* [ About ] label — top-left, isolated */}
        <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f] shrink-0" style={MONO}>
          [ About ]
        </p>

        {/* Right block — text block + image, bottom-aligned */}
        <div className="flex gap-8 items-end" style={{ width: "71.4%" }}>

          {/* Text with corner brackets — grows to fill space, sits at bottom */}
          <div className="flex-1 min-w-0">
            <CornerBrackets>
              <p className="text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
                {BIO}
              </p>
            </CornerBrackets>
          </div>

          {/* 002 label + portrait */}
          <div className="flex gap-6 items-start shrink-0">
            <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
              002
            </p>
            <div
              className="overflow-hidden shrink-0"
              style={{ width: "30.3vw", aspectRatio: "436/614" }}
            >
              <img src={PORTRAIT} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
