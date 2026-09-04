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
    'Piano Chain Switches Model 618',
    'A01',
    'KFC-A04-3'
  ],
  'homepage should feature the three customer-prioritized switch and keycap series in order'
)
assert.equal(featured.length, 3, 'homepage should show exactly three prioritized product series')
assert.equal(new Set(featured.map((product) => product.image)).size, 3, 'each prioritized series should use its own customer product image')
assert.equal(isApprovedProductSlug(featured[0].slug), true, 'piano chain switch model should be public')
assert.equal(isApprovedProductSlug(featured[1].slug), true, 'keycap model should be public')
assert.equal(isApprovedProductSlug(featured[2].slug), true, 'direct key switch model should be public')
assert.equal(isApprovedProductSlug(''), false, 'empty slugs should remain private')

console.log('homepage featured switch and keycap selection passed')
