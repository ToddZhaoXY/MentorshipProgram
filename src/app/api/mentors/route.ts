import { NextResponse } from "next/server";
import { getMentorsWithSlots } from "@/lib/mentors";

export async function GET() {
  try {
    const mentors = getMentorsWithSlots();
    return NextResponse.json(mentors);
  } catch {
    return NextResponse.json(
      { error: "Failed to load mentors" },
      { status: 500 }
    );
  }
}
