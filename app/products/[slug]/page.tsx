import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/product-detail'
import { getProductBySlug } from '@/lib/products-db'
import { products } from '@/lib/site-data'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
