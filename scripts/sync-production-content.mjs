#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const TENANT_ID = 'b83cad82-ebcb-44b2-bfac-92e665fec2df'
const dryRun = process.argv.includes('--dry-run')

function loadEnv() {
  const candidates = [
    path.resolve('.env.local'),
    path.resolve('.env'),
    'D:/Cursor/Grand/huanqiu-admin/.env',
  ]
  const envPath = candidates.find(existsSync)
  if (!envPath) throw new Error('Supabase environment file not found')
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const index = line.indexOf('=')
    if (index < 1 || line.trim().startsWith('#')) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (/^["']/.test(value) && value.at(-1) === value[0]) value = value.slice(1, -1)
    process.env[key] ||= value
  }
}

loadEnv()
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})
const catalog = JSON.parse(readFileSync(path.resolve('lib/products-data.json'), 'utf8'))
const approvedSlugs = catalog.products.map((product) => product.slug)
const approvedCategorySlugs = catalog.categories.map((category) => category.slug)

const { data: tenant, error: tenantReadError } = await client.from('tenants').select('*').eq('id', TENANT_ID).single()
if (tenantReadError) throw tenantReadError
const manual = new Set(tenant.extra_settings?.site_settings_manual_fields || [])
const tenantPatch = {
  display_name: '乐清市紫金电子有限公司',
  admin_group: 2,
  brand_color: '#e11d2e',
  default_language: 'en',
  supported_languages: ['en'],
  contact_email: '734925868@qq.com',
  contact_phone: '+86 138 1976 1299',
  contact_address_short: 'No.175 Fanxing Road, Shifan Subdistrict, Yueqing, Zhejiang, China',
  contact_address_i18n: { en: 'No.175 Fanxing Road, Shifan Subdistrict, Yueqing, Zhejiang, China' },
  site_title_i18n: { en: 'Zijin Electronics | Appliance Switches & Keycaps' },
  site_tagline_i18n: { en: 'Precision switches and keycaps for appliance controls' },
  site_description_i18n: { en: 'Zijin Electronics supplies piano-chain, range-hood and direct-key switches, keycaps and connectors for appliance and electronic control projects.' },
  seo_title_i18n: { en: 'Zijin Electronics | Appliance Switches & Keycaps' },
  seo_description_i18n: { en: 'Browse 156 verified Zijin Electronics models across piano-chain switches, range-hood switches, keycaps and direct-key switches.' },
  seo_keywords_i18n: { en: ['piano chain switch', 'range hood switch', 'keycap', 'direct key switch', 'appliance switch manufacturer'] },
  extra_settings: {
    ...(tenant.extra_settings || {}),
    site_settings_source: 'Customer source materials and original product catalog, 2026-09-04',
    site_settings_initialized_at: new Date().toISOString(),
  },
}
for (const field of manual) delete tenantPatch[field]

console.log(JSON.stringify({ tenantId: TENANT_ID, dryRun, products: catalog.products.length, categories: catalog.categories.length, preservedManualFields: [...manual], tenantFields: Object.keys(tenantPatch) }))
if (catalog.products.length !== 156 || catalog.categories.length !== 4) throw new Error('Catalog count mismatch')
if (dryRun) {
  console.log(JSON.stringify({ dryRunComplete: true }))
} else {

const { error: tenantUpdateError } = await client.from('tenants').update(tenantPatch).eq('id', TENANT_ID)
if (tenantUpdateError) throw tenantUpdateError

for (const [sortOrder, category] of catalog.categories.entries()) {
  const description = `${category.name} models from Zijin Electronics' original product catalog.`
  const { error } = await client.from('product_categories').upsert({
    tenant_id: TENANT_ID,
    slug: category.slug,
    name: category.name,
    name_en: category.name,
    name_i18n: { en: category.name },
    description,
    description_en: description,
    description_i18n: { en: description },
    sort_order: sortOrder,
    is_active: true,
    extra_data: { source: category.sourceName, verified_model_count: category.count },
  }, { onConflict: 'tenant_id,slug' })
  if (error) throw error
}

for (const [sortOrder, product] of catalog.products.entries()) {
  const { error } = await client.from('products').upsert({
    tenant_id: TENANT_ID,
    slug: product.slug,
    name: product.model,
    name_en: product.model,
    name_i18n: { en: product.model },
    model: product.model,
    description: product.summary,
    description_en: product.summary,
    description_i18n: { en: product.summary },
    overview: product.summary,
    overview_en: product.summary,
    overview_i18n: { en: product.summary },
    category: product.categoryName,
    category_slug: product.categorySlug,
    image_url: product.image,
    features: product.features,
    features_i18n: { en: product.features },
    applications: product.applications,
    applications_i18n: { en: product.applications },
    advantages: [],
    advantages_i18n: { en: [] },
    specs: [{ label: 'Model', value: product.model }],
    sort_order: sortOrder,
    is_active: true,
    extra_data: { source: product.sourceUrl, gallery: [product.image], images: [product.image], multilingual_ready: true },
  }, { onConflict: 'tenant_id,slug' })
  if (error) throw error
}

const { data: existingProducts, error: existingProductsError } = await client.from('products').select('id,slug').eq('tenant_id', TENANT_ID)
if (existingProductsError) throw existingProductsError
const obsoleteProductIds = existingProducts.filter((row) => !approvedSlugs.includes(row.slug)).map((row) => row.id)
if (obsoleteProductIds.length) {
  const { error } = await client.from('products').delete().eq('tenant_id', TENANT_ID).in('id', obsoleteProductIds)
  if (error) throw error
}

const { data: existingCategories, error: existingCategoriesError } = await client.from('product_categories').select('id,slug').eq('tenant_id', TENANT_ID)
if (existingCategoriesError) throw existingCategoriesError
const obsoleteCategoryIds = existingCategories.filter((row) => !approvedCategorySlugs.includes(row.slug)).map((row) => row.id)
if (obsoleteCategoryIds.length) {
  const { error } = await client.from('product_categories').delete().eq('tenant_id', TENANT_ID).in('id', obsoleteCategoryIds)
  if (error) throw error
}

const [{ count: productCount, error: productCountError }, { data: categoryRows, error: categoryCountError }, { data: tenantCheck, error: tenantCheckError }] = await Promise.all([
  client.from('products').select('id', { count: 'exact', head: true }).eq('tenant_id', TENANT_ID).eq('is_active', true),
  client.from('product_categories').select('slug').eq('tenant_id', TENANT_ID).eq('is_active', true),
  client.from('tenants').select('display_name,admin_group,contact_email,contact_phone,site_title_i18n').eq('id', TENANT_ID).single(),
])
if (productCountError) throw productCountError
if (categoryCountError) throw categoryCountError
if (tenantCheckError) throw tenantCheckError
if (productCount !== 156 || categoryRows.length !== 4 || tenantCheck.admin_group !== 2) throw new Error(`Query-back mismatch: products=${productCount}, categories=${categoryRows.length}, group=${tenantCheck.admin_group}`)
console.log(JSON.stringify({ verified: true, products: productCount, categories: categoryRows.map((row) => row.slug).sort(), tenant: tenantCheck }))
}
