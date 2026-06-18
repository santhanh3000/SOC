'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from './ui/Section'
import { Button } from './ui/Button'
import { SAMPLE_ALERTS, SampleAlert, Severity, Priority, Verdict } from '@/lib/demo-data'

const SEV_GLYPH: Record<Severity, string> = {
  critical: '◉',
  high: '▲',
  medium: '◆',
  low: '▾',
  informational: '·',
}

const sevStyles: Record<Severity, { text: string; bg: string; dot: string; label: string }> = {
  critical: { text: 'text-sev-crit-hi', bg: 'bg-sev-crit/10', dot: 'bg-sev-crit', label: 'Critical' },
  high:     { text: 'text-sev-high', bg: 'bg-sev-high/10', dot: 'bg-sev-high', label: 'High' },
  medium:   { text: 'text-sev-med',  bg: 'bg-sev-med/10',  dot: 'bg-sev-med',  label: 'Medium' },
  low:      { text: 'text-sev-low',  bg: 'bg-sev-low/10',  dot: 'bg-sev-low',  label: 'Low' },
  informational: { text: 'text-sev-info', bg: 'bg-sev-info/10', dot: 'bg-sev-info', label: 'Info' },
}

const priorityStyles: Record<Priority, { text: string; bg: string }> = {
  P1: { text: 'text-sev-crit-hi', bg: 'bg-sev-crit/10' },
  P2: { text: 'text-sev-high', bg: 'bg-sev-high/10' },
  P3: { text: 'text-sev-med', bg: 'bg-sev-med/10' },
  P4: { text: 'text-sev-info', bg: 'bg-sev-info/10' },
}

const verdictStyles: Record<Verdict, { ring: string; text: string; bg: string; label: string }> = {
  'true-positive':  { ring: 'ring-sev-crit/40', text: 'text-sev-crit', bg: 'bg-sev-crit/10', label: 'Likely true positive' },
  'false-positive': { ring: 'ring-ok/40', text: 'text-ok', bg: 'bg-ok/10', label: 'Likely false positive' },
  'uncertain':      { ring: 'ring-sev-med/40', text: 'text-sev-med', bg: 'bg-sev-med/10', label: 'Uncertain — needs review' },
}

export function Demo() {
  const [active, setActive] = useState<SampleAlert>(SAMPLE_ALERTS[0])
  const [investigating, setInvestigating] = useState(false)
  const reduceMotion = useReducedMotion()
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const viewerRef = useRef<HTMLDivElement>(null)

  function select(a: SampleAlert) {
    if (a.id === active.id) return
    setActive(a)
    if (timer.current) clearTimeout(timer.current)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      viewerRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
    if (reduceMotion) {
      setInvestigating(false)
      return
    }
    setInvestigating(true)
    timer.current = setTimeout(() => setInvestigating(false), 1100)
  }

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return (
    <Section
      id="demo"
      eyebrow="See it on a real-world scenario"
      title={
        <>
          A sample investigation.{' '}
          <span className="text-bone-muted italic font-display">Pick one and see what your team would get.</span>
        </>
      }
      intro="These are synthetic alerts, shown in the same shape as the product reports them: the same verdict, timeline, MITRE mapping, evidence chain, and recommended actions your team would see when OwlSOC is watching your tenant. Pick a scenario."
    >
      <div className="grid lg:grid-cols-[340px_1fr] gap-5">
        {/* Alert chooser */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted px-1">
            Sample alerts
          </div>
          <div role="group" aria-label="Sample alerts" className="space-y-3">
            {SAMPLE_ALERTS.map((a) => {
              const isActive = a.id === active.id
              const sev = sevStyles[a.severity]
              const pri = priorityStyles[a.priority]
              return (
                <button
                  key={a.id}
                  onClick={() => select(a)}
                  aria-pressed={isActive}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-300 group ${
                    isActive
                      ? 'border-amber-line bg-amber-soft'
                      : 'border-ink-border bg-ink-surface/60 hover:border-bone-faint hover:bg-ink-elevated/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10.5px] text-bone-faint">{a.alertId}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10.5px] font-medium ${pri.text}`}>
                        {a.priority}
                      </span>
                      <span className={`flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-widest-sm ${sev.text}`}>
                        <span className="text-[9px]" aria-hidden="true">{SEV_GLYPH[a.severity]}</span>
                        {sev.label}
                      </span>
                    </div>
                  </div>
                  <div className="font-display text-[19px] leading-snug text-bone">
                    {a.title}
                  </div>
                  <div className="mt-2 text-[12.5px] text-bone-muted leading-snug">
                    {a.oneLiner}
                  </div>
                  <div className="mt-3 pt-3 border-t border-ink-border flex items-center justify-between text-[10.5px] font-mono text-bone-faint">
                    <span>{a.source.split(' · ')[0]}</span>
                    <span className={isActive ? 'text-amber-iris' : 'text-bone-faint group-hover:text-bone-muted'}>
                      {isActive ? 'viewing ⟶' : 'view ⟶'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 panel p-4">
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 text-amber-iris flex-shrink-0" aria-hidden="true">
                <path d="M12 9v4M12 17h.01M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <div className="text-[11.5px] leading-relaxed text-bone-muted">
                <strong className="text-bone-soft">Illustrative data.</strong> The alerts, entities,
                IPs and tenants are synthetic. The investigation format and depth match what your
                team sees when OwlSOC is connected to your real Sentinel / Defender / AWS.
              </div>
            </div>
          </div>
        </div>

        {/* Investigation viewer */}
        <div ref={viewerRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-xl border border-ink-border bg-gradient-to-b from-ink-elevated to-ink-surface overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
          >
            <InvestigationViewer alert={active} investigating={investigating} />
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}

function InvestigationViewer({
  alert,
  investigating,
}: {
  alert: SampleAlert
  investigating: boolean
}) {
  const sev = sevStyles[alert.severity]
  const pri = priorityStyles[alert.priority]
  const v = verdictStyles[alert.verdict]

  return (
    <>
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-ink-border bg-ink-deep/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[11px] text-bone-muted truncate">
            investigation / {alert.alertId}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest-sm text-teal-bright px-2 py-0.5 rounded-full ring-1 ring-inset ring-teal-line bg-teal-soft"
            title="In the product, this badge marks a case written by OwlSOC's AI investigation. Facts stay grounded in the case data."
          >
            <span aria-hidden="true">✦</span> AI investigation
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest-sm text-amber-iris/90 px-2 py-0.5 rounded-full border border-amber-line">
            Synthetic sample
          </span>
        </div>
      </div>

      {/* Alert header */}
      <div className="p-5 sm:p-7 border-b border-ink-border">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-widest-sm ring-1 ring-inset ring-current/30 ${sev.bg} ${sev.text}`}>
            <span className="text-[9px]" aria-hidden="true">{SEV_GLYPH[alert.severity]}</span>
            {sev.label}
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10.5px] font-medium ring-1 ring-inset ring-current/30 ${pri.bg} ${pri.text}`}>
            {alert.priority}
          </span>
          <span className="font-mono text-[11px] text-bone-muted">{alert.source}</span>
          <span className="text-ink-divider">·</span>
          <span className="font-mono text-[11px] text-bone-muted">fired {alert.fired}</span>
        </div>
        <h3 className="font-display text-[28px] sm:text-[34px] text-bone leading-[1.1] text-balance">
          {alert.title}
        </h3>
      </div>

      {investigating ? (
        <InvestigatingPanel alert={alert} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Verdict */}
          <div className="p-5 sm:p-7 border-b border-ink-border">
            <div className="flex items-start gap-5">
              <div className={`relative flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ring-1 ${v.ring} ${v.bg}`}>
                {alert.verdict === 'true-positive' && (
                  <span className={`absolute inset-0 rounded-full ${v.bg} animate-ping opacity-40`} aria-hidden="true" />
                )}
                <VerdictIcon verdict={alert.verdict} className={v.text} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <div className={`font-display text-[24px] sm:text-[28px] leading-tight ${v.text}`}>
                    {v.label}
                  </div>
                  <div className="font-mono text-[12px] text-bone-muted">
                    {alert.confidence}% confidence · investigated in {alert.investigatedIn} (illustrative)
                  </div>
                </div>
                {alert.confidenceRationale && (
                  <p className="mt-2 text-[12.5px] text-bone-faint leading-relaxed">
                    Why: {alert.confidenceRationale}
                  </p>
                )}
                <p className="mt-2 text-[11.5px] text-bone-faint leading-relaxed">
                  The calibrated confidence and written narrative come from AI investigation, a
                  separate optional step. Standard triage gives you a score and an
                  &ldquo;uncertain — needs review&rdquo; default until a human or the AI confirms it.
                </p>
                <p className="mt-3 text-bone-soft text-[14.5px] leading-relaxed text-pretty">
                  {alert.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Root-cause hypothesis */}
          {alert.rootCauseHypothesis && (
            <Block eyebrow="Root-cause hypothesis" label="The investigation's primary explanation">
              <p className="text-[14px] text-bone-soft leading-relaxed">{alert.rootCauseHypothesis}</p>
            </Block>
          )}

          {/* Timeline */}
          <Block eyebrow="Timeline" label="Chronological · source IDs surfaced where available">
            <div className="space-y-0">
              {alert.timeline.map((t, i) => (
                <TimelineRow key={i} t={t} last={i === alert.timeline.length - 1} />
              ))}
            </div>
          </Block>

          {/* MITRE */}
          <Block eyebrow="MITRE ATT&CK mapping" label="Technique attribution for downstream reporting">
            <div className="flex flex-wrap gap-2">
              {alert.mitre.map((m) => (
                <div key={m.id} className="group panel p-3 hover:border-amber-line transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-amber-iris">{m.id}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest-sm text-bone-faint">
                      {m.tactic}
                    </span>
                  </div>
                  <div className="text-[13px] text-bone-soft">{m.technique}</div>
                </div>
              ))}
            </div>
          </Block>

          {/* Evidence chain */}
          {alert.evidenceChain.length > 0 && (
            <Block eyebrow="Evidence" label="Source-linked · pivot IDs back to your console">
              <div className="divide-y divide-ink-border">
                {alert.evidenceChain.map((e) => (
                  <div key={e.ref} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="shrink-0 font-mono text-[11px] font-semibold text-amber-iris">{e.ref}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] text-bone-soft">{e.summary}</div>
                      <div className="mt-0.5 font-mono text-[10.5px] text-bone-faint">
                        tool: {e.tool}
                        {e.sourceRef && (
                          <> · pivot: <span className="bg-ink-deep/60 px-1 py-0.5 rounded">{e.sourceRef}</span></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* Entities */}
          <Block eyebrow="Affected entities" label={`${alert.entities.length} resolved · linked across sources`}>
            <div className="grid sm:grid-cols-2 gap-2">
              {alert.entities.map((e, i) => (
                <div key={i} className="flex items-start gap-3 panel p-3">
                  <EntityIcon kind={e.kind} />
                  <div className="min-w-0">
                    <div className="font-mono text-[12.5px] text-bone truncate">{e.name}</div>
                    <div className="text-[11.5px] text-bone-muted truncate">{e.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          {/* Unresolved questions */}
          {alert.unresolvedQuestions.length > 0 && (
            <Block eyebrow="Unresolved questions" label="Flagged for analyst follow-up">
              <ul className="list-disc pl-5 text-[13.5px] text-bone-muted space-y-1">
                {alert.unresolvedQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </Block>
          )}

          {/* Actions */}
          <Block eyebrow="Containment actions" label="Human approval required · action trail">
            <p className="mb-3 text-[12.5px] text-bone-muted leading-relaxed">
              Recommendations only. Execution happens via a write connector once a human approves,
              and only if your tenant has granted that write scope. The API enforces this, not the UI.
            </p>
            <div className="space-y-2.5">
              {alert.actions.map((a, i) => (
                <ActionRow key={i} action={a} />
              ))}
            </div>
          </Block>

          {/* CTA strip */}
          <div className="p-5 sm:p-7 bg-gradient-to-r from-amber-soft via-ink-elevated to-teal-soft border-t border-ink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-bone-soft text-[14.5px] text-pretty">
              <span className="font-display text-bone text-lg">This is a sample.</span> See it
              running against <em className="text-amber-iris not-italic">your</em> alerts.
              Start with a 30-day refundable pilot.
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button href="#contact" variant="primary" size="md" arrow>
                Start your pilot
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

const INVESTIGATING_STEPS = [
  (a: SampleAlert) => `[00:00:04] picked up ${a.alertId} (${a.source.split(' · ')[0]})`,
  () => `[00:00:11] correlating signals across sources…`,
  () => `[00:00:26] resolving affected entities…`,
  () => `[00:01:02] mapping technique attribution (MITRE ATT&CK)…`,
  (a: SampleAlert) => `[${a.investigatedIn}] verdict ready ✓`,
]

function InvestigatingPanel({ alert }: { alert: SampleAlert }) {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-pupil opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest-sm text-teal-bright">
          OwlSOC investigating…
        </span>
      </div>
      <div className="panel-elevated p-4 font-mono text-[11px] leading-relaxed min-h-[140px]">
        <div className="flex items-center justify-between text-bone-faint mb-2">
          <span>investigation_run.log</span>
          <span className="text-teal-bright">running</span>
        </div>
        <div className="space-y-1">
          {INVESTIGATING_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.18, duration: 0.2 }}
              className={i === INVESTIGATING_STEPS.length - 1 ? 'text-amber-iris' : 'text-bone-muted'}
            >
              {step(alert)}
              {i === INVESTIGATING_STEPS.length - 1 && (
                <span className="ml-1 inline-block h-3 w-1.5 align-middle bg-teal-bright animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Block({
  eyebrow,
  label,
  children,
}: {
  eyebrow: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="p-5 sm:p-7 border-b border-ink-border last:border-b-0">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-widest-sm text-amber-iris/90">
          {eyebrow}
        </span>
        <span className="font-mono text-[10.5px] text-bone-faint truncate">{label}</span>
      </div>
      {children}
    </div>
  )
}

function TimelineRow({
  t,
  last,
}: {
  t: { time: string; kind: string; label: string; evidence?: string }
  last: boolean
}) {
  const isOwlSOC = t.kind === 'owlsoc'
  return (
    <div className="relative flex items-start gap-4 pb-4 last:pb-0">
      {!last && <span className="absolute left-[14px] top-6 bottom-0 w-px bg-ink-border" aria-hidden="true" />}
      <div
        className={`relative flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center border ${
          isOwlSOC ? 'bg-amber-soft border-amber-line' : 'bg-ink-deep border-ink-border'
        }`}
      >
        {isOwlSOC ? (
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <circle cx="3.5" cy="4" r="3.2" fill="#F4A261" />
            <circle cx="3.5" cy="4" r="1.3" fill="#2EA59F" />
            <circle cx="10.5" cy="4" r="3.2" fill="#F4A261" />
            <circle cx="10.5" cy="4" r="1.3" fill="#2EA59F" />
          </svg>
        ) : (
          <span className={`h-1.5 w-1.5 rounded-full ${
            t.kind === 'signal' ? 'bg-teal-pupil' :
            t.kind === 'system' ? 'bg-bone-muted' : 'bg-amber-iris/60'
          }`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] text-bone-faint">{t.time}</span>
          <span className={`text-[13.5px] leading-snug ${isOwlSOC ? 'text-amber-iris' : 'text-bone-soft'}`}>
            {t.label}
          </span>
        </div>
        {t.evidence && (
          <div className="mt-1 font-mono text-[10.5px] text-bone-faint truncate">
            ↳ {t.evidence}
          </div>
        )}
      </div>
    </div>
  )
}

function ActionRow({
  action,
}: {
  action: { action: string; target: string; rationale: string; requires_approval: boolean; reversible: boolean }
}) {
  const [decision, setDecision] = useState<null | { status: string; tone: string; at?: string }>(null)
  const [confirmed, setConfirmed] = useState(false)

  function decide(kind: 'approve' | 'reject') {
    if (kind === 'approve') {
      if (!action.reversible && !confirmed) return
      const at =
        typeof window !== 'undefined' ? new Date().toLocaleTimeString('en-GB', { hour12: false }) : ''
      setDecision({ status: `Approved · awaiting write connector · audit logged ${at}`, tone: 'approve', at })
    } else {
      setDecision({ status: 'Rejected · logged', tone: 'reject' })
    }
  }

  return (
    <div className="panel p-4 hover:border-amber-line transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-3 min-w-0">
          <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-sm bg-amber-iris" aria-hidden="true" />
          <div className="min-w-0">
            <div className="font-display text-[17px] text-bone leading-snug">
              {action.action} <span className="text-bone-muted font-sans text-[14px]">→ {action.target}</span>
            </div>
            <div className="mt-1 text-[13px] text-bone-soft leading-snug">{action.rationale}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest-sm">
              <span className={`rounded-full px-2 py-0.5 ring-1 ring-inset ${
                action.reversible
                  ? 'bg-ink-deep text-bone-muted ring-ink-border'
                  : 'bg-sev-crit/10 text-sev-crit-hi ring-sev-crit/30'
              }`}>
                {action.reversible ? 'reversible' : 'non-reversible'}
              </span>
              {action.requires_approval && (
                <span className="text-bone-faint">requires human approval</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Non-reversible actions require an explicit extra confirmation — mirrors the product. */}
      {!decision && !action.reversible && (
        <label className="mt-3 flex items-center gap-2 text-[11.5px] text-sev-crit-hi">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="accent-sev-crit"
          />
          I understand this action is non-reversible.
        </label>
      )}
      <div className="mt-3 pt-3 border-t border-ink-border flex flex-wrap items-center gap-2">
        <div
          role="status"
          className={
            decision
              ? `flex items-center gap-2 font-mono text-[11.5px] ${
                  decision.tone === 'approve' ? 'text-ok' : 'text-bone-faint'
                }`
              : 'sr-only'
          }
        >
          {decision && (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {decision.status}
              {/* Undo is offered only on reversible actions — exactly as the product gates it. */}
              {decision.tone === 'approve' && action.reversible && (
                <button
                  type="button"
                  onClick={() => setDecision(null)}
                  className="ml-1 text-bone-faint hover:text-bone-soft underline underline-offset-2"
                >
                  undo
                </button>
              )}
            </>
          )}
        </div>
        {!decision && (
          <>
            <ActionButton
              tone="primary"
              onClick={() => decide('approve')}
              disabled={!action.reversible && !confirmed}
            >
              Approve
            </ActionButton>
            <ActionButton tone="ghost" onClick={() => decide('reject')}>
              Reject
            </ActionButton>
            <span className="w-full sm:w-auto sm:ml-auto mt-1 sm:mt-0 font-mono text-[10.5px] text-bone-muted">
              Audit logged
            </span>
          </>
        )}
      </div>
    </div>
  )
}

function ActionButton({
  children,
  tone,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  tone: 'primary' | 'ghost'
  onClick: () => void
  disabled?: boolean
}) {
  const styles = {
    primary: 'bg-amber-iris/90 text-ink-deep hover:bg-amber-bright',
    ghost:   'text-bone-muted hover:text-bone-soft',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-3 py-2 text-[12px] font-medium transition-colors min-h-[36px] disabled:opacity-40 disabled:cursor-not-allowed ${styles[tone]}`}
    >
      {children}
    </button>
  )
}

// Verdict glyphs match the product's badges (badges.tsx): ◉ true positive, ✓ false positive,
// ? uncertain — so the demo reads identically to a real case on login.
const VERDICT_GLYPH: Record<Verdict, string> = {
  'true-positive': '◉',
  'false-positive': '✓',
  'uncertain': '?',
}

function VerdictIcon({ verdict, className }: { verdict: Verdict; className?: string }) {
  return (
    <span className={`font-display text-[26px] leading-none ${className ?? ''}`} aria-hidden="true">
      {VERDICT_GLYPH[verdict]}
    </span>
  )
}

function EntityIcon({ kind }: { kind: string }) {
  const map: Record<string, React.ReactNode> = {
    user: <UserIcon />,
    device: <DeviceIcon />,
    mail: <MailIcon />,
    address: <AddressIcon />,
    token: <TokenIcon />,
    app: <AppIcon />,
  }
  return (
    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-ink-deep border border-ink-border flex items-center justify-center text-bone-muted" aria-hidden="true">
      {map[kind] ?? <AppIcon />}
    </div>
  )
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function DeviceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function AddressIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function TokenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function AppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
