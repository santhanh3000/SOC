'use client'

import { motion } from 'framer-motion'
import { BrandMark } from './Brand'
import { PilotForm } from './PilotForm'

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-edges" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(244,162,97,0.10),transparent)]" />
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-8 inline-block">
            <BrandMark size={84} className="animate-pulse-eye" />
          </div>

          <h2 className="h-display text-[44px] sm:text-[64px] lg:text-[76px] text-bone leading-[0.95] text-balance">
            See it on your alerts.{' '}
            <span className="italic text-amber-iris">Or your money back.</span>
          </h2>

          <p className="mt-7 mx-auto max-w-[52ch] text-bone-soft text-[16px] sm:text-lg leading-relaxed text-pretty">
            Start with a £495 30-day pilot. We&apos;re typically live in your environment
            within 48 hours of the OAuth grant, investigating every alert from day one.
            If it doesn&apos;t earn its keep, ask for it back.
          </p>

          <div className="mt-10 text-left">
            <PilotForm />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-x-5 sm:gap-y-2 font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-iris" />
              You approve every action
            </span>
            <span className="hidden sm:inline text-ink-divider">·</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-iris" />
              Read-only on your stack
            </span>
            <span className="hidden sm:inline text-ink-divider">·</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-iris" />
              30 days. Refundable.
            </span>
            <span className="hidden sm:inline text-ink-divider">·</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-iris" />
              Live within 48h
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
