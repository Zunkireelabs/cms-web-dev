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
  metadataBase: new URL('https://cmsgrps.com'),
  title: {
    default: 'CMS Group | Construction Material Solutions in Nepal',
    template: '%s | CMS Group',
  },
  description:
    "CMS Group — Nepal's leading provider of construction materials and building finishing solutions since 2002. Trading, contracting, and industrial development across hospital, education, airport, office, hotel, and residential projects.",
  keywords: [
    'CMS Group',
    'Construction Material Solutions',
    'construction materials Nepal',
    'building finishing Nepal',
    'Bath N Room',
    'Baba Muktinath',
    '4R Technologies',
    'Cubic Meter',
    'Techwood',
    'Prime Ceramics',
    'Kathmandu construction supplier',
  ],
  authors: [{ name: 'CMS Group' }],
  creator: 'CMS Group',
  publisher: 'CMS Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cmsgrps.com',
    siteName: 'CMS Group',
    title: 'CMS Group | Construction Material Solutions in Nepal',
    description:
      "Nepal's leading provider of construction materials and building finishing solutions since 2002.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CMS Group — Construction Material Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMS Group',
    description:
      "Nepal's leading provider of construction materials and building finishing solutions since 2002.",
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
