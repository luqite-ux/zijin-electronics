import { Hero } from '@/components/home/hero'
import { ApplicationScenarios } from '@/components/home/application-scenarios'
import { FaqPreview } from '@/components/home/faq-preview'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ManufacturingPreview } from '@/components/home/manufacturing-preview'
import { QualityPreview } from '@/components/home/quality-preview'
import { InquiryCta } from '@/components/inquiry-cta'
import { SectionShell } from '@/components/section-shell'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="priority-products">
        <SectionShell eyebrow="Product Families" title="Four core ranges. Built around real applications." text="Explore each complete product family through a dedicated, high-clarity visual overview.">
          <FeaturedProducts />
        </SectionShell>
      </div>
      <SectionShell eyebrow="Application Scenarios" title="Components for appliance controls, interfaces, and precision assemblies" text="Instead of invented project cases, the homepage presents factual application areas from customer materials and product documentation.">
        <ApplicationScenarios />
      </SectionShell>
      <SectionShell eyebrow="Manufacturing" title="Factory capability behind switch and keycap production">
        <ManufacturingPreview />
      </SectionShell>
      <SectionShell eyebrow="Quality & Certifications" title="Process inspection and certification-backed trust">
        <QualityPreview />
      </SectionShell>
      <SectionShell eyebrow="FAQ" title="B2B purchasing questions before sending an inquiry">
        <FaqPreview />
      </SectionShell>
      <section className="motion-section px-5 pb-20 sm:px-8">
        <div className="motion-card mx-auto max-w-7xl border-l-4 border-brand-red bg-[#161616] p-10 text-white shadow-glow sm:p-14">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Tell us the model number, application, quantity, and custom requirements.</h2>
          <p className="mt-4 max-w-2xl text-white/85">Zijin Electronics will review your product model, drawing, sample, quantity, and application requirements.</p>
          <InquiryCta label="Start an Inquiry" variant="light" className="mt-8" />
        </div>
      </section>
    </>
  )
}
