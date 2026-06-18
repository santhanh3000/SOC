import { ReactNode } from 'react'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="pt-32 pb-24 focus:outline-none">
        <article className="container-narrow">
          <div className="h-eyebrow mb-6">Legal</div>
          <h1 className="h-display text-[44px] sm:text-[60px] text-bone leading-[1] text-balance">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
            Last updated · {updated}
          </p>

          <div className="mt-12 prose-owlsoc space-y-7 text-bone-soft text-[15.5px] leading-relaxed">
            {children}
          </div>

          <div className="mt-16 panel p-5 text-[13.5px] text-bone-muted">
            This is a placeholder page for the marketing site. Replace this content
            with the policy reviewed by your legal counsel before going live to real
            users. The structure and headings are kept lightweight so they&apos;re easy to
            swap in.
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-bone text-[28px] leading-tight first:pt-0 border-t border-ink-border first:border-t-0 mt-8 first:mt-0 pt-8">
      {children}
    </h2>
  )
}
