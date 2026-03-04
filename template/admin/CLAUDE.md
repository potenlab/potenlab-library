# Admin Panel Template — CLAUDE.md

## What is this?

A Next.js 16 admin panel template built on `@potenlab/ui`. It serves as a reference implementation showing how to use the Potenlab design system to build admin dashboards. The UI is Korean-localized.

## Quick Reference

- **Docs:** `docs/` directory is the single source of truth — see `docs/README.md` for index
- **Architecture:** Feature-based (Bulletproof React pattern) — see `docs/architecture.md`
- **Components:** All base UI comes from `@potenlab/ui` — see `docs/components.md`
- **Design tokens:** Defined in `src/styles/globals.css` — see `docs/design-tokens.md`
- **Conventions:** `docs/conventions.md`

## Critical Rules

1. **DO NOT create local UI primitives.** All base components (Button, Card, Input, DataTable, etc.) come from `@potenlab/ui`. If a component is missing, add it to the library package first.

2. **Pages are thin wrappers.** Route files in `src/app/` only import and render a smart component from `src/features/`. No business logic in page files.

3. **Feature modules are self-contained.** Each feature in `src/features/` has its own `components/`, `types/`, and `utils/`. Smart components live here.

4. **Presentational components go in `src/components/`.** They receive props, render UI, and call callbacks. No state management or data fetching.

5. **Use `react-hook-form` for all forms.** Smart component creates the form instance, presentational component renders fields with `Controller`.

6. **Use design tokens, not raw colors.** Prefer `bg-primary`, `text-muted-fg` over `#509594`, `#5A5E6A`.

7. **Korean UI text.** All user-facing labels and navigation are in Korean.

## Key Paths

```
src/app/                          → Routes (thin wrappers)
src/features/                     → Feature modules (business logic)
src/components/                   → Presentational components
src/components/layouts/           → Layout components (sidebar)
src/lib/                          → Shared data & utilities
src/styles/globals.css            → Design tokens & Tailwind config
docs/                             → Documentation (single source of truth)
```

## Stack

Next.js 16 | TypeScript 5 | Tailwind CSS 4 | @potenlab/ui | TanStack Table | React Hook Form | Lucide Icons | next-themes | Sonner

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```
