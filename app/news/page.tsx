import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionShell } from '@/components/section-shell'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News | Zijin Electronics',
  description: 'Company and product updates from Zijin Electronics.',
  alternates: { canonical: '/news' }
}

export default async function NewsPage() {
  const articles = await getPublishedArticles('en')
  return (
    <SectionShell headingLevel={1} eyebrow="News" title="Updates from Zijin Electronics" text="Published company and product updates will appear here.">
      {articles.length ? <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => <article key={article.slug} className="flex h-full min-w-0 flex-col border border-line bg-white">
          {article.image ? <img src={article.image} alt={article.title} className="aspect-[16/10] w-full object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center bg-slate-50 text-sm font-bold text-muted">Zijin Electronics</div>}
          <div className="flex flex-1 flex-col p-6">
            {article.publishedAt && <time dateTime={article.publishedAt} className="text-sm text-muted">{new Date(article.publishedAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric', timeZone:'UTC' })}</time>}
            <h2 className="mt-3 line-clamp-3 break-words text-2xl font-bold text-ink"><Link href={`/news/${encodeURIComponent(article.slug)}`}>{article.title}</Link></h2>
            {article.excerpt && <p className="mt-4 line-clamp-3 leading-7 text-muted">{article.excerpt}</p>}
            <Link href={`/news/${encodeURIComponent(article.slug)}`} className="mt-auto inline-flex min-h-11 items-center pt-6 font-bold text-brand-red">Read article →</Link>
          </div>
        </article>)}
      </div> : <div className="border border-line bg-white p-8 sm:p-12">
        <p className="text-lg font-bold text-ink">No news has been published yet.</p>
        <p className="mt-3 max-w-2xl leading-7 text-muted">For current product availability, sample requests or custom project discussions, contact the Zijin Electronics team directly.</p>
        <Link href="/contact#inquiry" className="mt-7 inline-flex min-h-11 items-center bg-brand-red px-5 text-sm font-bold text-white">Send an Inquiry</Link>
      </div>}
    </SectionShell>
  )
}
