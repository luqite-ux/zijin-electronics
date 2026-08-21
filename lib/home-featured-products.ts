const homeFeaturedProductSlugs = [
  '0-5mm',
  '1-0mm-h2-0',
  '1-25mm'
] as const

export function selectHomeFeaturedProducts<T extends { slug: string }>(products: readonly T[]): T[] {
  return homeFeaturedProductSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug)
    return product ? [product] : []
  })
}
