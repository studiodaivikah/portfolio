import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const BLOB_KEY = "portfolio-data.json";

const getIdFromRequest = (request: NextRequest): string => {
  const segments = request.nextUrl.pathname.split("/");
  return segments[segments.length - 1];
};

async function readPortfolioData(): Promise<{ projects: Project[] }> {
  try {
    const res = await fetch(process.env.PORTFOLIO_JSON_URL as string);
    return await res.json();
  } catch {
    return { projects: [] };
  }
}

async function writePortfolioData(data: { projects: Project[] }) {
  await put(BLOB_KEY, JSON.stringify(data, null, 2), {
    contentType: "application/json",
    access: "public",
  });
}

// GET single project
export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);
  const data = await readPortfolioData();
  const project = data.projects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT update project
export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request);
  const updates = await request.json();
  const data = await readPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  data.projects[index] = {
    ...data.projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writePortfolioData(data);
  return NextResponse.json(data.projects[index]);
}

// DELETE project
export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request);
  const data = await readPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const [deleted] = data.projects.splice(index, 1);
  await writePortfolioData(data);
  return NextResponse.json(deleted);
}
