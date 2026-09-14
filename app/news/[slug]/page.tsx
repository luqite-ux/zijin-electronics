import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles-db'
import { SectionShell } from '@/components/section-shell'

export const revalidate = 60
export const dynamicParams = true
type Props = { params: Promise<{ slug: string }> }
const base = 'https://www.zijinglobal.com'

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug, 'en')
  if (!article) return { title: 'Article not found', robots: { index:false, follow:false } }
  const url = `${base}/news/${encodeURIComponent(article.slug)}`
  const description = article.excerpt || article.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g,' ').trim().slice(0,160)
  return { title: `${article.title} | Zijin Electronics`, description, alternates: { canonical:url },
    openGraph: {title:article.title, description, url, type:'article', images:article.image ? [article.image] : [`${base}/icon.png`], publishedTime:article.publishedAt || undefined, modifiedTime:article.updatedAt || undefined},
    twitter: {card:'summary_large_image',title:article.title,description,images:article.image ? [article.image] : [`${base}/icon.png`]} }
}

export default async function NewsDetailPage({params}: Props) {
  const article = await getArticleBySlug((await params).slug, 'en')
  if (!article) notFound()
  const url = `${base}/news/${encodeURIComponent(article.slug)}`
  const schema = {'@context':'https://schema.org','@type':'Article','@id':`${url}#article`,url,headline:article.title,description:article.excerpt,
    mainEntityOfPage:url,inLanguage:'en',...(article.image ? {image:article.image}:{}),...(article.publishedAt ? {datePublished:article.publishedAt}:{}),...(article.updatedAt ? {dateModified:article.updatedAt}:{}),...(article.author ? {author:{'@type':'Person',name:article.author}}:{})}
  return <SectionShell headingLevel={1} eyebrow="News" title={article.title}>
    <Link href="/news" className="inline-flex min-h-11 items-center font-bold text-brand-red">← All news</Link>
    {article.publishedAt && <p className="mt-5 text-muted"><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'})}</time></p>}
    {article.image && <img src={article.image} alt={article.title} className="mt-8 max-h-[560px] w-full object-contain" />}
    <div className="news-prose mt-10 max-w-4xl" dangerouslySetInnerHTML={{__html:article.content}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
  </SectionShell>
}
