import prisma from "@/lib/Client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  const news = await prisma.news.findUnique({ where: { id } });

  if (!news) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(news);
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  const { src, title, image } = await request.json();

  const updated = await prisma.news.update({
    where: { id },
    data: { src, title, image },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const deleted = await prisma.news.delete({ where: { id } });
  return NextResponse.json(deleted);
}
