import Hero from "./components/Hero";
import Tagline from "./components/Tagline";
import About from "./components/About";
import FullBleed from "./components/FullBleed";
import Services from "./components/Services";
import Work from "./components/Work";
import { sanityFetch } from "@/sanity/lib/live";
import { portfolioQuery, deliverablesQuery } from "@/sanity/lib/queries";
import type { PortfolioItem } from "./components/Work";
import type { DeliverableItem } from "./components/Services";

export default async function Home() {
  const [{ data: portfolioItems }, { data: deliverableItems }] = await Promise.all([
    sanityFetch({ query: portfolioQuery }),
    sanityFetch({ query: deliverablesQuery }),
  ]);

  return (
    <main>
      <Hero />
      <Tagline />
      <About />
      <FullBleed />
      <Services items={(deliverableItems as DeliverableItem[]) ?? []} />
      <Work items={(portfolioItems as PortfolioItem[]) ?? []} />
    </main>
  );
}
