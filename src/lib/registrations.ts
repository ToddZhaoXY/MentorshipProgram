import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { type Registration, type SignupFormData } from "./validators";

const DATA_PATH = path.join(process.cwd(), "data", "registrations.json");

export function getRegistrations(): Registration[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    // Read-only filesystem (Vercel) or missing file — SharePoint is source of truth.
    return [];
  }
}

export function addRegistration(data: SignupFormData): Registration {
  const registration: Registration = {
    id: uuidv4(),
    mentorId: data.mentorId,
    alias: data.alias,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  // Best-effort local write (works in dev, no-ops on Vercel's read-only FS).
  try {
    const registrations = getRegistrations();
    registrations.push(registration);
    const tmpPath = DATA_PATH + ".tmp";
    fs.writeFileSync(tmpPath, JSON.stringify(registrations, null, 2), "utf-8");
    fs.renameSync(tmpPath, DATA_PATH);
  } catch (err) {
    console.warn("Local registration write skipped:", err);
  }

  return registration;
}
