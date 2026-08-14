import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { productCategories } from '@/lib/site-data'

const priority = [
  'range-hood-switches',
  'direct-key-switches',
  'key-caps',
  'fpc-ffc-connectors',
  'usb-connectors',
  'wafer-connectors'
]

export function ProductSeries() {
  const series = priority
    .map((slug) => productCategories.find((item) => item.slug === slug))
    .filter(Boolean)

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {series.map((item) => {
        if (!item) return null
        const Icon = item.icon
        return (
          <Link
            key={item.slug}
            href={`/products/category/${item.slug}`}
            className="group grid min-h-64 overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="relative flex h-full flex-col justify-between p-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-muted">
                    {item.count} models
                  </span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase text-brand-blue">{item.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{item.name}</h3>
                <p className="mt-3 leading-7 text-muted">{item.summary.en}</p>
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-blue">
                View series
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
