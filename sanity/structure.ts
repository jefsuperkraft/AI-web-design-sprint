import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // About Page — singleton
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      // Services Page — singleton
      S.listItem()
        .title('Services Page')
        .child(
          S.document()
            .schemaType('servicesPage')
            .documentId('servicesPage')
        ),
      S.divider(),
      // All other document types (Portfolio, Deliverables, …)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'aboutPage' && item.getId() !== 'servicesPage'
      ),
    ])
