import { SectionShell } from '@/components/section-shell'
import { faqs } from '@/lib/site-data'

export default function FaqPage() {
  return (
    <SectionShell eyebrow="FAQ" title="Common questions for appliance control projects">
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
