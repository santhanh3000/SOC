import { Nav } from './Nav'
import { Footer } from './Footer'
import { Button } from './ui/Button'
import { SITE_URL } from '@/lib/site'
import { jsonLd } from '@/lib/schema'

export type ArticleSection = { h2: string; paragraphs: string[]; bullets?: string[] }
export type ArticleFaq = { q: string; a: string }
export type ArticleLink = { label: string; href: string }

export type ArticleContent = {
  slug: string
  eyebrow: string
  h1: string
  lede: string
  sections: ArticleSection[]
  faqs: ArticleFaq[]
  related: ArticleLink[]
}

// One layout for every content/SEO page: renders the structured copy plus the
// structured data search and answer engines read (BreadcrumbList + WebPage, and
// FAQPage when the page has FAQs). FAQs render as static HTML (not an accordion)
// so the answers are always crawlable.
export function ArticlePage({ slug, eyebrow, h1, lede, sections, faqs, related }: ArticleContent) {
  const pageUrl = `${SITE_URL}/${slug}/`

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: h1, item: pageUrl },
    ],
  }

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: h1,
    description: lede,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-GB',
  }

  const faqJson = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webpage) }} />
      {faqJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJson) }} />
      )}

      <Nav />
      <main id="main" tabIndex={-1} className="pt-32 pb-24 focus:outline-none">
        <article className="container-narrow">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
            <a href="/" className="hover:text-bone-soft">Home</a>
            <span className="mx-2 text-ink-divider">/</span>
            <span className="text-bone-soft">{eyebrow}</span>
          </nav>

          <h1 className="h-display text-[40px] sm:text-[56px] text-bone leading-[1.02] text-balance">
            {h1}
          </h1>
          <p className="mt-6 text-bone-soft text-[18px] sm:text-[20px] leading-relaxed text-pretty max-w-[64ch]">
            {lede}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-display text-bone text-[26px] sm:text-[30px] leading-tight text-balance">
                  {s.h2}
                </h2>
                <div className="mt-3 space-y-4 text-bone-soft text-[15.5px] leading-relaxed text-pretty max-w-[68ch]">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 max-w-[68ch]">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[15px] text-bone-soft">
                        <span className="mt-2 h-1 w-1 rounded-full bg-amber-iris shrink-0" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-bone text-[26px] sm:text-[30px] leading-tight">
                Frequently asked
              </h2>
              <div className="mt-5 border-t border-ink-border">
                {faqs.map((f, i) => (
                  <div key={i} className="border-b border-ink-border py-5">
                    <h3 className="font-display text-bone text-[19px] leading-snug">{f.q}</h3>
                    <p className="mt-2 text-bone-soft text-[15px] leading-relaxed text-pretty max-w-[68ch]">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-16 relative overflow-hidden rounded-xl border border-amber-line bg-gradient-to-br from-amber-soft via-ink-elevated to-teal-soft p-7 sm:p-9">
            <div className="relative">
              <div className="font-display text-bone text-[24px] sm:text-[28px] leading-tight text-balance">
                See it on <span className="italic text-amber-iris">your</span> alerts.
              </div>
              <p className="mt-3 text-bone-soft text-[15px] leading-relaxed max-w-[60ch] text-pretty">
                Start with a 30-day refundable pilot. £495, one environment, every alert
                investigated, a full report at week four. Read-only, live within 48 hours of access.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href="/#contact" variant="primary" size="lg" arrow>
                  Start your pilot
                </Button>
                <Button href="/#demo" variant="secondary" size="lg">
                  See a sample investigation
                </Button>
              </div>
            </div>
          </div>

          {/* Related internal links */}
          {related.length > 0 && (
            <nav className="mt-12" aria-label="Related pages">
              <div className="h-eyebrow mb-4">Keep reading</div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="flex items-center justify-between gap-3 panel p-4 hover:border-amber-line transition-colors text-bone-soft hover:text-bone"
                    >
                      <span className="text-[14.5px]">{r.label}</span>
                      <span aria-hidden="true" className="text-amber-iris">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
