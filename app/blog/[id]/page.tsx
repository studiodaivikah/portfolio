import type { Metadata } from "next";
import prisma from "@/lib/Client";
import BlogDetailContent from "@/components/blog/blogDetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await prisma.project2.findUnique({
      where: { id },
      include: { blog2: true },
    });

    if (!project) {
      return {
        title: "Article Not Found",
      };
    }

    const title = `${project.title.toUpperCase()}`;
    const description =
      project.blog2?.paragraphs?.[0]?.slice(0, 160) ||
      `Read ${project.title} on Studio Daivikah Blog.`;
    const image = project.blog2?.images?.[0] || project.image || "/images/preview.png";

    return {
      title,
      description,
      alternates: {
        canonical: `/blog/${id}`,
      },
      openGraph: {
        title: `${title} | Studio Daivikah`,
        description,
        url: `https://studiodaivikah.com/blog/${id}`,
        type: "article",
        images: [{ url: image, alt: project.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Studio Daivikah`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Blog Article",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  let jsonLd = null;

  try {
    const project = await prisma.project2.findUnique({
      where: { id },
      include: { blog2: true },
    });

    if (project) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: project.title,
        image: project.blog2?.images || [project.image],
        datePublished: project.createdAt,
        dateModified: project.updatedAt,
        author: {
          "@type": "Organization",
          name: "Studio Daivikah",
        },
        publisher: {
          "@type": "Organization",
          name: "Studio Daivikah",
          logo: {
            "@type": "ImageObject",
            url: "https://studiodaivikah.com/images/logo.png",
          },
        },
        articleBody: project.blog2?.paragraphs?.join(" ") || "",
      };
    }
  } catch {
    // fine if DB not initialized locally
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailContent />
    </>
  );
}
