# Components Reference

## From `@potenlab/ui` (DO NOT duplicate locally)

These components are imported from the shared library. Always use the library version.

### Primitives (shadcn/ui based)

`Button`, `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Input`, `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`, `Badge`, `Avatar`, `AvatarImage`, `AvatarFallback`, `Switch`, `Tabs`, `Separator`, `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`, `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`, `Label`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`

### Compound Components

| Component | Import | Purpose |
|---|---|---|
| `PageHeader` | `@potenlab/ui` | Page title + subtitle + action buttons |
| `FormField` | `@potenlab/ui` | Label + input/select wrapper for forms |
| `LabeledSwitch` | `@potenlab/ui` | Label + description + toggle switch |
| `SearchBar` | `@potenlab/ui` | Search input with icon |
| `TabNavigation` | `@potenlab/ui` | Horizontal tab bar |
| `PaginationControls` | `@potenlab/ui` | Page navigation with items-per-page selector |
| `DataTable` | `@potenlab/ui` | TanStack Table wrapper with sorting support |
| `DataTableColumnHeader` | `@potenlab/ui` | Sortable column header for DataTable |

### Layouts

| Component | Import | Purpose |
|---|---|---|
| `DashboardLayout` | `@potenlab/ui` | Sidebar + main content shell |
| `ContentLayout` | `@potenlab/ui` | Content area wrapper with padding |

### Utilities

| Export | Import | Purpose |
|---|---|---|
| `cn()` | `@potenlab/ui` | Tailwind class merging (clsx + twMerge) |
| `formatNumber()` | `@potenlab/ui` | Number formatting with locale |

### Types

| Type | Import | Purpose |
|---|---|---|
| `SidebarNavItem` | `@potenlab/ui` | Sidebar navigation group definition |
| `SidebarSubItem` | `@potenlab/ui` | Sidebar navigation link definition |

---

## Local Components

### `AppSidebar` — `src/components/layouts/app-sidebar.tsx`

Fixed 300px sidebar with:
- "ADMIN" header with admin ID subtitle
- Accordion-based navigation sections (홈, 사용자, 매치, 관리자)
- Active state highlighting via `usePathname()`
- Logout footer

```tsx
import { AppSidebar } from "@/components/layouts/app-sidebar";
```

### `ProfileImages` — `src/components/user-management/profile-images.tsx`

Displays up to 3 profile images (116x116px). Supports editable mode with upload slots.

```tsx
<ProfileImages
  images={["url1", "url2"]}
  maxImages={3}
  editable={true}
  onImageUpload={(file: File) => void}
/>
```

### `UserDetailForm` — `src/components/user-management/user-detail-form.tsx`

Full detail form using `react-hook-form` `Controller`. Renders:
- Basic Info section (profile images, intro textarea, 3 grid rows of fields)
- Other Settings section (3 toggle switches)

```tsx
<UserDetailForm
  form={useFormReturn}
  profileImages={string[]}
  onImageUpload={(file: File) => void}
/>
```

---

## Feature Components (Smart)

### `UserList` — `src/features/user-management/components/user-list.tsx`

Dashboard assembly. Manages search, tab selection, and pagination state. Composes `PageHeader`, `TabNavigation`, `SearchBar`, `PaginationControls`, and `DataTable`.

### `UserDetail` — `src/features/user-management/components/user-detail.tsx`

Detail page assembly. Owns the `react-hook-form` instance, manages `profileImages` state, and handles image upload + save.

### `getUserColumns()` — `src/features/user-management/components/user-columns.tsx`

Factory function returning `ColumnDef<User>[]` for TanStack Table. Accepts `{ onDelete }` callback. Defines 10 columns including sortable dates, avatar, and delete button.

```tsx
const columns = getUserColumns({ onDelete: (id) => console.log(id) });
```

---

## TypeScript Types

All types live in `src/features/user-management/types/index.ts`:

| Type | Purpose |
|---|---|
| `User` | Full user object (25 fields) |
| `UserSettings` | Toggle settings (profilePublic, matchChatNotification, marketingNotification) |
| `UserDetailFormValues` | Form values matching react-hook-form shape |
| `PaginationState` | Pagination state object |
| `FormField` | Field definition for dynamic form rendering |

Constants: `BASIC_INFO_ROW_1`, `BASIC_INFO_ROW_2`, `BASIC_INFO_ROW_3`, `DEFAULT_PAGINATION`
