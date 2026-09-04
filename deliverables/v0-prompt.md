# Zijin Electronics v0 redesign prompt

Create a complete, production-quality English B2B inquiry website for 乐清市紫金电子有限公司, marketed as **Zijin Electronics / ZHIJIN**. This is a full visual redesign of an existing customer site whose current pale-blue card layout was explicitly rejected. Preserve the real information architecture and product truth, but establish a distinctive red, black and warm-white precision-electronics identity.

## Customer facts

- Established in 2007; 2,200 m² production site; 12 workshops; 4 production lines.
- Products: piano-chain switches, range-hood switches, direct-key switches, keycaps and connectors. The full production catalog is supplied later by Codex; uploaded product images are representative samples only.
- Verified daily capacities: direct-key switches 10,000; keycaps 300,000; hair-dryer/door-lock switches 8,000; connectors 30,000. Regular lead time is 15 days.
- Applications: audio-visual products, household appliances, medical equipment and precision instruments.
- Contact: +86 138 1976 1299; 734925868@qq.com; No. 175 Fanxing Road, Shifan Subdistrict, Yueqing, Zhejiang, China.
- Custom production, samples, OEM/ODM and model selection are supported. Do not display prices, cart, checkout or payment.
- Do not invent equipment, customers, countries, certificates, specifications or guarantees. Never use warranty/guarantee wording.

## Assets

- Use the official horizontal ZHIJIN logo in header and footer without crop or distortion.
- Use the square logo source to create a customer-specific favicon; remove every v0/Next.js/template icon candidate.
- Use all three supplied wide Banner images as full-bleed visual assets with real DOM copy and CTA. They are marketing composites based on customer products, not claims about a specific model or factory.
- Use supplied product samples to design expandable product-list and product-detail templates. Do not infer the full catalog count from samples.
- Never use `一方简介.pdf`; it belongs to another company.

## Visual system

- Aesthetic: high-precision industrial editorial, red/black brand signature, warm white content surfaces, crisp typography, restrained metallic texture.
- Avoid generic blue technology gradients, equal three-card grids as the dominant visual language, oversized rounded empty boxes, floating photo cards, white product frames inside white modules, fake dashboards and decorative particles.
- Use a single consistent radius system: 2–4 px for controls/cards, 0–8 px for large media. Buttons may be compact rounded rectangles, not pills.
- Hero must fit the first viewport: headline no more than two lines, supporting text no more than four lines, CTA visible. Use one full-bleed Banner state at a time with a dark left-side overlay for text and the protected product focal point on the right.
- Product imagery must remain complete and use `object-contain` on a continuous neutral product stage.
- Use at least four distinct section layouts across the homepage: full-bleed carousel, horizontal product-family rail, editorial capability split, data band, qualification strip, compact FAQ and conversion footer.

## Required routes

- `/` Home with three-state Banner carousel and explicit manual controls.
- `/products` searchable/filterable product catalog.
- `/products/category/[slug]` category pages.
- `/products/[slug]` independent product details and inquiry CTA.
- `/about`, `/manufacturing`, `/quality`, `/faq`, `/news`, `/news/[slug]`, `/contact`.
- Explicit Home navigation; clickable logo returns home.
- News has an honest empty state until real articles exist.

## Inquiry and data boundaries

- Contact/RFQ form UI includes name, company, email, phone/WhatsApp, product/model, requirements and message, plus loading/success/error states. Do not simulate submission with alert, console logging or timers. Backend/Supabase integration is done by Codex after source handoff.
- Build product and content types with locale-aware fields and request-language → English → first-nonempty fallback, while launching English only.

## Motion plan

- Hero content reads in with a restrained 70 ms stagger; never delay the first CTA.
- Product rail uses a horizontal mask reveal; mobile uses fade only.
- Every repeated card collection gets a one-time viewport stagger; first and last cards must animate without remaining hidden.
- Hover/focus lifts cards 4 px and shifts CTA arrows 3 px; touch content remains fully readable.
- Under `prefers-reduced-motion`, remove transforms, stagger and autoplay; render all content immediately.

## Technical output

Output a complete Next.js 16 App Router project with TypeScript and Tailwind. Keep content rendering in Server Components and isolate carousel/motion/form interactions in small Client Components with cleanup. Ensure keyboard/focus states, 44 px touch targets, accessible carousel controls, no horizontal overflow at 390 px, and responsive image sizing. Use real DOM text, never text baked into Banner images.

