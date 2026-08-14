import { Factory } from 'lucide-react'
import { manufacturingFacts } from '@/lib/site-data'

export function ManufacturingPreview() {
  return (
    <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div className="rounded-[2rem] border border-line bg-gradient-to-br from-white via-brand-ice to-white p-8 shadow-glow">
        <Factory className="h-14 w-14 text-brand-blue" />
        <h3 className="mt-6 text-3xl font-semibold tracking-tight text-ink">Built for stable custom switch and connector production.</h3>
        <p className="mt-4 leading-8 text-muted">The factory combines workshop capacity, model selection, custom production, and inspection steps for appliance and precision equipment customers.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {manufacturingFacts.map((fact) => (
          <div key={fact} className="rounded-2xl border border-line bg-white p-5 text-sm font-semibold leading-6 text-ink">
            {fact}
          </div>
        ))}
      </div>
    </div>
  )
}
