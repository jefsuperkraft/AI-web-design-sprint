import { groq } from 'next-sanity'

export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    tags,
    coverImage,
    link
  }
`

export const deliverablesQuery = groq`
  *[_type == "deliverable"] | order(order asc) {
    _id,
    title,
    description,
    image,
    order
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    name,
    portrait,
    heroTagline,
    heroTags,
    pullQuote,
    bio,
    stats[] { _key, value, label },
    expertise[] { _key, title, description },
    philosophyLines,
    processSteps[] { _key, title, description },
    awards[] { _key, year, award, org }
  }
`

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    heroTagline,
    heroDescription,
    heroStats[] { _key, value, label },
    packages[] { _key, name, tagline, description, featured, includes },
    faq[] { _key, question, answer },
    ctaHeading,
    ctaDescription
  }
`
