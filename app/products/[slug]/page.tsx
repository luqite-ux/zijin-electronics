import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/product-detail'
import { getProductBySlug } from '@/lib/products-db'
import { products } from '@/lib/site-data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  return {
    title: `${product.model} | Zijin Electronics`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.model} | Zijin Electronics`,
      description: product.summary,
      type: 'website',
      images: [{ url: product.image, alt: product.model }]
    }
  }
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
