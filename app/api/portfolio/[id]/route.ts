import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const BLOB_URL = process.env.PORTFOLIO_JSON_URL!;
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;

interface Project {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PortfolioData {
  projects: Project[];
}

const readPortfolioData = async (): Promise<PortfolioData> => {
  const res = await fetch(BLOB_URL);
  if (!res.ok) throw new Error("Failed to fetch portfolio blob");
  return res.json();
};

const writePortfolioData = async (data: PortfolioData) => {
  await put("portfolio-data.json", JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    token: TOKEN,
    allowOverwrite: true, // ✅ Add this line
  });
};

const getIdFromRequest = (request: NextRequest) =>
  request.nextUrl.pathname.split("/").pop()!;

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const data = await readPortfolioData();
    const project = data.projects.find((p) => p.id === id);
    if (!project)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to read project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    console.log(id);
    const body = await request.json();
    const { type, title, image } = body;

    if (!type || !title || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const data = await readPortfolioData();
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    data.projects[index] = {
      ...data.projects[index],
      type,
      title,
      image,
      updatedAt: new Date().toISOString(),
    };

    await writePortfolioData(data);

    return NextResponse.json(data.projects[index]);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    console.log(id);
    const data = await readPortfolioData();
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const deleted = data.projects.splice(index, 1)[0];
    await writePortfolioData(data);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
