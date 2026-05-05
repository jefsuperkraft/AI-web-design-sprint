// Run with:
// SANITY_TOKEN=<token> node scripts/seed-deliverables.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'a02u7hnm',
  dataset: 'production',
  apiVersion: '2026-04-30',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const ITEMS = [
  {
    id: 'deliverable-brand-discovery',
    title: 'Brand Discovery',
    description: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imageUrl: 'https://www.figma.com/api/mcp/asset/68836216-8f8b-4811-9f89-62e3d787a99f',
    slug: 'brand-discovery',
    order: 1,
  },
  {
    id: 'deliverable-web-design-dev',
    title: 'Web Design & Dev',
    description: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imageUrl: 'https://www.figma.com/api/mcp/asset/0548310a-5f2e-4ab4-9b21-25ca55a78948',
    slug: 'web-design-dev',
    order: 2,
  },
  {
    id: 'deliverable-marketing',
    title: 'Marketing',
    description: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imageUrl: 'https://www.figma.com/api/mcp/asset/9103aaed-cd70-48f0-96b3-8a05d05ac79a',
    slug: 'marketing',
    order: 3,
  },
  {
    id: 'deliverable-photography',
    title: 'Photography',
    description: 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imageUrl: 'https://www.figma.com/api/mcp/asset/a91a5168-30ac-4651-a9d2-b4d5af1d2b2a',
    slug: 'photography',
    order: 4,
  },
]

async function uploadImage(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${url} (${res.status})`)
  const contentType = res.headers.get('content-type') ?? 'image/jpeg'
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  console.log(`  ↑ uploaded image: ${asset._id}`)
  return asset._id
}

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN env var')
    process.exit(1)
  }

  for (const item of ITEMS) {
    console.log(`\nSeeding: ${item.title}`)
    const assetId = await uploadImage(item.imageUrl, `${item.slug}.jpg`)

    await client.createOrReplace({
      _id: item.id,
      _type: 'deliverable',
      title: item.title,
      description: item.description,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
      order: item.order,
    })

    console.log(`  ✓ created document: ${item.id}`)
  }

  console.log('\nDone.')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
