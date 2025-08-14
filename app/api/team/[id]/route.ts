import prisma from "@/lib/Client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  
  try {
    const teamMember = await prisma.team.findUnique({ where: { id } });
    
    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  
  try {
    const { image, name, role } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    
    const updatedTeamMember = await prisma.team.update({
      where: { id },
      data: { image, name, role },
    });
    
    return NextResponse.json(updatedTeamMember);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  
  try {
    const deletedTeamMember = await prisma.team.delete({ where: { id } });
    return NextResponse.json(deletedTeamMember);
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}