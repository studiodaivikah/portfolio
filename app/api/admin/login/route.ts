// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Dummy admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "secret123";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return NextResponse.json(
      { message: "Login successful", isAdmin: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Invalid credentials", isAdmin: false },
      { status: 401 }
    );
  }
}
