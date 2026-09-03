import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts, productCategories } from '@/lib/site-data'

const priority = ['piano-chain-switches', 'keycaps', 'direct-key-switches']

export function ProductSeries() {
  const series = priority
    .map((slug) => productCategories.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {series.map((item) => {
        const product = featuredProducts.find((entry) => entry.categorySlug === item.slug)
        const Icon = item.icon

        return (
          <Link key={item.slug} href={`/products/category/${item.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
            <div className="relative aspect-[1.35] overflow-hidden bg-[linear-gradient(135deg,#edf8ff_0%,#f7fbfd_52%,#e8f6f1_100%)]">
              {product ? <Image src={product.image} alt={product.model} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-contain p-4 transition duration-500 group-hover:scale-105" /> : null}
            </div>
            <div className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue"><Icon className="h-5 w-5" /></span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">Priority product family</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{item.name}</h3>
              <p className="mt-3 leading-7 text-muted">{item.summary.en}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue">View product family <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
