import type { Metadata } from "next";
import FeaturedContent from "@/components/featured/featuredContent";

export const metadata: Metadata = {
  title: "Featured | Studio Daivikah",
  description:
    "Explore Studio Daivikah features. Read press coverage, media features, architectural announcements, and milestones.",
  alternates: {
    canonical: "/featured",
  },
  openGraph: {
    title: "Featured | Studio Daivikah",
    description:
      "Explore Studio Daivikah features. Read press coverage, media features, architectural announcements, and milestones.",
    url: "https://studiodaivikah.com/featured",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Studio Daivikah Featured Media & Press",
  url: "https://studiodaivikah.com/featured",
  description: "Press coverage, media features, and news coverage of Studio Daivikah.",
  publisher: {
    "@type": "ArchitecturalStudio",
    name: "Studio Daivikah",
    url: "https://studiodaivikah.com",
  },
};

export default function FeaturedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturedContent />
    </>
  );
}
