import type { Metadata } from "next";
import ServicesContent from "@/components/services/servicesContent";

export const metadata: Metadata = {
  title: "Architectural & Interior Services",
  description:
    "Explore Studio Daivikah's architectural design, 3D modeling & visualization, interior architecture, urban planning, and project management services.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Architectural & Interior Services | Studio Daivikah",
    description:
      "Explore Studio Daivikah's architectural design, 3D modeling & visualization, interior architecture, urban planning, and project management services.",
    url: "https://studiodaivikah.com/services",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Architectural & Interior Design",
  provider: {
    "@type": "ArchitecturalStudio",
    name: "Studio Daivikah",
    url: "https://studiodaivikah.com",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Architectural & Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Architectural Design",
          description: "Innovative and functional space planning combined with structural excellence.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Modeling & Visualization",
          description: "Photorealistic 3D renders and architectural visualization.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Architecture",
          description: "Harmonious and functional interior spaces tailored to client lifestyle.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Project Management",
          description: "End-to-end architectural project management, budget control, and quality assurance.",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  );
}
