import prisma from "@/lib/Client";
import { NextResponse } from "next/server";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
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
    const { type, title, image } = await request.json();

    if (!type || !title || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: { type, title, image },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
