import type { Metadata } from 'next'
import { SectionShell } from '@/components/section-shell'
import { qualitySteps } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Quality and Testing | Zijin Electronics',
  description: 'Review Zijin Electronics process inspection and testing steps for switch and keycap projects.',
  alternates: { canonical: '/quality' }
}

export default function QualityPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="Quality & Testing" title="Inspection and testing for stable switch and keycap output" text="Quality content stays factual and focused on process checks, test conditions, and agreed technical requirements.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {qualitySteps.map((step, index) => (
          <article key={step} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-sm font-black text-white">{index + 1}</span>
            <h2 className="mt-5 text-lg font-bold text-ink">{step}</h2>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
