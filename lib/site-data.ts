import { Cable, Factory, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import catalog from './products-data.json'
import { selectHomeFeaturedProducts } from './home-featured-products'

export type Localized = { en: string }

export type ProductCategory = {
  id: string
  slug: string
  name: string
  sourceName: string
  count: number
  eyebrow: string
  summary: Localized
  applications: string[]
  capabilities: string[]
  icon: LucideIcon
}

export type Product = {
  id: string
  slug: string
  model: string
  categorySlug: string
  categoryName: string
  image: string
  sourceUrl: string
  summary: string
  applications: string[]
  features: string[]
}

const categoryMeta: Record<string, { eyebrow: string; summary: string; icon: LucideIcon }> = {
  'piano-chain-switches': {
    eyebrow: 'Priority product family',
    summary: 'Piano chain switch series from the customer’s original product catalog.',
    icon: Zap
  },
  keycaps: {
    eyebrow: 'Priority product family',
    summary: 'Keycap series from the customer’s original product catalog.',
    icon: Sparkles
  },
  'direct-key-switches': {
    eyebrow: 'Priority product family',
    summary: 'Direct key switch series from the customer’s original product catalog.',
    icon: Cable
  }
}

const defaultCategoryMeta = {
  eyebrow: 'Catalog product series',
  summary: 'Product series selected from the customer-supplied product catalog for B2B project inquiries.',
  icon: Zap
}

export const siteInfo = {
  brand: 'Zijin Electronics',
  company: 'Yueqing Zijin Electronics Co., Ltd.',
  adminDisplayName: '乐清市紫金电子有限公司',
  tagline: 'Piano Chain Switches, Keycaps & Direct Key Switches',
  description:
    'Yueqing Zijin Electronics presents piano chain switches, keycaps, and direct key switches for appliance and electronic control projects.',
  phone: '+86 138 1976 1299',
  email: 'info@zijinglobal.com',
  address: 'No.175 Fanxing Road, Shifan Street, Yueqing, Zhejiang, China',
  logo: '/images/logo.png',
  logoMark: '/images/logo.png',
  founded: '2007',
  default_language: 'en',
  supported_languages: ['en']
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Quality & Certifications', href: '/quality' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
]

export const stats = [
  { value: '2007', label: 'Established' },
  { value: '2,200 m2', label: 'Factory Area' },
  { value: '12', label: 'Workshops' },
  { value: '4', label: 'Production Lines' },
  { value: '3', label: 'Priority Product Families' },
  { value: '15 days', label: 'Regular Lead Time' }
]

export const productCategories: ProductCategory[] = catalog.categories.map((category) => {
  const meta = categoryMeta[category.slug] || defaultCategoryMeta
  return {
    ...category,
    eyebrow: meta.eyebrow,
    summary: { en: meta.summary },
    applications: ['Home appliances', 'Audio-visual products', 'Medical equipment', 'Precision instruments'],
    capabilities: ['OEM / ODM customization', 'Sample support', 'Model-based selection', 'B2B inquiry workflow'],
    icon: meta.icon
  }
})

export const products: Product[] = catalog.products

export const featuredProducts = selectHomeFeaturedProducts(products)

export const solutions = [
  {
    title: 'Piano Chain Switches',
    text: 'A priority product family from Zijin Electronics’ original catalog.',
    icon: Zap
  },
  {
    title: 'Keycaps',
    text: 'A priority product family from Zijin Electronics’ original catalog.',
    icon: Sparkles
  },
  {
    title: 'Direct Key Switches',
    text: 'A priority product family from Zijin Electronics’ original catalog.',
    icon: Cable
  },
  {
    title: 'Custom Production',
    text: 'Project review, samples, model matching, and production coordination for OEM and ODM customers.',
    icon: Factory
  }
]

export const manufacturingFacts = [
  '2,200 m2 production site with 12 workshops and 4 production lines',
  'Current public catalog includes piano chain switches, keycaps, and direct key switches',
  'Regular order lead time is about 15 days after confirmed requirements'
]

export const workflow = [
  'Requirement Review',
  'Model Selection',
  'Sample Confirmation',
  'Custom Production',
  'Outgoing Inspection',
  'Export Inquiry Support'
]

export const faqs = [
  {
    question: 'What product models are available?',
    answer: 'The current website highlights piano chain switches, keycaps, and direct key switches. Buyers can send the model, application, drawing, or sample requirement for review.'
  },
  {
    question: 'Do you support customized size, material, color, or process?',
    answer: 'Yes. Custom production is supported according to confirmed drawings, samples, application requirements, and order scope.'
  },
  {
    question: 'Can you provide samples?',
    answer: 'Samples can be arranged for suitable projects. Sample cost and timing depend on product value, model availability, and custom requirements.'
  },
  {
    question: 'What applications are your products suitable for?',
    answer: 'Products are mainly used in audio-visual products, home appliances, medical equipment, and other precision instruments.'
  },
  {
    question: 'Do you support OEM / ODM services?',
    answer: 'Yes. Zijin Electronics supports OEM and ODM cooperation for model selection, customization, sample confirmation, and production.'
  },
  {
    question: 'What is the MOQ?',
    answer: 'Reference MOQ is 10 pieces for large items and 10,000 pieces for small components. Final MOQ depends on model, customization scope, and production arrangement.'
  },
  {
    question: 'Can you provide production progress updates?',
    answer: 'Yes. Production progress can be communicated during confirmed projects.'
  }
]

export const qualitySteps = [
  'Requirement and drawing review',
  'Material and model confirmation',
  'In-process production checks',
  'Function and appearance inspection',
  'Outgoing inspection before shipment'
]

export const forbiddenTermsNote = 'Public copy uses inspection, testing, and agreed specifications only.'
