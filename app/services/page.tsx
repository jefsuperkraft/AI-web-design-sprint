import { sanityFetch } from "@/sanity/lib/live";
import { servicesPageQuery, deliverablesQuery } from "@/sanity/lib/queries";
import ServicesClient, { type ServicesPageData } from "./ServicesClient";
import type { DeliverableItem } from "@/app/components/Services";

export default async function ServicesPage() {
  const [{ data: pageData }, { data: deliverables }] = await Promise.all([
    sanityFetch({ query: servicesPageQuery }),
    sanityFetch({ query: deliverablesQuery }),
  ]);
  return (
    <ServicesClient
      data={(pageData as ServicesPageData) ?? null}
      deliverables={(deliverables as DeliverableItem[]) ?? []}
    />
  );
}
