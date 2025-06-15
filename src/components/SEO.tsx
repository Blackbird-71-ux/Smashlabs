import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export default function SEO({
  title = "SmashLabs - Ultimate Stress Relief & Rage Room Experience",
  description = "Experience the ultimate stress relief at SmashLabs! Break, smash, and destroy in our safe rage rooms. Perfect for team building, corporate events, and personal stress relief. Book your smashing session today!",
  keywords = [
    "rage room", "stress relief", "smash room", "break room", "anger management",
    "team building", "corporate events", "stress management", "therapy",
    "destruction therapy", "smashing experience", "mental health", "wellness",
    "fun activities", "unique experience", "group therapy", "team bonding",
    "entertainment", "recreational activity", "cathartic experience"
  ],
  image = "/smashlabs-experience-room.png",
  url = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "SmashLabs Team",
  section,
  tags = []
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smashlabs.in';
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SmashLabs",
    "description": description,
    "url": fullUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": fullImageUrl,
    "telephone": "+1-800-SMASH-NOW",
    "email": "info@smashlabs.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Stress Relief Lane",
      "addressLocality": "Wellness City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.052235",
      "longitude": "-118.243683"
    },
    "openingHours": [
      "Mo-Fr 10:00-22:00",
      "Sa-Su 11:00-23:00"
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SmashLabs Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Smash Package",
            "description": "30-minute stress relief session with basic smashing items"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Premium Smash Package",
            "description": "60-minute premium smashing experience with variety of items"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Ultimate Smash Package",
            "description": "90-minute ultimate destruction experience with premium items"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/SmashLabsOfficial",
      "https://www.instagram.com/smashlabs_official", 
      "https://twitter.com/smashlabs_hq",
      "https://www.youtube.com/user/smashlabs-official",
      "https://www.linkedin.com/company/smashlabs"
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content="SmashLabs - Ultimate Stress Relief Experience" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="SmashLabs" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@smashlabs_hq" />
      <meta name="twitter:creator" content="@smashlabs_hq" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content="SmashLabs - Ultimate Stress Relief Experience" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="application-name" content="SmashLabs" />
      <meta name="apple-mobile-web-app-title" content="SmashLabs" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Head>
  );
} 