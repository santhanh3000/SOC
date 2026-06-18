'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'
import { Button } from './ui/Button'

type Tier = {
  name: string
  tagline: string
  price: string
  unit: string
  featured?: boolean
  features: string[]
  cta: { label: string; href: string }
  footnote?: string
}

const TIERS: Tier[] = [
  {
    name: 'Standalone',
    tagline: 'Cover one environment. Prove the value fast.',
    price: '£495',
    unit: '/mo · per environment',
    features: [
      'AI investigation on every alert',
      'Plain-language verdicts + confidence',
      'Evidence-linked timelines',
      'MITRE ATT&CK mapping',
      'Read-only client portal',
      'Email digest + summary reports',
      'Email support',
    ],
    cta: { label: 'Start your pilot', href: '#contact' },
    footnote: 'Best for a single Sentinel / Defender / AWS tenant',
  },
  {
    name: 'Core',
    tagline: 'The full SOC capability, on your existing stack.',
    price: '£1,495',
    unit: '/mo · per environment',
    featured: true,
    features: [
      'Everything in Standalone, plus:',
      'Multi-environment / multi-tenant',
      'Per-environment baseline-deviation signals',
      'Recommended actions with human approval',
      'One-click approvals in product',
      'Full audit trail + undo on every reversible action',
      'Slack / Teams alerts + workflows',
      'Priority support · 4-hour response',
    ],
    cta: { label: 'Start your pilot', href: '#contact' },
    footnote: 'Billed monthly · cancel by email',
  },
  {
    name: 'Compliance',
    tagline: 'For regulated industries and audited estates.',
    price: '£2,995',
    unit: '/mo · per environment',
    features: [
      'Everything in Core, plus:',
      'Audit-evidence packs to support your SOC 2 / ISO 27001 / GDPR reporting',
      'Executive monthly investigation report',
      'Regulatory-grade audit log export',
      'Dedicated security architect · quarterly',
      'Custom log retention up to 7 years',
      '24/7 escalation channel',
    ],
    cta: { label: 'Talk to us', href: '#contact' },
    footnote: 'For regulated industries and audited estates',
  },
]

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={
        <>
          Pick a tier.{' '}
          <span className="text-bone-muted italic font-display">Every one starts with a refundable pilot.</span>
        </>
      }
      intro="SOC-as-a-service pricing, kept simple: priced per monitored environment, billed monthly, no minimum term. Start with a pilot. If OwlSOC hasn't earned its keep in 30 days, you get your money back. No discussion needed."
    >
      {/* Pilot ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-8 panel relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-soft via-transparent to-teal-soft pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-amber-iris/15 border border-amber-line flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-iris">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7l3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="font-display text-bone text-[22px] leading-tight">
                Pilot it for £495.{' '}
                <span className="italic text-amber-iris">Fully refundable for 30 days.</span>
              </div>
              <div className="mt-1 text-[13.5px] text-bone-soft max-w-[70ch] text-pretty">
                One environment, every alert investigated, a full report at week 4.
                If it doesn&apos;t earn its keep, ask for a refund. No questions, no clauses.
              </div>
              <div className="mt-2 font-mono text-[10.5px] uppercase tracking-widest-sm text-teal-bright">
                Pilots kick off on Mondays · book by Thursday to start next week
              </div>
            </div>
          </div>
          <Button href="#contact" variant="primary" size="md" arrow className="flex-shrink-0">
            Start your pilot
          </Button>
        </div>
      </motion.div>

      {/* Tiers */}
      <div className="grid lg:grid-cols-3 gap-5">
        {TIERS.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className={`relative rounded-xl p-7 sm:p-8 flex flex-col ${
              t.featured
                ? 'border border-amber-line bg-gradient-to-b from-amber-soft/60 to-ink-elevated shadow-[0_30px_80px_-40px_rgba(244,162,97,0.4)]'
                : 'border border-ink-border bg-ink-surface/60'
            }`}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-iris px-3 py-1 font-mono text-[10.5px] uppercase tracking-widest-sm text-ink-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-deep" />
                  Our recommended tier
                </span>
              </div>
            )}

            <div>
              <div className="h-eyebrow mb-3">{t.name}</div>
              <h3 className="font-display text-bone text-[22px] leading-tight text-balance">
                {t.tagline}
              </h3>
            </div>

            <div className="mt-6 pb-6 border-b border-ink-border">
              <div className="flex items-baseline gap-2">
                <span className={`font-display text-[44px] leading-none ${t.featured ? 'text-amber-iris' : 'text-bone'}`}>
                  {t.price}
                </span>
                <span className="font-mono text-[11px] text-bone-muted">{t.unit}</span>
              </div>
              <div className="mt-2 font-mono text-[10.5px] uppercase tracking-widest-sm text-bone-faint">
                Billed monthly · no minimum term
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-bone-soft">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-6 border-t border-ink-border">
              <Button
                href={t.cta.href}
                variant={t.featured ? 'primary' : 'secondary'}
                size="md"
                arrow
                className="w-full"
              >
                {t.cta.label}
              </Button>
              {t.footnote && (
                <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-widest-sm text-bone-faint">
                  {t.footnote}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 text-center text-[13px] text-bone-muted">
        <span className="font-mono text-[11px] uppercase tracking-widest-sm">Not sure which tier?</span>
        {' '}
        <a href="#contact" className="link-underline text-bone-soft hover:text-amber-iris">
          Tell us about your estate
        </a>
        {' '}
        and we&apos;ll scope the pilot in a 20-minute call.
      </div>
    </Section>
  )
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5 text-amber-iris">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
