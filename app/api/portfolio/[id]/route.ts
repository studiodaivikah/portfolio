import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

const readPortfolioData = () => {
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

const writePortfolioData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return false;
  }
};

// GET - Read single project
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const data = readPortfolioData();
    const project = data.projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read project" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
