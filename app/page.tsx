import { Hero } from '@/components/home/hero'
import { ApplicationScenarios } from '@/components/home/application-scenarios'
import { FaqPreview } from '@/components/home/faq-preview'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ManufacturingPreview } from '@/components/home/manufacturing-preview'
import { ProductSeries } from '@/components/home/product-series'
import { QualityPreview } from '@/components/home/quality-preview'
import { InquiryCta } from '@/components/inquiry-cta'
import { SectionShell } from '@/components/section-shell'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="priority-products">
        <SectionShell eyebrow="Priority Product Families" title="Three priority product families" text="Explore piano chain switches, keycaps, and direct key switches, then send your drawing, sample, or application requirements through the inquiry form.">
          <ProductSeries />
        </SectionShell>
      </div>
      <SectionShell eyebrow="Featured Products" title="Switches and keycaps selected for your project" text="Start with the three priority product families. Every product detail page leads to technical inquiry.">
        <FeaturedProducts />
      </SectionShell>
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
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-brand-blue via-[#1d83d4] to-brand-green p-10 text-white shadow-glow">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Tell us the model number, application, quantity, and custom requirements.</h2>
          <p className="mt-4 max-w-2xl text-white/85">Zijin Electronics will review your product model, drawing, sample, quantity, and application requirements.</p>
          <InquiryCta label="Start an Inquiry" variant="light" className="mt-8" />
        </div>
      </section>
    </>
  )
}
