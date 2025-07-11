import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

const BLOB_KEY = "portfolio-data.json";

interface Project {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioData {
  projects: Project[];
}

async function readPortfolioData(): Promise<PortfolioData> {
  try {
    const res = await fetch(process.env.PORTFOLIO_JSON_URL as string);
    return await res.json();
  } catch (error) {
    console.error("Read error:", error);
    return { projects: [] };
  }
}

async function writePortfolioData(data: PortfolioData): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(data, null, 2), {
    contentType: "application/json",
    access: "public",
  });
}

export async function GET() {
  const data = await readPortfolioData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { type, title, image } = await request.json();
    if (!type || !title || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject: Project = {
      id: uuidv4(),
      type,
      title,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const data = await readPortfolioData();
    data.projects.push(newProject);
    await writePortfolioData(data);

    return NextResponse.json(newProject, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
