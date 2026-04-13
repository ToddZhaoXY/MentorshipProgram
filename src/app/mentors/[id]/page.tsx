import { notFound } from "next/navigation";
import { SlotBadge } from "@/components/SlotBadge";
import { SignupForm } from "@/components/SignupForm";
import { getMentorWithSlots } from "@/lib/mentors";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MentorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mentor = getMentorWithSlots(id);

  if (!mentor) {
    notFound();
  }

  return (
    <div>
      {/* Hero section: arch portrait left, content right — like the Julian screenshot */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
        {/* Left: Arch-shaped portrait */}
        <div className="relative flex items-center justify-center p-6 pt-24 md:p-10 md:pt-12">
          {/* Subtle astrolabe geometry behind portrait */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] pointer-events-none"
            viewBox="0 0 1000 1000"
          >
            <circle cx="500" cy="500" r="400" fill="none" stroke="#e8d4a2" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="350" fill="none" stroke="#e8d4a2" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="100" y1="500" x2="900" y2="500" stroke="#e8d4a2" strokeWidth="0.5" />
            <line x1="500" y1="100" x2="500" y2="900" stroke="#e8d4a2" strokeWidth="0.5" />
          </svg>

          <div
            className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden border border-[rgba(232,212,162,0.15)]"
            style={{ borderRadius: "500px 500px 0 0" }}
          >
            <img
              src={mentor.photoUrl}
              alt={mentor.name}
              className="w-full h-full object-cover"
              style={{
                filter: "grayscale(40%) sepia(20%) brightness(0.8)",
                transform: "scale(1.05)",
              }}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10 md:pr-16">
          <Link
            href="/"
            className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark hover:text-gold-light transition-colors duration-400"
          >
            &larr; Back to all mentors
          </Link>

          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark">
              Mentor Profile
            </span>
            <h1
              className="text-gold-light mt-2 font-normal tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {mentor.name}
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {mentor.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 border border-gold-trace text-[0.9rem] text-gold-mid italic rounded-full transition-colors duration-300 hover:border-gold-dim"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[1.15rem] text-gold-mid opacity-80 italic max-w-[500px] leading-relaxed">
            {mentor.bio}
          </p>

          <div>
            <p className="text-gold-dark italic text-[0.95rem]">
              {mentor.title} &middot; {mentor.company}
            </p>
            {mentor.availability && (
              <p className="text-gold-mid opacity-60 text-[0.85rem] italic mt-1">
                {mentor.availability}
              </p>
            )}
            {mentor.contact && (
              <p className="text-gold-dark text-[0.8rem] mt-1">
                Contact: <span className="text-gold-mid italic">{mentor.contact}</span>
              </p>
            )}
            {mentor.linkedin && (
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.8rem] text-gold-mid underline underline-offset-4 decoration-gold-trace hover:decoration-gold-mid transition-colors duration-300 mt-1"
              >
                LinkedIn Profile
              </a>
            )}
            <div className="mt-2">
              <SlotBadge
                slotsRemaining={mentor.slotsRemaining}
                maxSlots={mentor.maxSlots}
                size="lg"
              />
            </div>
          </div>

          {/* Signup form in a featured box — like the "Featured Performance" box */}
          <div className="border border-gold-trace p-6 relative mt-2">
            <span className="absolute -top-2.5 left-5 bg-[#130e0c] px-2.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark">
              Sign Up
            </span>
            <h3 className="text-2xl text-gold-light font-normal mb-1">
              Begin Your Mentorship
            </h3>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark opacity-60 mb-4">
              {mentor.slotsRemaining} of {mentor.maxSlots} slots remaining
            </p>
            <SignupForm
              mentorId={mentor.id}
              mentorName={mentor.name}
              slotsRemaining={mentor.slotsRemaining}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
