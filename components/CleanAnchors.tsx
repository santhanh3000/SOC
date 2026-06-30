'use client'

import { useEffect } from 'react'

// Single delegated handler for every in-page anchor on the site (nav, CTAs,
// footer, skip-link). Clicking one smooth-scrolls to the section and KEEPS THE
// URL CLEAN — no "#section" hash is left in the address bar. Focus is moved to
// the target so keyboard/screen-reader users get the same jump a real hash
// would give. Cross-page anchors (target not on this page, e.g. "/#pricing"
// from a content page) are left alone so they navigate normally.
export function CleanAnchors() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Let modified clicks (new tab/window) and non-primary buttons behave normally.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      let id: string | null = null
      if (href.startsWith('#')) id = href.slice(1)
      else if (href.startsWith('/#')) id = href.slice(2)
      else return // not an in-page anchor

      if (!id) return
      const el = document.getElementById(id)
      if (!el) return // target isn't on this page → let the browser navigate

      e.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })

      // Move focus for a11y parity with a hash jump, without a second scroll.
      const hadTabindex = el.hasAttribute('tabindex')
      if (!hadTabindex) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
      if (!hadTabindex) {
        el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true })
      }

      // Keep the address bar on the clean canonical URL — no #hash.
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
