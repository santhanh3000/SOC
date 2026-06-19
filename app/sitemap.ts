import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SEO_SLUGS } from '@/lib/seo-pages'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const content: MetadataRoute.Sitemap = SEO_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    ...content,
    { url: `${SITE_URL}/privacy/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms/`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
