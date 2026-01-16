'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md',
          'border-b border-neutral-border'
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between lg:h-20"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <Logo />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-bold text-brand-700 lg:text-xl"
              >
                {SITE_CONFIG.shortName}
              </motion.span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'text-brand-600'
                        : 'text-neutral-600 hover:text-brand-600'
                    )}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-600"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Get a Quote
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-surface hover:text-brand-600 lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex h-5 w-5 flex-col items-center justify-center">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  className="block h-0.5 w-5 bg-current transition-colors"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="my-1.5 block h-0.5 w-5 bg-current transition-colors"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  className="block h-0.5 w-5 bg-current transition-colors"
                />
              </div>
            </button>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
