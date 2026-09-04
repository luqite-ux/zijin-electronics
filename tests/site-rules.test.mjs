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
const productCard = read('components/products/product-card.tsx')
const homePage = read('app/page.tsx')
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
assert.match(header, /width=\{195\}/, 'header must render the confirmed horizontal ZHIJIN logo')
assert.match(header, /height=\{99\}/, 'header logo height should match the confirmed source aspect ratio')
assert.match(header, /aria-expanded=\{open\}/, 'mobile navigation must expose its expanded state')
assert.doesNotMatch(hero, /stats\.slice|Featured series:|Technical product range/, 'hero should not reintroduce the dashboard-like product grid')
assert.match(hero, /hero-priority-products-v2\.png/, 'hero should use the composed priority-product banner')
assert.match(hero, /hero-range-hood-v2\.png/, 'hero should promote the high-volume range-hood switch family')
assert.match(hero, /hero-direct-key-v2\.png/, 'hero should promote direct-key switches')
assert.match(hero, /Previous banner[\s\S]*Next banner/, 'hero should provide accessible manual carousel controls')
assert.match(hero, /Explore Products/, 'hero should link directly to the product catalog')
assert.doesNotMatch(hero, /zijin-products-on-stage|hero-sparkle|connector solutions/i, 'hero should not retain the superseded connector composition')
assert.match(featuredProducts, /src=\{product\.image\}/, 'featured product cards should use the customer-sourced product images')
assert.match(featuredProducts, /mix-blend-multiply/, 'homepage product photos should share one visually unified neutral stage')
assert.match(featuredProducts, /xl:grid-cols-4/, 'homepage should show a denser four-column product grid on desktop')
assert.doesNotMatch(featuredProducts, /product\.summary/, 'homepage product cards should stay compact instead of repeating catalog summaries')
assert.doesNotMatch(homePage, /<ProductSeries|import \{ ProductSeries \}/, 'homepage should not repeat the same products in a separate family-card section')
assert.match(featuredProducts, /Keycaps \(96\)/, 'homepage should retain a prominent keycap category link without using its blue drawing as a product card')
assert.match(featuredProducts, /priority=\{index < 4\}/, 'only the first visible product row should preload on the homepage')
assert.match(featuredProducts, /Piano Chain Switches Model 618[\s\S]*Model 618/, 'the homepage should use the concise Model 618 display name')
assert.match(productSeries, /piano-chain-switches[\s\S]*keycaps[\s\S]*direct-key-switches/, 'the product-series area should preserve the required priority order')
for (const asset of ['piano-chain-switch.jpg', 'keycaps.jpg', 'direct-key-switch.jpg']) {
  assert.ok(fs.existsSync(path.join(root, 'public/images/products/priority', asset)), `${asset} should exist as a customer-sourced product asset`)
}
assert.match(productsPage, /getProducts/, 'the products index should load the approved products')
assert.match(productsPage, /ProductCard/, 'the products index should render real product cards immediately below the category filters')
assert.match(productsPage, /searchParams/, 'the products index should support category and all-product filter state')
assert.match(productsPage, /selectedCategorySlug\s*=\s*requestedCategory[\s\S]*productCategories\[0\]\?\.slug/, 'the products index should default to the first product category')
assert.match(productsPage, /category\.slug === selectedCategorySlug/, 'the products index should filter products to the selected category')
assert.match(productsPage, /href="\/products\?view=all"/, 'the products index should provide a View All control after the categories')
assert.match(productsPage, /View All \(\{products\.length\}\)/, 'the View All control should make the full catalog count clear')
assert.doesNotMatch(productsPage, /singleCategory|productCategories\.map\(\(category\)\s*=>\s*\{[\s\S]*View \{category\.count\} models/, 'the products index should not repeat category-only cards below the filters')
assert.match(productsPage, /Switches, Keycaps, and Direct Key Switches/, 'the products index should continue the homepage priority-product message')
assert.match(productCard, /<Link[\s\S]*<article/, 'each complete product card should be one link to its detail page')
assert.match(productCard, /flex-1[\s\S]*mt-auto/, 'product card content should keep the detail action aligned at the bottom')
assert.match(productCard, /Piano Chain Switches Model 618[\s\S]*Model 618/, 'the first product should use the concise Model 618 display name')
assert.equal((productCard.match(/href=\{productPath\(product\.slug\)\}/g) || []).length, 1, 'the product card should have one non-nested detail link')
assert.match(layout, /icon\.png\?v=zijin-20260904/, 'favicon should use the current ZHIJIN brand icon')
assert.match(layout, /Precision Appliance Switches & Keycaps/, 'browser metadata should match the redesigned product focus')
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
for (const source of [featuredProducts, productSeries, productsPage]) {
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
