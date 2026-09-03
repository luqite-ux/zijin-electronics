import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const productsPage = read('app/products/page.tsx')
const categoryPage = read('app/products/category/[slug]/page.tsx')
const detailPage = read('app/products/[slug]/page.tsx')

assert.match(productsPage, /Switches, Keycaps, and Direct Key Switches/, 'product index should continue the priority-product message from the homepage')
assert.match(productsPage, /export const metadata: Metadata/, 'product index should publish route-specific metadata')
assert.match(productsPage, /canonical/, 'product index should emit a canonical URL')
assert.doesNotMatch(productsPage, /pitch-connectors|0\.5mm, 1\.0mm, and 1\.25mm connector/i, 'product index should not retain the former connector-only route')
assert.doesNotMatch(categoryPage, /connector products/i, 'category pages should use neutral product copy for the new product families')
assert.match(categoryPage, /generateMetadata/, 'category pages should generate unique metadata from their current category')
assert.match(detailPage, /generateMetadata/, 'product detail pages should generate unique metadata from their current product')
assert.match(categoryPage, /canonical/, 'category pages should emit a canonical URL')
assert.match(detailPage, /canonical/, 'product detail pages should emit a canonical URL')

console.log('priority product routes passed')
