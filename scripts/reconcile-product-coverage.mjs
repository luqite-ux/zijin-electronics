#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

for (const candidate of [path.resolve('.env.local'), path.resolve('.env'), 'D:/Cursor/Grand/huanqiu-admin/.env']) {
  if (!existsSync(candidate)) continue
  for (const line of readFileSync(candidate, 'utf8').split(/\r?\n/)) {
    const index = line.indexOf('=')
    if (index < 1 || line.trim().startsWith('#')) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (/^["']/.test(value) && value.at(-1) === value[0]) value = value.slice(1, -1)
    process.env[key] ||= value
  }
  break
}

const tenantId = 'b83cad82-ebcb-44b2-bfac-92e665fec2df'
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
const catalog = JSON.parse(readFileSync('lib/products-data.json', 'utf8'))
const { data, error } = await client.from('products').select('slug').eq('tenant_id', tenantId).eq('is_active', true).order('slug')
if (error) throw error
const manifestPath = '.codex-delivery/product-coverage-manifest.json'
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
manifest.backend_product_keys = data.map((row) => row.slug)
manifest.frontend_product_keys = catalog.products.map((product) => product.slug)
manifest.featured_product_keys = [
  catalog.products.find((product) => product.categorySlug === 'piano-chain-switches')?.slug,
  catalog.products.find((product) => product.categorySlug === 'keycaps')?.slug,
  catalog.products.find((product) => product.categorySlug === 'direct-key-switches')?.slug,
].filter(Boolean)
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ backend: manifest.backend_product_keys.length, frontend: manifest.frontend_product_keys.length, featured: manifest.featured_product_keys.length }))
