import Link from 'next/link'
import { productPath } from '@/lib/routes'
import type { Product } from '@/lib/site-data'

export function ProductCard({ product }: { product: Product }) {
  const displayModel = product.model === 'Piano Chain Switches Model 618' ? 'Model 618' : product.model

  return (
    <Link href={productPath(product.slug)} className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-4">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-glow">
        <div className="aspect-square bg-gradient-to-br from-white via-brand-ice to-white p-5">
          <img src={product.image} alt={`${product.model} ${product.categoryName}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">{product.categoryName}</p>
          <h2 className="mt-2 text-xl font-bold text-ink">{displayModel}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{product.summary}</p>
          <span className="mt-auto pt-5">
            <span className="inline-flex rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white">
              View Details
            </span>
          </span>
        </div>
      </article>
    </Link>
  )
}
