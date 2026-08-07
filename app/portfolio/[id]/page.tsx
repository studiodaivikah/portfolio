import type { Metadata } from "next";
import prisma from "@/lib/Client";
import PortfolioDetailContent from "@/components/portfolio/portfolioDetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { blog: true },
    });

    if (!project) {
      return {
        title: "Project Not Found",
      };
    }

    const title = `${project.title.toUpperCase()}`;
    const description =
      project.blog?.paragraphs?.[0]?.slice(0, 160) ||
      `${project.title} (${project.type}) by Studio Daivikah.`;
    const image = project.image || "/images/preview.png";

    return {
      title,
      description,
      alternates: {
        canonical: `/portfolio/${id}`,
      },
      openGraph: {
        title: `${title} | Studio Daivikah`,
        description,
        url: `https://studiodaivikah.com/portfolio/${id}`,
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
  } catch (error) {
    console.warn("generateMetadata portfolio error:", error);
    return {
      title: "Portfolio Project",
    };
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  let jsonLd = null;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { blog: true },
    });

    if (project) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        genre: project.type,
        image: project.image,
        dateCreated: project.createdAt,
        creator: {
          "@type": "ArchitecturalStudio",
          name: "Studio Daivikah",
          url: "https://studiodaivikah.com",
        },
        description: project.blog?.paragraphs?.[0] || `${project.title} project`,
      };
    }
  } catch (error) {
    console.warn("Portfolio JSON-LD error:", error);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PortfolioDetailContent />
    </>
  );
}
