import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const blob = await put(
      `portfolio-images/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
      }
    );

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
      filename: blob.pathname,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
