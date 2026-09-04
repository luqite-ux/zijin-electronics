import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { isApprovedProductSlug, selectHomeFeaturedProducts } from '../lib/home-featured-products.ts'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

const featured = selectHomeFeaturedProducts(catalog.products)

assert.deepEqual(
  Object.fromEntries([...new Set(featured.map((product) => product.categorySlug))].map((slug) => [slug, featured.filter((product) => product.categorySlug === slug).length])),
  {
    'piano-chain-switches': 4,
    'range-hood-switches': 4,
    'direct-key-switches': 4
  },
  'homepage should show a balanced set of twelve photographic switch products'
)
assert.equal(featured.length, 12, 'homepage should show twelve distinct products')
assert.equal(new Set(featured.map((product) => product.image)).size, 12, 'homepage products should not repeat imagery')
assert.equal(featured.some((product) => product.categorySlug === 'keycaps'), false, 'blue-background keycap drawings should not appear in the homepage product grid')
assert.equal(isApprovedProductSlug(featured[0].slug), true, 'piano chain switch model should be public')
assert.equal(isApprovedProductSlug(featured.at(-1).slug), true, 'direct key switch model should be public')
assert.equal(isApprovedProductSlug(''), false, 'empty slugs should remain private')

console.log('homepage featured switch and keycap selection passed')
