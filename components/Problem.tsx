'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'

const PAINS = [
  {
    n: '01',
    title: 'Alerts pile up faster than humans can read them.',
    body:
      'A mid-sized estate fires hundreds of alerts a day across identity, endpoint, mail, and cloud. Most get a glance, a tag, and a close. The one that mattered is still in the queue.',
    stat: 'Hundreds',
    statLabel: 'alerts / day on a normal estate',
  },
  {
    n: '02',
    title: 'Attackers do their best work between 2am Saturday and 6am Sunday.',
    body:
      "An overnight token-theft becomes a Monday-morning incident. By the time anyone's looked, the dwell time is already measured in days, not minutes.",
    stat: '~63h',
    statLabel: 'Fri evening to Mon morning, uncovered',
  },
  {
    n: '03',
    title: 'A real 24/7 SOC team costs more than the rest of your security budget.',
    body:
      'Five analysts on shift pattern, a lead, a manager, the tooling on top. North of £500k a year before you investigate the first alert. Most teams can\'t justify it. Most go without.',
    stat: '£500k+',
    statLabel: 'fully-loaded SOC team / year',
  },
]

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title={
        <>
          You can&apos;t hire your way out of this.{' '}
          <span className="text-bone-muted italic font-display">And ignoring it isn&apos;t a plan.</span>
        </>
      }
      intro="Security teams aren't short on alerts. They're short on hours, on people, and on a way to investigate every alert the moment it fires, whether that's 3am on a Sunday or 11am on a Tuesday."
    >
      <div className="grid lg:grid-cols-3 gap-5">
        {PAINS.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            className="panel p-7 sm:p-8 relative group hover:border-amber-line transition-colors"
          >
            <div className="flex items-baseline justify-between mb-8">
              <span className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
                Pain · {p.n}
              </span>
              <span className="font-display text-amber-iris/40 text-4xl leading-none">
                {p.n}
              </span>
            </div>

            <h3 className="h-display text-[26px] sm:text-[28px] leading-[1.1] text-bone text-balance">
              {p.title}
            </h3>

            <p className="mt-5 text-bone-soft text-[15px] leading-relaxed text-pretty">
              {p.body}
            </p>

            <div className="mt-8 pt-6 border-t border-ink-border flex items-baseline gap-3">
              <span className="font-display text-3xl text-amber-iris">{p.stat}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
                {p.statLabel}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 sm:mt-20 max-w-3xl mx-auto text-center">
        <p className="font-display italic text-2xl sm:text-3xl text-bone-soft text-balance leading-snug">
          &ldquo;The breach that hurts you isn&apos;t the one you missed.
          It&apos;s the one you triaged in nine seconds at 4pm on Friday.&rdquo;
        </p>
      </div>
    </Section>
  )
}
