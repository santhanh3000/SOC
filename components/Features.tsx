'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="What you get"
      title={
        <>
          The depth of a 24/7 SOC team.{' '}
          <span className="text-bone-muted italic font-display">Without the headcount.</span>
        </>
      }
      intro="Six things every investigation gives your team. Packaged so a non-specialist can act on it, and a specialist can audit the reasoning."
    >
      <div className="grid lg:grid-cols-6 gap-4 lg:auto-rows-[238px]">
        {/* Featured: AI Investigation */}
        <FeatureCard
          className="lg:col-span-3 lg:row-span-2"
          delay={0}
          eyebrow="Core capability"
          title="An AI investigator on every alert"
          body="Every alert is triaged automatically. With AI investigation on, OwlSOC works the case like a tier-2 analyst: pulls the relevant logs, builds a chronology, attributes techniques, and writes a plain-language verdict. Typically under two minutes."
          accent={
            <div className="absolute inset-x-6 bottom-6 panel-elevated p-4 font-mono text-[11px] leading-relaxed">
              <div className="flex items-center justify-between text-bone-faint mb-2">
                <span className="flex items-center gap-2">
                  investigation_run.log
                  <span className="text-[9px] uppercase tracking-widest-sm text-bone-faint/70">illustrative</span>
                </span>
                <span className="text-teal-bright">running</span>
              </div>
              <div className="space-y-1">
                <div className="text-bone-muted">[00:00:04] picked up alert A-49283 (Defender, high)</div>
                <div className="text-bone-muted">[00:00:11] correlating across 4 sources…</div>
                <div className="text-bone-muted">[00:00:28] decoded PS payload → harvester family Atlas-7</div>
                <div className="text-bone-muted">[00:01:02] entity graph resolved · 4 entities linked</div>
                <div className="text-bone-muted">[00:01:24] MITRE attribution complete</div>
                <div className="text-amber-iris">[00:01:32] verdict: likely true positive · containment suggested for review</div>
              </div>
            </div>
          }
        />

        {/* Smaller */}
        <FeatureCard
          className="lg:col-span-3"
          delay={0.08}
          eyebrow="Evidence-linked"
          title="Every claim traces back to the source log."
          body="No black-box assertions. Each line of the timeline cites the exact event, table, and identifier. Your team audits the reasoning instead of trusting it."
        />

        <FeatureCard
          className="lg:col-span-3"
          delay={0.16}
          eyebrow="MITRE ATT&CK"
          title="Technique attribution, on every finding."
          body="OwlSOC maps each step in the attack chain to ATT&CK tactics and techniques. Useful for incident response, audit, and reporting to leadership and regulators."
        />

        {/* Row 2 */}
        <FeatureCard
          className="lg:col-span-2"
          delay={0.24}
          eyebrow="Adaptive baseline"
          title="Knows what's normal for you."
          body="Learns the rhythms of your estate: who logs in from where, which tools run when. So it tells a benign anomaly from a real one without drowning you in noise."
        />

        <FeatureCard
          className="lg:col-span-2"
          delay={0.32}
          eyebrow="Human-in-the-loop"
          title="You approve every action."
          body="OwlSOC recommends and explains. Your team approves, and only on the write scopes you’ve granted. Reversible actions can be undone in one click; the few that can’t are flagged before approval."
        />

        <FeatureCard
          className="lg:col-span-2"
          delay={0.4}
          eyebrow="Client portal"
          title="One place for the whole picture."
          body="A live view of open investigations, the queue, recent decisions, and an export-ready audit trail. Built for the security lead, not the analyst. Analysts get the depth too."
        />
      </div>

      {/* Connector list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mt-10 panel p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted flex-shrink-0">
          Connects to
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-bone-soft text-lg">
          <span>Microsoft Sentinel</span>
          <Dot />
          <span>Microsoft Defender</span>
          <Dot />
          <span>AWS Security Hub</span>
        </div>
        <span className="sm:ml-auto font-mono text-[11px] text-bone-faint">More scoped on request</span>
      </motion.div>
    </Section>
  )
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-amber-iris/60" />
}

function FeatureCard({
  eyebrow,
  title,
  body,
  className = '',
  delay = 0,
  accent,
}: {
  eyebrow: string
  title: string
  body: string
  className?: string
  delay?: number
  accent?: React.ReactNode
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`panel-elevated relative overflow-hidden p-6 sm:p-7 group hover:border-amber-line transition-colors ${className}`}
    >
      <div className="absolute inset-0 grid-bg opacity-30 mask-fade-edges pointer-events-none" />
      <div className="relative">
        <div className="h-eyebrow mb-3">{eyebrow}</div>
        <h3 className="font-display text-bone text-[24px] leading-tight text-balance">
          {title}
        </h3>
        <p className="mt-3 text-bone-soft text-[14.5px] leading-relaxed text-pretty max-w-[44ch]">
          {body}
        </p>
      </div>
      {accent}
    </motion.article>
  )
}
