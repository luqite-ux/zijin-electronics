import type { ReactNode } from 'react'

type SectionShellProps = {
  eyebrow?: string
  title: string
  text?: string
  children: ReactNode
  className?: string
  headingLevel?: 1 | 2
}

export function SectionShell({ eyebrow, title, text, children, className = '', headingLevel = 2 }: SectionShellProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'
  return (
    <section className={`border-t border-line px-5 py-20 sm:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{eyebrow}</p> : null}
          <Heading className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl">{title}</Heading>
          {text ? <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
