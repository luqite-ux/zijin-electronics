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
const featuredProducts = read('components/home/featured-products.tsx')
const productSeries = read('components/home/product-series.tsx')
const productsPage = read('app/products/page.tsx')
const aboutPage = read('app/about/page.tsx')
const manufacturingPage = read('app/manufacturing/page.tsx')
const qualityPage = read('app/quality/page.tsx')
const faqPage = read('app/faq/page.tsx')
const contactPage = read('app/contact/page.tsx')
const robots = read('app/robots.ts')
const globals = read('app/globals.css')
const layout = read('app/layout.tsx')
const inquiryRoute = read('app/api/inquiries/route.ts')
const inquiryForm = read('components/contact/inquiry-form.tsx')
const footer = read('components/site-footer.tsx')

assert.match(siteData, /Zijin Electronics/, 'brand name should be present')
assert.match(siteData, /乐清市紫金电子有限公司/, 'Chinese admin display name should be preserved')
assert.match(siteData, /default_language|supported_languages|Localized|en/, 'English content model should preserve multilingual expansion shape')
assert.match(siteData, /label:\s*['"]Home['"]/, 'nav data must include visible Home navigation')
assert.match(productData, /"products"/, 'scraped product data should be present')
assert.match(routes, /inquiryPath\s*=\s*['"]\/contact#inquiry['"]/, 'inquiry route should be centralized')
assert.match(header, /navItems\.map/, 'header must render navigation data')
assert.match(header, /width=\{238\}/, 'header must render the confirmed Zijin Technology logo')
assert.match(header, /height=\{230\}/, 'header logo height should match the confirmed source aspect ratio')
assert.doesNotMatch(hero, /stats\.slice|Featured series:|Technical product range/, 'hero should not reintroduce the dashboard-like product grid')
assert.match(hero, /Switch &amp; Keycap Solutions/, 'hero should lead with the priority switch and keycap message')
assert.match(hero, /featuredProducts\.map/, 'hero should present all three priority product images')
assert.match(hero, /View Priority Products/, 'hero should link directly to the priority product section')
assert.doesNotMatch(hero, /zijin-products-on-stage|hero-sparkle|connector solutions/i, 'hero should not retain the superseded connector composition')
assert.match(featuredProducts, /src=\{product\.image\}/, 'featured product cards should use the customer-sourced product images')
assert.match(productSeries, /piano-chain-switches[\s\S]*keycaps[\s\S]*direct-key-switches/, 'the product-series area should preserve the required priority order')
for (const asset of ['piano-chain-switch.jpg', 'keycaps.jpg', 'direct-key-switch.jpg']) {
  assert.ok(fs.existsSync(path.join(root, 'public/images/products/priority', asset)), `${asset} should exist as a customer-sourced product asset`)
}
assert.match(productsPage, /getProducts/, 'the products index should load the approved products for its single-category feature panel')
assert.match(productsPage, /Switches, Keycaps, and Direct Key Switches/, 'the products index should continue the homepage priority-product message')
assert.match(layout, /favicon\.ico\?v=zijin-technology-20260815/, 'favicon should use a cache-busted ico file for browser tabs')
assert.match(layout, /Piano Chain Switches, Keycaps & Direct Key Switches/, 'browser metadata should match the current homepage priority products')
assert.doesNotMatch(layout, /0\.5mm, 1\.0mm|FPC \/ FFC|wafer connectors/i, 'browser metadata should not retain the superseded connector focus')
assert.match(layout, /metadataBase/, 'metadata should declare the formal canonical host')
assert.match(layout, /alternates:\s*\{\s*canonical:/, 'homepage should emit a canonical URL')
assert.ok(fs.existsSync(path.join(root, 'public/favicon.ico')), 'standard favicon.ico should exist for browser tabs')
assert.match(inquiryRoute, /from\(['"]inquiries['"]\)\.insert/, 'API route must insert into inquiries')
assert.match(inquiryForm, /fetch\(['"]\/api\/inquiries['"]/, 'form must submit to real inquiry API')
assert.match(footer, /formatFooterCopyright/, 'footer copyright must normalize the company-name punctuation')
for (const [name, page] of Object.entries({ aboutPage, manufacturingPage, qualityPage, faqPage, contactPage })) {
  assert.doesNotMatch(page, /connector|FPC|FFC|wafer/i, `${name} should not retain the superseded connector focus`)
  assert.match(page, /export const metadata: Metadata/, `${name} should publish route-specific metadata`)
}
assert.match(robots, /disallow:\s*\[['"]\/admin['"],\s*['"]\/api['"]\]/, 'robots should prevent admin and API indexing')
for (const source of [hero, featuredProducts, productSeries, productsPage]) {
  assert.doesNotMatch(source, /object-cover/, 'priority product images should preserve the complete product with contain sizing')
}

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
