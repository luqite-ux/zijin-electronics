import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts } from '@/lib/site-data'
import { productPath } from '@/lib/routes'

export function FeaturedProducts() {
  return (
    <>
      <nav aria-label="Priority product categories" className="mb-8 flex flex-wrap gap-3">
        <Link href="/products?category=piano-chain-switches" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-red hover:text-brand-red">Piano Chain Switches (22)</Link>
        <Link href="/products?category=keycaps" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-red hover:text-brand-red">Keycaps (96)</Link>
        <Link href="/products?category=direct-key-switches" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-red hover:text-brand-red">Direct Key Switches (11)</Link>
      </nav>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {featuredProducts.map((product, index) => {
          const displayModel = product.model === 'Piano Chain Switches Model 618' ? 'Model 618' : product.model

          return (
          <Link
            key={product.slug}
            href={productPath(product.slug)}
            className="stagger-card group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e7e3dc]">
              <Image
                src={product.image}
                alt={product.model}
                fill
                priority={index < 4}
                sizes="(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 92vw"
                className="object-contain p-4 mix-blend-multiply transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-red">{product.categoryName}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{displayModel}</h3>
              <p className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-ink">
                View details
                <ArrowRight className="h-4 w-4 text-brand-red transition group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
          )
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/products?view=all" className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:bg-ink">
          View All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  )
}
