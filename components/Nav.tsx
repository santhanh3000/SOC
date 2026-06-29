'use client'

import { useEffect, useRef, useState } from 'react'
import { BrandLockup, BrandMark } from './Brand'
import { Button } from './ui/Button'

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#tour', label: 'Watch' },
  { href: '/#demo', label: 'See a sample' },
  { href: '/#features', label: 'What you get' },
  { href: '/#vs', label: 'Why OwlSOC' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Logo = home. On the homepage, scroll to top WITHOUT pushing a "#top" hash
  // into the address bar — keeps the URL the clean canonical "/".
  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    if (window.location.hash) history.replaceState(null, '', '/')
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'glass border border-ink-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]'
              : 'border border-transparent'
          }`}
        >
          <a href="/" onClick={goHome} className="flex items-center" aria-label="OwlSOC home">
            {/* Full lockup from sm up; standalone mark on the narrowest screens */}
            <span className="hidden sm:block">
              <BrandLockup height={30} priority />
            </span>
            <span className="sm:hidden">
              <BrandMark size={36} priority />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-[13.5px] text-bone-soft hover:text-bone transition-colors rounded-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button href="/#demo" variant="ghost" size="sm">
              See a sample
            </Button>
            <Button href="/#contact" variant="primary" size="sm" arrow>
              Start your £495 pilot
            </Button>
          </div>

          <button
            ref={toggleRef}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-ink-elevated"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={open ? 'M6 6L18 18M6 18L18 6' : 'M4 8H20M4 16H20'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="lg:hidden mt-2 glass border border-ink-border rounded-2xl p-3 animate-fade-up">
            <nav className="flex flex-col" aria-label="Mobile">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-[15px] text-bone-soft hover:text-bone border-b border-ink-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-ink-border">
                <Button href="/#demo" variant="secondary" size="md" onClick={() => setOpen(false)}>
                  See a sample
                </Button>
                <Button href="/#contact" variant="primary" size="md" arrow onClick={() => setOpen(false)}>
                  Start your £495 pilot
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
