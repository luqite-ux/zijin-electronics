import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts, productCategories } from '@/lib/site-data'

const priority = [
  'pitch-connectors'
]

export function ProductSeries() {
  const series = priority
    .map((slug) => productCategories.find((item) => item.slug === slug))
    .filter(Boolean)

  if (series.length === 1) {
    const item = series[0]
    if (!item) return null
    const Icon = item.icon

    return (
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-muted">
                  {item.count} products
                </span>
              </div>
              <p className="mt-7 text-xs font-bold uppercase text-brand-blue">{item.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-semibold text-ink">{item.name}</h3>
              <p className="mt-4 max-w-xl leading-7 text-muted">{item.summary.en}</p>
            </div>
            <Link
              href={`/products/category/${item.slug}`}
              className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-brand-blue transition hover:text-ink"
            >
              View complete series
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 bg-[linear-gradient(135deg,#edf8ff_0%,#f7fbfd_52%,#e8f6f1_100%)] p-5 sm:grid-cols-3 sm:p-7 lg:p-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex min-h-52 flex-col rounded-2xl border border-white/90 bg-white/85 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow active:translate-y-0"
              >
                <span className="relative block min-h-32 flex-1 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.image}
                    alt={product.model}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 80vw"
                    className="object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="mt-4 text-lg font-black text-ink">{product.model.split(' Pitch')[0]}</span>
                <span className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">
                  {product.model.includes('Wafer') ? 'Wafer connector' : 'FPC / FFC connector'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

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
                    {item.count} products
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
