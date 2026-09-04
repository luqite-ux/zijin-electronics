const homeCategoryCounts = [
  ['piano-chain-switches', 4],
  ['range-hood-switches', 4],
  ['direct-key-switches', 4]
] as const

export function isApprovedProductSlug(_slug: string): boolean {
  return Boolean(_slug)
}

export function selectHomeFeaturedProducts<T extends { slug: string; categorySlug: string }>(products: readonly T[]): T[] {
  return homeCategoryCounts.flatMap(([categorySlug, count]) =>
    products.filter((product) => product.categorySlug === categorySlug).slice(0, count)
  )
}
