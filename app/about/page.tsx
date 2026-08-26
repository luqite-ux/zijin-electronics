import { SectionShell } from '@/components/section-shell'
import { siteInfo } from '@/lib/site-data'

export default function AboutPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="About Us" title="Connector project support from Yueqing Zijin Electronics" text="The current public catalog focuses on 0.5mm, 1.0mm, and 1.25mm connectors for B2B model selection and custom production inquiries.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 leading-8 text-muted shadow-sm">
          <p>
            Zijin Electronics supports connector model selection and customized production for B2B customers. The current website catalog presents three focused connector pitches.
          </p>
          <p className="mt-5">
            The 0.5mm and 1.0mm FPC / FFC connectors and 1.25mm wafer connector are intended for compact electronic assemblies, appliance controls, audio-visual equipment, medical equipment, and precision instruments. Buyers can send samples, drawings, and application requirements for project review.
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
