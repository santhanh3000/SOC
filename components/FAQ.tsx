'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from './ui/Section'
import { FAQS } from '@/lib/faq-data'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section
      id="faq"
      eyebrow="Frequently asked"
      title={
        <>
          Questions a careful buyer asks{' '}
          <span className="text-bone-muted italic font-display">before they sign anything.</span>
        </>
      }
      intro="If yours isn't here, ask and we'll add it. Better questions make for better answers."
    >
      <div className="max-w-3xl mx-auto">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div
              key={f.q}
              id={f.anchor}
              className="border-b border-ink-border last:border-b-0 first:border-t first:border-t-ink-border scroll-mt-28"
            >
              <h3 className="contents">
              <button
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 sm:py-6 text-left group"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <span
                  className={`font-display text-[20px] sm:text-[22px] leading-snug text-balance transition-colors ${
                    isOpen ? 'text-amber-iris' : 'text-bone group-hover:text-amber-iris'
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`flex-shrink-0 h-8 w-8 rounded-full border border-ink-border flex items-center justify-center text-bone-muted transition-all duration-300 ${
                    isOpen ? 'border-amber-line bg-amber-soft rotate-45 text-amber-iris' : ''
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              </h3>
              {/* Always mounted: answers stay in the static HTML for search
                  engines and aria-controls always references a real element. */}
              <motion.div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                aria-hidden={!isOpen}
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
                style={isOpen ? undefined : { height: 0, opacity: 0 }}
              >
                <p className="pb-6 pr-12 text-[15px] leading-relaxed text-bone-soft text-pretty max-w-[68ch]">
                  {f.a}
                </p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
