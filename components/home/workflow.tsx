import { workflow } from '@/lib/site-data'

export function Workflow() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {workflow.map((step, index) => (
        <div key={step} className="relative rounded-3xl border border-line bg-white p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-sm font-black text-white">{index + 1}</span>
          <h3 className="mt-5 text-lg font-bold text-ink">{step}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">A clear B2B development stage for appliance-control projects.</p>
        </div>
      ))}
    </div>
  )
}
