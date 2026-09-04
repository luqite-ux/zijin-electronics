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
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-line bg-white p-7 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue">Management system</p>
          <h2 className="mt-3 text-2xl font-black text-ink">ISO 9001 certificate supplied by the customer</h2>
          <p className="mt-4 leading-7 text-muted">The customer materials include a 2025 quality management system certificate. Scope and validity should be confirmed against the original certificate for procurement records.</p>
        </article>
        <article className="rounded-[2rem] border border-line bg-white p-7 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue">Product development</p>
          <h2 className="mt-3 text-2xl font-black text-ink">Direct-key switch patent records</h2>
          <p className="mt-4 leading-7 text-muted">Customer-supplied records include design patent No. 2023305309100 and utility model patent No. 2024228139298. Copies can be provided for project review.</p>
        </article>
      </div>
    </SectionShell>
  )
}
