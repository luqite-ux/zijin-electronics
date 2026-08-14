import { SectionShell } from '@/components/section-shell'
import { siteInfo } from '@/lib/site-data'

export default function AboutPage() {
  return (
    <SectionShell eyebrow="About Us" title="Focused on switches, key caps, and connectors since 2007" text="Yueqing Zijin Electronics Co., Ltd. supports appliance, electronics, medical equipment, and precision instrument projects with model selection and custom production.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 leading-8 text-muted shadow-sm">
          <p>
            Since 2007, Zijin Electronics has focused on direct key switches, door lock switches, hair dryer switches, key caps, and connector components. The company mainly supports customized production for B2B customers.
          </p>
          <p className="mt-5">
            Products are used in audio-visual products, home appliances, medical equipment, and other precision instruments. Buyers can select from the existing catalog or send samples, drawings, and application requirements for project review.
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
