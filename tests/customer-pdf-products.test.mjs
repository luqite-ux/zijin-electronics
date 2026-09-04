import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

assert.deepEqual(
  catalog.categories.map(({ slug, name, count }) => ({ slug, name, count })),
  [
    { slug: 'piano-chain-switches', name: 'Piano Chain Switches', count: 22 },
    { slug: 'range-hood-switches', name: 'Range Hood Switches', count: 27 },
    { slug: 'keycaps', name: 'Keycaps', count: 96 },
    { slug: 'direct-key-switches', name: 'Direct Key Switches', count: 11 }
  ],
  'the public catalog should contain every verified priority product family and model'
)

assert.equal(catalog.products.length, 156, 'the public catalog should preserve all 156 verified models')
assert.equal(new Set(catalog.products.map((product) => product.slug)).size, 156, 'every product slug should be unique')

assert.equal(new Set(catalog.products.map((product) => product.image)).size, 156, 'each product should have its own customer-sourced image')

for (const product of catalog.products) {
  assert.match(product.image, /^https:\/\/pub-c7a22068052144a5805830c30d280128\.r2\.dev\/products\/zijin-electronics\/catalog\/.+\.jpg$/, `${product.slug} should use a public R2 product image`)
  assert.match(product.sourceUrl, /zijindz\.com\/wap\/Products\.asp\?BigClassID=(1|2|4|9)/, `${product.slug} should retain its original catalog provenance`)
  assert.doesNotMatch(JSON.stringify(product), /广东一方|Guangdong Yifang|hongwo\.net|88662005/i, `${product.slug} should not expose the PDF supplier identity`)
}

console.log('customer priority product catalog passed')
