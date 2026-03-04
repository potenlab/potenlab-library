# Architecture

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| UI Library | `@potenlab/ui` (built on shadcn/ui + Radix) | ^0.1.0 |
| Styling | Tailwind CSS v4 | ^4.0 |
| Tables | TanStack React Table | ^8.21 |
| Forms | React Hook Form | ^7.71 |
| Icons | Lucide React | ^0.576 |
| Theming | next-themes | ^0.4 |
| Toasts | Sonner | ^2.0 |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages (thin wrappers)
│   ├── layout.tsx                # Root layout — DashboardLayout + AppSidebar
│   ├── page.tsx                  # / — Dashboard (renders <UserList />)
│   └── users/[id]/
│       └── page.tsx              # /users/:id — User detail (renders <UserDetail />)
│
├── components/                   # Presentational & layout components
│   ├── layouts/
│   │   └── app-sidebar.tsx       # Fixed 300px sidebar with accordion nav
│   └── user-management/
│       ├── profile-images.tsx    # Profile image grid with upload support
│       └── user-detail-form.tsx  # Detail form (controlled by react-hook-form)
│
├── features/                     # Feature modules (business logic + smart components)
│   └── user-management/
│       ├── components/
│       │   ├── user-columns.tsx  # TanStack Table column definitions
│       │   ├── user-detail.tsx   # Detail page smart component (owns form state)
│       │   └── user-list.tsx     # Dashboard smart component (search, tabs, pagination)
│       ├── types/
│       │   └── index.ts          # All TypeScript interfaces and constants
│       └── utils/
│           └── format.ts         # Utility re-exports from @potenlab/ui
│
├── lib/                          # Shared data & utilities
│   └── mock-data.ts             # Mock user data (5 users)
│
└── styles/
    └── globals.css              # Tailwind v4 config + Potenlab design tokens
```

## Architecture Pattern

This template follows a **feature-based architecture** inspired by Bulletproof React:

```
app/ pages         → Thin route wrappers, compose smart components
features/          → Business logic, types, smart components per domain
components/        → Reusable presentational components, layouts
lib/               → Shared utilities, data, helpers
```

### Key Rules

1. **Pages are thin** — Route files in `app/` only import and render a single smart component from `features/`.
2. **Features own business logic** — Each feature module contains its own types, utils, and smart components.
3. **Components are dumb** — Files in `components/` receive props and render UI. No data fetching or routing logic.
4. **`@potenlab/ui` provides primitives** — All base UI components (Button, Card, Input, DataTable, etc.) come from the library package. Do NOT create local copies.

## Routing

| Route | Page File | Smart Component |
|---|---|---|
| `/` | `app/page.tsx` | `features/user-management/components/user-list.tsx` |
| `/users/:id` | `app/users/[id]/page.tsx` | `features/user-management/components/user-detail.tsx` |

## Data Flow

```
mock-data.ts (or future API)
    ↓
Smart Component (features/*/components/)
    → owns state (useState, useForm)
    → passes data + callbacks as props
        ↓
Presentational Component (components/*/)
    → renders UI with received props
    → calls callbacks on user interaction
```

### State Management

- **Local state only** — `useState` for UI state (search, tabs, pagination).
- **React Hook Form** — Form state in detail pages. The smart component creates the form instance and passes it down.
- **No global store** — No Redux, Zustand, or Context (besides next-themes).

## Layout

The root `layout.tsx` wraps all pages with:

```tsx
<DashboardLayout sidebar={<AppSidebar />}>
  {children}
</DashboardLayout>
```

- `DashboardLayout` is from `@potenlab/ui` — provides the sidebar + content shell.
- `AppSidebar` is local — defines the navigation items specific to this admin panel.
- Sidebar is fixed at 300px width.
