import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { isApprovedProductSlug, selectHomeFeaturedProducts } from '../lib/home-featured-products.ts'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

const featured = selectHomeFeaturedProducts(catalog.products)

assert.deepEqual(
  featured.map((product) => product.model),
  [
    'Piano Chain Switch',
    'Keycaps',
    'Direct Key Switch'
  ],
  'homepage should feature the three customer-prioritized switch and keycap series in order'
)
assert.equal(featured.length, 3, 'homepage should show exactly three prioritized product series')
assert.equal(new Set(featured.map((product) => product.image)).size, 3, 'each prioritized series should use its own customer product image')
assert.equal(isApprovedProductSlug('piano-chain-switch'), true, 'piano chain switch should be public')
assert.equal(isApprovedProductSlug('keycaps'), true, 'keycaps should be public')
assert.equal(isApprovedProductSlug('direct-key-switch'), true, 'direct key switch should be public')
assert.equal(isApprovedProductSlug('product-618'), false, 'legacy product slugs should remain private even if a database row is reactivated')

console.log('homepage featured switch and keycap selection passed')
