import type { Metadata } from 'next'
import { InquiryForm } from '@/components/contact/inquiry-form'
import { SectionShell } from '@/components/section-shell'
import { siteInfo } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact Zijin Electronics | Product Inquiry',
  description: 'Contact Zijin Electronics about piano chain switches, keycaps, direct key switches, samples, drawings, and custom requirements.',
  alternates: { canonical: '/contact' }
}

export default function ContactPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="Contact" title="Send your switch or keycap inquiry" text="Share the required model, application, estimated quantity, drawing, and sample needs so the team can review your project scope.">
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-line bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">Contact details</h2>
          <div className="mt-6 space-y-4 leading-7 text-muted">
            <p><strong className="text-ink">Email:</strong> {siteInfo.email}</p>
            <p><strong className="text-ink">Phone:</strong> {siteInfo.phone}</p>
            <p><strong className="text-ink">Address:</strong> {siteInfo.address}</p>
          </div>
        </div>
        <InquiryForm />
      </div>
    </SectionShell>
  )
}
