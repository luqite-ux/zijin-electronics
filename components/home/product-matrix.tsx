import Link from 'next/link'
import { productCategories } from '@/lib/site-data'

export function ProductMatrix() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {productCategories.slice(0, 9).map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.slug} href={`/products/category/${item.slug}`} className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{item.eyebrow}</p>
            <h3 className="mt-3 text-xl font-bold text-ink">{item.name}</h3>
            <p className="mt-3 leading-7 text-muted">{item.summary.en}</p>
            <p className="mt-5 text-sm font-bold text-brand-blue">View {item.count} models</p>
          </Link>
        )
      })}
    </div>
  )
}
