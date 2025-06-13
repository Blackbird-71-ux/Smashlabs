// This is a cosmetic change to trigger a new Vercel deployment
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/ToastProvider'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://smashlabs.in'),
  title: {
    default: "SmashLabs - Unleash Your Inner Beast. Smash Stress.",
    template: "%s | SmashLabs",
  },
  description: "Experience the ultimate stress relief and team building activity at SmashLabs. Break free from your worries and unleash your rage in a safe, exhilarating environment. Perfect for corporate events, team outings, and private parties.",
  keywords: ["rage room", "stress relief", "team building", "corporate events", "smash room", "break room", "anger management", "fun activities", "group therapy", "smashing", "destruction", "stress management", "entertainment", "unique experience", "team bonding"],
  authors: [{ name: "SmashLabs Team", url: "https://smashlabs.in" }],
  creator: "SmashLabs Team",
  publisher: "SmashLabs Inc.",
  openGraph: {
    title: "SmashLabs - Unleash Your Inner Beast. Smash Stress.",
    description: "Experience the ultimate stress relief and team building activity at SmashLabs. Break free from your worries and unleash your rage in a safe, exhilarating environment.",
    url: "/",
    siteName: "SmashLabs",
    images: [
      {
        url: "/smashlabs-experience-room.png",
        width: 1200,
        height: 630,
        alt: "SmashLabs Experience Room - Unleash Your Inner Beast",
      },
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "SmashLabs Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmashLabs - Unleash Your Inner Beast. Smash Stress.",
    description: "Experience the ultimate stress relief and team building activity at SmashLabs.",
    images: ["/smashlabs-experience-room.png"],
    creator: "@smashlabs_hq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// Add structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SmashLabs Inc.',
  description: 'SmashLabs offers a unique and exhilarating experience to smash and destroy objects in a safe environment, providing ultimate stress relief, fun team-building activities, and unforgettable corporate events.',
  url: 'https://smashlabs.in',
  logo: 'https://smashlabs.in/logo.png',
  image: 'https://smashlabs.in/smashlabs-experience-room.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Catharsis Lane',
    addressLocality: 'Rage City',
    addressRegion: 'CA',
    postalCode: '90210',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '34.052235',
    longitude: '-118.243683',
  },
  telephone: '+1800SMASHNOW',
  openingHours: [
    'Mo,Tu,We,Th,Fr 10:00-22:00',
    'Sa,Su 11:00-23:00'
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/SmashLabsOfficial',
    'https://www.instagram.com/smashlabs_official',
    'https://twitter.com/smashlabs_hq',
    'https://www.youtube.com/user/smashlabs-official',
    'https://www.linkedin.com/company/smashlabs-inc',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1250'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SmashLabs Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Standard Smash',
          description: '30-minute session in one room with basic items.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium Smash',
          description: '60-minute session in two rooms with a wider selection of items.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ultimate Smash',
          description: '90-minute session in three rooms with premium items and a custom playlist.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Event',
          description: 'Custom packages for team-building and corporate outings.',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-dark-950 font-sans text-gray-300 antialiased text-base leading-relaxed">
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
        
        <AccessibilityProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-grow">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </main>
              <Footer />
              <BackToTop />
            </div>
          </ToastProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
} 