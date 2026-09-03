import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="relative mx-auto overflow-hidden rounded-[2rem] border border-[#c7dced] bg-[radial-gradient(circle_at_82%_12%,#d8efff_0%,transparent_27%),linear-gradient(135deg,#f9fcff_0%,#edf7ff_48%,#e9f7f1_100%)] shadow-[0_28px_90px_rgba(17,69,111,0.14)]">
        <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-8 lg:px-16 lg:py-16 xl:px-20">
          <div className="relative z-10 max-w-[650px]">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-blue sm:text-xs">
              <span className="h-px w-9 bg-brand-blue" />
              Zijin Electronics
            </p>
            <h1 className="mt-6 max-w-[11ch] text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.25rem]">
              Switch &amp; Keycap Solutions.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-700 sm:text-lg">
              Explore our priority product families: piano chain switches, keycaps, and direct key switches for appliance and electronic control applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InquiryCta label="Send Project Inquiry" />
              <Link href="#priority-products" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-blue/35 bg-white/90 px-6 text-sm font-bold text-ink shadow-[0_12px_30px_rgba(17,69,111,0.12)] backdrop-blur transition hover:border-brand-blue hover:text-brand-blue active:translate-y-px">
                View Priority Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {featuredProducts.map((product, index) => (
              <Link key={product.slug} href={`/products/${product.slug}`} aria-label={`View ${product.model}`} className={`group relative overflow-hidden rounded-[1.5rem] border border-white/90 bg-white/85 shadow-[0_18px_35px_rgba(17,69,111,0.12)] transition hover:-translate-y-1 hover:shadow-glow ${index === 1 ? 'mt-8 sm:mt-12' : ''}`}>
                <span className="relative block aspect-[0.78] overflow-hidden bg-white">
                  <Image src={product.image} alt={product.model} fill priority={index === 0} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 27vw, 30vw" className="object-contain p-2 transition duration-500 group-hover:scale-105" />
                </span>
                <span className="block px-3 py-3 text-center text-xs font-black leading-tight text-ink sm:px-4 sm:text-sm">{product.model}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
