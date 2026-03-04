# @potenlab/ui

Potenlab's shared React UI component library built with Tailwind CSS 4, Radix UI, and TypeScript.

[![npm version](https://img.shields.io/npm/v/@potenlab/ui.svg)](https://www.npmjs.com/package/@potenlab/ui)
[![license](https://img.shields.io/npm/l/@potenlab/ui.svg)](https://github.com/potenlab/potenlab-library/blob/main/LICENSE)

[Storybook](https://potenlab-library.vercel.app) | [npm](https://www.npmjs.com/package/@potenlab/ui)

## Installation

```bash
# npm
npm install @potenlab/ui

# bun
bun add @potenlab/ui

# pnpm
pnpm add @potenlab/ui

# yarn
yarn add @potenlab/ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

Optional peer dependencies (install only if you use components that need them):

```bash
# For DataTable component
npm install @tanstack/react-table

# For theme switching
npm install next-themes
```

## Setup

### 1. Import the global stylesheet

Add the Potenlab design tokens and styles to your app's CSS entry point:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@potenlab/ui/dist/styles/globals.css";

/* Enable Tailwind to scan library component classes */
@source "../node_modules/@potenlab/ui/dist";
```

### 2. Import and use components

```tsx
import { Button, Card, CardContent, DashboardLayout } from "@potenlab/ui";

export default function App() {
  return (
    <DashboardLayout sidebar={<MySidebar />}>
      <Card>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
```

## Components

### UI Primitives

Built on [Radix UI](https://www.radix-ui.com/) with Tailwind CSS styling.

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible content sections |
| `AlertDialog` | Modal confirmation dialogs |
| `Avatar` | User profile images with fallback |
| `Badge` | Status labels and tags |
| `Button` | Clickable actions with variants |
| `Card` | Content containers (`Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`) |
| `Checkbox` | Toggle checkboxes |
| `Dialog` | Modal overlays |
| `DropdownMenu` | Context menus and action menus |
| `Input` | Text input fields |
| `Label` | Form labels |
| `Select` | Dropdown selectors |
| `Separator` | Visual dividers |
| `Sheet` | Slide-out panels |
| `Sidebar` | Application sidebar primitives |
| `Skeleton` | Loading placeholders |
| `Sonner` | Toast notifications |
| `Switch` | Toggle switches |
| `Table` | Data tables (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`) |
| `Tabs` | Tab navigation |
| `Tooltip` | Hover information |

### Common Components

Higher-level components for building admin dashboards and CRUD interfaces.

| Component | Description |
|-----------|-------------|
| `PageHeader` | Page title with subtitle, badge count, and action button |
| `SearchBar` | Controlled search input with placeholder |
| `TabNavigation` | Tab switcher with controlled/uncontrolled modes |
| `PaginationControls` | Full pagination with page size selector and page jump |
| `FormField` | Labeled form input or select field |
| `LabeledSwitch` | Toggle switch with label |
| `DataTable` | Feature-rich table built on TanStack React Table |
| `DataTableColumnHeader` | Sortable column header for DataTable |
| `DataTablePagination` | Pagination integrated with DataTable |
| `DataTableToolbar` | Search and filter toolbar for DataTable |
| `DataTableRowActions` | Row action dropdown menu |

### Layout Components

| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Full dashboard wrapper with sidebar slot and main content area |
| `ContentLayout` | Content area with sidebar offset padding |

## Import Paths

The library supports tree-shaking with multiple entry points:

```tsx
// Import everything
import { Button, Card, DashboardLayout } from "@potenlab/ui";

// Import only UI primitives
import { Button, Card } from "@potenlab/ui/components/ui";

// Import only common components
import { DataTable, PageHeader } from "@potenlab/ui/components/common";

// Import only layouts
import { DashboardLayout, ContentLayout } from "@potenlab/ui/components/layouts";

// Import hooks
import { useIsMobile } from "@potenlab/ui/hooks";

// Import utilities
import { cn } from "@potenlab/ui/lib";
```

## Design Tokens

The library includes a complete design token system via `globals.css`:

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#509594` | Primary brand color |
| `primary-hover` | `#3F7A79` | Hover state |
| `primary-active` | `#357070` | Active/pressed state |
| `primary-light` | `#B9D5D4` | Light variant |

### Surface & Background

| Token | Value | Usage |
|-------|-------|-------|
| `surface` | `#FFFFFF` | Card and panel backgrounds |
| `background` | `#FCFCFC` | Page background |
| `border` | `#E2E8F0` | Borders and dividers |
| `table-header` | `#F9FAFC` | Table header background |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `foreground` | `#000000` | Primary text |
| `subtitle` | `#9DA0A8` | Secondary/subtitle text |
| `muted-fg` | `#5A5E6A` | Muted text |
| `placeholder` | `#A0AEC0` | Input placeholders |
| `table-cell` | `#3B3F4A` | Table cell text |

### Font Families

| Token | Value |
|-------|-------|
| `font-pretendard` | Pretendard Variable, system fallbacks |
| `font-inter` | Inter, Noto Sans KR, system fallbacks |
| `font-mono` | JetBrains Mono, Fira Code, system fallbacks |

## Usage Examples

### DashboardLayout with Sidebar

```tsx
import { DashboardLayout, Accordion, AccordionItem, AccordionTrigger, AccordionContent, cn } from "@potenlab/ui";
import type { SidebarNavItem } from "@potenlab/ui";

const NAV_ITEMS: SidebarNavItem[] = [
  { label: "Home", icon: Home, href: "/", isAccordion: false },
  {
    label: "Users",
    isAccordion: true,
    children: [{ label: "User Management", href: "/users", icon: UserRound }],
  },
];

function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[300px] flex-col bg-white border-r border-border">
      <div className="border-b border-border py-5 px-4">
        <h2 className="text-2xl font-semibold">ADMIN</h2>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <Accordion type="multiple" className="w-full">
          {/* Render NAV_ITEMS */}
        </Accordion>
      </nav>
    </aside>
  );
}

export default function Layout({ children }) {
  return (
    <DashboardLayout sidebar={<AppSidebar />}>
      {children}
    </DashboardLayout>
  );
}
```

### DataTable

```tsx
import { DataTable, DataTableColumnHeader } from "@potenlab/ui";
import type { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
];

export function UserTable({ users }: { users: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      enableSorting
      enablePagination
      onRowClick={(row) => console.log(row)}
    />
  );
}
```

### PageHeader with Search and Tabs

```tsx
import { PageHeader, SearchBar, TabNavigation } from "@potenlab/ui";
import { Plus } from "lucide-react";

export function UserListHeader() {
  const [search, setSearch] = useState("");
  const tabs = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="User Management"
        badgeCount={150}
        badgeSuffix="users"
        actionLabel="Add User"
        actionIcon={Plus}
        onAction={() => console.log("add user")}
      />
      <TabNavigation tabs={tabs} defaultValue="all" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
    </>
  );
}
```

## Types

```tsx
import type { SidebarNavItem, SidebarSubItem } from "@potenlab/ui";
```

| Type | Description |
|------|-------------|
| `SidebarNavItem` | Navigation item with `label`, `icon?`, `href?`, `isAccordion`, `children?` |
| `SidebarSubItem` | Sub-navigation item with `label`, `href`, `icon?` |

## Development

```bash
# Install dependencies
bun install

# Start Storybook (development)
bun run storybook

# Build the library
bun run build

# Type check
bun run typecheck
```

### Release

```bash
# Patch release (0.1.x)
bun run release:patch

# Minor release (0.x.0)
bun run release:minor

# Major release (x.0.0)
bun run release:major
```

## Project Structure

```
src/
  components/
    ui/           # Radix UI primitives with Tailwind styling
    common/       # Higher-level reusable components
    layouts/      # Dashboard and content layout wrappers
  hooks/          # Custom React hooks
  lib/            # Utility functions (cn, formatNumber)
  types/          # Shared TypeScript types
  styles/         # Global CSS with design tokens
template/         # Next.js reference app using @potenlab/ui
.storybook/       # Storybook configuration
```

## License

MIT
