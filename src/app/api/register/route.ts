import { NextRequest, NextResponse } from "next/server";
import { signupFormSchema } from "@/lib/validators";
import { getMentorWithSlots } from "@/lib/mentors";
import { addRegistration } from "@/lib/registrations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signupFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const mentor = getMentorWithSlots(parsed.data.mentorId);
    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    if (mentor.slotsRemaining <= 0) {
      return NextResponse.json(
        { error: "No slots available for this mentor" },
        { status: 409 }
      );
    }

    const registration = addRegistration(parsed.data);

    return NextResponse.json(
      { message: "Registration successful", registration },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
