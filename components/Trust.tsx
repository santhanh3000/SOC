'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'
import { PRIVACY_EMAIL } from '@/lib/site'

const PROMISES = [
  {
    title: 'You stay in control.',
    body:
      "OwlSOC recommends; humans approve. Nothing reaches your environment without a green light from someone on your team, and only when you've granted that write scope. Reversible actions undo in one click; the few that can't be reversed are flagged and need an explicit extra confirmation.",
    proof: ['Human-in-the-loop on every action', 'One-click undo on reversible actions', 'Non-reversible actions clearly flagged', 'Full audit trail on every action'],
  },
  {
    title: 'Your data, handled like data.',
    body:
      "We read what we need to investigate the alert, nothing more. Read-only access by default. UK/EU data residency. We don't train models on customer logs, and every sub-processor in our pipeline is contractually bound by the same no-training commitment.",
    proof: ['UK / EU data residency', 'Read-only by default', 'No model training, across every sub-processor', 'Encryption in transit and at rest', 'DPA available on request'],
  },
  {
    title: 'No rip-and-replace.',
    body:
      "OwlSOC sits on top of the Sentinel, Defender, and AWS tooling you already pay for. No agents pushed to endpoints. Nothing in your traffic path. You can switch us off in an hour.",
    proof: ['Sits on existing stack', 'No endpoint agents', 'Off in under an hour, end of contract or not'],
  },
  {
    title: '30 days. Money back. No clauses.',
    body:
      "Pilot OwlSOC for £495 across one environment for 30 days. If you don't believe it earns its keep, ask for a refund. We don't ask why. We don't have a clause about it.",
    proof: ['Fully refundable for 30 days', 'No minimum term, no auto-renew tricks', 'Cancel any time after, by email'],
  },
]

export function Trust() {
  return (
    <Section
      id="trust"
      eyebrow="What we promise"
      title={<>Four things we&apos;ll put in writing.</>}
      intro="Security tooling is famous for big promises and small print. We've tried to be specific, not aspirational. If anything below isn't true for your situation, we'd rather you knew before you signed."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {PROMISES.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="panel p-6 sm:p-8 group hover:border-amber-line transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-iris/10 border border-amber-line flex items-center justify-center font-display text-amber-iris">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-bone text-[24px] leading-snug text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 text-bone-soft text-[14.5px] leading-relaxed text-pretty">
                  {p.body}
                </p>
                <ul className="mt-5 pt-5 border-t border-ink-border space-y-1.5">
                  {p.proof.map((q) => (
                    <li key={q} className="flex items-start gap-2 font-mono text-[11.5px] text-bone-muted">
                      <span className="mt-1 h-1 w-1 rounded-full bg-teal-pupil" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Honest proof + certification status + DPA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="mt-6 panel p-6 sm:p-8"
      >
        <div className="h-eyebrow mb-3 text-amber-iris">How we know it works</div>
        <p className="text-bone-soft text-[14.5px] leading-relaxed text-pretty max-w-[80ch]">
          Before we connect to anyone&apos;s tenant, we validate each release against a fixed
          set of real-world attack scenarios: adversary-in-the-middle token theft,
          encoded-PowerShell execution, OAuth consent abuse, mass exfiltration, and others.
          On that set, OwlSOC reaches the expected verdict — likely true positive, likely false
          positive, or needs review — and shows the sourced timeline behind it. It&apos;s
          a defined test set, not a promise about your environment. The 30-day pilot is the
          real test, on your own alerts.
        </p>
        <p className="mt-4 text-bone-muted text-[13.5px] leading-relaxed text-pretty max-w-[80ch]">
          On certification: OwlSOC is not yet SOC 2 or ISO 27001 certified. We&apos;re glad to
          share our current security posture, our sub-processor list, and our data processing
          agreement before you sign.{' '}
          <a
            href={`mailto:${PRIVACY_EMAIL}?subject=OwlSOC%20DPA%20request`}
            className="text-amber-iris link-underline"
          >
            Request the DPA
          </a>
          .
        </p>
      </motion.div>
    </Section>
  )
}
