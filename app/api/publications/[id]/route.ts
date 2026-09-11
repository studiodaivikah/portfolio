import prisma from "@/lib/Client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "ID parameter missing" }, { status: 400 });
  }

  try {
    const publication = await prisma.publication.findUnique({ where: { id } });

    if (!publication) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    return NextResponse.json(publication);
  } catch (error) {
    console.error("GET publication error:", error);
    return NextResponse.json({ error: "Failed to fetch publication" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "ID parameter missing" }, { status: 400 });
  }

  try {
    const { title, description, link, image } = await request.json();

    const updated = await prisma.publication.update({
      where: { id },
      data: {
        title,
        description,
        link,
        image: image !== undefined ? image : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT publication error:", error);
    return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "ID parameter missing" }, { status: 400 });
  }

  try {
    const deleted = await prisma.publication.delete({ where: { id } });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE publication error:", error);
    return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
  }
}
