import { defineField, defineType } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          'Photography',
          'Social Media',
          'Web Design',
          'Brand Discovery',
          'Marketing',
          'Film',
          'Branding',
        ].map(v => ({ title: v, value: v })),
      },
    }),
    defineField({
      name: 'link',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
      description: 'Lower numbers appear first in the portfolio grid.',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
      media: 'coverImage',
    },
    prepare({ title, tags, media }) {
      return {
        title,
        subtitle: Array.isArray(tags) ? tags.join(', ') : '',
        media,
      }
    },
  },
})
