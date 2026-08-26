import Link from 'next/link'
import { SectionShell } from '@/components/section-shell'
import { getProductCategories } from '@/lib/products-db'

export default async function ProductsPage() {
  const productCategories = await getProductCategories()

  return (
    <SectionShell headingLevel={1} eyebrow="Products" title="0.5mm, 1.0mm, and 1.25mm connector catalog" text="Browse the focused connector range for FPC / FFC and wire-to-board applications. Every page supports B2B technical inquiry and project discussion.">
      <div className="mb-10 flex flex-wrap gap-3">
        {productCategories.map((category) => (
          <Link key={category.slug} href={`/products/category/${category.slug}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue">
            {category.name} ({category.count})
          </Link>
        ))}
      </div>
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
    </SectionShell>
  )
}
