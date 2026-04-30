# production-ready AI CRM Dashboard

Production-ready AI Sales Operating System — a modern, responsive CRM dashboard built with Next.js (App Router), React, Tailwind CSS and Supabase.

This repository contains a polished demo-level application focused on fast developer iteration and production readiness: realtime data sync, accessible UI, mobile-first responsive layout, and clear integration points for LLMs and email delivery.

Key highlights

- Modern Next.js App Router structure with client components for interactive UI.
- Tailwind CSS utility-first styling with a polished SaaS-like visual system.
- Supabase JS client for database and realtime Postgres changes (replaces polling with Realtime Postgres subscriptions).
- Accessible components, PropTypes validation, and mobile-first responsive design.
- Clean separation of concerns (filters, table, detail panel, assistant/chat panel).

Quick demo

1. Create a Supabase project and add a `leads` table (see Schema below).
2. Add environment variables to `.env.local` (see `.env.example`).
3. Run locally:

```bash
npm install
npm run dev
```

Architecture & design

- Frontend: Next.js 13 (App Router) + React 18. Client components live under `app/` and individual UI pieces are in `components/`.
- Styling: Tailwind CSS configured in `styles/globals.css` and `tailwind.config.js`.
- Data: Supabase client instantiation in `lib/supabase.js`. Realtime subscriptions are created in `app/leads/page.js`.
- Patterns: Debounced search (`lib/useDebounce.js`), PropTypes validation for key components, and accessible overlay/drawer patterns.

Sprint summary (Senior-level overview)

- Sprint 1 — Project scaffolding, Tailwind, basic Lead listing, and Supabase client integration.
- Sprint 2 — Advanced filters, debounced search, and improved LeadTable UX.
- Sprint 3 — LeadDetailPanel with actionable items (Copy Email, Mark Done, Send Email), PropTypes added.
- Sprint 4 — Chat assistant (mock) rewritten to a professional SaaS assistant UI, accessible overlays, and UX polish.
- Sprint 5 — Replaced polling with Supabase realtime subscriptions; responsive/mobile-first pass; accessibility and lint fixes.

Environment variables
Create a `.env.local` (DO NOT COMMIT). Example keys required by the app are:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Add a `.env.example` entry to share keys without secrets.

Supabase notes

- Row Level Security (RLS): In development you may disable RLS to inspect data. For production, enable RLS and create appropriate policies for your users.
- Realtime: The app subscribes to Postgres changes on the `leads` table. Ensure your Supabase project allows realtime for that table.

Key files

- `app/leads/page.js` — main Leads page, handles fetch, filters, selection, and realtime subscription.
- `components/LeadTable.jsx` — responsive table and row interactions.
- `components/LeadFilters.jsx` — search, company/score selects and debounced search.
- `components/LeadDetailPanel.jsx` — right-hand detail drawer with actions (Mark Done, Copy Email, Send Email).
- `components/ChatPanel.jsx` — assistant UI (mock currently) for summarization and quick actions.
- `lib/supabase.js` — Supabase client initialization.
- `lib/useDebounce.js` — helper hook used for debounced search.
- `styles/globals.css` — Tailwind base and global theming.

Database schema (example)

```sql
create table public.leads (
   id uuid primary key default gen_random_uuid(),
   name text,
   email text,
   company text,
   lead_score text,
   summary text,
   next_action text,
   created_at timestamptz default now()
);
```

Security & secrets

- Never commit `.env.local` or secret keys. Use `.gitignore` to exclude them.
- Consider using GitHub Actions secrets or Vercel/Netlify environment settings for deployment.

Deployment

- Recommended: Vercel for Next.js with automatic builds. Set the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project settings.
- Alternative: Deploy static and server components separately or use a container-based deployment; ensure runtime env variables are set.

Next steps / Roadmap

- Replace mock assistant with a production LLM integration (OpenAI/Anthropic/etc.) behind a server-side proxy or server action to protect keys.
- Implement transactional email API (SendGrid/Postmark) for `Send Email` flows.
- Harden RLS policies, add authentication (Supabase Auth), and add audit logging.
- Add end-to-end tests and CI (Playwright/Cypress + GitHub Actions).

Contact
For help expanding this into a production-ready service (auth, billing, LLM integration, email), open an issue or contact the maintainer.

— senior dev
