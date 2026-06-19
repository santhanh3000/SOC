import { ArticlePage } from '@/components/ArticlePage'
import { SEO_PAGES, seoMetadata } from '@/lib/seo-pages'

export const metadata = seoMetadata('microsoft-defender')

export default function Page() {
  return <ArticlePage {...SEO_PAGES['microsoft-defender']} />
}
