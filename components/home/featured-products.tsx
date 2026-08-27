import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts } from '@/lib/site-data'
import { productPath } from '@/lib/routes'

const transparentProductImages: Record<string, string> = {
  '0-5mm-pitch-connector': '/images/products/transparent/0-5mm-connector-complete.webp',
  '1-0mm-pitch-connector': '/images/products/transparent/1-0mm-connector.webp',
  '1-25mm-pitch-connector': '/images/products/transparent/1-25mm-connectors.webp',
}

export function FeaturedProducts() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {featuredProducts.map((product) => (
        <Link
          key={product.slug}
          href={productPath(product.slug)}
          className="group rounded-[1.5rem] border border-line bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8f5ff] via-[#f4faff] to-[#e8f7f2]">
            <Image
              src={transparentProductImages[product.slug] || product.image}
              alt={`${product.model} connector`}
              fill
              sizes="(min-width: 1280px) 29vw, (min-width: 768px) 44vw, 92vw"
              className="scale-[1.12] object-contain p-1 drop-shadow-[0_18px_20px_rgba(17,69,111,0.16)] transition duration-500 group-hover:scale-[1.18]"
            />
          </div>
          <p className="mt-5 text-xs font-bold uppercase text-brand-blue">{product.categoryName}</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">{product.model}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{product.summary}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-blue">
            View details
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </p>
        </Link>
      ))}
    </div>
  )
}
