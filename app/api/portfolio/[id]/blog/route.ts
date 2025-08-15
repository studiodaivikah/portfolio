// /api/portfolio/[id]/blog/route.ts
import prisma from "@/lib/Client";
import { NextRequest, NextResponse } from "next/server";

// GET blog content for a project
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/")[3]; // Extract project ID
    
    const blog = await prisma.blog.findUnique({
      where: { projectId: id }
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// CREATE or UPDATE blog content
export async function POST(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/")[3]; // Extract project ID
    const { paragraphs, images } = await request.json();

    // Validate inputs
    if (!paragraphs || !Array.isArray(paragraphs)) {
      return NextResponse.json({ error: "Paragraphs must be an array" }, { status: 400 });
    }

    if (paragraphs.length === 0 || paragraphs.length > 20) {
      return NextResponse.json({ error: "Must have 1-20 paragraphs" }, { status: 400 });
    }

    if (images && (!Array.isArray(images) || images.length > 40)) {
      return NextResponse.json({ error: "Maximum 40 images allowed" }, { status: 400 });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if blog already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { projectId: id }
    });

    let blog;
    if (existingBlog) {
      // Update existing blog
      blog = await prisma.blog.update({
        where: { projectId: id },
        data: {
          paragraphs,
          images: images || [],
        }
      });
    } else {
      // Create new blog
      blog = await prisma.blog.create({
        data: {
          projectId: id,
          paragraphs,
          images: images || [],
        }
      });
    }

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST blog error:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

// DELETE blog content
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/")[3]; // Extract project ID
    
    const deleted = await prisma.blog.delete({
      where: { projectId: id }
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

// Updated /api/portfolio/route.ts to include blog data
// Add this to your existing route.ts file:

/*
// Update the GET method in /api/portfolio/route.ts:
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const includeBlog = url.searchParams.get('includeBlog') === 'true';
    
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: includeBlog ? {
        blog: true
      } : {}
    });
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
*/