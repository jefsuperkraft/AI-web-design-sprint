// Run with:
// SANITY_TOKEN=<token> node scripts/seed-portfolio.mjs
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
    id: 'portfolio-surfers-paradise',
    title: 'Surfers Paradise',
    slug: 'surfers-paradise',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/73f08dfd-4401-4816-84da-cb99af916eb7',
    order: 1,
  },
  {
    id: 'portfolio-agency-976',
    title: 'Agency 976',
    slug: 'agency-976',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/b894d279-9ecd-4f40-bad5-69c64524bf5c',
    order: 2,
  },
  {
    id: 'portfolio-cyberpunk-caffe',
    title: 'Cyberpunk Caffe',
    slug: 'cyberpunk-caffe',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/0e917491-4d1c-48cb-8681-c39d2c6b7dc7',
    order: 3,
  },
  {
    id: 'portfolio-minimal-playground',
    title: 'Minimal Playground',
    slug: 'minimal-playground',
    tags: ['Social Media', 'Photography'],
    imageUrl: 'https://www.figma.com/api/mcp/asset/91dd4300-210f-4988-a806-502d64345fb0',
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
      _type: 'portfolio',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      tags: item.tags,
      coverImage: {
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
