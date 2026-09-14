import type { MetadataRoute } from 'next'
import { productCategories, products } from '@/lib/site-data'
import { productPath } from '@/lib/routes'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

const baseUrl = 'https://www.zijinglobal.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles('en')
  const staticRoutes = ['', '/about', '/products', '/manufacturing', '/quality', '/faq', '/news', '/contact']
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...productCategories.map((category) => ({ url: `${baseUrl}/products/category/${category.slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${baseUrl}${productPath(product.slug)}`, lastModified: new Date() })),
    ...articles.map(article => ({url:`${baseUrl}/news/${encodeURIComponent(article.slug)}`, ...(article.updatedAt ? {lastModified:article.updatedAt} : {})}))
  ]
}
