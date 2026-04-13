export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden">
      {/* Astrolabe geometric decoration — matching Dipsea screenshot */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        width="900"
        height="900"
        viewBox="0 0 900 900"
        fill="none"
        style={{ opacity: 0.15 }}
      >
        {/* Outer circles */}
        <circle cx="450" cy="450" r="420" stroke="#e8d4a2" strokeWidth="0.5" />
        <circle cx="450" cy="450" r="340" stroke="#e8d4a2" strokeWidth="0.5" />
        <circle cx="450" cy="450" r="260" stroke="#e8d4a2" strokeWidth="0.5" />
        <circle cx="450" cy="450" r="180" stroke="#e8d4a2" strokeWidth="0.5" />

        {/* Cross lines */}
        <line x1="0" y1="450" x2="900" y2="450" stroke="#e8d4a2" strokeWidth="0.5" />
        <line x1="450" y1="0" x2="450" y2="900" stroke="#e8d4a2" strokeWidth="0.5" />

        {/* Diagonal lines */}
        <line x1="118" y1="118" x2="782" y2="782" stroke="#e8d4a2" strokeWidth="0.3" />
        <line x1="782" y1="118" x2="118" y2="782" stroke="#e8d4a2" strokeWidth="0.3" />

        {/* Dots on the circles — filled and hollow */}
        <circle cx="450" cy="30" r="4" fill="#e8d4a2" />
        <circle cx="450" cy="870" r="4" stroke="#e8d4a2" strokeWidth="1" fill="none" />
        <circle cx="30" cy="450" r="4" stroke="#e8d4a2" strokeWidth="1" fill="none" />
        <circle cx="870" cy="450" r="4" stroke="#e8d4a2" strokeWidth="1" fill="none" />

        <circle cx="450" cy="110" r="3" fill="#e8d4a2" />
        <circle cx="450" cy="790" r="3" stroke="#e8d4a2" strokeWidth="1" fill="none" />

        {/* Small crescents / arc accents */}
        <circle cx="350" cy="190" r="5" fill="#e8d4a2" opacity="0.6" />
        <circle cx="550" cy="190" r="5" fill="#e8d4a2" opacity="0.6" />
        <circle cx="300" cy="710" r="4" stroke="#e8d4a2" strokeWidth="1" fill="none" />
        <circle cx="600" cy="710" r="4" stroke="#e8d4a2" strokeWidth="1" fill="none" />

        {/* Side dots */}
        <circle cx="190" cy="450" r="3" stroke="#e8d4a2" strokeWidth="1" fill="none" />
        <circle cx="340" cy="450" r="3" fill="#e8d4a2" />
        <circle cx="560" cy="450" r="3" fill="#e8d4a2" />
        <circle cx="710" cy="450" r="3" stroke="#e8d4a2" strokeWidth="1" fill="none" />

        {/* Inner decorative arcs */}
        <path d="M 300 200 A 200 200 0 0 1 600 200" stroke="#e8d4a2" strokeWidth="0.4" fill="none" />
        <path d="M 300 700 A 200 200 0 0 0 600 700" stroke="#e8d4a2" strokeWidth="0.4" fill="none" />
      </svg>

      {/* Central circular image frame */}
      <div className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden border border-[rgba(232,212,162,0.2)] mb-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        <img
          src="https://images.pexels.com/photos/7021652/pexels-photo-7021652.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Mentorship"
          className="w-full h-full object-cover opacity-70 grayscale-[30%] sepia-[20%] brightness-[0.7]"
        />
        {/* Title overlaid on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light italic text-gold-light tracking-[-0.02em] leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Find Your
            <br />
            Mentor
          </h1>
        </div>
      </div>

      <p className="relative z-10 mx-auto max-w-md text-[1.1rem] text-gold-mid opacity-70 italic leading-relaxed mt-2">
        Connect with experienced professionals ready to guide your journey.
        Each mentor offers 2 slots.
      </p>

      {/* Bottom separator line like Dipsea */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gold-trace" />
    </section>
  );
}
