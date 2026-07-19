'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG_FALLBACK, CONTRACTING_SERVICES } from '@/lib/constants';
import { useSiteConfig } from '@/components/providers/SiteConfigProvider';
import type { CmsProductDomain } from '@/lib/cms';
import { ChevronDown } from 'lucide-react';
import { tradingHref } from '@/lib/routes';

interface MobileMenuProps {
  onClose: () => void;
  productDomains: CmsProductDomain[];
}

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
};

const subMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

function isProductsActive(pathname: string) {
  return pathname.startsWith('/trading') || pathname.startsWith('/contracting');
}

export function MobileMenu({ onClose, productDomains }: MobileMenuProps) {
  const cfg = useSiteConfig() ?? SITE_CONFIG_FALLBACK;
  const pathname = usePathname();
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-neutral-black/20 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
      />

      <motion.nav
        id="mobile-menu"
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden overflow-y-auto"
        aria-label="Mobile navigation"
      >
        <div className="flex h-full flex-col px-6 py-20">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              // Special handling for Products & Services with expandable submenu
              if (item.href === '/trading') {
                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <button
                      onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                      className={cn(
                        'w-full flex items-center justify-between rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                        isProductsActive(pathname)
                          ? 'bg-accent-50 text-accent'
                          : 'text-neutral-600 hover:bg-neutral-surface hover:text-accent'
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform',
                          isProductsExpanded && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isProductsExpanded && (
                        <motion.div
                          variants={subMenuVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-2 space-y-1">
                            {/* Trading Section */}
                            <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                              Trading
                            </p>
                            {productDomains.slice(0, 6).map((domain) => (
                              <Link
                                key={domain.id}
                                href={tradingHref(domain.slug)}
                                onClick={onClose}
                                className="block rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-surface hover:text-accent transition-colors"
                              >
                                {domain.title}
                              </Link>
                            ))}
                            <Link
                              href="/trading"
                              onClick={onClose}
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-accent hover:bg-accent-50 transition-colors"
                            >
                              View All Trading →
                            </Link>

                            {/* Contracting Section */}
                            <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-2">
                              Contracting
                            </p>
                            {CONTRACTING_SERVICES.map((service) => (
                              <Link
                                key={service.id}
                                href="/contracting"
                                onClick={onClose}
                                className="block rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-surface hover:text-accent transition-colors"
                              >
                                {service.title}
                              </Link>
                            ))}
                            <Link
                              href="/contracting"
                              onClick={onClose}
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-accent hover:bg-accent-50 transition-colors"
                            >
                              View All Contracting →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-accent-50 text-accent'
                        : 'text-neutral-600 hover:bg-neutral-surface hover:text-accent'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-700"
            >
              Get a Quote
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-auto border-t border-neutral-border pt-6"
          >
            <p className="text-sm text-neutral-400">Contact Us</p>
            <a
              href={`tel:${cfg.phone.replace(/\s/g, '')}`}
              className="mt-2 block text-lg font-medium text-neutral-charcoal hover:text-accent"
            >
              {cfg.phone}
            </a>
            <a
              href={`mailto:${cfg.email}`}
              className="mt-1 block text-neutral-600 hover:text-accent"
            >
              {cfg.email}
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
