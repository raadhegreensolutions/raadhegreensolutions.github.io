import {
  Leaf,
  Recycle,
  Truck,
  Building2,
  Sprout,
  LineChart,
  Factory,
  ShieldCheck,
  Users,
  Globe2,
  Award,
  Zap,
  HeartHandshake,
  Target,
} from 'lucide-react'

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Impact', href: '#impact' },
  { label: 'Projects', href: '#projects' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

export const aboutStats = [
  { value: 1, suffix: '+', label: 'Year of Excellence' },
  { value: 18, suffix: '+', label: 'Clients Served' },
  { value: 12, suffix: '+', label: 'Projects Delivered' },
  { value: 850, suffix: 'T', label: 'Tons Diverted' },
]

export const services = [
  {
    id: 'solid-waste',
    title: 'Solid Waste Collection',
    description:
      'End-to-end municipal and commercial collection with route optimization and digital tracking.',
    icon: Truck,
    span: 'md:col-span-2',
    sub: ['Door-to-door collection', 'Commercial pickup', 'GPS fleet tracking', 'Waste audit reports'],
  },
  {
    id: 'mrf',
    title: 'Material Recovery (MRF)',
    description: 'High-throughput sorting facilities recovering recyclables at scale.',
    icon: Recycle,
    span: '',
    sub: ['Optical sorting', 'Baler & compaction', 'Quality grading', 'Buy-back programs'],
  },
  {
    id: 'cd-waste',
    title: 'C&D Waste',
    description: 'Construction & demolition debris processing for circular reuse.',
    icon: Building2,
    span: '',
    sub: ['Debris crushers', 'Aggregate recovery', 'On-site sorting', 'Compliance docs'],
  },
  {
    id: 'recycling',
    title: 'Recycling Solutions',
    description: 'Closed-loop recycling for plastics, metals, paper, and e-waste streams.',
    icon: Leaf,
    span: '',
    sub: ['Plastic pelletizing', 'Metal scrap processing', 'Paper & cardboard', 'E-waste dismantling'],
  },
  {
    id: 'composting',
    title: 'Organic Composting',
    description: 'Turning food and garden waste into nutrient-rich compost and biogas.',
    icon: Sprout,
    span: '',
    sub: ['In-vessel composting', 'Windrow systems', 'Biogas recovery', 'Soil amendments'],
  },
  {
    id: 'esg',
    title: 'Corporate ESG Consulting',
    description: 'Strategy, reporting, and roadmaps aligned with global ESG frameworks.',
    icon: LineChart,
    span: 'md:col-span-2',
    sub: ['ESG gap analysis', 'BRSR & GRI reporting', 'Net-zero roadmaps', 'Stakeholder engagement'],
  },
  {
    id: 'industrial',
    title: 'Industrial Waste Solutions',
    description: 'Hazardous and non-hazardous industrial streams under full regulatory compliance.',
    icon: Factory,
    span: 'md:col-span-3 lg:col-span-3',
    sub: ['Hazardous waste logistics', 'ETP sludge handling', 'Zero-liquid discharge', 'Extended producer responsibility'],
  },
]

export const processSteps = [
  {
    title: 'Collect',
    description: 'Smart logistics gather waste streams from municipalities, campuses, and industry.',
  },
  {
    title: 'Segregate',
    description: 'Advanced MRF lines separate recyclables, organics, and residuals with precision.',
  },
  {
    title: 'Recycle',
    description: 'Materials are cleaned, processed, and converted into market-ready secondary resources.',
  },
  {
    title: 'Recover',
    description: 'Energy, compost, and value products re-enter the circular economy — closing the loop.',
  },
]

export const industries = [
  { name: 'Municipalities', icon: Globe2 },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Real Estate', icon: Building2 },
  { name: 'Hospitality', icon: HeartHandshake },
  { name: 'Healthcare', icon: ShieldCheck },
  { name: 'Education', icon: Users },
  { name: 'Retail & Malls', icon: Award },
  { name: 'IT Parks', icon: Zap },
  { name: 'Airports', icon: Target },
  { name: 'Logistics', icon: Truck },
]

export const impactMetrics = [
  { label: 'Landfill Diversion', value: 72, unit: '%' },
  { label: 'Recycling Rate', value: 58, unit: '%' },
  { label: 'Carbon Avoided', value: 12, unit: 'T' },
  { label: 'Water Saved', value: 45, unit: '%' },
]

export const whyUs = [
  {
    title: 'Integrated Operations',
    description: 'One partner from collection to recovery — no fragmentation, zero finger-pointing.',
    icon: Target,
  },
  {
    title: 'Regulatory Mastery',
    description: 'Deep expertise in CPCB, SPCB, and EPR frameworks keeps you fully compliant.',
    icon: ShieldCheck,
  },
  {
    title: 'Tech-Enabled Tracking',
    description: 'Live dashboards, QR manifests, and IoT weighbridges for total transparency.',
    icon: Zap,
  },
  {
    title: 'ESG-Ready Reporting',
    description: 'Audit-grade data that plugs directly into your sustainability disclosures.',
    icon: LineChart,
  },
  {
    title: 'Skilled Workforce',
    description: 'Trained operators, environmental engineers, and on-ground response teams.',
    icon: Users,
  },
  {
    title: 'Circular Impact',
    description: 'Measurable diversion, emissions reduction, and community livelihood creation.',
    icon: Leaf,
  },
]

export const projects = [
  {
    title: 'Smart City MRF Hub',
    location: 'Ahmedabad',
    result: '180 TPD recovered',
    tag: 'Municipal',
    gradient: 'from-primary/80 to-trust/80',
  },
  {
    title: 'Industrial EPR Program',
    location: 'Vadodara',
    result: '100% plastic compliance',
    tag: 'Manufacturing',
    gradient: 'from-forest to-primary/70',
  },
  {
    title: 'Campus Zero-Waste',
    location: 'Gandhinagar',
    result: '94% diversion rate',
    tag: 'Institutional',
    gradient: 'from-trust/90 to-forest',
  },
  {
    title: 'C&D Recovery Plant',
    location: 'Surat',
    result: '50K m³ reused',
    tag: 'Infrastructure',
    gradient: 'from-primary to-charcoal',
  },
  {
    title: 'Hotel Organic Loop',
    location: 'Udaipur',
    result: '12T compost/mo',
    tag: 'Hospitality',
    gradient: 'from-forest/90 to-trust/70',
  },
]

export const testimonials = [
  {
    quote:
      'Raadhe Green turned our waste streams into a measurable ESG asset. Their MRF integration cut our landfill costs by nearly half.',
    name: 'Priya Mehta',
    role: 'Sustainability Head, MetroInfra Ltd.',
  },
  {
    quote:
      'From collection logistics to compliance paperwork, the team operates with precision. Truly a premium waste partner.',
    name: 'Arjun Shah',
    role: 'Plant Director, ChemTech Industries',
  },
  {
    quote:
      'Their composting program for our campus delivered visible soil health gains — and students love the circular storytelling.',
    name: 'Dr. Neha Kapoor',
    role: 'Dean of Operations, GreenField University',
  },
]

export const contactInfo = {
  email: 'vishaldhatrak11@gmail.com',
  phone: '+91 7350291173',
  address: 'Nashik',
  /** Digits only for wa.me links */
  whatsapp: '917350291173',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Nashik,Maharashtra,India&z=12&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Nashik,Maharashtra,India',
}

export const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
  'Hi Raadhe Green Solutions, I would like to know more about your services.',
)}`
