import Link from 'next/link'
import { productPath } from '@/lib/routes'
import type { Product } from '@/lib/site-data'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
      <Link href={productPath(product.slug)} className="block">
        <div className="aspect-square bg-gradient-to-br from-white via-brand-ice to-white p-5">
          <img src={product.image} alt={`${product.model} ${product.categoryName}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" loading="lazy" />
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">{product.categoryName}</p>
        <h2 className="mt-2 text-xl font-bold text-ink">{product.model}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{product.summary}</p>
        <Link href={productPath(product.slug)} className="mt-5 inline-flex rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white">
          View Details
        </Link>
      </div>
    </article>
  )
}
