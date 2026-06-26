'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteConfig } from '@/types/cms';

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig | null;
  children: ReactNode;
}) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig(): SiteConfig | null {
  return useContext(SiteConfigContext);
}
