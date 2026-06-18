'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  arrow?: boolean
  external?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  arrow = false,
  external = false,
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight transition-all duration-300 rounded-full whitespace-nowrap will-change-transform'

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-5 py-3 text-[15px] min-h-[44px]',
    lg: 'px-7 py-4 text-base min-h-[52px]',
  }

  const variants = {
    primary:
      'bg-amber-iris text-ink-deep hover:bg-amber-bright hover:shadow-[0_0_0_1px_rgba(255,183,107,0.4),0_8px_30px_-10px_rgba(244,162,97,0.6)] active:scale-[0.98]',
    secondary:
      'border border-ink-divider bg-ink-elevated/60 text-bone hover:border-bone-muted hover:bg-ink-elevated active:scale-[0.98]',
    ghost:
      'text-bone-soft hover:text-bone hover:bg-ink-elevated/60',
  }

  const content = (
    <>
      {children}
      {arrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  const cls = `group ${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (href) {
    const targetProps = external ? { target: '_blank' as const } : {}
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...targetProps}
        // Always pair noopener/noreferrer with any new-tab link so the safe
        // attribute can't be dropped independently of target.
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={cls} type="button">
      {content}
    </button>
  )
}
