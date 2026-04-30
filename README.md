# AI CRM Automation System

## Overview

Modern sales teams lose time to manual lead triage, enrichment, and follow-up drafting. This AI CRM automation system replaces that repetitive work with an automated pipeline: leads enter via a workflow, AI qualifies and enriches them, data is persisted, and a realtime dashboard surfaces next actions. The result is a fast, consistent, and scalable alternative to traditional SaaS CRMs for high-velocity pipelines.

This project explicitly uses n8n as the orchestration and workflow automation engine.

## Features

- n8n workflow automation as the orchestration layer
- AI lead qualification and scoring
- Automated CRM enrichment (summary, email draft, next action)
- Supabase persistence for structured lead data
- Realtime dashboard for live lead monitoring
- AI-generated sales actions for rapid follow-up

## Architecture

```
Lead Input
	↓
n8n Workflow Engine
	↓
OpenRouter / Claude
	↓
JSON Parsing
	↓
Supabase
	↓
Dashboard UI
```

## Tech Stack

| Layer         | Technology                     | Purpose                                                           |
| ------------- | ------------------------------ | ----------------------------------------------------------------- |
| Orchestration | n8n                            | Workflow automation engine for ingestion, scoring, and AI routing |
| AI Gateway    | OpenRouter                     | Unified API gateway for LLM access                                |
| LLM           | Claude 3 Haiku                 | Lead analysis, summary generation, and next actions               |
| Database      | Supabase (Postgres + Realtime) | Persistence and realtime updates                                  |
| Frontend      | Next.js                        | Dashboard UI and client-side data views                           |
| Styling       | Tailwind CSS                   | Utility-first design system                                       |

## Why n8n

n8n was chosen as the orchestration engine because it offers a low-code, scalable, and fast-to-iterate workflow layer. It enables rapid internal SaaS development without building a full backend for every integration. With built-in retries, branching logic, and node-level observability, n8n provides production-style automation while keeping workflows editable and transparent.

Key reasons:

- Low-code workflow orchestration for faster iteration
- Scalable automation patterns with retries and conditional branching
- Rapid internal SaaS development without heavy backend overhead

## Demo Video

Video link: https://drive.google.com/file/d/18-YoUNdFuBU6WPSZskO71uEb8VYEvgYI/view?usp=sharing

## Setup Instructions

1. Clone the repo and install dependencies.

```bash
npm install
```

2. Configure environment variables.

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENROUTER_API_KEY=your-openrouter-key
```

3. Start the dashboard.

```bash
npm run dev
```

4. Import and configure the n8n workflow with your OpenRouter and Supabase credentials.

## Business Impact

This system simulates replacing traditional CRM SaaS by automating lead qualification, enrichment, and action generation. It reduces time-to-first-action, improves consistency in outreach, and scales lead operations without increasing headcount. The realtime dashboard provides immediate operational visibility and shortens feedback loops across sales teams.

## Future Improvements

- Email sending
- Slack alerts
- Real-time AI assistant
- Multi-agent workflows

## Key Learnings

Learning and delivering a production-style n8n workflow in a short time demonstrates rapid adaptation to low-code business automation ecosystems.
