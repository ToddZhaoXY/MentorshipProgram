import Link from "next/link";
import { SlotBadge } from "@/components/SlotBadge";
import { type MentorWithSlots } from "@/lib/mentors";

interface MentorCardProps {
  mentor: MentorWithSlots;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/mentors/${mentor.id}`} className="group block">
      {/* Tall portrait image */}
      <div className="aspect-[3/4] bg-[#1a1512] mb-5 overflow-hidden border border-gold-trace transition-all duration-500 group-hover:border-gold-dim">
        <img
          src={mentor.photoUrl}
          alt={mentor.name}
          className="w-full h-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          style={{ filter: "grayscale(30%) sepia(15%) brightness(0.8)" }}
        />
      </div>

      {/* Company */}
      <span className="text-[0.75rem] uppercase tracking-[0.25em] text-gold-dark mb-2 block">
        {mentor.company}
      </span>

      {/* Name */}
      <h3 className="text-[1.5rem] text-gold-light italic font-normal leading-tight">
        {mentor.name}
      </h3>
      <p className="text-[1rem] text-gold-dark italic mt-1">
        {mentor.title}
      </p>

      {/* Slot availability — prominent */}
      <div className="mt-4 mb-3">
        <SlotBadge
          slotsRemaining={mentor.slotsRemaining}
          maxSlots={mentor.maxSlots}
          size="lg"
        />
      </div>

      {/* Expertise tags */}
      <div className="flex flex-wrap gap-2">
        {mentor.expertise.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 border border-gold-trace text-[0.8rem] text-gold-dark italic rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}
