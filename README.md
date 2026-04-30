# production-ready AI CRM Dashboard

Production-ready AI Sales Operating System — a modern, responsive CRM dashboard built with Next.js (App Router), React, Tailwind CSS and Supabase.

This repository contains a polished demo-level application focused on fast developer iteration and production readiness: realtime data sync, accessible UI, mobile-first responsive layout, and clear integration points for LLMs and email delivery.

# AI Sales Operating System — Senior Project Pitch

## Elevator pitch

A production-ready, modern CRM dashboard prototype built to demonstrate end-to-end product thinking and engineering execution for AI-enabled sales workflows. It combines realtime data sync, a polished SaaS UI, and clear integration points for LLM augmentation and transactional email delivery.

## Why this project sells

- Product-first engineering: the UI and flows are designed for sales agents (lead list, quick actions, email drafts, next actions), not just demo screens.
- Production-readiness in mind: realtime Postgres subscriptions (Supabase), accessibility fixes, PropTypes validation, and a mobile-first responsive layout.
- Clear integration surface: LLM assistant, email API endpoints, and Supabase auth/RLS hooks are isolated so they can be hardened for production without large refactors.

## Who this is for

- Recruiters: a compact demo to validate frontend architecture, product thinking, and experience with realtime systems.
- Hiring managers: a candidate portfolio piece that shows ownership across design, frontend engineering, and integration with backend services.
- Technical reviewers: clear, focused code paths for realtime updates, debounced search, and accessible UI components.

## Notable technical highlights (talking points)

- Built with Next.js (App Router) + React 18 and Tailwind CSS for a modern frontend stack.
- Realtime data with Supabase Postgres subscriptions replacing polling for instant UI updates.
- Component-level PropTypes, keyboard-accessible overlays/drawers, and improved semantics for a11y.
- Debounced search and client-side filter composition for fast, predictable UX.
- Modular integrations: `lib/supabase.js`, `components/ChatPanel.jsx` (assistant surface), and `components/LeadDetailPanel.jsx` (actionable items).

## Feature summary (what the product does)

- Lead list with search, company and lead score filters.
- Responsive LeadTable that collapses gracefully on small screens.
- Right-hand LeadDetailPanel with practical actions: `Copy Email`, `Mark Done` (updates DB), and `Send Email` (mailto integration).
- Assistant panel (mock) demonstrating LLM-driven quick prompts and summaries.
- Realtime updates when leads change in the database.

## Suggested resume / recruiter-ready bullets

- Designed and implemented a modern CRM dashboard using Next.js, React, and Tailwind; implemented realtime Postgres subscriptions with Supabase to replace polling and ensure instantaneous UI updates.
- Led Sprint 5 to completion: migrated to realtime updates, implemented responsive UI across major components, and hardened accessibility and component validation.
- Architected clean integration points for LLM augmentation and transactional email APIs, enabling future secure server-side deployments without client refactors.

## How to run (quick)

1. Copy environment variables into `.env.local` (DO NOT commit):

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Install and start:

```bash
npm install
npm run dev
```

3. Open http://localhost:3000 and navigate to `/leads`.

## Repository layout (quick reference)

- `app/` — Next.js routes and pages, main entry is `app/leads/page.js`.
- `components/` — Reusable UI components: `LeadTable`, `LeadFilters`, `LeadDetailPanel`, `ChatPanel`.
- `lib/` — `supabase.js` client and `useDebounce.js` helper.
- `styles/` — Tailwind global styles.

## Supabase and security notes

- The app reads leads from a `leads` table and subscribes to `postgres_changes` for that table. In development you may disable RLS to inspect data; in production enable RLS and add policies scoped to authenticated users.
- Replace the client-side LLM usage with a server-side proxy or server action to protect API keys before production deployment.

## Conversation and interview prompts (what to ask me)

- Why choose Supabase realtime over polling for this UI? (Discuss latency, efficiency, and UX implications.)
- Which parts of the UI required accessibility fixes and why? (Discuss overlays, keyboard focus, and semantics.)
- How would you securely integrate a production LLM here? (Discuss server-side proxy, rate limits, caching, and cost control.)

## Roadmap & production hardening

- Add Supabase Auth and RLS policies for multi-tenant access control.
- Implement server-side LLM integration with request validation and rate limiting.
- Add transactional email provider (SendGrid/Postmark) and queueing for reliability.
- CI and E2E tests (Playwright) and automatic deployments (Vercel/Github Actions).

## Contact / Demo

If you'd like a live walkthrough, sample credentials for a demo Supabase project, or a short recorded demo, reach out and I will share them.

— Senior Engineer / Product-focused Frontend

Contact
For help expanding this into a production-ready service (auth, billing, LLM integration, email), open an issue or contact the maintainer.

— senior dev
