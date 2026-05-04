import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTagline',
      title: 'Hero tagline',
      type: 'string',
      description: 'Short descriptor shown in the hero (mono label style).',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      description: 'Paragraph of copy shown beneath the hero title.',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroStat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 120+' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Projects delivered' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // ── Packages ──────────────────────────────────────────────────────────────
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'servicePackage',
          fields: [
            defineField({ name: 'name',        title: 'Name',        type: 'string', validation: R => R.required() }),
            defineField({ name: 'tagline',     title: 'Tagline',     type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'featured',    title: 'Featured',    type: 'boolean', initialValue: false, description: 'Highlighted card (dark background).' }),
            defineField({
              name: 'includes',
              title: 'Includes',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Bullet points of what the package includes.',
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'tagline' } },
        },
      ],
      validation: R => R.max(3),
      description: 'Up to 3 packages, displayed side by side on desktop.',
    }),

    // ── FAQ ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: R => R.required() }),
            defineField({ name: 'answer',   title: 'Answer',   type: 'text', rows: 3, validation: R => R.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        },
      ],
    }),

    // ── CTA ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA heading',
      type: 'string',
      description: 'Large heading in the bottom CTA section.',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA description',
      type: 'text',
      rows: 2,
      description: 'Supporting copy beneath the CTA heading.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Services Page' }
    },
  },
})
