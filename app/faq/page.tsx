import type { Metadata } from 'next'
import { SectionShell } from '@/components/section-shell'
import { faqs } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'FAQ | Zijin Electronics Switches and Keycaps',
  description: 'Answers to common product selection, customization, sample, and inquiry questions for Zijin Electronics.',
  alternates: { canonical: '/faq' }
}

export default function FaqPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="FAQ" title="Common questions for switch and keycap projects">
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-xl font-bold text-ink">{faq.question}</h2>
            <p className="mt-3 leading-7 text-muted">{faq.answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
