# MYITRA Social Enterprise website

Official website for MYITRA Social Enterprise (under INTI International College Subang): a long-scroll home page, a Kotak Cantik page, and a working enquiry form.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/myitra` — the website (React + Vite, served at `/`). Pages in `src/pages`, sections in `src/components/home`, header/footer in `src/components/site`.
- `artifacts/myitra/public/images` — logos and real photos (converted from the user's HEIC uploads).
- `lib/api-spec/openapi.yaml` — `POST /api/enquiries`; `lib/db/src/schema/enquiries.ts` — enquiries table.
- `attached_assets/Pasted-PROJECT-...txt` — the user's full content/design spec (source of truth for copy).

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- Use ONLY the content the user provided; never invent stats, testimonials, names, awards or partners. Do not expand "USEC". No stock photos of people; use labelled placeholders where photos are missing.
- Bracketed placeholders ([EMAIL], [PHONE], [FULL ADDRESS], socials) are intentional until the user supplies real details.

## Gotchas

- Custom site CSS classes in `artifacts/myitra/src/index.css` must stay inside `@layer components`; unlayered rules (e.g. `.wrap { padding }`) override Tailwind spacing utilities.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
