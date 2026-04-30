import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

const CTA_TEXT =
  "Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.";

export type PortfolioItem = {
  _id: string;
  title: string;
  slug: { current: string };
  tags: string[];
  coverImage: SanityImageSource;
  link?: string;
};

// Alternates tall/short per position to recreate the staggered Figma heights
const DESKTOP_HEIGHTS = [744, 699, 699, 744];
const desktopHeight = (i: number) => DESKTOP_HEIGHTS[i % DESKTOP_HEIGHTS.length];

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] whitespace-nowrap"
          style={{ letterSpacing: "-0.04em" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="size-8 shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 23L23 9M23 9H12M23 9V20"
        stroke="#1f1f1f"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CTABox() {
  return (
    <div className="relative p-4 flex flex-col gap-[10px] justify-center">
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      <p
        className="italic text-[14px] leading-[1.3] text-[#1f1f1f]"
        style={{ letterSpacing: "-0.04em" }}
      >
        {CTA_TEXT}
      </p>
      <button
        className="self-start bg-black text-white text-[14px] font-medium px-4 py-3 rounded-full whitespace-nowrap"
        style={{ letterSpacing: "-0.04em" }}
      >
        Let&apos;s talk
      </button>
    </div>
  );
}

function WorkCard({
  item,
  heightPx,
  titleSize,
}: {
  item: PortfolioItem;
  heightPx: number;
  titleSize: string;
}) {
  const imgSrc = urlFor(item.coverImage)
    .auto('format')
    .width(Math.round(heightPx * 0.75))
    .height(heightPx)
    .fit('crop')
    .url();

  const card = (
    <div className="flex flex-col gap-[10px]">
      <div className="relative overflow-hidden" style={{ height: `${heightPx}px` }}>
        <img
          src={imgSrc}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <Tags tags={item.tags} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`font-black ${titleSize} leading-[1.1] text-black uppercase`}
          style={{ letterSpacing: "-0.04em" }}
        >
          {item.title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );

  return item.link ? (
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    card
  );
}

export default function Work({ items }: { items: PortfolioItem[] }) {
  // Split into left (even indices) and right (odd indices) columns for desktop
  const leftCol = items.filter((_, i) => i % 2 === 0);
  const rightCol = items.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20">

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]" style={MONO}>
            [ portfolio ]
          </p>
          <div className="flex items-start justify-between">
            <div
              className="font-light text-[32px] text-black uppercase leading-[0.86]"
              style={{ letterSpacing: "-0.08em" }}
            >
              <p>Selected</p>
              <p>Work</p>
            </div>
            <p className="text-[14px] leading-[1.1] text-[#1f1f1f]" style={MONO}>
              004
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <WorkCard key={item._id} item={item} heightPx={390} titleSize="text-[24px]" />
          ))}
        </div>

        <CTABox />
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-col gap-[61px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className="font-light text-[6.67vw] text-black uppercase leading-[0.86]"
              style={{ letterSpacing: "-0.08em" }}
            >
              <p>Selected</p>
              <p>Work</p>
            </div>
            <p className="text-[14px] leading-[1.1] text-[#1f1f1f] pt-1 shrink-0" style={MONO}>
              004
            </p>
          </div>
          <div className="flex items-center justify-center w-[15px] h-[110px]">
            <span
              className="-rotate-90 whitespace-nowrap text-[14px] uppercase leading-[1.1] text-[#1f1f1f]"
              style={MONO}
            >
              [ portfolio ]
            </span>
          </div>
        </div>

        {/* Two-column staggered grid */}
        <div className="flex gap-6 items-start">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            {leftCol.map((item, i) => (
              <WorkCard
                key={item._id}
                item={item}
                heightPx={desktopHeight(i * 2)}
                titleSize="text-[36px]"
              />
            ))}
            <CTABox />
          </div>
          {/* Right column — staggered down */}
          <div className="flex-1 flex flex-col gap-6 pt-[240px]">
            {rightCol.map((item, i) => (
              <WorkCard
                key={item._id}
                item={item}
                heightPx={desktopHeight(i * 2 + 1)}
                titleSize="text-[36px]"
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
