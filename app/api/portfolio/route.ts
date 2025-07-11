// app/api/portfolio/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

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

// Ensure data directory exists
const ensureDataDirectory = (): void => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read portfolio data
const readPortfolioData = (): PortfolioData => {
  ensureDataDirectory();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data) as PortfolioData;
    }
    return { projects: [] };
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return { projects: [] };
  }
};

// Write portfolio data
const writePortfolioData = (data: PortfolioData): boolean => {
  ensureDataDirectory();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return false;
  }
};

// GET - Read all projects
export async function GET(): Promise<Response> {
  try {
    const data = readPortfolioData();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read portfolio data" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { type, title, image } = body as {
      type?: string;
      title?: string;
      image?: string;
    };

    if (!type || !title || !image) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, image" },
        { status: 400 }
      );
    }

    const data = readPortfolioData();
    const newProject: Project = {
      id: Date.now().toString(),
      type,
      title,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.push(newProject);

    if (writePortfolioData(data)) {
      return NextResponse.json(newProject, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Failed to save project" },
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
