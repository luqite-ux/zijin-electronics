import type { Metadata } from 'next'
import { SectionShell } from '@/components/section-shell'
import { siteInfo } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About Zijin Electronics | Switch and Keycap Product Support',
  description: 'Learn about Yueqing Zijin Electronics and its piano chain switches, keycaps, and direct key switches.',
  alternates: { canonical: '/about' }
}

export default function AboutPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="About Us" title="Switch and keycap product support from Yueqing Zijin Electronics" text="The current public catalog focuses on piano chain switches, keycaps, and direct key switches for B2B model selection and custom production inquiries.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 leading-8 text-muted shadow-sm">
          <p>
            Zijin Electronics supports product model selection and customized production for B2B customers. The current website catalog presents three focused switch and keycap product families.
          </p>
          <p className="mt-5">
            Piano chain switches, keycaps, and direct key switches are listed for appliance and electronic control applications. Buyers can send samples, drawings, and application requirements for project review.
          </p>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-ice to-white p-8 shadow-glow">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Company</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">{siteInfo.company}</h2>
          <p className="mt-5 leading-8 text-muted">{siteInfo.address}</p>
        </div>
      </div>
    </SectionShell>
  )
}
