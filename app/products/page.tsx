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

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; view?: string }> }) {
  const filters = await searchParams
  const [productCategories, products] = await Promise.all([getProductCategories(), getProducts()])
  const showAll = filters.view === 'all'
  const requestedCategory = filters.category
  const selectedCategorySlug = requestedCategory && productCategories.some((category) => category.slug === requestedCategory)
    ? requestedCategory
    : productCategories[0]?.slug
  const selectedCategory = productCategories.find((category) => category.slug === selectedCategorySlug)
  const visibleProducts = showAll
    ? products
    : products.filter((product) => product.categorySlug === selectedCategorySlug)
  const catalogTitle = showAll ? `All ${products.length} product models` : `${selectedCategory?.name || 'Products'} (${visibleProducts.length})`

  return (
    <SectionShell headingLevel={1} eyebrow="Products" title="Switches, Keycaps, and Direct Key Switches" text={`${products.length} product models are available across four verified families. Select a category or open any product below for details and inquiry.`}>
      <nav aria-label="Product categories" className="mb-10 flex flex-wrap gap-3">
        {productCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            aria-current={!showAll && category.slug === selectedCategorySlug ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${!showAll && category.slug === selectedCategorySlug ? 'border-brand-red bg-brand-red text-white' : 'border-line bg-white text-ink hover:border-brand-red hover:text-brand-red'}`}
          >
            {category.name} ({category.count})
          </Link>
        ))}
        <Link
          href="/products?view=all"
          aria-current={showAll ? 'page' : undefined}
          className={`rounded-full border px-4 py-2 text-sm font-bold transition ${showAll ? 'border-brand-red bg-brand-red text-white' : 'border-line bg-white text-ink hover:border-brand-red hover:text-brand-red'}`}
        >
          View All ({products.length})
        </Link>
      </nav>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">{showAll ? 'Complete product catalog' : 'Selected product family'}</p>
          <h2 className="mt-2 text-2xl font-black text-ink">{catalogTitle}</h2>
        </div>
        <p className="hidden text-sm text-muted sm:block">Select a model to view its product details.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </SectionShell>
  )
}
