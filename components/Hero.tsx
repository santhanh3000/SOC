import { BrandMark } from './Brand'
import { Button } from './ui/Button'

const TICKER = [
  { id: 'A-49281', sev: 'med',  tag: 'sign-in', text: 'Impossible travel · admin@constellation' },
  { id: 'A-49282', sev: 'low',  tag: 'mailflow', text: 'OAuth grant to unrecognised app' },
  { id: 'A-49283', sev: 'high', tag: 'edr',     text: 'Encoded PowerShell on WS-2104' },
  { id: 'A-49284', sev: 'low',  tag: 'aws',     text: 'IAM key rotation overdue' },
  { id: 'A-49285', sev: 'med',  tag: 'm365',    text: 'Mass file download · SharePoint' },
  { id: 'A-49286', sev: 'info', tag: 'sentinel', text: 'Defender ingest healthy' },
  { id: 'A-49287', sev: 'high', tag: 'identity', text: 'MFA fatigue pattern detected' },
  { id: 'A-49288', sev: 'med',  tag: 'aws',     text: 'New region access · eu-west-2' },
]

const sevColor: Record<string, string> = {
  crit: 'text-sev-crit-hi',
  high: 'text-sev-high',
  med:  'text-sev-med',
  low:  'text-sev-low',
  info: 'text-sev-info',
}

export function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
      {/* Atmospheric layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-50 mask-fade-edges" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(244,162,97,0.10),transparent)]" />
        <div className="absolute -bottom-40 left-[10%] w-[700px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(46,165,159,0.08),transparent)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay" />
      </div>

      <div className="container-x relative">
        {/* Status bar */}
        <div className="hero-rise mx-auto w-fit mb-10 flex items-center gap-3 rounded-full border border-ink-border bg-ink-surface/60 px-3 py-1.5 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-pupil opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
            Night Watch · investigating around the clock
          </span>
        </div>

        <div className="text-center">
          {/* Owl mark */}
          <div className="hero-scale mx-auto mb-12 inline-block" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <div className="absolute inset-0 -m-10 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.16),transparent)] blur-2xl" />
              <BrandMark size={120} priority className="relative animate-pulse-eye" />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="hero-rise h-display text-[44px] sm:text-[68px] lg:text-[88px] text-bone text-balance leading-[0.95] max-w-[18ch] sm:max-w-[15ch] mx-auto"
            style={{ animationDelay: '0.2s' }}
          >
            Every alert,{' '}
            <span className="text-amber-iris italic font-display">investigated.</span>
            <br />
            <span className="text-bone-soft">Typically in under two minutes.</span>
          </h1>

          {/* Sub */}
          <p
            className="hero-rise mt-8 mx-auto max-w-[56ch] text-[17px] sm:text-lg leading-relaxed text-bone-soft text-pretty"
            style={{ animationDelay: '0.35s' }}
          >
            OwlSOC is an AI Security Operations Center that plugs into the tools you
            already run: Microsoft Sentinel, Defender, AWS. It gives your team an
            analyst-grade report on every alert, 24/7. No agents. No rip-and-replace.
            You approve every action.
          </p>

          {/* CTAs */}
          <div
            className="hero-rise mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '0.5s' }}
          >
            <Button href="#contact" variant="primary" size="lg" arrow>
              Start your £495 pilot
            </Button>
            <Button href="#demo" variant="secondary" size="lg">
              See a sample investigation
            </Button>
          </div>

          {/* Trust line */}
          <div
            className="hero-fade mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[12px] font-mono uppercase tracking-widest-sm text-bone-muted"
            style={{ animationDelay: '0.65s' }}
          >
            <Pill>30-day refundable</Pill>
            <span className="hidden sm:inline text-ink-divider">·</span>
            <Pill>Live in 48h of access</Pill>
            <span className="hidden sm:inline text-ink-divider">·</span>
            <Pill>Read-only first</Pill>
          </div>
        </div>

        {/* Sample alert ticker */}
        <div className="hero-fade mt-20 sm:mt-24 panel overflow-hidden" style={{ animationDelay: '0.9s' }}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-ink-border bg-ink/40">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted">
                Alert stream · illustrative
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-bone-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" />
              looping sample
            </div>
          </div>
          <div className="relative py-3 mask-fade-edges" aria-hidden="true">
            <div className="flex animate-tick gap-8 whitespace-nowrap font-mono text-[13px]">
              {[...TICKER, ...TICKER].map((t, i) => (
                <div key={i} className="flex items-center gap-3 px-2">
                  <span className="text-bone-faint">{t.id}</span>
                  <span className={`uppercase tracking-widest-sm text-[10px] ${sevColor[t.sev]}`}>
                    {t.sev}
                  </span>
                  <span className="text-bone-muted">[{t.tag}]</span>
                  <span className="text-bone-soft">{t.text}</span>
                  <span className="text-teal-bright text-[11px]">→ investigated</span>
                  <span className="text-ink-divider">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1 w-1 rounded-full bg-amber-iris" />
      {children}
    </span>
  )
}
