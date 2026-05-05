import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      validation: R => R.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero tagline',
      type: 'string',
      description: 'Short line shown under the name in the hero section.',
    }),
    defineField({
      name: 'heroTags',
      title: 'Hero tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Role chips in the hero (e.g. "Creative Director", "Photographer", "Chicago, IL").',
    }),

    // ── Bio ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'string',
      description: 'Large italic quote at the top of the Bio section.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 10,
      description: 'Full biography. Separate paragraphs with a blank line (double Enter).',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 8+' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Years experience' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // ── Expertise ─────────────────────────────────────────────────────────────
    defineField({
      name: 'expertise',
      title: 'Expertise / Disciplines',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'expertiseItem',
          fields: [
            defineField({ name: 'title', title: 'Discipline', type: 'string', validation: R => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: R => R.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),

    // ── Philosophy ────────────────────────────────────────────────────────────
    defineField({
      name: 'philosophyLines',
      title: 'Philosophy lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each entry is one display line. The staggered indentation is applied automatically.',
    }),

    // ── Process ───────────────────────────────────────────────────────────────
    defineField({
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({ name: 'title', title: 'Step name', type: 'string', validation: R => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: R => R.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
      validation: R => R.max(4),
      description: 'Up to 4 steps, displayed in a 2×2 grid on desktop.',
    }),

    // ── Awards ────────────────────────────────────────────────────────────────
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'awardItem',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'award', title: 'Award name', type: 'string', validation: R => R.required() }),
            defineField({ name: 'org', title: 'Organisation', type: 'string' }),
          ],
          preview: { select: { title: 'award', subtitle: 'org' } },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'name', media: 'portrait' },
    prepare({ title, media }) {
      return { title: title ?? 'About Page', media }
    },
  },
})
