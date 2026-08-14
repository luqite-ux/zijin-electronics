import type { MetadataRoute } from 'next'
import { productCategories, products } from '@/lib/site-data'
import { productPath } from '@/lib/routes'

const baseUrl = 'https://www.zijindz.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/products', '/manufacturing', '/quality', '/faq', '/contact']
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...productCategories.map((category) => ({ url: `${baseUrl}/products/category/${category.slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${baseUrl}${productPath(product.slug)}`, lastModified: new Date() }))
  ]
}
