import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const BLOB_URL = process.env.PORTFOLIO_JSON_URL!;
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN!;

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

// Read portfolio data from blob
const readPortfolioData = async (): Promise<PortfolioData> => {
  const res = await fetch(BLOB_URL);
  if (!res.ok) throw new Error("Failed to fetch blob JSON");
  return res.json();
};

// Write portfolio data to blob
const writePortfolioData = async (data: PortfolioData) => {
  await put("portfolio-data.json", JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    token: TOKEN,
  });
};

// GET all projects
export async function GET() {
  try {
    const data = await readPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Read error:", error);
    return NextResponse.json(
      { error: "Failed to read portfolio" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, title, image } = body;

    if (!type || !title || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const data = await readPortfolioData();

    const newProject: Project = {
      id: Date.now().toString(),
      type,
      title,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.push(newProject);
    await writePortfolioData(data);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
