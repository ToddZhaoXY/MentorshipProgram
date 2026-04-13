import { NextRequest, NextResponse } from "next/server";
import { getRegistrations } from "@/lib/registrations";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const registrations = getRegistrations();
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json(
      { error: "Failed to load registrations" },
      { status: 500 }
    );
  }
}
