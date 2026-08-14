import type { ReactNode } from 'react'

type SectionShellProps = {
  eyebrow?: string
  title: string
  text?: string
  children: ReactNode
  className?: string
}

export function SectionShell({ eyebrow, title, text, children, className = '' }: SectionShellProps) {
  return (
    <section className={`px-5 py-20 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-blue">{eyebrow}</p> : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
          {text ? <p className="mt-4 text-lg leading-8 text-muted">{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
