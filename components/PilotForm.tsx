'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FORM_ENDPOINT,
  FORM_CONFIGURED,
  CONTACT_EMAIL,
  BOOKING_URL,
  BOOKING_CONFIGURED,
} from '@/lib/site'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Fields = {
  email: string
  name: string
  company: string
  stack: string
  volume: string
  message: string
}

const STACKS = [
  'Microsoft Sentinel',
  'Microsoft Defender',
  'AWS',
  'A mix of these',
  'Something else',
]

const VOLUMES = ['Under 50', '50–200', '200–1,000', '1,000+']

const EMPTY: Fields = {
  email: '',
  name: '',
  company: '',
  stack: '',
  volume: '',
  message: '',
}

function isWorkEmail(v: string) {
  // Basic shape check. We deliberately keep this permissive.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function PilotForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [via, setVia] = useState<'form' | 'email'>('form')
  const honeypot = useRef<HTMLInputElement>(null)

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const FIELD_IDS: Partial<Record<keyof Fields, string>> = {
    name: 'pf-name',
    email: 'pf-email',
    company: 'pf-company',
    stack: 'pf-stack',
  }

  function computeErrors(): Partial<Record<keyof Fields, string>> {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'Tell us who you are.'
    if (!fields.email.trim()) next.email = 'We need an email to reply to.'
    else if (!isWorkEmail(fields.email)) next.email = "That doesn't look like an email."
    if (!fields.company.trim()) next.company = 'Which company?'
    if (!fields.stack) next.stack = 'Pick the closest one.'
    return next
  }

  function validate(): boolean {
    const next = computeErrors()
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Honeypot: a real user never fills this hidden field.
    if (honeypot.current?.value) {
      setStatus('success')
      return
    }
    const errs = computeErrors()
    setErrors(errs)
    const firstBad = (Object.keys(FIELD_IDS) as (keyof Fields)[]).find((k) => errs[k])
    if (firstBad) {
      document.getElementById(FIELD_IDS[firstBad]!)?.focus()
      return
    }
    setStatus('loading')

    // Analytics hook (no-op unless an analytics provider is wired up).
    try {
      ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: 'pilot_request',
        stack: fields.stack,
      })
    } catch {
      /* analytics is best-effort */
    }

    if (!FORM_CONFIGURED) {
      // No managed form backend wired up — deliver the enquiry straight to
      // CONTACT_EMAIL via the visitor's mail client. Works on a static site
      // with no backend and guarantees the enquiry reaches info@owlsoc.com.
      const subject = `OwlSOC pilot enquiry — ${fields.company || fields.name}`
      const body = [
        `Name: ${fields.name}`,
        `Work email: ${fields.email}`,
        `Company: ${fields.company}`,
        `Primary stack: ${fields.stack}`,
        `Alerts per day: ${fields.volume || 'not specified'}`,
        '',
        fields.message ? `Message:\n${fields.message}` : '(no message)',
      ].join('\n')
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
      setVia('email')
      setStatus('success')
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          company: fields.company,
          stack: fields.stack,
          alerts_per_day: fields.volume || 'not specified',
          message: fields.message,
          _subject: `Pilot request: ${fields.company}`,
        }),
      })
      if (!res.ok) throw new Error(`Form provider returned ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Always-mounted live region: announcements only fire reliably when the
  // region exists before its text changes.
  const liveMessage =
    status === 'success'
      ? 'Request received. We will reply within one business day.'
      : status === 'error'
        ? 'Something went wrong sending the form.'
        : status === 'loading'
          ? 'Sending your request.'
          : ''
  const liveRegion = (
    <div aria-live="polite" role="status" className="sr-only">
      {liveMessage}
    </div>
  )

  if (status === 'success') {
    return (
      <div>
        {liveRegion}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="panel-elevated p-8 sm:p-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal-pupil/15 border border-teal-line">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-teal-bright" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-bone text-[28px] leading-tight">
          {via === 'email' ? 'One last tap.' : 'You’re in.'}
        </h3>
        {via === 'email' ? (
          <p className="mt-3 text-bone-soft text-[15px] leading-relaxed max-w-[46ch] mx-auto text-pretty">
            We&apos;ve opened an email to{' '}
            <span className="text-amber-iris">{CONTACT_EMAIL}</span> with your details — just hit
            send and we&apos;ll reply within one business day to scope your pilot. If nothing opened,
            email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-iris link-underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        ) : (
          <p className="mt-3 text-bone-soft text-[15px] leading-relaxed max-w-[46ch] mx-auto text-pretty">
            We&apos;ll email {fields.name.split(' ')[0] || 'you'} at{' '}
            <span className="text-amber-iris">{fields.email}</span> within one business day to
            scope your pilot and lock a kickoff Monday.
          </p>
        )}
        {BOOKING_CONFIGURED && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[14px] text-bone-soft link-underline hover:text-amber-iris"
          >
            Prefer to grab a slot now? Pick a kickoff time
            <span aria-hidden>→</span>
          </a>
        )}
      </motion.div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel-elevated p-6 sm:p-8 text-left">
      {liveRegion}
      {/* Honeypot — visually hidden, off-screen, not announced */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            ref={honeypot}
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          id="pf-name"
          required
          label="Full name"
          value={fields.name}
          onChange={(v) => set('name', v)}
          onBlur={() => fields.name && validate()}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="pf-email"
          required
          label="Work email"
          type="email"
          value={fields.email}
          onChange={(v) => set('email', v)}
          onBlur={() => fields.email && validate()}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Field
          id="pf-company"
          required
          label="Company"
          value={fields.company}
          onChange={(v) => set('company', v)}
          onBlur={() => fields.company && validate()}
          error={errors.company}
          autoComplete="organization"
        />
        <SelectField
          id="pf-stack"
          required
          label="Primary stack"
          value={fields.stack}
          onChange={(v) => set('stack', v)}
          error={errors.stack}
          options={STACKS}
          placeholder="Where do your alerts come from?"
        />
      </div>

      <div className="mt-4">
        <SelectField
          id="pf-volume"
          label="Roughly how many alerts a day?"
          optional
          value={fields.volume}
          onChange={(v) => set('volume', v)}
          options={VOLUMES}
          placeholder="Optional"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="pf-message" className="block font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted mb-2">
          Anything we should know? <span className="text-bone-faint normal-case tracking-normal">Optional</span>
        </label>
        <textarea
          id="pf-message"
          rows={3}
          value={fields.message}
          onChange={(e) => set('message', e.target.value)}
          className="w-full rounded-lg bg-ink-deep border border-ink-border px-4 py-3 text-[15px] text-bone placeholder:text-bone-faint focus:border-amber-line transition-colors resize-none"
          placeholder="Current setup, what's hurting, timelines…"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-lg border border-sev-crit/40 bg-sev-crit/10 px-4 py-3 text-[13.5px] text-bone-soft"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-sev-crit" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v6M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>
            Something went wrong sending that. Email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-iris link-underline">
              {CONTACT_EMAIL}
            </a>{' '}
            and we&apos;ll pick it up, or try again in a moment.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        className="group mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-amber-iris px-7 py-4 text-base font-medium tracking-tight text-ink-deep transition-all duration-300 hover:bg-amber-bright hover:shadow-[0_8px_30px_-10px_rgba(244,162,97,0.6)] disabled:opacity-70 disabled:cursor-wait"
      >
        {status === 'loading' ? (
          <>
            <Spinner /> Securing your slot…
          </>
        ) : (
          <>
            Request my pilot kickoff
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-[12.5px] text-bone-muted">
        £495 · 30 days · fully refundable. No card needed to talk.{' '}
        <a href={`mailto:${CONTACT_EMAIL}?subject=OwlSOC%20pilot%20enquiry`} className="link-underline hover:text-bone-soft">
          Rather just email us?
        </a>
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoComplete,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  type?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-lg bg-ink-deep border px-4 py-3 text-[15px] text-bone placeholder:text-bone-faint transition-colors ${
          error ? 'border-sev-crit/60 focus:border-sev-crit' : 'border-ink-border focus:border-amber-line'
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[12px] text-sev-crit-hi">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
  optional,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  options: string[]
  placeholder: string
  optional?: boolean
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-widest-sm text-bone-muted mb-2">
        {label}{' '}
        {optional && <span className="text-bone-faint normal-case tracking-normal">Optional</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`w-full appearance-none rounded-lg bg-ink-deep border px-4 py-3 pr-10 text-[15px] transition-colors ${
            value ? 'text-bone' : 'text-bone-faint'
          } ${error ? 'border-sev-crit/60 focus:border-sev-crit' : 'border-ink-border focus:border-amber-line'}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-bone bg-ink-elevated">
              {o}
            </option>
          ))}
        </select>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone-muted"
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[12px] text-sev-crit-hi">
          {error}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
