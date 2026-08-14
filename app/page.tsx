import { Hero } from '@/components/home/hero'
import { ManufacturingPreview } from '@/components/home/manufacturing-preview'
import { ProductMatrix } from '@/components/home/product-matrix'
import { QualityPreview } from '@/components/home/quality-preview'
import { Workflow } from '@/components/home/workflow'
import { InquiryCta } from '@/components/inquiry-cta'
import { SectionShell } from '@/components/section-shell'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionShell eyebrow="Product Catalog" title="Switch, key cap, and connector categories for B2B buyers" text="The catalog is organized for technical selection and inquiry. Every product path leads buyers toward model review, samples, and project requirements.">
        <ProductMatrix />
      </SectionShell>
      <SectionShell eyebrow="OEM / ODM Workflow" title="From model selection to custom production">
        <Workflow />
      </SectionShell>
      <SectionShell eyebrow="Manufacturing" title="Factory capacity behind switch and connector production">
        <ManufacturingPreview />
      </SectionShell>
      <SectionShell eyebrow="Quality & Certifications" title="Process inspection and certification-backed trust">
        <QualityPreview />
      </SectionShell>
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-brand-blue via-[#1d83d4] to-brand-green p-10 text-white shadow-glow">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Tell us the model number, application, quantity, and custom requirements.</h2>
          <p className="mt-4 max-w-2xl text-white/85">Zijin Electronics will review your switch, key cap, or connector requirements and respond with suitable next steps.</p>
          <InquiryCta label="Start an Inquiry" variant="light" className="mt-8" />
        </div>
      </section>
    </>
  )
}
