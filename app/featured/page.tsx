import type { Metadata } from "next";
import NewsContent from "@/components/news/newsContent";

export const metadata: Metadata = {
  title: "Media & Press News",
  description:
    "Explore Studio Daivikah in the news. Read press coverage, media features, architectural announcements, and milestones.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "Media & Press News | Studio Daivikah",
    description:
      "Explore Studio Daivikah in the news. Read press coverage, media features, architectural announcements, and milestones.",
    url: "https://studiodaivikah.com/news",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Studio Daivikah Media & Press News",
  url: "https://studiodaivikah.com/news",
  description: "Press coverage, media features, and news coverage of Studio Daivikah.",
  publisher: {
    "@type": "ArchitecturalStudio",
    name: "Studio Daivikah",
    url: "https://studiodaivikah.com",
  },
};

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsContent />
    </>
  );
}
