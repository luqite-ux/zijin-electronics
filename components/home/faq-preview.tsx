import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { faqs } from '@/lib/site-data'

export function FaqPreview() {
  return (
    <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
      <div className="rounded-[1.5rem] border border-line bg-gradient-to-br from-brand-blue to-[#0d8fbd] p-8 text-white shadow-glow">
        <p className="text-sm font-bold uppercase text-white/75">Buyer Support</p>
        <h3 className="mt-4 text-3xl font-semibold">Questions before model selection?</h3>
        <p className="mt-4 leading-8 text-white/82">Share model numbers, drawings, application requirements, or samples. All product and contact CTAs lead to the same inquiry workflow.</p>
        <Link href="/faq" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-bold text-brand-blue">
          View FAQ
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-3">
        {faqs.slice(0, 4).map((item) => (
          <div key={item.question} className="rounded-2xl border border-line bg-white p-5">
            <h4 className="font-semibold text-ink">{item.question}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
