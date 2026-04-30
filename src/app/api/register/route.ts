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

    const mentor = await getMentorWithSlots(parsed.data.mentorId);
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

    // Fire-and-log: forward to Power Automate so it lands in SharePoint.
    // Local JSON is the source of truth; SharePoint failure should not block the user.
    const flowUrl = process.env.POWER_AUTOMATE_URL;
    if (flowUrl) {
      try {
        const res = await fetch(flowUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mentorName: mentor.name,
            menteeAlias: parsed.data.alias,
          }),
        });
        if (!res.ok) {
          console.error(
            "Power Automate POST failed:",
            res.status,
            await res.text()
          );
        }
      } catch (err) {
        console.error("Power Automate POST error:", err);
      }
    }

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
