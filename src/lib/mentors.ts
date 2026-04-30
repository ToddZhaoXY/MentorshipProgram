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

interface SharePointRow {
  mentors?: string;
  Mentees?: string;
}

async function fetchSharePointCounts(): Promise<Map<string, number>> {
  const url = process.env.POWER_AUTOMATE_SLOTS_URL;
  if (!url) return new Map();
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("Slot counts fetch failed:", res.status);
      return new Map();
    }
    const rows: SharePointRow[] = await res.json();
    const counts = new Map<string, number>();
    for (const row of rows) {
      const name = row.mentors?.trim();
      if (!name) continue;
      const mentees = (row.Mentees || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      counts.set(name, mentees.length);
    }
    return counts;
  } catch (err) {
    console.error("Slot counts fetch error:", err);
    return new Map();
  }
}

export async function getMentorsWithSlots(): Promise<MentorWithSlots[]> {
  const mentors = getMentors();
  const localRegs = getRegistrations();
  const remoteCounts = await fetchSharePointCounts();

  return mentors.map((mentor) => {
    const localTaken = localRegs.filter(
      (r) => r.mentorId === mentor.id && r.status === "confirmed"
    ).length;
    const remoteTaken = remoteCounts.get(mentor.name) ?? 0;
    const taken = Math.max(localTaken, remoteTaken);
    return {
      ...mentor,
      slotsRemaining: Math.max(0, mentor.maxSlots - taken),
    };
  });
}

export async function getMentorWithSlots(
  id: string
): Promise<MentorWithSlots | undefined> {
  const all = await getMentorsWithSlots();
  return all.find((m) => m.id === id);
}
