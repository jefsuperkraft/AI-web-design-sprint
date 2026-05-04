import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import AboutClient, { type AboutPageData } from "./AboutClient";

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: aboutPageQuery });
  return <AboutClient data={(data as AboutPageData) ?? null} />;
}
