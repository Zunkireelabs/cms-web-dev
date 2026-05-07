'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { PRODUCT_DOMAINS, CONTRACTING_SERVICES } from '@/data/products';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from './MobileMenu';
import { ChevronDown, Home, Building, DoorOpen, PaintBucket, Lock, Fence, Droplets, Trash2, Bath, Armchair, Layers, Building2, ClipboardCheck, Leaf, ArrowRight } from 'lucide-react';

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  roofing: <Home className="h-4 w-4" />,
  facade: <Building className="h-4 w-4" />,
  ceiling: <Layers className="h-4 w-4" />,
  aluminum: <DoorOpen className="h-4 w-4" />,
  coating: <PaintBucket className="h-4 w-4" />,
  hardware: <Lock className="h-4 w-4" />,
  railings: <Fence className="h-4 w-4" />,
  waterproofing: <Droplets className="h-4 w-4" />,
  wastewater: <Trash2 className="h-4 w-4" />,
  sanitaryware: <Bath className="h-4 w-4" />,
  furniture: <Armchair className="h-4 w-4" />,
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  interior: <Building2 className="h-4 w-4" />,
  execution: <ClipboardCheck className="h-4 w-4" />,
  renovation: <Leaf className="h-4 w-4" />,
};

function isProductsActive(pathname: string) {
  return pathname.startsWith('/trading') || pathname.startsWith('/contracting');
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTriggerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        megaMenuTriggerRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        !megaMenuTriggerRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isSolid
            ? 'bg-white/95 shadow-sm backdrop-blur-md border-b border-neutral-border'
            : 'bg-transparent'
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between lg:h-20"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="relative z-10 flex items-center"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <Logo variant={isSolid ? 'dark' : 'white'} />
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {NAV_ITEMS.map((item, index) => {
                // Special handling for Products & Services with mega menu
                if (item.href === '/trading') {
                  return (
                    <motion.div
                      key={item.href}
                      ref={megaMenuTriggerRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className="relative"
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                      <button
                        className={cn(
                          'relative px-4 py-2 text-base font-medium transition-colors flex items-center gap-1',
                          isSolid
                            ? isProductsActive(pathname)
                              ? 'text-accent'
                              : 'text-neutral-600 hover:text-accent'
                            : isProductsActive(pathname)
                              ? 'text-white'
                              : 'text-white/80 hover:text-white'
                        )}
                        onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          'h-4 w-4 transition-transform',
                          isMegaMenuOpen && 'rotate-180'
                        )} />
                        {isProductsActive(pathname) && (
                          <motion.div
                            layoutId="activeNav"
                            className={cn(
                              'absolute bottom-0 left-2 right-2 h-0.5',
                              isSolid ? 'bg-accent' : 'bg-white'
                            )}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-4 py-2 text-base font-medium transition-colors',
                        isSolid
                          ? pathname === item.href
                            ? 'text-accent'
                            : 'text-neutral-600 hover:text-accent'
                          : pathname === item.href
                            ? 'text-white'
                            : 'text-white/80 hover:text-white'
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="activeNav"
                          className={cn(
                            'absolute bottom-0 left-2 right-2 h-0.5',
                            isSolid ? 'bg-accent' : 'bg-white'
                          )}
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-base font-medium transition-all',
                  isSolid
                    ? 'bg-accent text-white hover:bg-accent-700'
                    : 'border-2 border-white/60 text-white hover:bg-white/10'
                )}
              >
                Get a Quote
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden',
                isSolid
                  ? 'text-neutral-600 hover:bg-neutral-surface hover:text-accent'
                  : 'text-white hover:bg-white/10'
              )}
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

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            ref={megaMenuRef}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="fixed left-0 right-0 top-16 lg:top-20 z-40 hidden lg:block"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="bg-white border-b-2 border-accent shadow-lg">
              <Container>
                <div className="py-6">
                  <div className="flex gap-0">
                    {/* Trading Column — 60% */}
                    <div className="flex-[3] pr-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-semibold text-accent uppercase tracking-[0.15em]">
                          <span className="inline-block w-5 h-[2px] bg-accent mr-2 align-middle" />
                          Trading
                        </h3>
                        <Link
                          href="/trading"
                          className="text-[11px] text-accent hover:text-accent-700 font-semibold flex items-center gap-1 uppercase tracking-wider"
                        >
                          View All
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                        {PRODUCT_DOMAINS.map((domain) => (
                          <Link
                            key={domain.id}
                            href={`/trading/${domain.slug}`}
                            className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-neutral-50 transition-all group border-l-2 border-l-transparent hover:border-l-accent"
                          >
                            <div className="flex-shrink-0 w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                              {DOMAIN_ICONS[domain.id] || <Building className="h-3.5 w-3.5" />}
                            </div>
                            <span className="text-[13px] font-medium text-neutral-700 group-hover:text-accent transition-colors">
                              {domain.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px bg-neutral-100 relative flex-shrink-0">
                      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-neutral-100 to-transparent" />
                    </div>

                    {/* Contracting Column — 40% */}
                    <div className="flex-[2] pl-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-semibold text-accent uppercase tracking-[0.15em]">
                          <span className="inline-block w-5 h-[2px] bg-accent mr-2 align-middle" />
                          Contracting
                        </h3>
                        <Link
                          href="/contracting"
                          className="text-[11px] text-accent hover:text-accent-700 font-semibold flex items-center gap-1 uppercase tracking-wider"
                        >
                          View All
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="space-y-0">
                        {CONTRACTING_SERVICES.map((service) => (
                          <Link
                            key={service.id}
                            href="/contracting"
                            className="flex items-center gap-2.5 px-2.5 py-2.5 hover:bg-neutral-50 transition-all group border-l-2 border-l-transparent hover:border-l-accent"
                          >
                            <div className="flex-shrink-0 w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                              {SERVICE_ICONS[service.id] || <Building2 className="h-3.5 w-3.5" />}
                            </div>
                            <span className="text-[13px] font-medium text-neutral-700 group-hover:text-accent transition-colors">
                              {service.title}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 p-3.5 bg-accent-50 rounded-lg border-l-2 border-l-accent">
                        <p className="text-[13px] font-semibold text-neutral-800 mb-0.5">Need a Custom Solution?</p>
                        <p className="text-[11px] text-neutral-500 mb-2">Our experts are ready to help with your project.</p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent-700"
                        >
                          Contact Us
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
