import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { type Registration, type SignupFormData } from "./validators";

const DATA_PATH = path.join(process.cwd(), "data", "registrations.json");

export function getRegistrations(): Registration[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function addRegistration(data: SignupFormData): Registration {
  const registrations = getRegistrations();

  const registration: Registration = {
    id: uuidv4(),
    mentorId: data.mentorId,
    name: data.name,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  registrations.push(registration);

  // Atomic write via temp file + rename
  const tmpPath = DATA_PATH + ".tmp";
  fs.writeFileSync(tmpPath, JSON.stringify(registrations, null, 2), "utf-8");
  fs.renameSync(tmpPath, DATA_PATH);

  return registration;
}
