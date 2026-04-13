export function Footer() {
  return (
    <footer className="border-t border-gold-trace py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark italic">
        &copy; {new Date().getFullYear()} Mentorship Program &middot; All rights
        reserved
      </div>
    </footer>
  );
}
