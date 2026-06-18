'use client'

import { motion } from 'framer-motion'
import { Section } from './ui/Section'
import { Button } from './ui/Button'

const COLUMNS = ['Hire a 24/7 SOC team', 'Do nothing', 'Traditional MDR', 'OwlSOC'] as const

type Row = { dim: string; cells: [string, string, string, string] }

const ROWS: Row[] = [
  {
    dim: 'Typical cost',
    cells: ['£500k+/year fully loaded', '£0 up front; incident cost unbounded', 'Varies; often five figures/year', 'From £495/month per environment'],
  },
  {
    dim: 'Time to live',
    cells: ['6–12 months to hire and ramp', 'n/a', 'Weeks to months (migration)', 'Within 48 hours of access'],
  },
  {
    dim: 'Alert coverage',
    cells: ['Not every alert is investigated; depth and consistency vary by shift', 'Alerts triaged in seconds, or never', 'Covered, but triage SLAs often 30–60 min', 'Every alert triaged automatically; AI investigation on each, typically under 2 min'],
  },
  {
    dim: 'Works with your existing stack',
    cells: ['Yes', 'Yes', 'Often requires migrating tooling', 'Yes; sits on top of Sentinel / Defender / AWS, read-only first'],
  },
  {
    dim: 'Contract',
    cells: ['Permanent headcount', 'None', 'Commonly multi-year', 'Monthly, no minimum term; 30-day refundable pilot'],
  },
  {
    dim: 'Who approves actions',
    cells: ['Your team', 'Nobody', 'Provider (varies by contract)', 'Your team; every action human-approved and logged, execution write-grant-gated'],
  },
  {
    dim: 'Visibility into the reasoning',
    cells: ['Full', 'n/a', 'Usually summary-level', 'Full; in an AI investigation, every claim pivots back to a source log'],
  },
]


export function Comparison() {
  return (
    <Section
      id="vs"
      eyebrow="Why OwlSOC"
      title={
        <>
          You have three options.{' '}
          <span className="text-bone-muted italic font-display">Most teams talk themselves out of the right one.</span>
        </>
      }
      intro="OwlSOC is built for the team that already runs Sentinel, Defender, or AWS and wants the depth and coverage of a 24/7 SOC team, without the cost, the migration, or the multi-year contract."
    >
      {/* Honest comparison, as a real table: cleanly machine-extractable */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="panel overflow-x-auto"
      >
        <table className="w-full min-w-[860px] border-collapse text-left">
          <caption className="sr-only">
            Comparison of options for handling security alerts: hiring a 24/7 SOC team,
            doing nothing, traditional MDR, and OwlSOC
          </caption>
          <thead>
            <tr className="border-b border-ink-divider">
              <th scope="col" className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted font-normal align-bottom">
                Your options
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className={`p-4 sm:p-5 font-display text-[18px] leading-tight align-bottom ${
                    c === 'OwlSOC' ? 'text-amber-iris' : 'text-bone'
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.dim} className="border-b border-ink-border last:border-b-0">
                <th scope="row" className="p-4 sm:p-5 font-mono text-[11.5px] uppercase tracking-widest-sm text-bone-muted font-normal align-top">
                  {r.dim}
                </th>
                {r.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`p-4 sm:p-5 text-[13.5px] leading-relaxed align-top ${
                      i === 3 ? 'text-bone bg-amber-iris/10' : 'text-bone-soft'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <p className="mt-3 px-1 text-[12px] text-bone-muted sm:hidden">Scroll the table sideways for all four options.</p>

      {/* OwlSOC highlight */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 relative overflow-hidden rounded-xl border border-amber-line bg-gradient-to-br from-amber-soft via-ink-elevated to-teal-soft p-8 sm:p-10"
      >
        <div className="absolute inset-0 grid-bg opacity-30 mask-fade-edges pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="h-eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-iris" />
              <span className="text-amber-iris">The better answer for most teams</span>
            </div>
            <h3 className="h-display text-[36px] sm:text-[48px] text-bone leading-[0.98] text-balance">
              OwlSOC. <span className="italic text-amber-iris">On top of</span> the stack you already pay for.
            </h3>
            <p className="mt-5 text-bone-soft text-[15.5px] leading-relaxed max-w-[60ch] text-pretty">
              No migration. No headcount. No multi-year contract. A 30-day refundable
              pilot, with first investigations running on your alerts within 48 hours
              of access at kickoff. If it doesn&apos;t earn its keep, you get your money back.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="primary" size="lg" arrow>
                Start your £495 pilot
              </Button>
              <Button href="#demo" variant="secondary" size="lg">
                See a sample investigation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat n="< 2 min" label="Typical investigation latency" />
            <Stat n="48 h" label="From access granted to live" />
            <Stat n="£495" label="Pilot, fully refundable" />
            <Stat n="Every alert" label="Triaged, not sampled" />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="panel-elevated p-4">
      <div className="font-display text-amber-iris text-[28px] leading-none">{n}</div>
      <div className="mt-2 font-mono text-[10.5px] uppercase tracking-widest-sm text-bone-muted">
        {label}
      </div>
    </div>
  )
}
