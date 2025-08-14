import prisma from "@/lib/Client";
import { NextResponse } from "next/server";

// GET all gallery images
export async function GET() {
  try {
    const items = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// POST new gallery image
export async function POST(request: Request) {
  try {
    const { image, name, role } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const newImage = await prisma.team.create({
      data: { image, name, role },
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create image" },
      { status: 500 }
    );
  }
}
