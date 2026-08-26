const homeFeaturedProductSlugs = [
  '0-5mm-pitch-connector',
  '1-0mm-pitch-connector',
  '1-25mm-pitch-connector'
] as const

export function isApprovedProductSlug(_slug: string): boolean {
  return homeFeaturedProductSlugs.includes(_slug as (typeof homeFeaturedProductSlugs)[number])
}

export function selectHomeFeaturedProducts<T extends { slug: string }>(products: readonly T[]): T[] {
  return homeFeaturedProductSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug)
    return product ? [product] : []
  })
}
