import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#130e0c] to-transparent">
      <div className="flex items-center justify-between px-8 sm:px-16 py-8">
        <Link href="/" className="block hover:opacity-80 transition-opacity duration-400">
          <img
            src="/studio8-logo.png"
            alt="Studio 8"
            className="h-8"
          />
        </Link>
        <nav className="flex gap-8 text-[0.9rem]">
          <Link
            href="/"
            className="text-gold-mid hover:text-gold-light transition-colors duration-400"
          >
            Mentors
          </Link>
          <Link
            href="/admin"
            className="text-gold-mid hover:text-gold-light transition-colors duration-400"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
