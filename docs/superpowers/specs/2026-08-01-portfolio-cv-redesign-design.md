# Portfolio CV Redesign — Design Spec

**Date:** 2026-08-01  
**Status:** Approved for planning  
**Source of truth:** `public/cv.pdf`  
**Locales:** EN + VI (next-intl)

## 1. Goals

### Primary audience
Recruiters and hiring managers scanning in ~6–30 seconds. The page must answer: who you are, what you ship, stack signal, and how to contact / open the CV.

### Secondary audience
Clients and collaborators. Contact copy covers both full-time/contract hiring and project collaboration without splitting into two landings.

### Non-goals
- Blog, fake testimonials, skill progress bars
- Live GitHub contribution widgets
- Separate “Hire me” vs “Work with me” landing modes
- Full dark-mode redesign as a separate product (keep `prefers-color-scheme`; retune tokens only)

## 2. Approach

**Evidence-first refresh + project case-study routes**

- Keep the existing Next.js App Router, next-intl, Framer Motion, and Docker deploy path.
- Redesign visual system (Engineer studio) and sync all copy/config to the CV.
- Homepage stays a single scannable composition.
- Add `/[locale]/projects/[id]` for CASE-format depth (later-funnel hiring managers and client pitch).

## 3. Visual system

### Direction
Engineer studio: clarity and scannability over spectacle. Borrow editorial whitespace and typography hierarchy; do not adopt sparse brochure layouts that cut CV density.

### Color
- Replace purple/indigo brand tokens and gradient brand text defaults.
- Warm-neutral or cool-ink surfaces with **one** accent (teal / steel-blue).
- Avoid AI-default looks: purple-on-white, cream+terracotta, broadsheet hairline newspaper layouts, heavy glow.

### Typography
- Expressive display sans for brand name and section titles.
- Readable sans for body (mono is not the default body face; reserve mono for labels/tech chips if useful).

### Atmosphere & motion
- Subtle gradient/mesh or texture for atmosphere; no particle backgrounds.
- 2–3 intentional motions: hero entrance, section reveal, project hover/focus.
- Drop or demote the tech marquee if it competes with the 6-second scan.

### Cards
- Default: no cards for static content.
- Cards allowed for interactive containers: project → detail, contact form.

## 4. Information architecture

### Homepage order
1. **Hero** — brand-first name, one headline, one supporting sentence (CV professional summary compressed), CTAs: Projects / Contact / Open CV; socials visible
2. **Featured work** — one standout project (Kotae) with one-line outcome + link to case study
3. **Experience** — reverse-chronological timeline with CV-aligned bullets
4. **Projects** — curated grid (3–5) linking to case studies; live/repo or “no public link”
5. **About + Skills** — short about from CV summary; skills grouped like CV
6. **Education** — Dai Nam University entry
7. **Resume** — CV PDF CTA
8. **Contact** — dual-audience copy + existing form + visible email/socials

### New routes
| Route | Purpose |
|-------|---------|
| `/[locale]/projects/[id]` | CASE case study for each `PROJECT_IDS` entry |

Nav: keep section anchors; project detail uses locale-aware Link back to `#projects` or `/[locale]#projects`.

## 5. Content model (CV sync)

### Hero / About
- Align with CV professional summary: full-stack TypeScript / Next.js / Nest.js; primary DevOps on client work (Terraform, Docker, GitHub Actions, AWS); three concurrent client products; English with overseas POs/designers.
- Brand name (“Dai An” / “Đại An”) must be a hero-level signal, not only nav text.

### Experience
Ids remain `softwareEngineer` (current) and `softwareIntern`.

**Software Engineer (Oct 2024 – Present)** — bullets covering:
- Promoted from intern within six months; end-to-end on three concurrent client products (teams 5–15)
- Primary DevOps: Terraform + GitHub Actions templates reused across clients
- Type-safe OpenAPI-generated API contracts
- Gitflow review + architecture docs for ramp-up
- English collaboration with overseas POs/designers

**Software Intern (Apr 2024 – Oct 2024)** — bullets covering:
- Built Gitman (Vue.js, TypeScript, Nest.js, MongoDB) company-wide
- Vue 3 / TypeScript features on production HRM; moved to client work

### Projects
Canonical order everywhere: `kotae`, `starlive`, `ercBooking`, `hrm`, `portfolio`.

Homepage **Featured work** is a dedicated block (not a second grid) highlighting `kotae` only, linking to `/[locale]/projects/kotae` and the live site when present. The Projects grid lists all five in canonical order; cards primarily navigate to the case-study route (external live/repo links also appear on the case-study page and optionally as secondary actions on cards).

Each project config + i18n must include:
- title, period, role, team size/context, one-liner, 3–5 impact bullets, stack tags
- `href` when public (Kotae live site, portfolio GitHub); otherwise explicit no-public-link UX

Case study page maps the same fields into CASE sections:
- **Problem / context** — product one-liner
- **Role** — role + team
- **Approach** — selected bullets (technical ownership)
- **Result** — strongest outcome bullets / metrics from CV where present (if CV has no numeric metric, use qualitative shipped outcomes; do not invent metrics)
- **Stack** — tags
- **Links** — live / repo / none

### Skills
Group and align to CV; remove items not on CV (e.g. Python, Kubernetes) unless later re-added to the CV.

| Group | Items |
|-------|--------|
| Languages | TypeScript, JavaScript, SQL |
| Frontend | Next.js, React, Vue 3, Tailwind CSS, Shadcn UI, Vite |
| Backend | Nest.js, Node.js, Express.js, REST/OpenAPI, Socket.io, LangChain |
| Databases & Cache | PostgreSQL, MongoDB, MySQL, Redis |
| Cloud & DevOps | AWS, Terraform, Docker, Nginx, GitHub Actions, Linux, Grafana |
| Practices & Tools | Agile Scrum, Gitflow, Code Review, Jira, Postman, Figma, Turborepo |

### Education
- Dai Nam University
- Bachelor of Science in Information Technology
- GPA: 3.58 / 4.0
- 2020 – 2024

### Social / contact config
- GitHub: `https://github.com/vudaian24`
- LinkedIn: `https://linkedin.com/in/anvd24` (match CV; replace outdated encoded URL in `site.ts`)
- Zalo / phone / email as currently used if still valid vs CV (`+84398270233`, `anvd2401@gmail.com`)
- CV path: `/cv.pdf`

## 6. Component / file impact (expected)

| Area | Change |
|------|--------|
| `globals.css` + fonts in layout | New tokens, type roles, atmosphere |
| `HeroSection*` | Brand-first hero, CTAs including CV, featured-ready layout |
| `AboutSection` | Shorter about; grouped skills UI |
| `ExperienceSection` | Multi-bullet timeline entries |
| New `EducationSection` | Simple education entry |
| `ProjectsSection` | Richer cards → link to case study route (and external when useful) |
| New `app/(frontend)/[locale]/projects/[id]/page.tsx` | Case study page |
| `ResumeSection` / `ContactSection` / `Navbar` / `Footer` | Copy + link visibility; LinkedIn fix |
| `config/site.ts` | Skills groups, project metadata, LinkedIn, experience tags |
| `locales/en.json`, `vi.json` | Full copy rewrite to CV |

## 7. i18n & routing

- All user-facing strings in locale files; config holds ids, tags, hrefs, periods if language-agnostic.
- Project detail: validate `id` against `PROJECT_IDS`; `notFound()` otherwise.
- Preserve `next-intl` navigation helpers for locale-aware links.

## 8. Performance & UX constraints

- Prefer CSS/token changes and light motion over heavy client JS.
- Keep contact API behavior (`/web-api/contact`) unchanged unless copy-only.
- Mobile: single-column stack; touch targets for CTAs and project links.
- Accessibility: semantic headings, focus states, sufficient contrast on new accent.

## 9. Success criteria

1. First viewport answers who / what / how to contact without scrolling on desktop and is clear on mobile.
2. Content EN/VI matches CV facts (roles, dates, projects, skills, education, LinkedIn).
3. Kotae and portfolio expose clear public paths; client projects label “no public link” without dead buttons.
4. Case study routes render for every project id with CASE structure.
5. No regression: locale switching, contact form, CV PDF open, existing Docker/CI assumptions.

## 10. Implementation notes

- Prefer updating existing section components over unrelated refactors.
- Do not commit secrets; CV PDF may already be modified in the working tree — include only if intentional with this redesign.
- After this spec is user-approved, create an implementation plan via the writing-plans skill, then implement.
