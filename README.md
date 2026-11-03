# MYITRA Social Enterprise

**A community impact website I worked on for MYITRA Social Enterprise at INTI International College Subang, Malaysia.**

The site introduces MYITRA's mission and its flagship initiative, **Kotak Cantik**—a hygiene care box and community-based social entrepreneurship programme supporting women and teenage girls.

## Project highlights

- A responsive, multi-section MYITRA website covering its story, vision, missions, impact and TUNAS accreditation.
- A dedicated Kotak Cantik profile with an interactive 3D box explorer, impact survey, business model, programme stories and an illustrated history timeline.
- An interactive Sustainable Development Goals viewer with supplied campaign artwork.
- Real project photography, custom motion effects, accessible navigation and reduced-motion support.
- An enquiry form connected to the project's API. Automatic email delivery requires an email provider; until one is configured, the form offers a prefilled email draft for visitors to send.

## Technology

- React, TypeScript and Vite
- Tailwind CSS
- Framer Motion
- Three.js with React Three Fiber
- Express API
- Zod, Drizzle ORM and PostgreSQL
- pnpm workspace monorepo

## Project structure

```text
artifacts/myitra/       MYITRA and Kotak Cantik website
artifacts/api-server/   Enquiry API
lib/                    Shared API, validation and database packages
```

## Development

Install the workspace dependencies with `pnpm install`. In Replit, run the configured **API Server** and **web** workflows to start the application. The web workflow supplies Vite's required port and base-path settings.

Run the web app's type check with:

```bash
pnpm --filter @workspace/myitra run typecheck
```

## About the project

MYITRA Social Enterprise is associated with INTI International College Subang. Kotak Cantik began as a student-led community initiative and has developed into a social enterprise focused on hygiene access, women's skills development and income opportunities.

This repository presents the website and its software; it does not include private beneficiary contact details.
