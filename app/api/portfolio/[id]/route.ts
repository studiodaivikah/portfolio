import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// Define the project type
type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  updatedAt?: string;
};

type PortfolioData = {
  projects: Project[];
};

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

// Read portfolio data
const readPortfolioData = (): PortfolioData => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    }
    return { projects: [] };
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return { projects: [] };
  }
};

// Write portfolio data
const writePortfolioData = (data: PortfolioData): boolean => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return false;
  }
};

// Helper to extract ID from request
const getIdFromRequest = (request: NextRequest): string => {
  const segments = request.nextUrl.pathname.split("/");
  return segments[segments.length - 1];
};

// GET - Read single project
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const data = readPortfolioData();
    const project = data.projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read project" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const body = (await request.json()) as Partial<Project>;
    const { type, title, image } = body;

    if (!type || !title || !image) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, image" },
        { status: 400 }
      );
    }

    const data = readPortfolioData();
    const projectIndex = data.projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      type,
      title,
      image,
      updatedAt: new Date().toISOString(),
    };

    if (writePortfolioData(data)) {
      return NextResponse.json(data.projects[projectIndex]);
    } else {
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const data = readPortfolioData();
    const projectIndex = data.projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const deletedProject = data.projects.splice(projectIndex, 1)[0];

    if (writePortfolioData(data)) {
      return NextResponse.json(deletedProject);
    } else {
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
