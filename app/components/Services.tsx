const MONO: React.CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

const DESCRIPTION =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES = [
  {
    number: "[ 1 ]",
    name: "Brand Discovery",
    description: DESCRIPTION,
    imgDesktop: "https://www.figma.com/api/mcp/asset/68836216-8f8b-4811-9f89-62e3d787a99f",
    imgMobile: "https://www.figma.com/api/mcp/asset/10c69739-5531-4f01-bd24-773e0bad9fc6",
  },
  {
    number: "[ 2 ]",
    name: "Web Design & Dev",
    description: DESCRIPTION,
    imgDesktop: "https://www.figma.com/api/mcp/asset/0548310a-5f2e-4ab4-9b21-25ca55a78948",
    imgMobile: "https://www.figma.com/api/mcp/asset/75688c5e-15a9-49fd-92a0-1d4dc8e8b625",
  },
  {
    number: "[ 3 ]",
    name: "Marketing",
    description: DESCRIPTION,
    imgDesktop: "https://www.figma.com/api/mcp/asset/9103aaed-cd70-48f0-96b3-8a05d05ac79a",
    imgMobile: "https://www.figma.com/api/mcp/asset/5d7c97d2-ffb5-417f-8a23-cacfb68c2570",
  },
  {
    number: "[ 4 ]",
    name: "Photography",
    description: DESCRIPTION,
    imgDesktop: "https://www.figma.com/api/mcp/asset/a91a5168-30ac-4651-a9d2-b4d5af1d2b2a",
    imgMobile: "https://www.figma.com/api/mcp/asset/c4f0b556-a6f6-41ee-878e-0cb525b53644",
  },
];

export default function Services() {
  return (
    <section className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12">

      {/* Label */}
      <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
        [ services ]
      </p>

      {/* Header: [4]  Deliverables */}
      <div
        className="flex justify-between items-center text-white uppercase font-light whitespace-nowrap text-[32px] md:text-[6.67vw]"
        style={{ letterSpacing: "-0.08em" }}
      >
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Services list */}
      <div className="flex flex-col gap-12">
        {SERVICES.map((service) => (
          <div key={service.number} className="flex flex-col gap-2">

            {/* Number label */}
            <p className="text-[14px] uppercase leading-[1.1] text-white" style={MONO}>
              {service.number}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-white/20" />

            {/* Content row: name left — description + image right */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6 pt-2">

              <p
                className="font-bold italic text-[36px] leading-[1.1] text-white uppercase whitespace-nowrap shrink-0"
                style={{ letterSpacing: "-0.04em" }}
              >
                {service.name}
              </p>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <p
                  className="text-[14px] leading-[1.3] text-white md:w-[393px]"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {service.description}
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <img
                    src={service.imgDesktop}
                    alt=""
                    className="hidden md:block absolute inset-0 w-full h-full object-cover"
                  />
                  <img
                    src={service.imgMobile}
                    alt=""
                    className="md:hidden absolute inset-0 w-full h-full object-cover"
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
