import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionShell } from '@/components/section-shell'
import { ProductCard } from '@/components/products/product-card'
import { getProductCategories, getProducts } from '@/lib/products-db'

export const metadata: Metadata = {
  title: 'Products | Zijin Electronics Switches and Keycaps',
  description: 'Browse piano chain switches, keycaps, and direct key switches from Zijin Electronics.',
  alternates: { canonical: '/products' }
}

export default async function ProductsPage() {
  const [productCategories, products] = await Promise.all([getProductCategories(), getProducts()])

  return (
    <SectionShell headingLevel={1} eyebrow="Products" title="Switches, Keycaps, and Direct Key Switches" text={`${products.length} product models are available across four verified families. Select a category or open any product below for details and inquiry.`}>
      <nav aria-label="Product categories" className="mb-10 flex flex-wrap gap-3">
        {productCategories.map((category) => (
          <Link key={category.slug} href={`/products/category/${category.slug}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue">
            {category.name} ({category.count})
          </Link>
        ))}
      </nav>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Complete product catalog</p>
          <h2 className="mt-2 text-2xl font-black text-ink">All {products.length} product models</h2>
        </div>
        <p className="hidden text-sm text-muted sm:block">Select a model to view its product details.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </SectionShell>
  )
}
