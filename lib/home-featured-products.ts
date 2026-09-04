const priorityProductPrefixes = [
  'piano-chain-switch-',
  'keycap-',
  'direct-key-switch-'
] as const

export function isApprovedProductSlug(_slug: string): boolean {
  return Boolean(_slug)
}

export function selectHomeFeaturedProducts<T extends { slug: string }>(products: readonly T[]): T[] {
  return priorityProductPrefixes.flatMap((prefix) => {
    const product = products.find((item) => item.slug.startsWith(prefix))
    return product ? [product] : []
  })
}
