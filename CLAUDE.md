@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mentorship Program Website — a Next.js app that displays mentor cards, allows users to sign up for mentorship slots, and provides an admin view for registrations.

## Build & Development

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS v4 + shadcn/ui** — UI components in `src/components/ui/`
- **Zod** — form validation (shared client/server)
- **JSON files** — `data/mentors.json` (mentor profiles), `data/registrations.json` (signups)

## Architecture

- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — React components (Header, Footer, MentorCard, SignupForm, etc.)
- `src/lib/` — Data layer (mentors.ts, registrations.ts), validators (Zod schemas), utils
- `data/` — JSON data files (mentors config + registration storage)
- `public/mentors/` — Mentor headshot images

## Key Patterns

- Mentor data is read from `data/mentors.json` (manually edited)
- Registrations are appended to `data/registrations.json` via atomic write (temp file + rename)
- Each mentor has `maxSlots` (default 2); available slots computed by subtracting confirmed registrations
- Admin page at `/admin` is password-protected via `ADMIN_PASSWORD` env var
