import type { Metadata } from 'next'
import { BrandMark } from '@/components/Brand'

export const metadata: Metadata = {
  title: 'Page not found | OwlSOC',
  description: 'The page you were looking for does not exist.',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden focus:outline-none">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-edges" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(244,162,97,0.10),transparent)]" />
      </div>

      <div className="relative text-center max-w-lg">
        <div className="mx-auto mb-8 inline-block">
          <BrandMark size={88} className="drop-shadow-[0_0_28px_rgba(45,212,191,0.3)]" />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted mb-4">
          Error · 404
        </div>
        <h1 className="h-display text-[40px] sm:text-[52px] text-bone leading-[1] text-balance">
          This page flew the nest.
        </h1>
        <p className="mt-5 text-bone-soft text-[16px] leading-relaxed text-pretty max-w-[44ch] mx-auto">
          The link may be old or mistyped. The night watch is still on duty everywhere
          else on the site.
        </p>
        <a
          href="/"
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-amber-iris px-7 py-4 text-base font-medium tracking-tight text-ink-deep transition-all duration-300 hover:bg-amber-bright hover:shadow-[0_8px_30px_-10px_rgba(244,162,97,0.6)]"
        >
          Back to safety
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </main>
  )
}
