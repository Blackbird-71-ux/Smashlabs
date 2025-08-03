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
  title = "SmashTech - Gamified FinTech Education Platform",
  description = "Master financial technology through SmashTech's gamified learning platform! Interactive courses in blockchain, AI/ML, digital payments, and DeFi. Build real-world projects and advance your fintech career today!",
  keywords = [
    "fintech education", "blockchain course", "digital payments training", "AI ML finance", "cryptocurrency learning",
    "financial technology", "career development", "professional training", "certification",
    "gamified learning", "interactive education", "skill building", "career advancement",
    "technology training", "practical projects", "hands-on learning", "industry skills",
    "professional development", "online education", "fintech careers"
  ],
  image = "/smashtech-learning-platform.png",
  url = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "SmashTech Education Team",
  section,
  tags = []
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smashtech.edu';
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SmashTech",
    "description": description,
    "url": fullUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": fullImageUrl,
    "telephone": "+1-800-SMASH-NOW",
          "email": "info@smashtech.edu",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 FinTech Education Hub",
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
      "name": "SmashTech Learning Tracks",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Smash Package",
            "description": "Foundation level fintech course with interactive lessons and projects"
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
              "https://www.facebook.com/SmashTechEducation",
        "https://www.instagram.com/smashtech_edu",
        "https://twitter.com/smashtech_edu",
        "https://www.youtube.com/user/smashtech-education",
        "https://www.linkedin.com/company/smashtech"
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
      <meta property="og:image:alt" content="SmashTech - Gamified FinTech Education Platform" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="SmashTech" />
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
      <meta name="twitter:site" content="@smashtech_edu" />
      <meta name="twitter:creator" content="@smashtech_edu" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content="SmashTech - Gamified FinTech Education Platform" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="application-name" content="SmashTech" />
      <meta name="apple-mobile-web-app-title" content="SmashTech" />
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