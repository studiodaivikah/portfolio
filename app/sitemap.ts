import { MetadataRoute } from "next";
import prisma from "@/lib/Client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://studiodaivikah.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/featured`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let portfolioRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const projects = await prisma.project.findMany({
      select: { id: true, updatedAt: true },
    });
    portfolioRoutes = projects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.id}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    console.warn("Sitemap: Database not reachable for portfolio routes.");
  }

  try {
    const blogs = await prisma.project2.findMany({
      select: { id: true, updatedAt: true },
    });
    blogRoutes = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.id}`,
      lastModified: b.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    console.warn("Sitemap: Database not reachable for blog routes.");
  }

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
