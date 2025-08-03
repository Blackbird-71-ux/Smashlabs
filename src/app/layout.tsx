// This is a cosmetic change to trigger a new Vercel deployment
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from '@/components/ConditionalNavbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/ToastProvider'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import { GlobalHydrationFix } from '@/components/GlobalHydrationFix'
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
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://smashtech.edu'),
  title: {
    default: "SmashTech - Master FinTech Like a Pro",
    template: "%s | SmashTech",
  },
  description: "Master FinTech with SmashTech's gamified learning platform. Learn blockchain, AI trading, digital payments, and DeFi through interactive courses and hands-on projects. Transform your career with real-world FinTech skills.",
  keywords: ["fintech education", "blockchain learning", "digital payments", "defi courses", "cryptocurrency", "ai trading", "financial technology", "online learning", "career development", "hands-on projects", "interactive courses", "gamified learning", "fintech skills", "professional development", "tech education"],
  authors: [{ name: "SmashTech Education Team", url: "https://smashtech.edu" }],
  creator: "SmashTech Education Team",
  publisher: "SmashTech Inc.",
  openGraph: {
    title: "SmashTech - Master FinTech Like a Pro",
    description: "Master FinTech with SmashTech's gamified learning platform. Learn blockchain, AI trading, digital payments, and DeFi through interactive courses and hands-on projects.",
    url: "/",
    siteName: "SmashTech",
    images: [
      {
        url: "/smashtech-learning-platform.png",
        width: 1200,
        height: 630,
        alt: "SmashTech Learning Platform - Master FinTech Skills",
      },
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "SmashTech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmashTech - Master FinTech Like a Pro",
    description: "Master FinTech with gamified learning. Learn blockchain, AI trading, and digital payments.",
    images: ["/smashtech-learning-platform.png"],
    creator: "@smashtech_edu",
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
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// Add structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SmashTech Inc.',
  description: 'SmashTech offers gamified FinTech education through interactive courses in blockchain, AI trading, digital payments, and DeFi. Transform your career with hands-on projects and real-world financial technology skills.',
  url: 'https://smashtech.edu',
  logo: 'https://smashtech.edu/logo.png',
  image: 'https://smashtech.edu/smashtech-learning-platform.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '456 Innovation Blvd',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '34.052235',
    longitude: '-118.243683',
  },
  telephone: '+1800SMASHTECH',
  operatingHours: '24/7 Online Learning Platform',
  priceRange: '$',
  sameAs: [
    'https://www.facebook.com/smashtech.education',
    'https://www.instagram.com/smashtech_edu',
    'https://twitter.com/smashtech_edu',
    'https://www.youtube.com/channel/smashtech-education',
    'https://www.linkedin.com/company/smashtech-education',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1250'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SmashTech Learning Tracks',
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
          suppressHydrationWarning={true}
        />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-dark-950 font-sans text-gray-300 antialiased text-base leading-relaxed">
        {/* Load hydration warning suppression script first */}
        <Script
          src="/suppress-hydration-warnings.js"
          strategy="beforeInteractive"
        />
        
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
        
        <GlobalHydrationFix />
        <AccessibilityProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <ConditionalNavbar />
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
        
        {/* iPhone Safari viewport height fix */}
        <Script id="viewport-height-fix" strategy="afterInteractive">
          {`
            function setVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            
            // Set initial value
            setVH();
            
            // Update on resize (including iPhone Safari address bar changes)
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
              setTimeout(setVH, 100);
            });
          `}
        </Script>
      </body>
    </html>
  );
} 