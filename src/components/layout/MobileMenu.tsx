'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';

interface MobileMenuProps {
  onClose: () => void;
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

export function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname();

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
        className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex h-full flex-col px-6 py-20">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <motion.div key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-neutral-600 hover:bg-neutral-surface hover:text-brand-600'
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
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
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="mt-2 block text-lg font-medium text-neutral-charcoal hover:text-brand-600"
            >
              {SITE_CONFIG.phone}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-1 block text-neutral-600 hover:text-brand-600"
            >
              {SITE_CONFIG.email}
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
