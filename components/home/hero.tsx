import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts } from '@/lib/site-data'

export function Hero() {
  const [connector05, connector10, connector125] = featuredProducts

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2rem] border border-[#cbdce9] bg-[#f4f9fc] shadow-[0_28px_90px_rgba(17,69,111,0.12)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_44%,rgba(219,239,249,0.42)_100%)]" />
        <div className="relative grid min-h-[650px] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-brand-blue">
              <span className="h-px w-10 bg-brand-blue" />
              Connector engineering series
            </div>

            <h1 className="mt-7 max-w-xl text-[2.25rem] font-semibold leading-[0.96] tracking-[-0.055em] text-ink sm:text-6xl xl:text-[4.15rem]">
              <span className="block whitespace-nowrap">Three pitches.</span>
              <span className="block whitespace-nowrap">Built to connect.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              FPC, FFC and wafer connectors for compact electronics, appliance controls and precision assemblies.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <InquiryCta label="Send Project Inquiry" />
              <Link
                href="/products/category/pitch-connectors"
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-blue/30 bg-white px-6 text-sm font-bold text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue active:translate-y-px"
              >
                View Connector Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-[#c7d9e6] py-4">
              {[
                ['03', 'Pitch options'],
                ['FPC / FFC', 'Flexible circuit'],
                ['Wafer', 'Wire-to-board']
              ].map(([value, label], index) => (
                <div key={label} className={`min-w-0 px-3 first:pl-0 last:pr-0 ${index ? 'border-l border-[#c7d9e6]' : ''}`}>
                  <p className="text-sm font-black text-ink sm:text-base">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden border-t border-[#c7d9e6] bg-[#e9f4f9] lg:min-h-full lg:border-l lg:border-t-0">
            <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(19,99,157,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(19,99,157,0.1)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(11,111,185,0.2),transparent_68%)]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-white/80 to-transparent" />

            <div className="relative z-10 flex h-full min-h-[500px] flex-col px-6 py-7 sm:px-10 sm:py-8 lg:min-h-[650px] xl:px-14">
              <div className="flex flex-col items-start gap-2 border-b border-brand-blue/20 pb-4 text-[10px] font-black uppercase tracking-[0.18em] text-brand-blue sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-xs">
                <span>Technical product range</span>
                <span className="text-slate-500">0.5 / 1.0 / 1.25 mm pitch</span>
              </div>

              <Link
                href={`/products/${connector05.slug}`}
                aria-label={`View ${connector05.model}`}
                className="group relative mx-auto mt-5 flex w-full max-w-3xl flex-1 items-center justify-center active:translate-y-px"
              >
                <span className="absolute left-0 top-3 z-20 max-w-36 border-l-2 border-brand-blue pl-3 sm:left-3 sm:max-w-48">
                  <span className="block text-xs font-black uppercase tracking-[0.16em] text-brand-blue">Primary series</span>
                  <span className="mt-1 block text-lg font-black text-ink sm:text-xl">0.5mm FPC / FFC</span>
                </span>
                <img
                  src={connector05.image}
                  alt={connector05.model}
                  className="mt-10 w-[70%] max-w-[560px] mix-blend-multiply object-contain transition duration-500 group-hover:scale-[1.025] sm:w-[64%]"
                />
              </Link>

              <div className="grid grid-cols-2 border-t border-brand-blue/20">
                {[connector10, connector125].map((product, index) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.model}`}
                    className={`group grid min-h-32 grid-cols-[1fr] items-center gap-2 py-3 active:translate-y-px sm:grid-cols-[1.15fr_.85fr] ${index ? 'border-l border-brand-blue/20 pl-4 sm:pl-6' : 'pr-4 sm:pr-6'}`}
                  >
                    <img src={product.image} alt={product.model} className="h-20 w-full mix-blend-multiply object-contain transition duration-500 group-hover:scale-105 sm:h-24" />
                    <span>
                      <span className="block text-lg font-black text-ink sm:text-2xl">{product.model.split(' Pitch')[0]}</span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
                        {index ? 'Wafer connector' : 'FPC / FFC connector'}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
