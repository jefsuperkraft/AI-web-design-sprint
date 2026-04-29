const IMAGE =
  "https://www.figma.com/api/mcp/asset/ba504f8d-e081-4a0e-a5db-f5f53545e3da";

export default function FullBleed() {
  return (
    <section
      className="w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900]"
    >
      <img
        src={IMAGE}
        alt=""
        className="w-full h-full object-cover object-center"
      />
    </section>
  );
}
