import { ReactNode } from 'react'

type Props = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  align = 'left',
}: Props) {
  return (
    <section id={id} className={`relative py-24 sm:py-28 lg:py-32 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || intro) && (
          <header className={`mb-14 sm:mb-20 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
            {eyebrow && (
              <div className={`h-eyebrow mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
                <span className="h-px w-8 bg-amber-line" />
                <span>{eyebrow}</span>
                <span className="h-px w-8 bg-amber-line" />
              </div>
            )}
            {title && (
              <h2 className="h-display text-[34px] sm:text-[48px] lg:text-[68px] text-bone text-balance">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-6 text-bone-soft text-[17px] sm:text-lg leading-relaxed max-w-[60ch] text-pretty">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export function SectionDivider() {
  return (
    <div className="container-x">
      <div className="h-rule" />
    </div>
  )
}
