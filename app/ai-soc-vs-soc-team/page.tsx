import { ArticlePage } from '@/components/ArticlePage'
import { SEO_PAGES, seoMetadata } from '@/lib/seo-pages'

export const metadata = seoMetadata('ai-soc-vs-soc-team')

export default function Page() {
  return <ArticlePage {...SEO_PAGES['ai-soc-vs-soc-team']} />
}
