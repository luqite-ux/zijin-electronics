import { InquiryCta } from '@/components/inquiry-cta'
import type { Product } from '@/lib/site-data'

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <aside className="glass rounded-[2rem] p-8">
            <div className="rounded-[1.5rem] border border-line bg-white p-6">
              <img src={product.image} alt={`${product.model} ${product.categoryName}`} className="h-80 w-full object-contain" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">{product.categoryName}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{product.model}</h1>
            <p className="mt-5 leading-8 text-muted">{product.summary}</p>
            <InquiryCta label="Request Samples / Project Review" className="mt-8" />
          </aside>
          <div className="space-y-6">
            {[
              ['Applications', product.applications],
              ['Model Advantages', product.features],
              ['Inquiry Notes', ['Send the model number, application, drawing requirements, estimated quantity, and target delivery schedule.', 'Commercial terms are confirmed after the project scope is reviewed.', 'OEM / ODM customization can be discussed according to samples, drawings, or application requirements.']]
            ].map(([title, items]) => (
              <section key={title as string} className="rounded-3xl border border-line bg-white p-7">
                <h2 className="text-2xl font-bold text-ink">{title as string}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(items as string[]).map((item) => (
                    <p key={item} className="rounded-2xl bg-brand-ice px-4 py-3 text-sm font-semibold text-ink">{item}</p>
                  ))}
                </div>
              </section>
            ))}
            <section className="rounded-3xl border border-line bg-gradient-to-br from-brand-ice to-white p-7">
              <h2 className="text-2xl font-bold text-ink">Need this model for your project?</h2>
              <p className="mt-4 leading-8 text-muted">Use the inquiry form to share your target application, drawing, material, color, process, MOQ, and sample request. Zijin Electronics will review the project scope and respond with suitable next steps.</p>
              <InquiryCta label="Send Inquiry" className="mt-6" />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
