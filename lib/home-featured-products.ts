const priorityCategories = [
  'piano-chain-switches',
  'keycaps',
  'direct-key-switches'
] as const

export function isApprovedProductSlug(_slug: string): boolean {
  return Boolean(_slug)
}

export function selectHomeFeaturedProducts<T extends { slug: string }>(products: readonly T[]): T[] {
  return priorityCategories.flatMap((categorySlug) => {
    const product = products.find((item) => item.slug.includes(categorySlug.replace(/s$/, '')) || item.slug.startsWith(categorySlug === 'keycaps' ? 'keycap-' : categorySlug.replace(/s$/, '')))
    return product ? [product] : []
  })
}
