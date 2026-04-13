import fs from "fs";
import path from "path";
import { type Mentor } from "./validators";
import { getRegistrations } from "./registrations";

const DATA_PATH = path.join(process.cwd(), "data", "mentors.json");

export function getMentors(): Mentor[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getMentorById(id: string): Mentor | undefined {
  return getMentors().find((m) => m.id === id);
}

export interface MentorWithSlots extends Mentor {
  slotsRemaining: number;
}

export function getMentorsWithSlots(): MentorWithSlots[] {
  const mentors = getMentors();
  const registrations = getRegistrations();

  return mentors.map((mentor) => {
    const taken = registrations.filter(
      (r) => r.mentorId === mentor.id && r.status === "confirmed"
    ).length;
    return {
      ...mentor,
      slotsRemaining: Math.max(0, mentor.maxSlots - taken),
    };
  });
}

export function getMentorWithSlots(id: string): MentorWithSlots | undefined {
  return getMentorsWithSlots().find((m) => m.id === id);
}
