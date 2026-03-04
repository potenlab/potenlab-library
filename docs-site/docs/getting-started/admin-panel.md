---
sidebar_position: 4
---

# Admin Panel Template

`@potenlab/ui` ships with a ready-to-use **Admin Panel** template — a fully scaffolded Next.js 16 project pre-wired with the component library, Tailwind CSS 4, and all design tokens.

## Scaffold a New Project

Run the CLI in an empty directory:

```bash
mkdir my-admin && cd my-admin
npx potenlab-ui init
```

Select **admin** when prompted for the template, then:

```bash
npm install
npm run dev
```

Your admin panel is now running at `http://localhost:3000`.

## What's Included

The admin template scaffolds a complete Next.js App Router project with:

### Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | App Router framework |
| React | 19 | UI runtime |
| @potenlab/ui | latest | Component library |
| Tailwind CSS | 4 | Styling |
| TanStack Table | 8 | Data table engine |
| react-hook-form | latest | Form handling |
| next-themes | latest | Dark mode |

### Pre-Built Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | User List | Data table with search, pagination, tab navigation, and sortable columns |
| `/users/[id]` | User Detail | Form with profile images, input fields, select dropdowns, and toggle switches |

### Layout

- **DashboardLayout** with a fixed 300px sidebar and content area
- **AppSidebar** with accordion navigation groups
- **Skip to main content** accessibility link
- Pretendard Variable font loaded via CDN

### Pre-Configured Features

- **Design tokens** — All Potenlab colors, fonts, and spacing tokens in `globals.css`
- **Tailwind CSS 4** — `@source` directive scanning `@potenlab/ui/dist` for class detection
- **shadcn/ui** — `components.json` configured for adding additional components via `npx shadcn add`
- **Mock data** — 5 sample user records for immediate development
- **TypeScript** — Strict mode with `@/*` path aliases

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with DashboardLayout + sidebar
│   ├── page.tsx                # Dashboard (renders UserList)
│   └── users/[id]/page.tsx     # User detail page
├── components/
│   └── layouts/
│       └── app-sidebar.tsx     # Sidebar navigation with accordion groups
├── features/
│   └── user-management/
│       ├── types/index.ts      # User types, form types, column definitions
│       ├── components/
│       │   ├── user-list.tsx    # Main list page component
│       │   ├── user-columns.tsx # TanStack Table column definitions
│       │   └── user-detail.tsx  # Detail page component
│       └── utils/
│           └── format.ts       # Utility functions
├── lib/
│   └── mock-data.ts            # Sample data (replace with your API)
└── styles/
    └── globals.css             # Design tokens + Tailwind config
```

## Components Used

The admin template demonstrates real-world usage of these `@potenlab/ui` components:

### Layout & Navigation
- `DashboardLayout` — Page wrapper with sidebar slot
- `Accordion` / `AccordionItem` — Sidebar navigation groups
- `TabNavigation` — Page-level tab filtering

### Data Display
- `DataTable` — Sortable, paginated data table
- `PageHeader` — Page title with badge count and action button
- `PaginationControls` — Full pagination toolbar
- `Badge` — Status indicators
- `Avatar` / `AvatarImage` / `AvatarFallback` — User avatars in table rows

### Forms
- `FormField` — Labeled input/select fields
- `Input` — Text inputs
- `Select` / `SelectContent` / `SelectItem` — Dropdown selects
- `LabeledSwitch` — Toggle switches with labels
- `Label` — Form labels
- `Separator` — Section dividers

### Feedback
- `SearchBar` — Controlled search input
- `Button` — Actions and navigation

## Customization

### Replace Mock Data

The template uses hardcoded data in `src/lib/mock-data.ts`. Replace it with your API:

```tsx
// src/lib/mock-data.ts → replace with API calls
export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}
```

### Add New Pages

Follow the existing pattern in `src/features/`:

1. Create a new feature directory under `src/features/`
2. Define types in `types/index.ts`
3. Create page components in `components/`
4. Add the route in `src/app/`
5. Add navigation items in `src/components/layouts/app-sidebar.tsx`

### Modify the Sidebar

Edit `src/components/layouts/app-sidebar.tsx` to change navigation items:

```tsx
const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "User Management", href: "/" },
      { label: "Roles", href: "/roles" },
    ],
  },
  // Add your navigation items here
];
```

## Available Templates

Currently, the CLI offers one template:

| Template | Description |
|----------|-------------|
| `admin` | Next.js 16 admin dashboard with user management pages |

More templates will be added in future releases.
