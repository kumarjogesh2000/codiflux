import { SITE } from './constants';

export interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  canonicalUrl?: string;
}

/**
 * Builds the full `<title>` tag string.
 * - Home page: "CodiFlux — Precision-Crafted Web Experiences"
 * - Inner pages: "About — CodiFlux"
 */
export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return `${SITE.name} — ${SITE.tagline}`;
  }
  return `${pageTitle} — ${SITE.name}`;
}

/**
 * Builds the canonical URL for a given page path.
 * @example buildCanonical('/about') → 'https://codiflux.dev/about'
 */
export function buildCanonical(path: string): string {
  const normalized = path === '/' ? '' : path.replace(/\/$/, '');
  return `${SITE.url}${normalized}`;
}

/**
 * Builds the absolute URL for an Open Graph image.
 * Falls back to the default OG image if none is provided.
 */
export function buildOGImage(ogImage?: string): string {
  const image = ogImage ?? '/og/og-default.png';
  // If already absolute, return as-is
  if (image.startsWith('http')) return image;
  return `${SITE.url}${image}`;
}
