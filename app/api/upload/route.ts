import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = `uploads/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
      token: TOKEN,
    });

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
