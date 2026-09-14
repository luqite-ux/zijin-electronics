import sanitizeHtml from 'sanitize-html'
import { getSupabaseClient, getTenantId } from '@/lib/supabase'

export type Article = { slug: string; title: string; excerpt: string; content: string; image: string; publishedAt: string; updatedAt: string; author: string }
export function pickArticleText(value: unknown, locale = 'en', defaultLocale = 'en', legacy: unknown = ''): string {
  const fields = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  for (const text of [fields[locale], fields[defaultLocale], ...Object.values(fields), legacy]) {
    if (typeof text === 'string' && text.trim()) return text.trim()
  }
  return ''
}
function mapArticle(row: Record<string, unknown>, locale: string, defaultLocale: string): Article {
  const text = (key: string) => pickArticleText(row[`${key}_i18n`], locale, defaultLocale, row[key])
  const content = sanitizeHtml(text('content'), {
    allowedTags: ['p','br','h2','h3','h4','h5','h6','strong','b','em','i','u','s','ul','ol','li','blockquote','a','img','table','thead','tbody','tr','th','td','pre','code','hr'],
    allowedAttributes: { a: ['href','title'], img: ['src','alt','width','height'], th: ['colspan','rowspan'], td: ['colspan','rowspan'] },
    allowedSchemes: ['https','http','mailto'], allowProtocolRelative: false, transformTags: { h1: 'h2' },
  })
  const image = typeof row.featured_image === 'string' && /^https:\/\//i.test(row.featured_image) ? row.featured_image : ''
  return { slug: String(row.slug || ''), title: text('title'), excerpt: text('excerpt'), content, image,
    publishedAt: String(row.published_at || row.created_at || ''), updatedAt: String(row.updated_at || row.published_at || row.created_at || ''), author: typeof row.author === 'string' ? row.author : '' }
}
async function context() {
  const client = getSupabaseClient()
  const tenantId = getTenantId()
  if (!client || !tenantId) throw new Error('News database configuration is unavailable')
  const { data, error } = await client.from('tenants').select('default_language').eq('id', tenantId).maybeSingle()
  if (error) throw new Error('News language settings are unavailable')
  return { client, tenantId, defaultLocale: data?.default_language || 'en' }
}
export async function getPublishedArticles(locale = 'en'): Promise<Article[]> {
  const {client, tenantId, defaultLocale} = await context()
  const result: Article[] = []
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await client.from('articles').select('*').eq('tenant_id', tenantId).eq('is_published', true)
      .order('published_at', { ascending: false }).order('id', { ascending: true }).range(offset, offset + 499)
    if (error) throw new Error('News could not be loaded')
    result.push(...(data || []).map(row => mapArticle(row, locale, defaultLocale)).filter(article => article.slug))
    if (!data || data.length < 500) return result
  }
}
export async function getArticleBySlug(slug: string, locale = 'en'): Promise<Article | null> {
  const { client, tenantId, defaultLocale } = await context()
  const { data, error } = await client.from('articles').select('*').eq('tenant_id', tenantId).eq('is_published', true).eq('slug', slug).maybeSingle()
  if (error) throw new Error('News could not be loaded')
  return data ? mapArticle(data, locale, defaultLocale) : null
}
