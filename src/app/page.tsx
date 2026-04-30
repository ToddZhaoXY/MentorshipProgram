import { HeroSection } from "@/components/HeroSection";
import { MentorGrid } from "@/components/MentorGrid";
import { getMentorsWithSlots } from "@/lib/mentors";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const mentors = await getMentorsWithSlots();

  return (
    <>
      <HeroSection />
      <section className="max-w-[1200px] mx-auto px-8 sm:px-16 pb-20">
        <div className="border-b border-gold-trace pb-6 mb-10 flex justify-between items-end">
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark">
              Available Guides
            </span>
            <h2 className="text-3xl italic text-gold-light font-normal mt-1">
              Our Mentors
            </h2>
          </div>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark">
            {mentors.length} Mentors
          </span>
        </div>
        <MentorGrid mentors={mentors} />
      </section>
    </>
  );
}
