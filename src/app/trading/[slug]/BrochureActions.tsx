'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Eye, FileDown, type LucideIcon } from 'lucide-react';
import type { BrandBrochure } from '@/types/cms';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  download?: boolean;
}

const buttonClasses =
  'inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-charcoal transition-colors hover:border-accent/40 hover:bg-accent-50 hover:text-accent';
const disabledButtonClasses =
  'inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed';

function BrochureMenuButton({
  icon: Icon,
  label,
  items,
  disabledTitle,
  disabledBadge,
}: {
  icon: LucideIcon;
  label: string;
  items: MenuItem[];
  disabledTitle: string;
  disabledBadge?: string;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setPosition({ top: rect.bottom + 8, left: rect.left, width: rect.width });

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    // Closing on scroll/resize (instead of repositioning) keeps this simple —
    // the menu is short-lived and re-opens anchored correctly next click.
    function handleClose() {
      setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [open]);

  if (items.length === 0) {
    return (
      <button disabled className={disabledButtonClasses} title={disabledTitle}>
        <Icon className="h-4 w-4" />
        {label}
        {disabledBadge && (
          <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium uppercase">
            {disabledBadge}
          </span>
        )}
      </button>
    );
  }

  if (items.length === 1) {
    const item = items[0];
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" download={item.download} className={buttonClasses}>
        <Icon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={buttonClasses}
      >
        <Icon className="h-4 w-4" />
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: 'fixed', top: position.top, left: position.left, minWidth: position.width }}
            className="z-[100] w-60 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1.5 shadow-card-hover"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                download={item.download}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-neutral-charcoal transition-colors hover:bg-accent-50 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export function BrochureActions({ brochures, brandName }: { brochures: BrandBrochure[]; brandName: string }) {
  const resolved = brochures.map((b, i) => ({ ...b, resolvedLabel: b.label || `Brochure ${i + 1}` }));

  const viewItems: MenuItem[] = resolved
    .filter((b) => b.viewUrl)
    .map((b) => ({ id: b.id, label: b.resolvedLabel, href: b.viewUrl! }));

  const downloadItems: MenuItem[] = resolved
    .filter((b) => b.downloadUrl)
    .map((b) => {
      const filename = brochures.length > 1 ? `${brandName} - ${b.resolvedLabel}.pdf` : `${brandName} Brochure.pdf`;
      return {
        id: b.id,
        label: b.resolvedLabel,
        href: `/api/download?url=${encodeURIComponent(b.downloadUrl!)}&filename=${encodeURIComponent(filename)}`,
        download: true,
      };
    });

  return (
    <>
      <BrochureMenuButton icon={Eye} label="View Brochure" items={viewItems} disabledTitle="No view link set" disabledBadge="Soon" />
      <BrochureMenuButton icon={FileDown} label="Download Brochure" items={downloadItems} disabledTitle="No download file uploaded" />
    </>
  );
}
