'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

// Persistent conversion path on phones. Appears once the hero scrolls out of
// view and hides again when the contact form is on screen (so it never covers
// the field a buyer is filling in).
export function MobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      let contactInView = false
      if (contact) {
        const r = contact.getBoundingClientRect()
        contactInView = r.top < window.innerHeight && r.bottom > 0
      }
      setShow(pastHero && !contactInView)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 glass border-t border-ink-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <Button href="#contact" variant="primary" size="md" arrow className="w-full">
        Start your £495 pilot
      </Button>
    </div>
  )
}
