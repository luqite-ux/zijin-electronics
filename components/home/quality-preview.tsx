import { ShieldCheck } from 'lucide-react'
import { qualitySteps } from '@/lib/site-data'

export function QualityPreview() {
  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <ShieldCheck className="h-12 w-12 text-brand-blue" />
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-ink">Inspection-led confidence for appliance projects.</h3>
          <p className="mt-4 leading-8 text-muted">Public copy should stay factual: testing, process checks, and agreed technical requirements.</p>
        </div>
        <div className="grid gap-3">
          {qualitySteps.map((step) => (
            <div key={step} className="rounded-2xl bg-brand-ice px-5 py-4 font-semibold text-ink">{step}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
