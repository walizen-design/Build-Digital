import { Project, PricingPlan } from './types';

export const SERVICES = [
  {
    id: 'strategy',
    icon: 'Compass',
    title: 'Brand Strategy',
    description: 'We align corporate goals with human-centric insights to discover your unique competitive positioning.',
    details: [
      'Competitive & Market Analysis',
      'Value Proposition Architecture',
      'User Persona Mapping',
      'Scalable Brand Voice & Messaging'
    ]
  },
  {
    id: 'design',
    icon: 'Layers',
    title: 'Experience Design',
    description: 'Crafting visually immersive, highly interactive, and intuitive UI/UX journeys that feel like second nature.',
    details: [
      'Figma Web & Mobile Architecture',
      'Scalable Design System Tokens',
      'Interactive Prototypes & Motion Choreography',
      'Accessibility (WCAG) Audits'
    ]
  },
  {
    id: 'tech',
    icon: 'Cpu',
    title: 'Creative Technology',
    description: 'Bridging design and production-ready code with responsive, edge-optimized, and lightning-fast web applications.',
    details: [
      'Full-Stack React & Vite Frameworks',
      'Complex Real-Time Data & WebSockets',
      'Smooth Motion & Spatial Animations',
      'Cloud Architecture & CDN Optimization'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'aura',
    title: 'AURA: Immersive Sensory Portal',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    description: 'A spatial brand identity and fluid UI/UX ecosystem syncing visual rhythm with ambient soundscapes.',
    longDescription: 'AURA is an award-winning interactive installation and digital interface designed to bridge human emotion with real-time sensory sound. We blended cutting-edge graphics with audio-reactive styling to establish an immersive visual journey that set a new standard for luxury spatial brand experiences.',
    client: 'Aura Labs Inc',
    duration: '4 Months',
    role: 'Lead Art Direction & WebGL Engineering',
    metrics: [
      '+140% Interactive Session Time',
      'Red Dot Design Award Winner 2025',
      '98% User Immersion Satisfaction Index'
    ]
  },
  {
    id: 'synthetix',
    title: 'SYNTHETIX: Generative AI System',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    description: 'Establishing the core positioning and scalable design token structure for a next-generation neural engine.',
    longDescription: 'SYNTHETIX is the premiere infrastructure for generative design models. We worked with their executive team to craft a comprehensive visual-strategic framework, including an auto-adapting design system with tokenized states, creating a highly technical yet deeply human-centric brand.',
    client: 'Synthetix AI Group',
    duration: '6 Months',
    role: 'Product Strategy & Scalable Design Tokens',
    metrics: [
      'Deployed across 40+ micro-apps',
      '$12M Series A Funding Support',
      'Unified 5 Independent Developer Teams'
    ]
  },
  {
    id: 'volta',
    title: 'VOLTA: Smart Charging Telemetry',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    description: 'A lightning-fast, edge-computed mobile control system and visual telemetry dashboard for EV fleets.',
    longDescription: 'VOLTA redefined smart charging by combining complex physical grid telemetry with an ultra-responsive client-side react app. Using edge-computing protocols and smooth canvas animations, the platform empowers commercial operators to optimize power allocation seamlessly on the go.',
    client: 'Voltaic Systems',
    duration: '5 Months',
    role: 'Full Stack Engineering & WebGL Telemetry',
    metrics: [
      '0.08s Real-Time State Latency',
      'Optimized 140k daily charge sessions',
      'Reduced system energy waste by 18%'
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Product Launch',
    price: 3500,
    period: 'month',
    description: 'Perfect for startups looking to validate and launch their initial concept with elite styling.',
    features: [
      '1 Dedicated Designer & Developer',
      'High-Fidelity Figma Prototype',
      'Modern Single-Page React App',
      'Foundational Brand Identity Design',
      'Weekly Interactive Reviews',
      'Slack Team Communication Channel'
    ]
  },
  {
    id: 'growth',
    name: 'Scale & Capture',
    price: 6800,
    period: 'month',
    description: 'For growing businesses demanding bespoke, highly-animated experiences that drive customer acquisition.',
    features: [
      '2 Dedicated Designers & 1 Creative Engineer',
      'Full-Scale Custom Web/Mobile Application',
      'Advanced Motion & Micro-Animations',
      'Performance, SEO, & Conversion Optimization',
      'Dedicated Strategy & Value Mapping',
      'Unlimited Revisions & Priority Turnaround',
      'Daily Sync Standups & Priority Slack Access'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Continuous Innovation',
    price: 12500,
    period: 'month',
    description: 'Continuous strategic, design, and engineering design-on-demand for mature product orgs.',
    features: [
      'Full Agile Product Team Integration',
      'Enterprise-Grade API & Custom Backend Architecture',
      'Custom Design System & Brand Token Governance',
      'Dedicated Product Manager & Engineering Lead',
      '24/7 Priority Urgent Call Support',
      'On-Demand Dedicated Strategy Offsites',
      'Comprehensive Security & Scalability Guarantee'
    ]
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM'
];
