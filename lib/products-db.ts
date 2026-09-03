import { getSupabaseClient, getTenantId } from '@/lib/supabase'
import { productCategories as fallbackCategories, products as fallbackProducts, type Product, type ProductCategory } from '@/lib/site-data'
import { isApprovedProductSlug } from '@/lib/home-featured-products'

const approvedCategorySlugs = new Set(['piano-chain-switches', 'keycaps', 'direct-key-switches'])

function pickI18n(value: unknown, preferred = 'en') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''
  const field = value as Record<string, unknown>
  if (typeof field[preferred] === 'string' && field[preferred]) return field[preferred] as string
  if (typeof field.en === 'string' && field.en) return field.en as string
  for (const item of Object.values(field)) {
    if (typeof item === 'string' && item) return item
  }
  return ''
}

function toStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.length > 0) : []
}

function readExtra(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
}

function rowToProduct(row: Record<string, unknown>): Product {
  const extra = readExtra(row.extra_data)
  const categorySlug = typeof row.category_slug === 'string' && row.category_slug ? row.category_slug : (typeof row.category === 'string' ? row.category : '')
  const fallback = fallbackProducts.find((item) => item.slug === row.slug)
  return {
    id: typeof row.id === 'string' ? row.id : (typeof row.slug === 'string' ? row.slug : ''),
    slug: typeof row.slug === 'string' ? row.slug : '',
    model: typeof row.model === 'string' && row.model ? row.model : pickI18n(row.name_i18n) || (typeof row.name === 'string' ? row.name : ''),
    categorySlug,
    categoryName: typeof row.category === 'string' && row.category ? row.category : fallbackCategories.find((item) => item.slug === categorySlug)?.name || '',
    image: typeof row.image_url === 'string' && row.image_url ? row.image_url : fallback?.image || '',
    sourceUrl: typeof extra.source_url === 'string' ? extra.source_url : fallback?.sourceUrl || '',
    summary: pickI18n(row.description_i18n) || (typeof row.description === 'string' ? row.description : fallback?.summary || ''),
    applications: toStringArray(row.applications).length ? toStringArray(row.applications) : toStringArray((row.applications_i18n as Record<string, unknown> | undefined)?.en) || fallback?.applications || [],
    features: toStringArray(row.features).length ? toStringArray(row.features) : toStringArray((row.features_i18n as Record<string, unknown> | undefined)?.en) || fallback?.features || []
  }
}

function rowToCategory(row: Record<string, unknown>): ProductCategory {
  const slug = typeof row.slug === 'string' ? row.slug : ''
  const fallback = fallbackCategories.find((item) => item.slug === slug) || fallbackCategories[0]
  const dbSummary = pickI18n(row.description_i18n) || (typeof row.description === 'string' ? row.description : '')
  return {
    ...fallback,
    id: typeof row.id === 'string' ? row.id : fallback.id,
    slug,
    name: pickI18n(row.name_i18n) || (typeof row.name === 'string' ? row.name : fallback.name),
    sourceName: fallback.sourceName,
    count: fallbackProducts.filter((product) => product.categorySlug === slug).length,
    summary: { en: dbSummary && !/\b[A-Z][A-Za-z /-]+s models for\b/.test(dbSummary) ? dbSummary : fallback.summary.en }
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return fallbackCategories

  const { data, error } = await supabase
    .from('product_categories')
    .select('id, slug, name, name_i18n, description, description_i18n, sort_order')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error || !data?.length) return fallbackCategories
  const approved = data.filter((row) => typeof row.slug === 'string' && approvedCategorySlugs.has(row.slug))
  return approved.length ? approved.map((row) => rowToCategory(row as Record<string, unknown>)) : fallbackCategories
}

export async function getProducts(): Promise<Product[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return fallbackProducts

  const { data, error } = await supabase
    .from('products')
    .select('id, slug, model, name, name_i18n, description, description_i18n, image_url, category, category_slug, features, features_i18n, applications, applications_i18n, extra_data, sort_order')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error || !data?.length) return fallbackProducts
  const approved = data.filter((row) => typeof row.slug === 'string' && isApprovedProductSlug(row.slug))
  return approved.length ? approved.map((row) => rowToProduct(row as Record<string, unknown>)) : fallbackProducts
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((product) => product.categorySlug === categorySlug)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isApprovedProductSlug(slug)) return null
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return fallbackProducts.find((product) => product.slug === slug) || null

  const { data, error } = await supabase
    .from('products')
    .select('id, slug, model, name, name_i18n, description, description_i18n, image_url, category, category_slug, features, features_i18n, applications, applications_i18n, extra_data')
    .eq('tenant_id', tenantId)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error || !data) return fallbackProducts.find((product) => product.slug === slug) || null
  return rowToProduct(data as Record<string, unknown>)
}
