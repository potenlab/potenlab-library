# Frontend Plan

Single source of truth for component specifications, TypeScript interfaces, data flow, and implementation order for the Potenlab Admin User Management UI.

- **Source PRD:** `template/docs/prd.md`
- **Source UI/UX:** `template/docs/ui-ux-plan.md`
- **Source Dev Plan:** `template/docs/dev-plan.md`
- **Tech Stack:** Next.js 16 (App Router), TypeScript, shadcn/ui, Tailwind CSS 4, Lucide React, Bun
- **Fonts:** Pretendard Variable, Inter
- **Platform:** Desktop-only (1920px target)
- **Backend:** NONE -- all data is static/mock, hardcoded in the frontend

---

## 1. Component Index Table

Every component in the project, organized by location and role.

### 1.1 shadcn/ui Base Components (`src/components/ui/`)

| # | File Path | Type | Props Interface | shadcn Base | Description |
|---|-----------|------|-----------------|-------------|-------------|
| 1 | `src/components/ui/accordion.tsx` | ui | `AccordionProps` (Radix) | `Accordion` | Expandable/collapsible sections for sidebar nav |
| 2 | `src/components/ui/avatar.tsx` | ui | `AvatarProps` (Radix) | `Avatar` | 22px circular user avatar in table rows |
| 3 | `src/components/ui/badge.tsx` | ui | `BadgeProps` with `variant: "default" \| "green"` | `Badge` | Green pill badge for user count on dashboard header |
| 4 | `src/components/ui/button.tsx` | ui | `ButtonProps` with `variant: "primary" \| "secondary" \| "pagination" \| "ghost" \| "outline"` | `Button` | All interactive buttons with custom variant styles |
| 5 | `src/components/ui/card.tsx` | ui | `CardProps` (shadcn) | `Card` | White card container on both pages |
| 6 | `src/components/ui/input.tsx` | ui | `InputProps` (React.InputHTMLAttributes) | `Input` | Text input for search bar and detail form fields |
| 7 | `src/components/ui/label.tsx` | ui | `LabelProps` (Radix) | `Label` | Form field labels in detail page |
| 8 | `src/components/ui/select.tsx` | ui | `SelectProps` (Radix) | `Select` | Dropdown for Role, Gender, Exercise Style, etc. |
| 9 | `src/components/ui/separator.tsx` | ui | `SeparatorProps` (Radix) | `Separator` | Horizontal dividers between sections |
| 10 | `src/components/ui/sidebar.tsx` | ui | `SidebarProps` (shadcn) | `Sidebar` | Sidebar layout primitives |
| 11 | `src/components/ui/switch.tsx` | ui | `SwitchProps` (Radix) | `Switch` | Toggle switches for Other Settings |
| 12 | `src/components/ui/table.tsx` | ui | `TableProps` (shadcn) | `Table` | Data table with header, rows, cells |
| 13 | `src/components/ui/tabs.tsx` | ui | `TabsProps` (Radix) | `Tabs` | Tab navigation on dashboard |
| 14 | `src/components/ui/tooltip.tsx` | ui | `TooltipProps` (Radix) | `Tooltip` | Optional hover hints for icon-only buttons |

### 1.2 Layout Components (`src/components/layouts/`)

| # | File Path | Type | Props Interface | shadcn Base | Description |
|---|-----------|------|-----------------|-------------|-------------|
| 15 | `src/components/layouts/app-sidebar.tsx` | layout | None (reads `usePathname()`) | `Sidebar` + `Accordion` | Fixed 300px sidebar with ADMIN header, accordion nav, logout footer |
| 16 | `src/components/layouts/content-layout.tsx` | layout | `ContentLayoutProps` | None | Content area wrapper with `ml-[324px]`, padding |

### 1.3 Common Components (`src/components/common/`)

| # | File Path | Type | Props Interface | shadcn Base | Description |
|---|-----------|------|-----------------|-------------|-------------|
| 17 | `src/components/common/page-header.tsx` | common | `PageHeaderProps` | `Badge`, `Button`, `Separator` | Reusable title + badge + subtitle + action button + separator |

### 1.4 Feature-Specific Styled/Presentational Components (`src/components/user-management/`)

| # | File Path | Type | Props Interface | shadcn Base | Description |
|---|-----------|------|-----------------|-------------|-------------|
| 18 | `src/components/user-management/user-table.tsx` | styled | `UserTableProps` | `Table`, `Avatar`, `Button(ghost)` | Data table with 10 columns, 5 rows, row click navigation, delete action |
| 19 | `src/components/user-management/pagination-controls.tsx` | styled | `PaginationControlsProps` | `Button(pagination)`, `Input`, `Select` | Pagination nav buttons + page jump + items per page |
| 20 | `src/components/user-management/search-bar.tsx` | styled | `SearchBarProps` | `Input` | Full-width search input with placeholder |
| 21 | `src/components/user-management/tab-navigation.tsx` | styled | `TabNavigationProps` | `Tabs`, `TabsList`, `TabsTrigger` | 3-tab bar (All, Tab, Tab) with active/inactive states |
| 22 | `src/components/user-management/user-detail-form.tsx` | styled | `UserDetailFormProps` | `Input`, `Select`, `Switch`, `Label`, `Separator` | Full detail form: Basic Info fields + Other Settings toggles |
| 23 | `src/components/user-management/profile-images.tsx` | styled | `ProfileImagesProps` | None | 3x profile image display (116x116px, 8px radius) |

### 1.5 Route Pages / Business Logic Assembly (`src/app/`)

| # | File Path | Type | Props Interface | Composes | Description |
|---|-----------|------|-----------------|----------|-------------|
| 24 | `src/app/layout.tsx` | business | `RootLayoutProps` | `AppSidebar`, `ContentLayout` | Root layout: sidebar + content + fonts + skip link |
| 25 | `src/app/page.tsx` | business | Next.js page props | `Card`, `PageHeader`, `TabNavigation`, `SearchBar`, `PaginationControls`, `UserTable` | Dashboard: User Management List page assembly |
| 26 | `src/app/users/[id]/page.tsx` | business | `{ params: { id: string } }` | `Card`, `PageHeader`, `UserDetailForm` | User Detail page assembly, reads `params.id` |

### 1.6 Utility / Data Files

| # | File Path | Type | Description |
|---|-----------|------|-------------|
| 27 | `src/lib/utils.ts` | utility | shadcn/ui `cn()` helper (clsx + tailwind-merge) |
| 28 | `src/lib/mock-data.ts` | data | Static mock user data (5 rows) + `totalUserCount` |
| 29 | `src/features/user-management/types/index.ts` | types | `User` interface, `UserTableColumn` type |
| 30 | `src/features/user-management/utils/format.ts` | utility | `formatNumber()` for comma-separated numbers |
| 31 | `src/types/index.ts` | types | Shared global TypeScript types |
| 32 | `src/styles/globals.css` | styles | Tailwind CSS 4 + shadcn/ui theme overrides + font imports |

---

## 2. TypeScript Interfaces

### 2.1 User Type

```typescript
// src/features/user-management/types/index.ts

export interface User {
  id: string;
  nickname: string;
  grade: string;
  avatar: string;
  phone: string;
  age: string;
  gender: string;
  region: string;
  joinDate: string;
  withdrawalDate: string;
  role: string;
  exerciseStyle: string;
  gymRelocation: string;
  bench: string;
  deadlift: string;
  squat: string;
  intro: string;
  profileImages: string[];
  settings: UserSettings;
}

export interface UserSettings {
  profilePublic: boolean;
  matchChatNotification: boolean;
  marketingNotification: boolean;
}
```

### 2.2 Table Column Definitions

```typescript
// src/features/user-management/types/index.ts

export interface UserTableColumn {
  key: keyof User | "delete";
  label: string;
  width: string;               // CSS width: "flex-1", "80px", "57px"
  sortable: boolean;
  alignment: "left" | "center";
}

export const USER_TABLE_COLUMNS: UserTableColumn[] = [
  { key: "nickname",       label: "Nickname",        width: "flex-1", sortable: false, alignment: "left" },
  { key: "grade",          label: "Grade",           width: "flex-1", sortable: false, alignment: "left" },
  { key: "avatar",         label: "Avatar",          width: "80px",   sortable: false, alignment: "center" },
  { key: "phone",          label: "Phone Number",    width: "flex-1", sortable: false, alignment: "left" },
  { key: "age",            label: "Age",             width: "flex-1", sortable: false, alignment: "left" },
  { key: "gender",         label: "Gender",          width: "flex-1", sortable: false, alignment: "left" },
  { key: "region",         label: "Region",          width: "flex-1", sortable: false, alignment: "left" },
  { key: "joinDate",       label: "Join Date",       width: "flex-1", sortable: true,  alignment: "left" },
  { key: "withdrawalDate", label: "Withdrawal Date", width: "flex-1", sortable: true,  alignment: "left" },
  { key: "delete",         label: "Delete",          width: "57px",   sortable: false, alignment: "left" },
];
```

### 2.3 Pagination State

```typescript
// src/features/user-management/types/index.ts

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  pageJumpInput: string;
}

export const DEFAULT_PAGINATION: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  pageJumpInput: "",
};
```

### 2.4 Navigation / Sidebar Types

```typescript
// src/types/index.ts

import type { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  isAccordion: boolean;
  children?: SidebarSubItem[];
}

export interface SidebarSubItem {
  label: string;
  href: string;
}
```

### 2.5 Component Props Interfaces

```typescript
// src/components/common/page-header.tsx
import type { LucideIcon } from "lucide-react";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  badgeCount?: number;
  actionLabel: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}
```

```typescript
// src/components/layouts/content-layout.tsx
export interface ContentLayoutProps {
  children: React.ReactNode;
}
```

```typescript
// src/components/user-management/user-table.tsx
import type { User } from "@/features/user-management/types";

export interface UserTableProps {
  users: User[];
}
```

```typescript
// src/components/user-management/pagination-controls.tsx
export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}
```

```typescript
// src/components/user-management/search-bar.tsx
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

```typescript
// src/components/user-management/tab-navigation.tsx
export interface TabNavigationProps {
  defaultValue?: string;
  onTabChange?: (value: string) => void;
}
```

```typescript
// src/components/user-management/user-detail-form.tsx
import type { User } from "@/features/user-management/types";

export interface UserDetailFormProps {
  user: User;
}
```

```typescript
// src/components/user-management/profile-images.tsx
export interface ProfileImagesProps {
  images: string[];
}
```

### 2.6 Form Field Types (Detail Page)

```typescript
// src/features/user-management/types/index.ts

export type FormFieldType = "input" | "select";

export interface FormField {
  key: keyof User;
  label: string;
  type: FormFieldType;
  options?: string[];   // Only for type "select"
}

export const BASIC_INFO_ROW_1: FormField[] = [
  { key: "role",     label: "Role",     type: "select", options: ["User", "Admin"] },
  { key: "nickname", label: "Nickname", type: "input" },
  { key: "phone",    label: "Phone",    type: "input" },
  { key: "age",      label: "Age",      type: "input" },
];

export const BASIC_INFO_ROW_2: FormField[] = [
  { key: "gender",         label: "Gender",          type: "select", options: ["Male", "Female"] },
  { key: "exerciseStyle",  label: "Exercise Style",  type: "select", options: ["Bodybuilding", "Crossfit", "Cardio"] },
  { key: "gymRelocation",  label: "Gym Relocation",  type: "select", options: ["Available", "Not Available"] },
  { key: "region",         label: "Region",          type: "select", options: ["Seoul Mapo-gu", "Gangnam-gu", "Songpa-gu"] },
];

export const BASIC_INFO_ROW_3: FormField[] = [
  { key: "bench",    label: "Bench",    type: "input" },
  { key: "deadlift", label: "Deadlift", type: "input" },
  { key: "squat",    label: "Squat",    type: "input" },
];
```

---

## 3. shadcn/ui Component Mapping

### 3.1 Installation

```bash
bunx --bun shadcn@latest init
# Select: New York style, CSS variables enabled

bunx --bun shadcn@latest add card button table input select badge avatar switch tabs separator accordion sidebar label tooltip
```

### 3.2 Component Customization Specifications

#### 3.2.1 Button (`src/components/ui/button.tsx`)

| Variant | Background | Text | Height | Radius | Font | Additional |
|---------|-----------|------|--------|--------|------|------------|
| `primary` | `bg-primary` | `text-white` | `h-10` (40px) | `rounded-lg` (8px) | Inter 18px SemiBold | hover: `bg-primary-hover`, active: `bg-primary-active scale-[0.98]`, disabled: `opacity-50 cursor-not-allowed pointer-events-none` |
| `secondary` | `bg-sidebar-selected` | `text-black` | `h-12` (48px) | `rounded-md` (6px) | Inter 18px SemiBold | -- |
| `pagination` | `bg-primary-light` | `text-primary` | `h-10 w-10` (40x40) | `rounded-md` (6px) | -- | hover: `bg-[#A0C4C3] text-primary-hover`, disabled: `opacity-50 cursor-not-allowed` |
| `ghost` | `bg-transparent` | `text-delete-text` (#3F7A79) | `h-auto` | `p-0` | Body 14px | hover: `underline text-primary-hover` |

**Focus ring (all variants):** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`

**CSS customization:**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] text-white font-inter text-[18px] font-semibold",
        secondary: "bg-sidebar-selected text-black font-inter text-[18px] font-semibold",
        pagination: "bg-primary-light text-primary hover:bg-[#A0C4C3] hover:text-primary-hover",
        ghost: "bg-transparent text-delete-text hover:underline hover:text-primary-hover p-0 h-auto text-[14px]",
        outline: "border border-border bg-transparent text-black hover:bg-sidebar-selected",
      },
      size: {
        default: "h-10 px-4 rounded-lg",
        secondary: "h-12 px-4 rounded-md",
        pagination: "h-10 w-10 rounded-md",
        ghost: "h-auto p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
```

#### 3.2.2 Table (`src/components/ui/table.tsx`)

| Sub-component | CSS Customization |
|--------------|-------------------|
| `Table` (wrapper) | `border border-border bg-white` (no border-radius) |
| `TableHeader` | `bg-table-header` (#F9FAFC) |
| `TableHead` | `h-14 text-[14px] font-semibold text-table-cell px-4 align-middle` |
| `TableRow` | `h-[60px] border-b border-border hover:bg-table-header cursor-pointer transition-colors duration-150` |
| `TableCell` | `px-4 text-[14px] text-table-cell align-middle` |

#### 3.2.3 Input (`src/components/ui/input.tsx`)

| State | CSS |
|-------|-----|
| Base | `border border-border rounded-md font-inter text-[18px] text-black placeholder:text-placeholder bg-white px-4` |
| Hover | `hover:border-[#CBD5E0]` |
| Focus | `focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150` |
| Disabled | `disabled:bg-table-header disabled:text-placeholder disabled:cursor-not-allowed` |

Height set at call site: Dashboard search `h-12` (48px), Detail form `h-[52px]` (52px).

#### 3.2.4 Select (`src/components/ui/select.tsx`)

| Sub-component | CSS Customization |
|--------------|-------------------|
| `SelectTrigger` | `h-[52px] border border-border rounded-md px-4 pr-12 font-inter text-[18px] text-[#2D3748] bg-white hover:border-[#CBD5E0] focus:border-primary focus:ring-2 focus:ring-primary/20` |
| `SelectContent` | `bg-white border border-border rounded-md shadow-md` |
| `SelectItem` | `hover:bg-sidebar-selected px-4 py-2 text-[18px]` |

Chevron rotates 180deg on open (300ms ease-in-out). Chevron color: default `#A0AEC0`, on focus/open `#509594`.

#### 3.2.5 Badge (`src/components/ui/badge.tsx`)

| Variant | CSS |
|---------|-----|
| `default` | (shadcn default) |
| `green` | `bg-badge-green-bg text-badge-green-text font-inter text-[18px] font-bold px-3 py-1 rounded-full` |

#### 3.2.6 Avatar (`src/components/ui/avatar.tsx`)

| Element | CSS |
|---------|-----|
| `Avatar` (table context) | `w-[22px] h-[22px] rounded-full` |
| `AvatarFallback` | `bg-sidebar-selected text-muted-fg text-[10px]` (first letter of nickname) |
| `AvatarImage` | Must include `alt` text |

#### 3.2.7 Switch (`src/components/ui/switch.tsx`)

| State | Track | Thumb |
|-------|-------|-------|
| OFF | `bg-toggle-off` (#CBD5E0) | White, positioned left |
| OFF hover | `bg-[#B0BEC5]` | White, positioned left |
| ON | `bg-toggle-on` (#3B82F6) | White, positioned right |
| ON hover | `bg-[#2563EB]` | White, positioned right |
| Disabled | 50% opacity | -- |

Track: `w-[44px] h-[24px] rounded-full`. Thumb: 20px with 2px inset. Transition: `200ms ease-in-out`.

#### 3.2.8 Tabs (`src/components/ui/tabs.tsx`)

| Element | CSS |
|---------|-----|
| `TabsList` | `gap-2 bg-transparent p-0` |
| `TabsTrigger` active | `data-[state=active]:bg-primary data-[state=active]:text-white font-pretendard font-semibold h-[52px] px-4 rounded-md` |
| `TabsTrigger` inactive | `bg-inactive-tab text-inactive-tab-text font-pretendard font-medium h-[52px] px-4 rounded-md hover:bg-border` |

Transition: `200ms ease-in-out` on background-color and color.

#### 3.2.9 Separator (`src/components/ui/separator.tsx`)

Default color: `bg-divider` (#EFF1F4). Height: 1px. Full width.

#### 3.2.10 Accordion (`src/components/ui/accordion.tsx`)

Chevron rotates 180deg on expand (300ms ease-in-out). Content: animated height expand/collapse (300ms ease-in-out). Trigger text: `font-inter text-[16px] text-muted-fg`.

#### 3.2.11 Label (`src/components/ui/label.tsx`)

Style: `font-pretendard text-[20px] font-semibold text-[#101010]`. Margin: `mb-2` (8px). Uses `htmlFor` to associate with input `id`.

#### 3.2.12 Card (`src/components/ui/card.tsx`)

Override: `bg-white border border-border rounded-lg p-8` (32px padding, 8px radius). Shadow: none.

#### 3.2.13 Sidebar (`src/components/ui/sidebar.tsx`)

Width: 300px fixed. Height: 100vh. Background: white. Border-right: `border-r border-border`.

#### 3.2.14 Tooltip (`src/components/ui/tooltip.tsx`)

Background: `#1A202C`. Text: `#FFFFFF`, 14px Regular. Padding: `8px 12px`. Radius: 6px. Delay: 300ms show, 100ms hide.

---

## 4. Business vs Styled Component Separation

### 4.1 Principle

- **`src/app/` (Business / Page Assembly):** Route pages that import mock data, compose presentational components, manage page-level state, and handle navigation logic. These are the "smart" components.
- **`src/components/user-management/` (Styled / Presentational):** Receive data and callbacks via props. No direct data imports. No routing logic. Pure rendering and local UI state only (e.g., toggle state, input focus).

### 4.2 Business Components (Page Assembly)

| Component | Location | Responsibilities |
|-----------|----------|-----------------|
| `Dashboard` | `src/app/page.tsx` | Imports `mockUsers` and `totalUserCount` from `lib/mock-data.ts`. Passes data to `UserTable`. Passes `totalUserCount` to `PageHeader`. Manages local state for search, tab, pagination. Composes all dashboard sub-components inside `Card`. |
| `UserDetailPage` | `src/app/users/[id]/page.tsx` | Reads `params.id` from route. Looks up user from `mockUsers` by id. Falls back to first user if not found. Passes user to `UserDetailForm`. Composes `PageHeader` + `UserDetailForm` inside `Card`. |
| `RootLayout` | `src/app/layout.tsx` | Loads fonts (Inter via `next/font/google`, Pretendard via CDN). Renders `AppSidebar` persistently. Wraps `children` in `ContentLayout`. Provides skip link. Sets `<html lang="ko">`. |

### 4.3 Styled / Presentational Components

| Component | Location | Receives via Props | Local State |
|-----------|----------|--------------------|-------------|
| `UserTable` | `src/components/user-management/user-table.tsx` | `users: User[]` | None (navigation via `useRouter`) |
| `PaginationControls` | `src/components/user-management/pagination-controls.tsx` | `currentPage`, `totalPages`, `itemsPerPage`, callbacks | Page jump input value |
| `SearchBar` | `src/components/user-management/search-bar.tsx` | `value`, `onChange`, `placeholder` | None (controlled) |
| `TabNavigation` | `src/components/user-management/tab-navigation.tsx` | `defaultValue`, `onTabChange` | Active tab (via Radix Tabs) |
| `UserDetailForm` | `src/components/user-management/user-detail-form.tsx` | `user: User` | Form field values (local edits), toggle states |
| `ProfileImages` | `src/components/user-management/profile-images.tsx` | `images: string[]` | Image load error fallback |
| `PageHeader` | `src/components/common/page-header.tsx` | `title`, `subtitle`, `badgeCount?`, `actionLabel`, `actionIcon?`, `onAction?` | None |
| `AppSidebar` | `src/components/layouts/app-sidebar.tsx` | None | Reads `usePathname()` for active state |
| `ContentLayout` | `src/components/layouts/content-layout.tsx` | `children` | None |

---

## 5. State Management

### 5.1 Overview

This is a frontend-only project with static mock data. No global state management library (e.g., Zustand, Redux) is needed. All state is local component state using React `useState`.

### 5.2 State by Component

| State Variable | Type | Owner Component | Initialization | Description |
|---------------|------|-----------------|----------------|-------------|
| `activeTab` | `string` | `src/app/page.tsx` | `"all"` | Currently selected tab (All, Tab, Tab) |
| `searchValue` | `string` | `src/app/page.tsx` | `""` | Text in search input (UI only, no filtering) |
| `currentPage` | `number` | `src/app/page.tsx` | `1` | Current page number in pagination |
| `itemsPerPage` | `number` | `src/app/page.tsx` | `10` | Items per page selection |
| `pageJumpInput` | `string` | `pagination-controls.tsx` | `""` | Page jump text input value |
| `formValues` | `Partial<User>` | `user-detail-form.tsx` | Spread from `user` prop | Editable copy of user fields |
| `toggleStates` | `UserSettings` | `user-detail-form.tsx` | From `user.settings` | Toggle ON/OFF states for 3 switches |

### 5.3 URL Parameters

| Parameter | Route | Usage |
|-----------|-------|-------|
| `id` | `/users/[id]` | Dynamic route param to select user from mock data |

### 5.4 No Global State Needed

- No Zustand, Redux, or Context API for state management
- No server state (no TanStack Query, SWR)
- All data comes from `src/lib/mock-data.ts` as static imports
- Page-level state lives in page components and is passed down via props

---

## 6. Data Flow

### 6.1 Data Flow Diagram

```
src/lib/mock-data.ts
  |
  |-- exports: mockUsers (User[]), totalUserCount (number)
  |
  +---> src/app/page.tsx (Dashboard)
  |       |
  |       |-- imports mockUsers, totalUserCount
  |       |-- passes totalUserCount to PageHeader (badgeCount)
  |       |-- passes mockUsers to UserTable (users)
  |       |-- manages local state: searchValue, activeTab, currentPage, itemsPerPage
  |       |
  |       +---> PageHeader (title, subtitle, badgeCount, actionLabel)
  |       +---> TabNavigation (defaultValue, onTabChange)
  |       +---> SearchBar (value, onChange)
  |       +---> PaginationControls (currentPage, totalPages, itemsPerPage, callbacks)
  |       +---> UserTable (users)
  |               |
  |               +-- each row: onClick -> router.push(`/users/${user.id}`)
  |               +-- delete button: onClick -> event.stopPropagation() (no-op)
  |
  +---> src/app/users/[id]/page.tsx (User Detail)
          |
          |-- imports mockUsers
          |-- finds user by params.id (fallback to mockUsers[0])
          |-- passes user to UserDetailForm
          |
          +---> PageHeader (title, subtitle, actionLabel)
          +---> UserDetailForm (user)
                  |
                  +-- initializes local form state from user props
                  +-- renders ProfileImages (user.profileImages)
                  +-- renders form fields from BASIC_INFO_ROW_1, ROW_2, ROW_3
                  +-- renders toggles from user.settings
```

### 6.2 Data Import Rules

1. Only page components (`src/app/**/*.tsx`) import from `src/lib/mock-data.ts`
2. Presentational components (`src/components/**/*.tsx`) receive data exclusively via props
3. Type imports can be used anywhere: `import type { User } from "@/features/user-management/types"`
4. Utility imports are direct: `import { formatNumber } from "@/features/user-management/utils/format"`

---

## 7. Performance Checklist

### 7.1 Import Rules

- **No barrel file imports:** Do NOT use `export * from "./component"` or import from directory index files that re-export everything. Each component file exports only its own symbols.
- **Direct imports only:** Always import from the specific file path.

```typescript
// CORRECT:
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/user-management/user-table";
import type { User } from "@/features/user-management/types";

// INCORRECT:
import { Button, Table, Input } from "@/components/ui";     // barrel import
import { UserTable } from "@/components/user-management";    // barrel import
```

### 7.2 React.memo for Table Rows

- Wrap table row rendering in `React.memo` to prevent unnecessary re-renders when parent state changes (search input, tab change, pagination):

```typescript
const UserTableRow = React.memo(function UserTableRow({ user }: { user: User }) {
  // row rendering
});
```

### 7.3 Next.js App Router Server Components

| File | Component Type | Reason |
|------|---------------|--------|
| `src/app/layout.tsx` | Server Component | Static layout, no interactivity |
| `src/app/page.tsx` | Client Component (`"use client"`) | Uses `useState` for search, tabs, pagination |
| `src/app/users/[id]/page.tsx` | Client Component (`"use client"`) | Uses `useState` for form state, toggles |
| `src/components/layouts/app-sidebar.tsx` | Client Component (`"use client"`) | Uses `usePathname()` |
| `src/components/layouts/content-layout.tsx` | Server Component | Pure wrapper, no state or hooks |
| `src/components/common/page-header.tsx` | Server Component (or Client if `onAction` is used) | If `onAction` callback is passed, needs `"use client"` |
| All `src/components/user-management/*` | Client Component (`"use client"`) | Interactive: form inputs, toggles, click handlers |

### 7.4 Image Optimization

- Use Next.js `<Image>` component for profile images and avatars where possible
- Alternatively, use `<img>` with explicit `width`/`height` attributes to prevent layout shift
- Avatar images: 22x22px rendered, source at 44x44px (@2x)
- Profile images: 116x116px rendered, source at 232x232px (@2x)
- All images use `loading="lazy"` (default for `<Image>`)

### 7.5 Font Loading

- Inter: loaded via `next/font/google` with `display: "swap"` to prevent FOUT
- Pretendard Variable: loaded via CDN `<link>` in layout `<head>`
- Both fonts use CSS variable strategy for tree-shaking compatibility

---

## 8. Accessibility Checklist

### 8.1 Per-Component ARIA Roles and Labels

| Component | ARIA Requirement | Implementation |
|-----------|-----------------|----------------|
| **Skip Link** | First focusable element | `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>` |
| **Main Content** | Landmark | `<main id="main-content">` wraps content area |
| **Sidebar** | Navigation landmark | `<nav aria-label="Main navigation">` wrapping sidebar nav |
| **Sidebar Accordion** | Expand/collapse | `aria-expanded` on triggers (Radix handles this) |
| **Page Title** | Heading hierarchy | `<h1>` for "User Management" |
| **Section Labels** | Heading hierarchy | `<h2>` for "Basic Info", "Other Settings" |
| **Badge** | Meaningful text | `aria-label="Total users: 100,000"` on Badge element |
| **Tabs** | Tab pattern | `role="tablist"`, `role="tab"`, `aria-selected` (Radix handles) |
| **Search Input** | Label | `aria-label="Search users"` or visible label |
| **Table** | Semantic HTML | Uses `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>` (shadcn Table) |
| **Sort Columns** | Sortable indicator | `aria-label="Join Date, sortable column"` on `<th>` |
| **Table Rows** | Interactive rows | `role="link"` or `tabIndex={0}` + `onKeyDown` for Enter navigation |
| **Delete Button** | Dynamic label | `aria-label="Delete user {nickname}"` per row |
| **Pagination Buttons** | Icon-only labels | `aria-label="Go to first page"`, `"Previous page"`, `"Next page"`, `"Go to last page"` |
| **Page Indicator** | Live region | `aria-live="polite"` on "1 / 1" region |
| **Form Labels** | Association | `<Label htmlFor="field-id">` paired with `<Input id="field-id">` |
| **Toggle Switches** | Checked state | `aria-checked` managed by Radix Switch |
| **Toggle Labels** | Text label | `<label>` associated with each Switch |
| **Logout Button** | Descriptive text | Text content "Logout" sufficient; optional `aria-label="Log out of admin panel"` |

### 8.2 Keyboard Navigation Requirements

| Component | Key | Action |
|-----------|-----|--------|
| Skip link | `Tab` (first element) | Focus skip link |
| Skip link | `Enter` | Jump to `#main-content` |
| Sidebar menu items | `Tab` / `Shift+Tab` | Navigate between items |
| Sidebar accordion | `Enter` / `Space` | Toggle expand/collapse |
| Sidebar accordion | `Arrow Up` / `Arrow Down` | Navigate between accordion items |
| Tabs | `Arrow Left` / `Arrow Right` | Switch between tabs |
| Tabs | `Enter` / `Space` | Activate tab |
| Table rows | `Tab` | Focus row (or first interactive element) |
| Table rows | `Enter` | Navigate to user detail |
| Delete action | `Enter` / `Space` | Trigger delete (stopPropagation) |
| Delete action | `Tab` | Focusable separately from row |
| Pagination buttons | `Tab` + `Enter` | Navigate pages |
| Input fields | `Tab` | Focus field |
| Select dropdown | `Enter` / `Space` | Open dropdown |
| Select dropdown | `Arrow Up` / `Arrow Down` | Navigate options |
| Select dropdown | `Enter` | Select option |
| Select dropdown | `Escape` | Close dropdown |
| Toggle switch | `Space` | Toggle ON/OFF |
| Buttons | `Enter` / `Space` | Activate button |

### 8.3 Focus Management

- **Focus ring style (all interactive elements):** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` (2px #509594 ring with 2px offset)
- **No keyboard traps:** All accordion sections, select dropdowns, and modals can be exited with `Escape` or `Tab`
- **Logical tab order:** Sidebar -> Content (top to bottom, left to right)
- **Focus preservation:** After tab switch, focus remains on the tab bar. After delete click, focus stays on the delete button.

### 8.4 Screen Reader Announcements

| Element | Expected Announcement |
|---------|----------------------|
| Page title | "User Management, heading level 1" |
| Badge | "Total users: 100,000" |
| Active tab | "All, tab, selected, 1 of 3" |
| Table | "User management table, 10 columns, 5 rows" |
| Sort button | "Join Date, sortable column" |
| Delete action | "Delete user NicknameHere, button" |
| Toggle | "Profile Public, switch, off" / "Match & Chat Notification, switch, on" |
| Pagination | "Page 1 of 1" (via `aria-live="polite"`) |

### 8.5 Color Contrast Compliance

| Element | Foreground | Background | Ratio | WCAG | Status |
|---------|-----------|------------|-------|------|--------|
| Page title | `#000000` | `#FFFFFF` | 21:1 | AAA | Pass |
| Subtitle | `#9DA0A8` | `#FFFFFF` | 3.01:1 | AA Large (18px) | Pass |
| Table cell text | `#3B3F4A` | `#FFFFFF` | 9.21:1 | AAA | Pass |
| Button text | `#FFFFFF` | `#509594` | 3.15:1 | AA Large (18px SemiBold) | Pass |
| Badge text | `#22543D` | `#C6F6D5` | 7.05:1 | AAA | Pass |
| Inactive tab text | `#1A202C` | `#EEF2F6` | 13.83:1 | AAA | Pass |
| Sidebar text | `#5A5E6A` | `#FFFFFF` | 5.32:1 | AA | Pass |
| Delete action | `#3F7A79` | `#FFFFFF` | 4.87:1 | AA | Pass (uses darker shade) |
| Section label | `#A0AEC0` | `#FFFFFF` | 2.64:1 | -- | Decorative; pair with `<h2>` for SR |
| Placeholder | `#A0AEC0` | `#FFFFFF` | 2.64:1 | -- | Placeholder only; label provides name |

---

## 9. File Creation Order

Exact sequence matching dev-plan.md phases. Each file lists its dependencies.

### Phase 0: Foundation

| Order | File | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 1 | `components.json` + `src/lib/utils.ts` | -- | P0-T1: Initialize shadcn/ui |
| 2 | `src/styles/globals.css` | P0-T1 | P0-T2: Design tokens |
| 3 | `src/app/layout.tsx` (font loading only) | P0-T2 | P0-T3: Load fonts |
| 4 | `src/features/user-management/types/index.ts` | -- | P0-T4: TypeScript types |
| 5 | `src/types/index.ts` | -- | P0-T4: Shared types |
| 6 | `src/lib/mock-data.ts` | P0-T4 | P0-T5: Mock data |
| 7 | `src/features/user-management/utils/format.ts` | P0-T4 | P0-T6: Utility functions |
| 8 | `public/avatars/*`, `public/profile/*` | -- | P0-T7: Placeholder images |

### Phase 1: Shared UI Components

| Order | File | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 9 | `src/components/ui/button.tsx` | P0-T1 | P1-T1 + P1-T2: Install + customize Button |
| 10 | `src/components/ui/card.tsx` | P0-T1 | P1-T1: Install Card |
| 11 | `src/components/ui/table.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T3: Install + customize Table |
| 12 | `src/components/ui/input.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T4: Install + customize Input |
| 13 | `src/components/ui/select.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T5: Install + customize Select |
| 14 | `src/components/ui/badge.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T6: Install + customize Badge |
| 15 | `src/components/ui/avatar.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T7: Install + customize Avatar |
| 16 | `src/components/ui/switch.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T8: Install + customize Switch |
| 17 | `src/components/ui/tabs.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T9: Install + customize Tabs |
| 18 | `src/components/ui/separator.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T10: Install + customize Separator |
| 19 | `src/components/ui/accordion.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T11: Install + customize Accordion |
| 20 | `src/components/ui/label.tsx` | P0-T1, P0-T2 | P1-T1 + P1-T12: Install + customize Label |
| 21 | `src/components/ui/sidebar.tsx` | P0-T1 | P1-T1: Install Sidebar |
| 22 | `src/components/ui/tooltip.tsx` | P0-T1 | P1-T1: Install Tooltip |
| 23 | `src/components/common/page-header.tsx` | P1-T2, P1-T6, P1-T10 | P1-T13: PageHeader |

### Phase 2: Layout & Navigation

| Order | File | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 24 | `src/components/layouts/app-sidebar.tsx` | P1-T1, P1-T11, P0-T2, P0-T3 | P2-T1: AppSidebar |
| 25 | `src/components/layouts/content-layout.tsx` | P2-T1 | P2-T2: ContentLayout |
| 26 | `src/app/layout.tsx` (full implementation) | P2-T1, P2-T2, P0-T3 | P2-T3: Root layout |

### Phase 3: Dashboard Page

| Order | File | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 27 | `src/components/user-management/tab-navigation.tsx` | P1-T9 | P3-T1: TabNavigation |
| 28 | `src/components/user-management/search-bar.tsx` | P1-T4 | P3-T2: SearchBar |
| 29 | `src/components/user-management/pagination-controls.tsx` | P1-T2, P1-T4, P1-T5 | P3-T3: PaginationControls |
| 30 | `src/components/user-management/user-table.tsx` | P1-T3, P1-T7, P1-T2, P0-T5 | P3-T4: UserTable |
| 31 | `src/app/page.tsx` | P3-T1..T4, P1-T13, P0-T5, P0-T6 | P3-T5: Dashboard assembly |

### Phase 4: User Detail Page

| Order | File | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 32 | `src/components/user-management/profile-images.tsx` | P0-T5, P0-T7 | P4-T1: ProfileImages |
| 33 | `src/components/user-management/user-detail-form.tsx` | P1-T4, P1-T5, P1-T8, P1-T12, P1-T10, P4-T1 | P4-T2: UserDetailForm |
| 34 | `src/app/users/[id]/page.tsx` | P4-T2, P1-T13, P0-T5 | P4-T3: User Detail assembly |

### Phase 5: Polish

| Order | Task | Depends On | Dev Plan Task |
|-------|------|------------|---------------|
| 35 | Keyboard navigation audit + fixes | P3-T5, P4-T3 | P5-T1: Keyboard a11y |
| 36 | ARIA + screen reader audit + fixes | P5-T1 | P5-T2: ARIA/SR a11y |
| 37 | Micro-interactions + transitions | P3-T5, P4-T3 | P5-T3: Animations |
| 38 | Final visual QA | P5-T3 | P5-T4: Visual QA |

**Total: 34 files + 4 audit/polish passes = 38 ordered steps**

---

## Appendix A: Utility Functions

```typescript
// src/features/user-management/utils/format.ts

/**
 * Formats a number with comma separators.
 * @example formatNumber(100000) -> "100,000"
 * @example formatNumber(0) -> "0"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
```

---

## Appendix B: Design Token Quick Reference

### Colors

| Token | Hex | Tailwind Class |
|-------|-----|---------------|
| Primary | `#509594` | `bg-primary` / `text-primary` |
| Primary Hover | `#3F7A79` | `bg-primary-hover` |
| Primary Active | `#357070` | `bg-primary-active` |
| Primary Light | `#B9D5D4` | `bg-primary-light` |
| Background | `#FCFCFC` | `bg-background` |
| Surface / Card | `#FFFFFF` | `bg-surface` / `bg-white` |
| Border | `#E2E8F0` | `border-border` |
| Divider | `#EFF1F4` | `bg-divider` |
| Table Header | `#F9FAFC` | `bg-table-header` |
| Sidebar Selected | `#EEF2F6` | `bg-sidebar-selected` |
| Placeholder | `#A0AEC0` | `text-placeholder` |
| Subtitle | `#9DA0A8` | `text-subtitle` |
| Muted FG | `#5A5E6A` | `text-muted-fg` |
| Table Cell | `#3B3F4A` | `text-table-cell` |
| Inactive Tab | `#EFF1F4` | `bg-inactive-tab` |
| Inactive Tab Text | `#1A202C` | `text-inactive-tab-text` |
| Badge Green BG | `#C6F6D5` | `bg-badge-green-bg` |
| Badge Green Text | `#22543D` | `text-badge-green-text` |
| Toggle ON | `#3B82F6` | `bg-toggle-on` |
| Toggle OFF | `#CBD5E0` | `bg-toggle-off` |
| Delete Text | `#3F7A79` | `text-delete-text` |

### Typography

| Style | Font | Size | Weight | Tailwind |
|-------|------|------|--------|----------|
| Page Title | Pretendard | 32px | SemiBold (600) | `font-pretendard text-[32px] font-semibold` |
| Section Label | Pretendard | 20px | Bold (700) | `font-pretendard text-[20px] font-bold text-placeholder` |
| Field Label | Pretendard | 20px | SemiBold (600) | `font-pretendard text-[20px] font-semibold text-[#101010]` |
| Subtitle | Pretendard | 18px | Medium (500) | `font-pretendard text-[18px] font-medium text-subtitle` |
| Body | Pretendard | 14px | Regular (400) | `font-pretendard text-[14px]` |
| Sidebar Title | Pretendard | 24px | SemiBold (600) | `font-pretendard text-[24px] font-semibold tracking-[0.05em]` |
| Sidebar Menu | Inter | 16px | Regular (400) | `font-inter text-[16px] text-muted-fg` |
| Button Text | Inter | 18px | SemiBold (600) | `font-inter text-[18px] font-semibold` |
| Input Text | Inter | 18px | Regular (400) | `font-inter text-[18px]` |
| Badge | Inter | 18px | Bold (700) | `font-inter text-[18px] font-bold` |

### Spacing

| Element | Value | Tailwind |
|---------|-------|----------|
| Card padding | 32px | `p-8` |
| Form field column gap | 24px | `gap-6` |
| Content area left offset | 324px | `ml-[324px]` |
| Content area top padding | 20px | `pt-5` |
| Tab height | 52px | `h-[52px]` |
| Search input height | 48px | `h-12` |
| Detail input height | 52px | `h-[52px]` |
| Primary button height | 40px | `h-10` |
| Table header row height | 56px | `h-14` |
| Table body row height | 60px | `h-[60px]` |
| Avatar size (table) | 22px | `w-[22px] h-[22px]` |
| Profile image size | 116px | `w-[116px] h-[116px]` |
| Toggle switch size | 44x24px | `w-[44px] h-[24px]` |
| Toggle settings gap | 100px | `gap-[100px]` |

---

## Appendix C: Lucide Icons Used

| Icon | Import | Usage |
|------|--------|-------|
| `Pencil` | `lucide-react` | "Write" and "Save Changes" button icon |
| `Home` | `lucide-react` | Sidebar Home nav item |
| `Users` | `lucide-react` | Sidebar User section icon |
| `Gamepad2` | `lucide-react` | Sidebar Match section icon |
| `Shield` | `lucide-react` | Sidebar Admin section icon |
| `LogOut` | `lucide-react` | Sidebar Logout button icon |
| `ChevronsLeft` | `lucide-react` | Pagination "go to first page" |
| `ChevronLeft` | `lucide-react` | Pagination "previous page" |
| `ChevronRight` | `lucide-react` | Pagination "next page" |
| `ChevronsRight` | `lucide-react` | Pagination "go to last page" |
| `ChevronDown` | `lucide-react` | Table sort indicator, Select chevron, Accordion trigger |
| `ChevronUp` | `lucide-react` | Select chevron (open state) |
