import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

assert.deepEqual(
  catalog.categories.map(({ slug, name, count }) => ({ slug, name, count })),
  [
    { slug: 'piano-chain-switches', name: 'Piano Chain Switches', count: 1 },
    { slug: 'keycaps', name: 'Keycaps', count: 1 },
    { slug: 'direct-key-switches', name: 'Direct Key Switches', count: 1 }
  ],
  'the public catalog should contain the three customer-prioritized product families'
)

assert.deepEqual(
  catalog.products.map(({ slug, model, categorySlug }) => ({ slug, model, categorySlug })),
  [
    { slug: 'piano-chain-switch', model: 'Piano Chain Switch', categorySlug: 'piano-chain-switches' },
    { slug: 'keycaps', model: 'Keycaps', categorySlug: 'keycaps' },
    { slug: 'direct-key-switch', model: 'Direct Key Switch', categorySlug: 'direct-key-switches' }
  ],
  'the public catalog should contain exactly the three product families prioritized by the customer'
)

assert.equal(new Set(catalog.products.map((product) => product.image)).size, 3, 'each priority product should have its own customer-sourced image')

const localImageHashes = catalog.products.map((product) => {
  const file = path.join(root, 'public', product.image.replace(/^\//, ''))
  assert.ok(fs.existsSync(file), `${product.slug} should keep its source asset in the repository`)
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
})
assert.equal(new Set(localImageHashes).size, 3, 'each priority product should have distinct source image content')

for (const product of catalog.products) {
  assert.match(product.image, /^\/images\/products\/priority\/.+\.jpg$/, `${product.slug} should use a local customer-sourced catalog image`)
  assert.match(product.sourceUrl, /zijindz\.com\/wap\/Products\.asp\?BigClassID=(1|4|9)/, `${product.slug} should retain its original catalog provenance`)
  assert.doesNotMatch(JSON.stringify(product), /广东一方|Guangdong Yifang|hongwo\.net|88662005/i, `${product.slug} should not expose the PDF supplier identity`)
}

console.log('customer priority product catalog passed')
