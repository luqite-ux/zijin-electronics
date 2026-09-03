import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionShell } from '@/components/section-shell'
import { getProductCategories, getProducts } from '@/lib/products-db'
import { productPath } from '@/lib/routes'

export default async function ProductsPage() {
  const [productCategories, products] = await Promise.all([getProductCategories(), getProducts()])
  const singleCategory = productCategories.length === 1 ? productCategories[0] : null
  const SingleCategoryIcon = singleCategory?.icon

  return (
    <SectionShell headingLevel={1} eyebrow="Products" title="Switches, Keycaps, and Direct Key Switches" text="Browse Zijin Electronics’ priority product families. Every page supports B2B technical inquiry and project discussion.">
      <div className="mb-10 flex flex-wrap gap-3">
        {productCategories.map((category) => (
          <Link key={category.slug} href={`/products/category/${category.slug}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue">
            {category.name} ({category.count})
          </Link>
        ))}
      </div>
      {singleCategory && SingleCategoryIcon ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
                    <SingleCategoryIcon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
                    {singleCategory.count} products
                  </span>
                </div>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{singleCategory.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">{singleCategory.name}</h2>
                <p className="mt-4 max-w-xl leading-7 text-muted">{singleCategory.summary.en}</p>
              </div>
              <Link href={`/products/category/${singleCategory.slug}`} className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-brand-blue transition hover:text-ink">
                View all {singleCategory.count} models
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 bg-[linear-gradient(135deg,#edf8ff_0%,#f7fbfd_52%,#e8f6f1_100%)] p-5 sm:grid-cols-3 sm:p-7 lg:p-8">
              {products.map((product) => (
                <Link key={product.slug} href={productPath(product.slug)} className="group flex min-h-64 flex-col rounded-2xl border border-white/90 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
                  <span className="relative block min-h-44 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-[#e8f5ff] via-[#f7fbff] to-[#e8f7f2]">
                    <Image
                      src={product.image}
                      alt={product.model}
                      fill
                      sizes="(min-width: 1024px) 19vw, (min-width: 640px) 30vw, 88vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-4 text-lg font-black text-ink">{product.model}</span>
                  <span className="mt-1 text-xs font-bold uppercase tracking-[0.11em] text-brand-blue">
                    {product.categoryName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => {
          const Icon = category.icon
          return (
            <Link key={category.slug} href={`/products/category/${category.slug}`} className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-blue">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{category.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold text-ink">{category.name}</h2>
              <p className="mt-3 leading-7 text-muted">{category.summary.en}</p>
              <p className="mt-5 text-sm font-bold text-brand-blue">View {category.count} models</p>
            </Link>
          )
          })}
        </div>
      )}
    </SectionShell>
  )
}
