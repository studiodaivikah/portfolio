// /api/portfolio/route.ts - Updated version
import prisma from "@/lib/Client";
import { NextResponse } from "next/server";

// GET all projects
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const includeBlog = url.searchParams.get('includeBlog') === 'true';
    
    const projects = await prisma.project2.findMany({
      orderBy: { createdAt: "desc" },
      include: includeBlog ? {
        blog2: true
      } : {}
    });
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST new project
export async function POST(request: Request) {
  try {
    const { title, image } = await request.json();

    if (!title || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newProject = await prisma.project2.create({
      data: { title, image },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}