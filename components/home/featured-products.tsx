import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { productCategories } from '@/lib/site-data'

const categoryVisuals: Record<string, string> = {
  'piano-chain-switches': '/images/products/categories/piano-chain-switches-ai.png',
  'range-hood-switches': '/images/products/categories/range-hood-switches-ai.png',
  keycaps: '/images/products/categories/keycaps-ai.png',
  'direct-key-switches': '/images/products/categories/direct-key-switches-ai.png'
}

export function FeaturedProducts() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {productCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/products/category/${category.slug}`}
          className="stagger-card group relative aspect-[4/3] overflow-hidden bg-[#171717] text-white shadow-[0_24px_60px_rgba(0,0,0,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-4"
        >
          <Image
            src={categoryVisuals[category.slug]}
            alt={`${category.name} product range`}
            fill
            priority
            sizes="(min-width: 768px) 48vw, 94vw"
            className="object-contain transition duration-700 group-hover:scale-[1.025]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(7,7,7,.18)_56%,rgba(7,7,7,.92)_100%)]" />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
            <span>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-brand-red">{category.count} product models</span>
              <span className="mt-2 block text-2xl font-black tracking-tight sm:text-3xl">{category.name}</span>
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/35 bg-white/10 backdrop-blur-sm transition group-hover:border-brand-red group-hover:bg-brand-red">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}
