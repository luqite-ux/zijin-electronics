import type { Metadata } from 'next'
import { SectionShell } from '@/components/section-shell'
import { manufacturingFacts, stats, workflow } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Manufacturing | Zijin Electronics Switch and Keycap Production',
  description: 'Review Zijin Electronics manufacturing facts, workflow, and production support for switch and keycap projects.',
  alternates: { canonical: '/manufacturing' }
}

export default function ManufacturingPage() {
  return (
    <SectionShell headingLevel={1} eyebrow="Manufacturing" title="Production capability for custom switch and keycap projects" text="A 2,200 m2 production site with 12 workshops and 4 production lines supports product review, production, and outgoing inspection.">
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-blue to-[#3aa2e8] p-8 text-white shadow-glow">
          <h2 className="text-3xl font-semibold tracking-tight">Factory facts</h2>
          <div className="mt-8 grid gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/14 p-4">
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {manufacturingFacts.map((fact) => (
            <p key={fact} className="rounded-2xl border border-line bg-white p-5 font-semibold leading-7 text-ink">{fact}</p>
          ))}
          <div className="rounded-2xl border border-line bg-white p-5">
            <h3 className="text-xl font-bold text-ink">Project workflow</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {workflow.map((item) => <span key={item} className="rounded-full bg-brand-ice px-4 py-2 text-sm font-bold text-brand-blue">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
