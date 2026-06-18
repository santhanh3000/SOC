'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'

const STEPS = [
  {
    n: '01',
    title: 'Connect',
    headline: 'Read-only, in minutes.',
    body:
      'OAuth into Microsoft Sentinel, Defender, or your AWS security stack. No agents to push. No endpoints to install. Nothing in your traffic path.',
    detail: ['Sentinel · Defender · AWS', 'Read-only by default', '~30 min onboarding'],
    icon: PlugIcon,
  },
  {
    n: '02',
    title: 'Investigate',
    headline: 'Every alert. Automatically.',
    body:
      'The moment an alert fires, OwlSOC triages it automatically and, on every alert, runs the AI investigation a human analyst would: pulls the relevant logs, correlates the signals, resolves the entities. Typically under two minutes, around the clock.',
    detail: ['Triggered on every alert', 'Cross-source correlation', 'Baseline-deviation signals'],
    icon: EyeIcon,
  },
  {
    n: '03',
    title: 'Report',
    headline: 'Analyst-grade. Evidence-linked.',
    body:
      'You get a plain-language verdict, a chronological timeline, MITRE ATT&CK mapping, the affected entities, and a recommended next action. Each claim is tied back to the source log.',
    detail: ['Plain-language verdict', 'MITRE ATT&CK mapped', 'Every claim linked to evidence'],
    icon: DocumentIcon,
  },
  {
    n: '04',
    title: 'Approve',
    headline: 'You stay in control.',
    body:
      'OwlSOC recommends. Humans decide. A human approves or rejects every containment action; execution then runs through a write connector only on the scopes you’ve granted. Full audit trail. Reversible actions undo in one click; the few that can’t be are flagged before you approve.',
    detail: ['Human-in-the-loop', 'Write-grant gated', 'Undo on reversible actions'],
    icon: ShieldIcon,
  },
]

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={
        <>
          Plugged into the tools you already run.{' '}
          <span className="text-bone-muted italic font-display">Live in days, not quarters.</span>
        </>
      }
      intro="Nothing to migrate, no agents to roll out. OwlSOC reads from your existing security stack and gives your team the investigation depth of a 24/7 SOC, without the headcount."
    >
      <div className="grid lg:grid-cols-4 gap-4 relative">
        {/* Connector line on desktop */}
        <div className="hidden lg:block absolute top-[88px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-line to-transparent" />

        {STEPS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="relative panel-elevated p-6 sm:p-7 group hover:border-amber-line transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-ink-deep border border-ink-border group-hover:border-amber-line transition-colors">
                  <Icon />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-iris text-ink-deep text-[10px] font-mono font-semibold flex items-center justify-center">
                    {s.n.slice(1)}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest-sm text-bone-faint">
                  Step
                </span>
              </div>

              <h3 className="font-display text-bone text-2xl leading-tight">
                {s.title}
              </h3>
              <p className="mt-1 font-display italic text-amber-iris text-lg">
                {s.headline}
              </p>

              <p className="mt-4 text-bone-soft text-[14.5px] leading-relaxed text-pretty">
                {s.body}
              </p>

              <ul className="mt-6 pt-5 border-t border-ink-border space-y-2">
                {s.detail.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 font-mono text-[11.5px] text-bone-muted"
                  >
                    <span className="mt-1 h-1 w-1 rounded-full bg-teal-pupil" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 flex items-center justify-center gap-3 text-[12.5px] text-bone-muted">
        <span className="font-mono uppercase tracking-widest-sm">Typical pilot timeline</span>
        <span className="text-ink-divider">·</span>
        <span>kickoff Monday, first investigations Tuesday, end-of-week summary report</span>
      </div>
    </Section>
  )
}

function PlugIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-iris">
      <path
        d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-iris">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.2" fill="#2EA59F" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-iris">
      <path
        d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 14h7M9 17h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-iris">
      <path
        d="M12 2l8 3v7c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V5l8-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
