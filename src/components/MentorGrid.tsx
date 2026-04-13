import { MentorCard } from "@/components/MentorCard";
import { type MentorWithSlots } from "@/lib/mentors";

interface MentorGridProps {
  mentors: MentorWithSlots[];
}

export function MentorGrid({ mentors }: MentorGridProps) {
  if (mentors.length === 0) {
    return (
      <p className="text-center text-gold-dark italic py-12">
        No mentors available at this time. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
}
