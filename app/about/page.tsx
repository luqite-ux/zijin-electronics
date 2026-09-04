import type { Metadata } from 'next'
import { SectionShell } from '@/components/section-shell'
import { siteInfo } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About Zijin Electronics | Switch and Keycap Product Support',
  description: 'Learn about Yueqing Zijin Electronics and its piano chain, range-hood and direct-key switches and keycaps.',
  alternates: { canonical: '/about' }
}

export default function AboutPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="About Us" title="Switch and keycap production support since 2007" text="The verified public catalog covers four product families and 156 models for B2B selection, samples, and custom production inquiries.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 leading-8 text-muted shadow-sm">
          <p>
            Founded in 2007, Zijin Electronics supports product model selection and customized production for B2B customers from a 2,200 m² production site with 12 workshops and 4 production lines.
          </p>
          <p className="mt-5">
            Piano chain switches, range-hood switches, keycaps, and direct key switches are listed for appliance and electronic control applications. Buyers can send samples, drawings, and application requirements for project review.
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
