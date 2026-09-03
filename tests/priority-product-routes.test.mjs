import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const productsPage = read('app/products/page.tsx')
const categoryPage = read('app/products/category/[slug]/page.tsx')

assert.match(productsPage, /Switches, Keycaps, and Direct Key Switches/, 'product index should continue the priority-product message from the homepage')
assert.doesNotMatch(productsPage, /pitch-connectors|0\.5mm, 1\.0mm, and 1\.25mm connector/i, 'product index should not retain the former connector-only route')
assert.doesNotMatch(categoryPage, /connector products/i, 'category pages should use neutral product copy for the new product families')

console.log('priority product routes passed')
