// app/api/portfolio/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read portfolio data
const readPortfolioData = () => {
  ensureDataDirectory();
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
const writePortfolioData = (data) => {
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
export async function GET() {
  try {
    const data = readPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read portfolio data" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, title, image } = body;

    if (!type || !title || !image) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, image" },
        { status: 400 }
      );
    }

    const data = readPortfolioData();
    const newProject = {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
