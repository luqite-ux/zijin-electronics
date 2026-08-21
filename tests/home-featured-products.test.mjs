import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { selectHomeFeaturedProducts } from '../lib/home-featured-products.ts'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

const featured = selectHomeFeaturedProducts(catalog.products)

assert.deepEqual(
  featured.map((product) => product.model),
  [
    '0.5mm Pitch Non-latching',
    '1.0mm Pitch H2.0 Flip-lock',
    '1.25mm Pitch Single-sided Bent PIN'
  ],
  'homepage should feature the confirmed 0.5mm, 1.0mm, and 1.25mm connector models in order'
)
assert.equal(featured.length, 3, 'homepage should show exactly three confirmed connector models')
assert.equal(new Set(featured.map((product) => product.image)).size, 3, 'each featured connector should use its own catalog image')

console.log('homepage featured connector selection passed')
