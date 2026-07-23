import type { NavItem, NavGroup, Service } from '@/types';

// ─── Site Identity ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'CodiFlux',
  tagline: 'Precision-Crafted Web Experiences',
  description:
    'CodiFlux is a professional web development agency specializing in WordPress, Shopify, Wix, and React. We build fast, accessible, and conversion-focused websites.',
  url: 'https://codiflux.dev',
  email: 'hello@codiflux.dev',
  /** Owner / founder name — used in structured data */
  author: 'CodiFlux',
  /** Twitter/X handle without the @ */
  twitterHandle: 'codiflux',
} as const;

// ─── Navigation ────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV: NavGroup[] = [
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Work',
    items: [
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

// ─── Social Links ──────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: NavItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/codiflux',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/codiflux',
    external: true,
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/codiflux',
    external: true,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description:
      'Custom themes, plugins, and full-site editing solutions built for performance, security, and editorial flexibility.',
    icon: 'wordpress',
    platforms: ['WordPress', 'WooCommerce', 'Elementor', 'ACF'],
    featured: true,
  },
  {
    id: 'shopify',
    title: 'Shopify Development',
    description:
      'Conversion-optimized storefronts, custom Liquid themes, and app integrations that turn browsers into buyers.',
    icon: 'shopify',
    platforms: ['Shopify', 'Shopify Plus', 'Liquid', 'Hydrogen'],
    featured: true,
  },
  {
    id: 'wix',
    title: 'Wix & Wix Studio',
    description:
      'Professional Wix and Wix Studio builds with Velo code, custom animations, and CMS-driven content.',
    icon: 'wix',
    platforms: ['Wix', 'Wix Studio', 'Velo'],
    featured: true,
  },
  {
    id: 'squarespace',
    title: 'Squarespace Development',
    description:
      'Polished Squarespace sites with custom CSS injections, template customization, and Commerce integrations.',
    icon: 'squarespace',
    platforms: ['Squarespace', 'Squarespace Commerce'],
    featured: false,
  },
  {
    id: 'react',
    title: 'React Applications',
    description:
      'Fast, accessible, and maintainable web applications built with React and modern tooling.',
    icon: 'react',
    platforms: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
  },
  {
    id: 'custom',
    title: 'Custom Web Development',
    description:
      'Bespoke solutions when no platform fits. Full-stack builds tailored to your exact business needs.',
    icon: 'code',
    platforms: ['Node.js', 'Astro', 'Databases', 'APIs'],
    featured: false,
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We start with a focused conversation to understand your goals, audience, and requirements before writing a single line of code.',
  },
  {
    step: '02',
    title: 'Strategy & Design',
    description:
      'We plan the site architecture, map out user flows, and align on design direction — ensuring every decision serves a purpose.',
  },
  {
    step: '03',
    title: 'Development',
    description:
      'Clean, maintainable code built to modern standards. Fully responsive, accessible, and optimized for performance from day one.',
  },
  {
    step: '04',
    title: 'Review & Refine',
    description:
      'You get a staging environment to review the work. We iterate until everything is exactly right.',
  },
  {
    step: '05',
    title: 'Launch',
    description:
      'We handle the technical launch, DNS, and go-live checklist so you can focus on the milestone, not the mechanics.',
  },
  {
    step: '06',
    title: 'Support',
    description:
      'Post-launch support and maintenance available. Your site is never abandoned after the handoff.',
  },
] as const;
