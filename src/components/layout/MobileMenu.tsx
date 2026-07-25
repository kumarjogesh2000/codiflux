/**
 * MobileMenu.tsx — Animated slide-in mobile navigation drawer.
 *
 * Astro Island — hydrated with client:load in Header.astro.
 * Accepts navItems and currentPath as serialisable props from Astro.
 *
 * Features:
 * - Animated hamburger → X icon
 * - Right-side slide-in drawer with backdrop
 * - Body scroll lock when open
 * - ESC key to close
 * - ARIA attributes for accessibility
 * - Reduced-motion safe (CSS handles it via prefers-reduced-motion)
 */

import { useState, useEffect, useCallback } from 'react';

// Defined locally — keeps this island self-contained (no Astro imports in React)
interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MobileMenuProps {
  navItems:  NavItem[];
  currentPath: string;
  ctaHref?:  string;
  ctaLabel?: string;
}

export default function MobileMenu({
  navItems,
  currentPath,
  ctaHref  = '/contact',
  ctaLabel = 'Start a Project',
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  // ─── Styles ─────────────────────────────────────────────────────────────────

  const hamburgerBase =
    'block w-5 h-px rounded-full bg-current transition-all duration-300 ease-in-out';

  const line1 = isOpen
    ? `${hamburgerBase} rotate-45 translate-y-[7px]`
    : hamburgerBase;

  const line2 = isOpen
    ? `${hamburgerBase} opacity-0 scale-x-0`
    : hamburgerBase;

  const line3 = isOpen
    ? `${hamburgerBase} -rotate-45 -translate-y-[7px]`
    : hamburgerBase;

  const drawerClasses = [
    'fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw]',
    'flex flex-col',
    'bg-[var(--color-surface-raised)]',
    'border-l border-[var(--color-border-base)]',
    'transition-transform duration-300',
    isOpen ? 'translate-x-0' : 'translate-x-full',
  ].join(' ');

  const backdropClasses = [
    'fixed inset-0 z-40',
    'bg-black/60 backdrop-blur-sm',
    'transition-opacity duration-300',
    isOpen
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none',
  ].join(' ');

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="md:hidden">
      {/* Hamburger toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={[
          'flex flex-col items-center justify-center gap-[5px]',
          'w-9 h-9 rounded-md',
          'text-[var(--color-text-secondary)]',
          'hover:text-white hover:bg-white/5',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-brand-500',
        ].join(' ')}
      >
        <span className={line1} aria-hidden="true" />
        <span className={line2} aria-hidden="true" />
        <span className={line3} aria-hidden="true" />
      </button>

      {/* Backdrop overlay */}
      <div
        className={backdropClasses}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <nav
        id="mobile-nav-drawer"
        aria-label="Mobile navigation"
        className={drawerClasses}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
          <a
            href="/"
            onClick={close}
            className="text-lg font-bold tracking-tight"
            aria-label="CodiFlux — Go to homepage"
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600) 50%, var(--color-accent-500))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CodiFlux
            </span>
          </a>

          <button
            onClick={close}
            aria-label="Close navigation menu"
            className={[
              'flex items-center justify-center w-8 h-8 rounded-md',
              'text-[var(--color-text-tertiary)]',
              'hover:text-white hover:bg-white/5',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-brand-500',
            ].join(' ')}
          >
            {/* X icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul
          role="list"
          className="flex flex-col px-4 py-6 gap-1"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.href ||
              (item.href !== '/' && currentPath.startsWith(item.href));

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'flex items-center gap-3 px-4 py-3 rounded-lg',
                    'text-base font-medium',
                    'transition-all duration-150',
                    isActive
                      ? 'text-white bg-brand-600/15 border border-brand-700/30'
                      : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {isActive && (
                    <span
                      className="w-1 h-1 rounded-full bg-brand-400 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA at the bottom of the drawer */}
        <div className="mt-auto px-4 pb-8 pt-4 border-t border-[var(--color-border-subtle)]">
          <a
            href={ctaHref}
            onClick={close}
            className={[
              'flex items-center justify-center w-full',
              'px-6 py-3 rounded-lg',
              'bg-brand-600 hover:bg-brand-500',
              'text-white font-medium text-sm',
              'transition-all duration-200',
              'hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]',
              'active:scale-[0.97]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-brand-500 focus-visible:ring-offset-2',
              'focus-visible:ring-offset-[var(--color-surface-base)]',
            ].join(' ')}
          >
            {ctaLabel}
          </a>
        </div>
      </nav>
    </div>
  );
}
