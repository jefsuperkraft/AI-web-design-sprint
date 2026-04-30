import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

export type DeliverableItem = {
  _id: string;
  title: string;
  description: string;
  image: SanityImageSource;
  order?: number;
};

export default function Services({ items }: { items: DeliverableItem[] }) {
  const imgUrl = (src: SanityImageSource) =>
    urlFor(src).auto('format').width(151).height(151).fit('crop').url();

  return (
    <section className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12">

      {/* Label */}
      <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
        [ services ]
      </p>

      {/* Header: [count]  Deliverables */}
      <div
        className="flex justify-between items-center text-white uppercase font-light whitespace-nowrap text-[32px] md:text-[6.67vw]"
        style={{ letterSpacing: "-0.08em" }}
      >
        <span>[{items.length}]</span>
        <span>Deliverables</span>
      </div>

      {/* Services list */}
      <div className="flex flex-col gap-12">
        {items.map((item, i) => (
          <div key={item._id} className="flex flex-col gap-2">

            {/* Number label */}
            <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
              [ {i + 1} ]
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-white/20" />

            {/* Content row: name left — description + image right */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6 pt-2">

              <p
                className="font-bold italic text-[36px] leading-[1.1] text-white uppercase whitespace-nowrap shrink-0"
                style={{ letterSpacing: "-0.04em" }}
              >
                {item.title}
              </p>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <p
                  className="text-[14px] leading-[1.3] text-white md:w-[393px]"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {item.description}
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <img
                    src={imgUrl(item.image)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
