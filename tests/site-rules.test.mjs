import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    if (!/\.(tsx?|css|mjs|json)$/.test(entry.name)) return []
    return [full]
  })
}

const forbiddenCommerce = /\b(cart|checkout|payment|buy now|add to cart)\b/i
const forbiddenCommitments = /\b(warranty|warranties|guarantee|guaranteed|quality guarantee)\b|质保|保修|质量保证/i

const siteData = read('lib/site-data.ts')
const productData = read('lib/products-data.json')
const productCatalog = JSON.parse(productData)
const routes = read('lib/routes.ts')
const header = read('components/site-header.tsx')
const hero = read('components/home/hero.tsx')
const layout = read('app/layout.tsx')
const inquiryRoute = read('app/api/inquiries/route.ts')
const inquiryForm = read('components/contact/inquiry-form.tsx')

assert.match(siteData, /Zijin Electronics/, 'brand name should be present')
assert.match(siteData, /乐清市紫金电子有限公司/, 'Chinese admin display name should be preserved')
assert.match(siteData, /default_language|supported_languages|Localized|en/, 'English content model should preserve multilingual expansion shape')
assert.match(siteData, /label:\s*['"]Home['"]/, 'nav data must include visible Home navigation')
assert.match(productData, /"products"/, 'scraped product data should be present')
assert.match(routes, /inquiryPath\s*=\s*['"]\/contact#inquiry['"]/, 'inquiry route should be centralized')
assert.match(header, /navItems\.map/, 'header must render navigation data')
assert.match(header, /width=\{238\}/, 'header must render the confirmed Zijin Technology logo')
assert.match(header, /height=\{230\}/, 'header logo height should match the confirmed source aspect ratio')
assert.doesNotMatch(hero, /stats\.slice|Featured series:/, 'hero should not reintroduce the crowded six-stat footer strip')
assert.match(hero, /<span className="block whitespace-nowrap">Three pitches\.<\/span>/, 'hero should keep the first headline line intact on mobile')
assert.match(hero, /<span className="block whitespace-nowrap">Built to connect\.<\/span>/, 'hero should keep the second headline line intact on mobile')
assert.match(hero, /connector05\.slug/, 'hero should keep the primary 0.5mm product link')
assert.match(hero, /\[connector10, connector125\]\.map/, 'hero should keep the 1.0mm and 1.25mm product links')
assert.match(layout, /favicon\.ico\?v=zijin-technology-20260815/, 'favicon should use a cache-busted ico file for browser tabs')
assert.ok(fs.existsSync(path.join(root, 'public/favicon.ico')), 'standard favicon.ico should exist for browser tabs')
assert.match(inquiryRoute, /from\(['"]inquiries['"]\)\.insert/, 'API route must insert into inquiries')
assert.match(inquiryForm, /fetch\(['"]\/api\/inquiries['"]/, 'form must submit to real inquiry API')

for (const product of productCatalog.products) {
  assert.doesNotMatch(product.model, /[\u4e00-\u9fff]/, `${product.slug} model should be English-only`)
  assert.doesNotMatch(product.summary, /[\u4e00-\u9fff]/, `${product.slug} summary should be English-only`)
  assert.doesNotMatch(product.model, /\(\)|--/, `${product.slug} model should not contain empty punctuation artifacts`)
  assert.doesNotMatch(product.summary, /\ba (SD|HDMI|FPC)\b/, `${product.slug} summary should use the correct English article`)
}

for (const category of productCatalog.categories) {
  assert.doesNotMatch(category.name, /[\u4e00-\u9fff]/, `${category.slug} category name should be English-only`)
}

const sourceDirs = ['app', 'components', 'lib'].map((name) => path.join(root, name))
const files = sourceDirs.flatMap((dir) => walk(dir))
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  assert.doesNotMatch(text, forbiddenCommerce, `${path.relative(root, file)} contains commerce wording`)
  assert.doesNotMatch(text, forbiddenCommitments, `${path.relative(root, file)} contains forbidden commitment wording`)
}

console.log(`site rules passed across ${files.length} files`)
