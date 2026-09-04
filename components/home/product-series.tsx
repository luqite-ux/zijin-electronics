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
    <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
      {series.map((item, index) => {
        const product = featuredProducts.find((entry) => entry.categorySlug === item.slug)
        const Icon = item.icon

        return (
          <Link key={item.slug} href={`/products/category/${item.slug}`} className={`stagger-card group grid overflow-hidden border border-line bg-[#ece9e2] transition hover:-translate-y-1 hover:shadow-glow ${index === 0 ? 'md:col-span-7 md:row-span-2 md:grid-cols-[1.15fr_.85fr]' : 'md:col-span-5 md:grid-cols-[.85fr_1.15fr]'}`}>
            <div className={`relative min-h-64 overflow-hidden bg-[#e7e3dc] ${index === 0 ? 'md:min-h-[34rem]' : 'md:min-h-64'}`}>
              {product ? <Image src={product.image} alt={product.model} fill priority sizes="(min-width: 768px) 55vw, 92vw" className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]" /> : null}
            </div>
            <div className="flex flex-col justify-end bg-white p-6 lg:p-8">
              <span className="flex h-10 w-10 items-center justify-center bg-brand-red text-white"><Icon className="h-5 w-5" /></span>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.15em] text-brand-red">Priority product family</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.summary.en}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink">View product family <ArrowRight className="h-4 w-4 text-brand-red transition group-hover:translate-x-1" /></span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
