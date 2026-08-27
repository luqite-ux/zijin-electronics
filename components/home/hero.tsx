import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts } from '@/lib/site-data'

const productHotspots = [
  {
    className: 'left-[12%] top-[57%] h-[18%] w-[76%] sm:left-[54%] sm:top-[50%] sm:h-[20%] sm:w-[34%]',
    labelClassName: 'right-[4%]',
  },
  {
    className: 'left-[1%] top-[77%] h-[17%] w-[47%] sm:left-[54%] sm:top-[78%] sm:h-[17%] sm:w-[18%]',
    labelClassName: 'left-[3%]',
  },
  {
    className: 'right-[1%] top-[77%] h-[17%] w-[47%] sm:right-[2%] sm:top-[78%] sm:h-[17%] sm:w-[22%]',
    labelClassName: 'right-[3%]',
  },
]

export function Hero() {
  const heroProducts = featuredProducts.slice(0, 3)

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="relative mx-auto min-h-[760px] max-w-[1680px] overflow-hidden rounded-[2rem] border border-[#c7dced] bg-[#eff8ff] shadow-[0_28px_90px_rgba(17,69,111,0.14)] sm:min-h-[720px] lg:min-h-[680px]">
        <Image
          src="/images/hero/zijin-products-on-stage-mobile-v3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />
        <Image
          src="/images/hero/zijin-products-on-stage-v3.png"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 100vw, 0px"
          className="hidden object-cover object-center sm:block"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_38%,rgba(255,255,255,0.08)_67%,transparent_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.93)_34%,rgba(255,255,255,0.18)_58%,transparent_78%)]" />

        <div className="relative z-30 max-w-[690px] px-6 pb-8 pt-10 sm:px-10 sm:pt-14 lg:px-16 lg:pt-16 xl:px-20">
          <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-blue sm:text-xs">
            <span className="h-px w-9 bg-brand-blue" />
            Zijin connector solutions
          </p>
          <h1 className="mt-6 max-w-[11ch] text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.25rem]">
            <span className="block whitespace-nowrap">Three pitches.</span>
            <span className="block whitespace-nowrap">One range.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-700 sm:text-lg">
            0.5mm and 1.0mm FPC / FFC connectors, plus a 1.25mm wafer connector for compact electronic assemblies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <InquiryCta label="Send Project Inquiry" />
            <Link
              href="/products/category/pitch-connectors"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-blue/35 bg-white/90 px-6 text-sm font-bold text-ink shadow-[0_12px_30px_rgba(17,69,111,0.12)] backdrop-blur transition hover:border-brand-blue hover:text-brand-blue active:translate-y-px"
            >
              View Connector Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 z-20">
          {heroProducts.map((product, index) => {
            const position = productHotspots[index]
            const pitch = product.model.split(' Pitch')[0]

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                aria-label={`View ${product.model}`}
                className={`group absolute rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${position.className}`}
              >
                <span className={`absolute bottom-0 z-20 hidden text-xl font-black text-ink transition group-hover:text-brand-blue sm:block lg:text-2xl ${position.labelClassName}`}>
                  {pitch}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
