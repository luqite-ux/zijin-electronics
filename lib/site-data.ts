import { Cable, Factory, Layers3, PlugZap, ShieldCheck, SlidersHorizontal, Sparkles, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import catalog from './products-data.json'

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
  'range-hood-switches': {
    eyebrow: 'Featured appliance switch line',
    summary: 'Range hood switch assemblies and direct-key switch models for kitchen appliance manufacturers.',
    icon: SlidersHorizontal
  },
  'direct-key-switches': {
    eyebrow: 'Direct key switch systems',
    summary: 'Direct key switch models for appliance panels that need clear tactile operation and custom assembly support.',
    icon: SlidersHorizontal
  },
  'key-caps': {
    eyebrow: 'Interface components',
    summary: 'Key caps and illuminated key-cap options for matched appliance control-panel designs.',
    icon: Layers3
  },
  'usb-connectors': {
    eyebrow: 'Connector solutions',
    summary: 'USB connector models for electronics, home appliance, and precision equipment projects.',
    icon: PlugZap
  },
  'fpc-ffc-connectors': {
    eyebrow: 'Flexible circuit connection',
    summary: 'FPC and FFC connector models for compact electronic assemblies and equipment interfaces.',
    icon: Cable
  }
}

const defaultCategoryMeta = {
  eyebrow: 'Catalog product series',
  summary: 'Switch and connector models selected from Zijin Electronics original product catalog for B2B project inquiries.',
  icon: Zap
}

export const siteInfo = {
  brand: 'Zijin Electronics',
  company: 'Yueqing Zijin Electronics Co., Ltd.',
  adminDisplayName: '乐清市紫金电子有限公司',
  tagline: 'Custom Switches, Key Caps & Connectors for Global Appliance Manufacturers',
  description:
    'Yueqing Zijin Electronics manufactures direct key switches, range hood switches, door lock switches, key caps, and connector components for appliance, audio-visual, medical equipment, and precision instrument projects.',
  phone: '+86 138 1976 1299',
  email: '734925868@qq.com',
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
  { value: '30,000/day', label: 'Key Cap Capacity' },
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

export const featuredProducts = products.filter((product) => product.categorySlug === 'range-hood-switches').slice(0, 8)

export const solutions = [
  {
    title: 'Home Appliance Switches',
    text: 'Switch assemblies for range hoods, door locks, power controls, tactile controls, and custom appliance panels.',
    icon: SlidersHorizontal
  },
  {
    title: 'Key Caps & Interface Parts',
    text: 'Key caps and illuminated key-cap solutions for appliance interface styling and model matching.',
    icon: Layers3
  },
  {
    title: 'Connector Components',
    text: 'USB, BTB, SD/SIM, FPC/FFC, wafer, HDMI, and quick terminal connector categories for precision electronics.',
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
  'Daily capacity: 10,000 direct key switches',
  'Daily capacity: 30,000 key caps',
  'Daily capacity: 8,000 hair dryer / door lock switch units',
  'Daily capacity: 30,000 connector components',
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
    answer: 'The website includes switch, key cap, and connector models from Zijin Electronics original product catalog. Buyers can send the model number or application requirement for selection support.'
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
