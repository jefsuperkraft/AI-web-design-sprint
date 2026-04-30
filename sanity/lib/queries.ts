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
