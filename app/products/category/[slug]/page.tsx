import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/products/product-card'
import { SectionShell } from '@/components/section-shell'
import { getProductCategories, getProductsByCategory } from '@/lib/products-db'
import { productCategories } from '@/lib/site-data'

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }))
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categories = await getProductCategories()
  const category = categories.find((item) => item.slug === slug)
  if (!category) notFound()
  const categoryProducts = await getProductsByCategory(category.slug)

  return (
    <SectionShell headingLevel={1} eyebrow="Product Category" title={category.name} text={`${category.count} products for B2B model selection, sample request, and custom production inquiry.`}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categoryProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </SectionShell>
  )
}
