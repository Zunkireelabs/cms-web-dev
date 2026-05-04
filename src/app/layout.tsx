import type { Metadata, Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-source-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cmstc.com'),
  title: {
    default: 'CMS Trading & Contracting | Professional Construction Services',
    template: '%s | CMS Trading & Contracting',
  },
  description:
    'CMS Trading & Contracting delivers excellence in construction, contracting, and trading services. Trusted partner for commercial and industrial projects.',
  keywords: [
    'construction',
    'contracting',
    'trading',
    'commercial construction',
    'industrial projects',
    'CMS Trading',
  ],
  authors: [{ name: 'CMS Trading & Contracting' }],
  creator: 'CMS Trading & Contracting',
  publisher: 'CMS Trading & Contracting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cmstc.com',
    siteName: 'CMS Trading & Contracting',
    title: 'CMS Trading & Contracting | Professional Construction Services',
    description:
      'CMS Trading & Contracting delivers excellence in construction, contracting, and trading services.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CMS Trading & Contracting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMS Trading & Contracting',
    description:
      'Excellence in construction, contracting, and trading services.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#D4A84B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSans.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-off-white font-sans text-neutral-charcoal antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
