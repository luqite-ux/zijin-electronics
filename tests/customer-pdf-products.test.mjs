import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/products-data.json'), 'utf8'))

assert.deepEqual(
  catalog.categories.map(({ slug, name, count }) => ({ slug, name, count })),
  [{ slug: 'pitch-connectors', name: 'Pitch Connectors', count: 3 }],
  'the public catalog should contain only the customer-confirmed connector category'
)

assert.deepEqual(
  catalog.products.map(({ slug, model, categorySlug }) => ({ slug, model, categorySlug })),
  [
    { slug: '0-5mm-pitch-connector', model: '0.5mm Pitch FPC / FFC Connector', categorySlug: 'pitch-connectors' },
    { slug: '1-0mm-pitch-connector', model: '1.0mm Pitch FPC / FFC Connector', categorySlug: 'pitch-connectors' },
    { slug: '1-25mm-pitch-connector', model: '1.25mm Pitch Wafer Connector', categorySlug: 'pitch-connectors' }
  ],
  'the public catalog should contain exactly the three pitch products confirmed by the customer'
)

assert.equal(new Set(catalog.products.map((product) => product.image)).size, 3, 'each confirmed product should have its own PDF-derived image')

const localImageHashes = catalog.products.map((product) => {
  const file = path.join(root, 'public/images/products/pdf-catalog', `${product.slug}.webp`)
  assert.ok(fs.existsSync(file), `${product.slug} should keep its PDF-derived source asset in the repository`)
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
})
assert.equal(new Set(localImageHashes).size, 3, 'each confirmed product should have distinct PDF-derived image content')

for (const product of catalog.products) {
  assert.match(product.image, /^https:\/\/.+\/products\/zijin-electronics\/pdf-catalog\//, `${product.slug} should use a public PDF-derived catalog image`)
  assert.ok(product.summary.includes(`${product.model.split(' Pitch')[0]} Pitch`), `${product.slug} should identify its confirmed pitch in the summary`)
  assert.doesNotMatch(JSON.stringify(product), /广东一方|Guangdong Yifang|hongwo\.net|88662005/i, `${product.slug} should not expose the PDF supplier identity`)
}

console.log('customer PDF product replacement passed')
