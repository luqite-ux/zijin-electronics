import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const hero = read('components/home/hero.tsx')
const home = read('app/page.tsx')
const series = read('components/home/product-series.tsx')

assert.match(hero, /Switch &amp; Keycap Solutions/, 'hero should lead with the prioritized product families')
assert.match(hero, /View Priority Products/, 'hero should offer a direct path to the priority section')
assert.match(home, /<div id="priority-products">/, 'homepage should expose the priority product anchor without changing the shared section API')
assert.match(home, /Three priority product families/, 'homepage product-series introduction should name the focused scope')
assert.match(series, /piano-chain-switches/, 'homepage series should include piano chain switches')
assert.match(series, /keycaps/, 'homepage series should include keycaps')
assert.match(series, /direct-key-switches/, 'homepage series should include direct key switches')
assert.doesNotMatch(home, /0\.5mm, 1\.0mm, and 1\.25mm connector/i, 'homepage should not retain the former connector focus')

console.log('homepage priority content passed')
