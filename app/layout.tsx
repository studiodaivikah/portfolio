import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studiodaivikah.com"),
  title: {
    default: "Studio Daivikah | Architecture & Interior Design Studio",
    template: "%s | Studio Daivikah",
  },
  description:
    "Studio Daivikah is a premier architectural and interior design practice crafting innovative, sustainable, and timeless residential & commercial spaces.",
  keywords: [
    "Studio Daivikah",
    "Architectural Design",
    "Interior Design",
    "3D Visualization",
    "3D Modeling",
    "Urban Planning",
    "Project Management",
    "Sustainable Architecture",
    "Chennai Architect",
    "Architecture Studio India",
    "Turnkey Construction",
    "Residential Architecture",
    "Commercial Design",
  ],
  authors: [{ name: "Studio Daivikah", url: "https://studiodaivikah.com" }],
  creator: "Studio Daivikah",
  publisher: "Studio Daivikah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Studio Daivikah | Architecture & Interior Design Studio",
    description:
      "Concept to Creation — Studio Daivikah delivers innovative architectural, interior, and 3D visualization design services.",
    url: "https://studiodaivikah.com",
    siteName: "Studio Daivikah",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Studio Daivikah Architecture Showcase",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Daivikah | Architecture & Interior Design Studio",
    description:
      "Concept to Creation — Studio Daivikah delivers innovative architectural, interior, and 3D visualization design services.",
    images: ["/images/preview.png"],
  },
  other: {
    "og:image:secure_url": "https://studiodaivikah.com/images/preview.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalStudio",
  name: "Studio Daivikah",
  url: "https://studiodaivikah.com",
  logo: "https://studiodaivikah.com/images/logo.png",
  image: "https://studiodaivikah.com/images/preview.png",
  description:
    "Studio Daivikah is an architectural and interior design practice dedicated to creating timeless, functional, and inspiring spaces.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "36, Surapet main road, Puthagaram",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600099",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7550237036",
    contactType: "customer service",
    email: "studiodavikah@gmail.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/studio-daivikah/",
    "https://www.instagram.com/studio.daivikah",
    "https://www.facebook.com/share/15spjwC4w9/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jost.className} min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-white`}>
        <main className="w-full flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
