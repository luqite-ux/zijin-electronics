import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionShell } from '@/components/section-shell'

export const metadata: Metadata = {
  title: 'News | Zijin Electronics',
  description: 'Company and product updates from Zijin Electronics.',
  alternates: { canonical: '/news' }
}

export default function NewsPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="News" title="Updates from Zijin Electronics" text="Published company and product updates will appear here.">
      <div className="border border-line bg-white p-8 sm:p-12">
        <p className="text-lg font-bold text-ink">No news has been published yet.</p>
        <p className="mt-3 max-w-2xl leading-7 text-muted">For current product availability, sample requests or custom project discussions, contact the Zijin Electronics team directly.</p>
        <Link href="/contact#inquiry" className="mt-7 inline-flex min-h-11 items-center bg-brand-red px-5 text-sm font-bold text-white">Send an Inquiry</Link>
      </div>
    </SectionShell>
  )
}
