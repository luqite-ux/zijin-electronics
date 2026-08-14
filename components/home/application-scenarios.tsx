import { solutions } from '@/lib/site-data'

export function ApplicationScenarios() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {solutions.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 leading-7 text-muted">{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
