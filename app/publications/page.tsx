import type { Metadata } from "next";
import PublicationsContent from "@/components/publications/publicationsContent";

export const metadata: Metadata = {
  title: "Publications | Studio Daivikah",
  description:
    "Explore Studio Daivikah publications, press features, external articles, and published architectural works.",
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Publications | Studio Daivikah",
    description:
      "Explore Studio Daivikah publications, press features, external articles, and published architectural works.",
    url: "https://studiodaivikah.com/publications",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Studio Daivikah Publications",
  url: "https://studiodaivikah.com/publications",
  description: "External publication features, articles, and press mentions of Studio Daivikah.",
  publisher: {
    "@type": "ArchitecturalStudio",
    name: "Studio Daivikah",
    url: "https://studiodaivikah.com",
  },
};

export default function PublicationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicationsContent />
    </>
  );
}
