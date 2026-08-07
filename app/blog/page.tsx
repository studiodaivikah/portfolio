import type { Metadata } from "next";
import BlogContent from "@/components/blog/blogContent";

export const metadata: Metadata = {
  title: "Architectural Articles & Design Blog",
  description:
    "Read the latest architectural insights, design trends, interior inspirations, and project stories from Studio Daivikah.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Architectural Articles & Design Blog | Studio Daivikah",
    description:
      "Read the latest architectural insights, design trends, interior inspirations, and project stories from Studio Daivikah.",
    url: "https://studiodaivikah.com/blog",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Studio Daivikah Blog",
  url: "https://studiodaivikah.com/blog",
  description: "Architectural design insights, project stories, and spatial design trends.",
  publisher: {
    "@type": "ArchitecturalStudio",
    name: "Studio Daivikah",
    url: "https://studiodaivikah.com",
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent />
    </>
  );
}
