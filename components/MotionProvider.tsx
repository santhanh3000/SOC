'use client'

import { MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'

// Honours prefers-reduced-motion across every framer-motion animation, while
// staying SSR-safe. During the server render and the first client render we use
// "never" so the markup is identical on both sides (no hydration mismatch). We
// switch to "user" right after mount, so reduced-motion users still get the
// calmer experience for anything that animates from then on (scroll reveals,
// the demo's investigating sequence, alert switches). Looping/attention
// animations are additionally neutralised by the CSS guard in globals.css.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <MotionConfig reducedMotion={mounted ? 'user' : 'never'}>
      {children}
    </MotionConfig>
  )
}
