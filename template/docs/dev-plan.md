# Development Plan

Single source of truth for the Potenlab Admin User Management UI.

- **Source PRD:** `template/docs/prd.md`
- **Source UI/UX:** `template/docs/ui-ux-plan.md`
- **Tech Stack:** Next.js 16 (App Router), TypeScript, shadcn/ui, Tailwind CSS 4, Lucide React, Bun
- **Fonts:** Pretendard Variable, Inter
- **Platform:** Desktop-only (1920px target)
- **Backend:** NONE -- all data is static/mock, hardcoded in the frontend

---

## Project Structure (Bulletproof React)

```
src/
├── app/                        # Routes, providers, root layout
│   ├── layout.tsx              # Root layout with sidebar + font loading
│   ├── page.tsx                # User Management List (Dashboard) route
│   └── users/
│       └── [id]/
│           └── page.tsx        # User Detail route
├── components/                 # SHARED + STYLED components
│   ├── ui/                     # shadcn/ui base components (auto-generated, then customized)
│   │   ├── accordion.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sidebar.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   ├── layouts/                # Page layout wrappers
│   │   └── content-layout.tsx  # Content area wrapper (ml-[324px], padding)
│   ├── common/                 # Generic reusable components
│   │   └── page-header.tsx     # Title + badge + subtitle + action button
│   └── user-management/        # Feature-specific PRESENTATIONAL components
│       ├── user-table.tsx      # Data table with columns and row rendering
│       ├── pagination-controls.tsx  # Pagination UI above table
│       ├── search-bar.tsx      # Search input for dashboard
│       ├── tab-navigation.tsx  # Tab bar (All, Tab, Tab)
│       ├── user-detail-form.tsx     # Detail page form (Basic Info + Other Settings)
│       └── profile-images.tsx  # 3x profile image display
├── features/                   # BUSINESS LOGIC only
│   └── user-management/
│       ├── types/
│       │   └── index.ts        # User interface, table column types
│       └── utils/
│           └── format.ts       # Date formatting, number formatting (e.g., "100,000")
├── lib/                        # Library wrappers, utilities
│   ├── utils.ts                # shadcn/ui cn() utility
│   └── mock-data.ts            # Static mock user data (5 rows)
├── types/                      # Shared TypeScript types
│   └── index.ts                # Global type definitions
└── styles/
    └── globals.css             # Tailwind CSS 4 + shadcn/ui theme overrides + font imports
```

---

## Phase 0: Foundation

Project setup, design tokens, fonts, Tailwind config, shadcn/ui initialization.

### P0-T1: Initialize shadcn/ui

- **Output:** `src/components/ui/` directory scaffold, `components.json`, `src/lib/utils.ts`
- **Behavior:** Run `bunx --bun shadcn@latest init` in the template directory. Select "New York" style, CSS variables enabled. This generates the base config and the `cn()` utility.
- **Verify:**
  - `components.json` exists at project root
  - `src/lib/utils.ts` exists and exports `cn()`
  - `bun run build` completes without errors

### P0-T2: Configure design tokens in globals.css

- **Depends on:** P0-T1
- **Output:** `src/styles/globals.css` (or `src/app/globals.css` depending on shadcn init)
- **Behavior:** Replace/extend the generated globals.css with the full set of Tailwind CSS 4 `@theme` custom properties and shadcn CSS variable overrides from the ui-ux-plan. Include:
  - `@theme` block with all custom colors: `--color-primary: #509594`, `--color-primary-hover: #3F7A79`, `--color-primary-active: #357070`, `--color-primary-light: #B9D5D4`, `--color-background: #FCFCFC`, `--color-surface: #FFFFFF`, `--color-border: #E2E8F0`, `--color-divider: #EFF1F4`, `--color-table-header: #F9FAFC`, `--color-sidebar-selected: #EEF2F6`, `--color-placeholder: #A0AEC0`, `--color-subtitle: #9DA0A8`, `--color-muted-fg: #5A5E6A`, `--color-table-cell: #3B3F4A`, `--color-inactive-tab: #EFF1F4`, `--color-inactive-tab-text: #1A202C`, `--color-badge-green-bg: #C6F6D5`, `--color-badge-green-text: #22543D`, `--color-toggle-on: #3B82F6`, `--color-toggle-off: #CBD5E0`, `--color-delete-text: #3F7A79`
  - Font family tokens: `--font-pretendard`, `--font-inter`, `--font-mono`
  - `:root` CSS variables for shadcn overrides: `--primary`, `--primary-foreground`, `--border`, `--background`, `--card`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--radius`
  - Base body styles: `background-color: #FCFCFC`, default font family Pretendard
- **Verify:**
  - Open app in browser; page background is `#FCFCFC`
  - Inspect `:root` in dev tools; all CSS variables are present
  - Tailwind utility classes like `bg-primary`, `text-primary`, `bg-table-header`, `text-placeholder` resolve to correct hex values

### P0-T3: Load fonts (Pretendard Variable + Inter)

- **Depends on:** P0-T2
- **Output:** `src/app/layout.tsx` (font loading section)
- **Behavior:**
  - Use `next/font/google` to load Inter with `subsets: ['latin']`, `variable: '--font-inter'`, `display: 'swap'`
  - Add Pretendard Variable via CDN `<link>` tag in layout `<head>`: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css`
  - Apply font CSS variables to `<html>` or `<body>` element
  - Set `<html lang="ko">` for Korean platform
- **Verify:**
  - Add a test heading "ADMIN" and body text; inspect computed font-family in dev tools
  - Pretendard Variable renders for heading text
  - Inter renders for a test button/input element
  - No FOUT (flash of unstyled text) -- fonts load with swap strategy

### P0-T4: Create shared TypeScript types

- **Output:** `src/features/user-management/types/index.ts`, `src/types/index.ts`
- **Behavior:**
  - Define `User` interface with all fields: `id`, `nickname`, `grade`, `avatar`, `phone`, `age`, `gender`, `region`, `joinDate`, `withdrawalDate`, `role`, `exerciseStyle`, `gymRelocation`, `bench`, `deadlift`, `squat`, `intro`, `profileImages: string[]`, `settings: { profilePublic: boolean; matchChatNotification: boolean; marketingNotification: boolean; }`
  - Define `UserTableColumn` type for table column definitions
  - Export shared navigation types if needed
- **Verify:**
  - Import `User` type in a test file; TypeScript compiles without errors
  - All fields from the PRD mock data structure are represented

### P0-T5: Create mock data

- **Depends on:** P0-T4
- **Output:** `src/lib/mock-data.ts`
- **Behavior:**
  - Export `mockUsers: User[]` with 5 user objects, all following the PRD sample data pattern (nickname "NicknameHere", grade "Mania", phone "010-1234-1234", age "Born 1999", gender "Male", region "Gangnam-gu", joinDate "Nov 1, 2022", withdrawalDate "Nov 1, 2022", etc.)
  - Each user gets a unique `id` ("1" through "5")
  - Export `totalUserCount = 100000`
  - Profile images use placeholder paths: `/profile/img1.jpg`, `/profile/img2.jpg`, `/profile/img3.jpg`
  - Avatar paths: `/avatars/user1.jpg` through `/avatars/user5.jpg`
- **Verify:**
  - Import `mockUsers` and `totalUserCount` in a test; values are correct
  - `mockUsers.length === 5`
  - Each user has all required fields populated

### P0-T6: Create utility functions

- **Depends on:** P0-T4
- **Output:** `src/features/user-management/utils/format.ts`
- **Behavior:**
  - `formatNumber(n: number): string` -- formats numbers with comma separators (e.g., `100000` -> `"100,000"`)
  - Any other string/date format helpers needed for display
- **Verify:**
  - `formatNumber(100000)` returns `"100,000"`
  - `formatNumber(0)` returns `"0"`

### P0-T7: Add placeholder images to public directory

- **Output:** `public/avatars/user1.jpg` through `public/avatars/user5.jpg`, `public/profile/img1.jpg` through `public/profile/img3.jpg`
- **Behavior:**
  - Create simple placeholder images (solid color squares or use a placeholder service URL in mock data instead)
  - Avatar images: 44x44px source (renders at 22x22)
  - Profile images: 232x232px source (renders at 116x116)
  - Alternative: use placeholder URLs like `https://placehold.co/44x44/EEF2F6/5A5E6A?text=U1` in mock data and skip file creation
- **Verify:**
  - Images load without 404 errors when referenced in components
  - Avatar images render as small circles; profile images render at 116x116 with 8px radius

---

## Phase 1: Shared UI Components

Install and customize all shadcn/ui components under `src/components/ui/` and build reusable common components.

### P1-T1: Install shadcn/ui components (batch)

- **Depends on:** P0-T1
- **Output:** `src/components/ui/button.tsx`, `card.tsx`, `table.tsx`, `input.tsx`, `select.tsx`, `badge.tsx`, `avatar.tsx`, `switch.tsx`, `tabs.tsx`, `separator.tsx`, `accordion.tsx`, `sidebar.tsx`, `label.tsx`, `tooltip.tsx`
- **Behavior:** Run:
  ```bash
  bunx --bun shadcn@latest add card button table input select badge avatar switch tabs separator accordion sidebar label tooltip
  ```
  This installs all 14 shadcn/ui components into `src/components/ui/`.
- **Verify:**
  - All 14 `.tsx` files exist in `src/components/ui/`
  - `bun run build` completes without errors
  - Each component can be imported without TypeScript errors

### P1-T2: Customize Button component with design variants

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/button.tsx` (modified)
- **Behavior:** Add custom variants to the Button component's `cva` config:
  - `primary`: `bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-inter text-[18px] font-semibold h-10 px-4 rounded-lg transition-colors duration-150 ease-out active:scale-[0.98]`. Disabled: `opacity-50 cursor-not-allowed pointer-events-none`
  - `secondary`: `bg-sidebar-selected text-black font-inter text-[18px] font-semibold h-12 px-4 rounded-md`
  - `pagination`: `bg-primary-light text-primary h-10 w-10 rounded-md hover:bg-[#A0C4C3] hover:text-primary-hover`. Disabled: `opacity-50 cursor-not-allowed`
  - `ghost`: `bg-transparent text-delete-text hover:underline hover:text-primary-hover p-0 h-auto text-[14px]`
  - Focus ring on all variants: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
- **Verify:**
  - Render each variant in a test page; colors match design tokens
  - Hover state changes background on primary buttons to `#3F7A79`
  - Active state applies `scale(0.98)` on primary buttons
  - Disabled state shows 50% opacity and `cursor: not-allowed`
  - Focus ring appears on Tab focus

### P1-T3: Customize Table component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/table.tsx` (modified)
- **Behavior:** Override default shadcn/ui table styles:
  - `Table` wrapper: `border border-border bg-white` (no border-radius per Figma)
  - `TableHeader`: `bg-table-header`
  - `TableHead`: `h-14 text-[14px] font-semibold text-table-cell px-4 align-middle`
  - `TableRow`: `h-[60px] border-b border-border hover:bg-table-header cursor-pointer transition-colors duration-150`
  - `TableCell`: `px-4 text-[14px] text-table-cell align-middle`
- **Verify:**
  - Render a test table with 2 columns and 2 rows
  - Table header background is `#F9FAFC`
  - Row hover changes background
  - Row height is 60px; header row height is 56px
  - Cell text color is `#3B3F4A`

### P1-T4: Customize Input component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/input.tsx` (modified)
- **Behavior:** Override default input styles:
  - Base: `border border-border rounded-md font-inter text-[18px] text-black placeholder:text-placeholder bg-white`
  - Focus: `focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150`
  - Hover: `hover:border-[#CBD5E0]`
  - Disabled: `disabled:bg-table-header disabled:text-placeholder disabled:cursor-not-allowed`
  - Two size presets used via className at call sites:
    - Dashboard search: `h-12` (48px)
    - Detail form: `h-[52px]` (52px)
  - Default padding: `px-4`
- **Verify:**
  - Render input with placeholder "Enter search keyword"; placeholder text is `#A0AEC0`
  - Focus the input; border turns `#509594` with subtle ring shadow
  - Hover border changes to `#CBD5E0`

### P1-T5: Customize Select component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/select.tsx` (modified)
- **Behavior:**
  - `SelectTrigger`: `h-[52px] border border-border rounded-md px-4 pr-12 font-inter text-[18px] text-[#2D3748] bg-white hover:border-[#CBD5E0] focus:border-primary focus:ring-2 focus:ring-primary/20`
  - Chevron icon area: 48px right padding, chevron `#A0AEC0` default, `#509594` on focus/open
  - `SelectContent`: `bg-white border border-border rounded-md shadow-md`
  - `SelectItem`: `hover:bg-sidebar-selected px-4 py-2 text-[18px]`
  - Transition: chevron rotates 180deg on open (300ms ease-in-out)
- **Verify:**
  - Render select with 3 options; trigger shows chevron down icon
  - Click opens dropdown with white bg and shadow
  - Hover on item shows `#EEF2F6` background
  - Focus/open state border is primary color

### P1-T6: Customize Badge component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/badge.tsx` (modified)
- **Behavior:** Add a `green` variant:
  - `bg-badge-green-bg text-badge-green-text font-inter text-[18px] font-bold px-3 py-1 rounded-full`
  - Used for the count badge on the dashboard header ("100,000")
- **Verify:**
  - Render `<Badge variant="green">100,000</Badge>`
  - Background is `#C6F6D5`, text is `#22543D`, pill shape (fully rounded)

### P1-T7: Customize Avatar component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/avatar.tsx` (modified)
- **Behavior:**
  - Table avatar: `w-[22px] h-[22px] rounded-full`
  - `AvatarFallback`: First letter of nickname, `bg-sidebar-selected text-muted-fg text-[10px]`
  - Ensure `AvatarImage` has `alt` text for accessibility
- **Verify:**
  - Render avatar with an image src; displays 22px circle
  - Render avatar without image; shows fallback letter in gray circle
  - Inspect: `alt` attribute present on `<img>`

### P1-T8: Customize Switch component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/switch.tsx` (modified)
- **Behavior:**
  - Track size: `w-[44px] h-[24px] rounded-full`
  - OFF state: track `bg-toggle-off`, thumb white, positioned left
  - ON state: track `bg-toggle-on` (blue `#3B82F6`), thumb white, positioned right
  - Hover OFF: track `#B0BEC5`; hover ON: track `#2563EB`
  - Thumb size: 20px with 2px inset from track edge
  - Transition: `200ms ease-in-out` for thumb translation and track color
  - Disabled: 50% opacity
  - `aria-checked` attribute managed by Radix Switch
- **Verify:**
  - Render switch in OFF state; track is gray, thumb is left
  - Click switch; animates to ON -- track turns blue, thumb slides right
  - Keyboard: Space toggles state
  - Inspect: `aria-checked` toggles between `true`/`false`

### P1-T9: Customize Tabs component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/tabs.tsx` (modified)
- **Behavior:**
  - `TabsList`: `gap-2 bg-transparent p-0` (no background on the list container itself)
  - `TabsTrigger` active: `bg-primary text-white font-pretendard font-semibold h-[52px] px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white`
  - `TabsTrigger` inactive: `bg-inactive-tab text-inactive-tab-text font-pretendard font-medium h-[52px] px-4 rounded-md`
  - Hover (inactive): `hover:bg-border`
  - Transition: `200ms ease-in-out` on background-color and color
  - `aria-selected` on active tab (handled by Radix Tabs)
- **Verify:**
  - Render 3 tabs: "All" (active), "Tab", "Tab"
  - Active tab is teal with white text
  - Inactive tabs are light gray with dark text
  - Click inactive tab; it becomes active (color swap)
  - Keyboard: Arrow Left/Right switches tabs

### P1-T10: Customize Separator component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/separator.tsx` (modified)
- **Behavior:**
  - Default color: `bg-divider` (`#EFF1F4`)
  - Height: 1px (horizontal)
  - Full width of parent container
- **Verify:**
  - Render separator; visible as a thin light gray line
  - Inspect: background color is `#EFF1F4`

### P1-T11: Customize Accordion component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/accordion.tsx` (modified)
- **Behavior:**
  - Trigger: chevron icon rotates 180deg on expand (300ms ease-in-out)
  - Content: animated height expand/collapse (300ms ease-in-out)
  - Trigger text: `font-inter text-[16px] text-muted-fg`
  - `aria-expanded` on trigger (handled by Radix Accordion)
- **Verify:**
  - Render accordion with one section; click trigger, content expands with animation
  - Chevron rotates on expand
  - Keyboard: Enter/Space toggles

### P1-T12: Customize Label component

- **Depends on:** P1-T1, P0-T2
- **Output:** `src/components/ui/label.tsx` (modified)
- **Behavior:**
  - Style: `font-pretendard text-[20px] font-semibold text-[#101010]`
  - Margin bottom: `mb-2` (8px below label, above input)
  - Uses `htmlFor` attribute to associate with input `id`
- **Verify:**
  - Render label above an input; label text is 20px SemiBold, nearly black
  - Click label; associated input receives focus (via `htmlFor`/`id` pairing)

### P1-T13: Build PageHeader common component

- **Depends on:** P1-T2, P1-T6, P1-T10
- **Output:** `src/components/common/page-header.tsx`
- **Behavior:**
  - Props: `title: string`, `subtitle: string`, `badgeCount?: number`, `actionLabel: string`, `actionIcon?: LucideIcon`, `onAction?: () => void`
  - Layout: Flex row. Left side: title (32px SemiBold Pretendard, black) + Badge (only if `badgeCount` provided) on same line. Subtitle below (18px Medium Pretendard, `#9DA0A8`). Right side: action Button (primary variant) with optional icon.
  - Below the header content, render a `<Separator />` with vertical margin
- **Verify:**
  - Render `<PageHeader title="User Management" subtitle="User list management page" badgeCount={100000} actionLabel="Write" />`
  - Title "User Management" in 32px SemiBold
  - Badge "100,000" in green pill beside title
  - Subtitle below in gray
  - "Write" button top-right in teal
  - Separator line beneath

---

## Phase 2: Layout & Navigation

Sidebar, root layout, content area structure.

### P2-T1: Build AppSidebar component

- **Depends on:** P1-T1, P1-T11, P0-T2, P0-T3
- **Output:** `src/components/layouts/app-sidebar.tsx`
- **Behavior:**
  - Uses shadcn/ui `Sidebar` primitives (or custom div-based implementation) + `Accordion`
  - Fixed position left, 300px width, full viewport height, white background, right border `#E2E8F0`
  - **Header section:**
    - "ADMIN" title: Pretendard 24px SemiBold, `letter-spacing: 0.05em`
    - Admin ID subtitle: 14px Regular `#9DA0A8`, e.g., "admin@potenlab.com"
    - Bottom spacing 32px
  - **Navigation section (Accordion):**
    - "Home" item: `Home` icon (Lucide), no accordion, links to `/`
    - "User" accordion: `Users` icon, expands to show "User Management" sub-item
    - "Match" accordion: `Gamepad2` icon, expands to show "Match Management" sub-item
    - "Admin" accordion: `Shield` icon, expands to show "Notice Management", "Report Management", "Terms Management" sub-items
    - Menu item height: 48px, text: Inter 16px Regular `#5A5E6A`, icon: 20px `#5A5E6A`
    - Menu item hover: `#F9FAFC` background (150ms ease-out)
    - Sub-menu items: indented 40px, height 44px
    - Active sub-menu: `#EEF2F6` background, `#509594` text, dot indicator
    - Active state derived from `usePathname()` (Next.js)
    - Sub-menu items use `next/link` for navigation
  - **Footer section:**
    - `Separator` above
    - Logout button: `LogOut` icon + "Logout" text, centered, 16px Regular `#5A5E6A`
    - Hover: text turns `#EF4444` (red hint for destructive action)
    - Click: no-op (UI only)
  - Keyboard: Tab navigates between items, Enter/Space toggles accordion, Arrow Up/Down navigates accordion items
- **Verify:**
  - Sidebar renders at 300px width on left side of viewport
  - "ADMIN" title visible with correct font
  - Click "User" accordion; "User Management" sub-item appears with animation
  - "User Management" has active highlight when on `/` route
  - Logout button visible at bottom with separator above
  - Hover logout; text turns red
  - Keyboard: Tab through sidebar items; focus visible on each

### P2-T2: Build ContentLayout wrapper component

- **Depends on:** P2-T1
- **Output:** `src/components/layouts/content-layout.tsx`
- **Behavior:**
  - Wraps page content with correct offset: `ml-[324px] pt-5 pr-8 pb-8`
  - Content area offset: 300px sidebar + 24px gap = 324px from left
  - Top padding: 20px
  - Receives `children` as prop
  - Background: inherits from body (`#FCFCFC`)
- **Verify:**
  - Wrap test content with `<ContentLayout>`; content appears to the right of the sidebar
  - Inspect: margin-left is 324px, padding-top is 20px

### P2-T3: Build root layout (app/layout.tsx)

- **Depends on:** P2-T1, P2-T2, P0-T3
- **Output:** `src/app/layout.tsx`
- **Behavior:**
  - `<html lang="ko">` with font CSS variables applied
  - Loads Inter via `next/font/google` with `variable: '--font-inter'`
  - Loads Pretendard Variable via CDN link in `<head>`
  - Renders `<AppSidebar />` persistent on all pages
  - Renders `<ContentLayout>{children}</ContentLayout>` as main content area
  - Skip link: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>` as first element
  - `<main id="main-content">` wraps content area for skip link target
  - Imports `globals.css`
- **Verify:**
  - Open app; sidebar visible on left, content on right
  - Navigate between pages; sidebar persists
  - Tab key first focuses "Skip to main content" link (visible on focus)
  - Press Enter on skip link; focus moves to main content area
  - Inspect `<html>`: `lang="ko"` attribute present
  - Fonts loaded: Pretendard and Inter visible in Network tab

---

## Phase 3: Features -- User Management List Page (Dashboard)

### P3-T1: Build TabNavigation component

- **Depends on:** P1-T9
- **Output:** `src/components/user-management/tab-navigation.tsx`
- **Behavior:**
  - Uses shadcn/ui `Tabs`, `TabsList`, `TabsTrigger`
  - 3 tabs: "All" (default active), "Tab", "Tab"
  - Active tab: teal bg, white text. Inactive: light gray bg, dark text
  - `defaultValue="all"`
  - Tab switching updates local state (UI only, no filtering)
  - Arrow Left/Right keyboard navigation between tabs
- **Verify:**
  - Render component; "All" tab is active (teal)
  - Click "Tab"; it becomes active, "All" becomes inactive
  - Keyboard: Arrow Right moves focus and activates next tab

### P3-T2: Build SearchBar component

- **Depends on:** P1-T4
- **Output:** `src/components/user-management/search-bar.tsx`
- **Behavior:**
  - Full-width `Input` component
  - Height: 48px (`h-12`), border radius 6px
  - Placeholder: "Enter search keyword"
  - Placeholder color: `#A0AEC0`
  - Accepts text input (state managed locally, no actual search)
  - Focus highlights border to primary
- **Verify:**
  - Render search bar; full width with placeholder text in gray
  - Click/focus; border changes to teal
  - Type text; placeholder disappears, text visible

### P3-T3: Build PaginationControls component

- **Depends on:** P1-T2, P1-T4, P1-T5
- **Output:** `src/components/user-management/pagination-controls.tsx`
- **Behavior:**
  - Flex row with `justify-between`
  - **Left group:**
    - 4 pagination buttons: `<<` (ChevronsLeft), `<` (ChevronLeft), `>` (ChevronRight), `>>` (ChevronsRight)
    - Button variant: `pagination` (40x40px, `#B9D5D4` bg, 6px radius)
    - Each icon-only button has `aria-label` (e.g., "Go to first page", "Previous page", "Next page", "Go to last page")
    - Page indicator between `<` and `>`: "1 / 1"
      - Current page: 20px Bold
      - Separator "/" and total: 16px Regular `#5A5E6A`
    - All buttons visually present but disabled state (muted, since single page of mock data)
  - **Right group:**
    - Page jump `Input`: 100px width, 48px height, placeholder "Page", 6px radius
    - "Go" button: `secondary` variant, 48px height
    - Items per page `Select`: 96px width, 48px height, default "10 items", options: "10 items", "20 items", "50 items"
  - State: current page, items per page managed locally (UI only)
  - `aria-live="polite"` on page indicator region
- **Verify:**
  - Render component; all 4 nav buttons visible in `#B9D5D4`
  - "1 / 1" displayed between `<` and `>`
  - Page jump input visible with "Page" placeholder
  - "Go" button renders in gray
  - Items per page dropdown shows "10 items"
  - Click dropdown; opens with 3 options
  - All icon buttons have `aria-label` (inspect DOM)

### P3-T4: Build UserTable component

- **Depends on:** P1-T3, P1-T7, P1-T2, P0-T5
- **Output:** `src/components/user-management/user-table.tsx`
- **Behavior:**
  - Uses shadcn/ui `Table`, `TableHeader`, `TableHead`, `TableBody`, `TableRow`, `TableCell`
  - 10 columns per spec:
    - Nickname (flex-1), Grade (flex-1), Avatar (80px fixed, centered), Phone Number (flex-1), Age (flex-1), Gender (flex-1), Region (flex-1), Join Date (flex-1, sort icon), Withdrawal Date (flex-1, sort icon), Delete (57px fixed)
  - Renders 5 rows from `mockUsers` data
  - Avatar column: `Avatar` component (22px circular)
  - Delete column: ghost button with teal text "Delete" (`#3F7A79`), underline on hover
  - Sort icons on Join Date and Withdrawal Date: `ChevronDown` icon (visual only, no actual sort)
  - Row `onClick`: navigates to `/users/[id]` via `useRouter().push()`
  - Delete `onClick`: calls `event.stopPropagation()` to prevent row navigation (UI only, no deletion)
  - Row hover: `#F9FAFC` background, `cursor: pointer`
  - Table container: white bg, `#E2E8F0` border, no border-radius
  - Header row: `#F9FAFC` bg, 56px height, 14px SemiBold text
  - Body row: 60px height, 14px Regular text, `#3B3F4A`
  - Empty state: "No users found" centered (not needed for 5 mock rows, but define for completeness)
- **Verify:**
  - Table renders with 10 column headers and 5 data rows
  - Avatar column shows small circular image (or fallback initial)
  - Hover over row; background changes, cursor is pointer
  - Click row; navigates to `/users/1` (check URL bar)
  - Click "Delete" on a row; does NOT navigate (stopPropagation works)
  - Sort icons visible on Join Date and Withdrawal Date columns
  - Table container has border but no rounded corners

### P3-T5: Assemble Dashboard page (app/page.tsx)

- **Depends on:** P3-T1, P3-T2, P3-T3, P3-T4, P1-T13, P0-T5, P0-T6
- **Output:** `src/app/page.tsx`
- **Behavior:**
  - Uses `Card` as the main container (white, 8px radius, `#E2E8F0` border, 32px padding)
  - Composes inside Card, top to bottom:
    1. `PageHeader` with title "User Management", subtitle "User list management page", badgeCount `totalUserCount` (formatted to "100,000"), actionLabel "Write", actionIcon `Pencil`
    2. `TabNavigation` (3 tabs, "All" active)
    3. `SearchBar` (full-width input)
    4. `PaginationControls` (nav buttons + page jump + items per page)
    5. `UserTable` (5 rows of mock data)
  - Spacing between sections: consistent gaps (use `space-y-6` or explicit margins per Figma)
  - Route: `/` (app/page.tsx)
- **Verify:**
  - Open `/` in browser; full dashboard visible inside white card
  - Header shows "User Management" + green badge "100,000" + subtitle + "Write" button
  - Separator line below header
  - Tabs render below separator
  - Search bar below tabs
  - Pagination controls below search
  - Data table with 5 rows below pagination
  - All spacing looks correct against Figma wireframe
  - "Write" button click: no-op (UI only)

---

## Phase 4: Features -- User Detail Page

### P4-T1: Build ProfileImages component

- **Depends on:** P0-T5, P0-T7
- **Output:** `src/components/user-management/profile-images.tsx`
- **Behavior:**
  - Props: `images: string[]` (array of 3 image URLs)
  - Renders 3 images in a horizontal flex row with 16px gap
  - Each image: 116x116px, 8px border-radius, `object-cover`
  - Uses `<img>` or Next.js `<Image>` with appropriate alt text (e.g., "Profile photo 1", "Profile photo 2", "Profile photo 3")
  - Fallback: if image fails to load, show gray placeholder block (116x116, `#EEF2F6` bg)
- **Verify:**
  - Render with 3 placeholder images; 3 boxes appear horizontally
  - Each image is 116x116 with rounded corners
  - Alt text present on each `<img>` tag

### P4-T2: Build UserDetailForm component

- **Depends on:** P1-T4, P1-T5, P1-T8, P1-T12, P1-T10, P4-T1, P0-T5
- **Output:** `src/components/user-management/user-detail-form.tsx`
- **Behavior:**
  - Props: `user: User`
  - **Basic Info section:**
    - Section label: "Basic Info" (Pretendard 20px Bold, `#A0AEC0`)
    - `ProfileImages` component with user's 3 profile images (margin-bottom 24px)
    - "One-Line Intro" field: `Label` + full-width `Input` (52px height), pre-filled with `user.intro`
    - **Row 1** (CSS Grid `grid-cols-4 gap-6`): Role (Select: "User", "Admin"), Nickname (Input), Phone (Input), Age (Input)
    - **Row 2** (CSS Grid `grid-cols-4 gap-6`): Gender (Select: "Male", "Female"), Exercise Style (Select: "Bodybuilding", "Crossfit", "Cardio"), Gym Relocation (Select: "Available", "Not Available"), Region (Select: "Seoul Mapo-gu", "Gangnam-gu", "Songpa-gu")
    - **Row 3** (CSS Grid `grid-cols-3 gap-6`): Bench (Input), Deadlift (Input), Squat (Input)
    - All inputs/selects are 52px height, 6px radius, 16px horizontal padding
    - All fields pre-filled with mock data values
    - Labels above each field: 20px SemiBold `#101010`
  - **Separator** between sections
  - **Other Settings section:**
    - Section label: "Other Settings" (Pretendard 20px Bold, `#A0AEC0`)
    - Horizontal flex layout with 100px gap between toggle items
    - 3 toggles: "Profile Public" (OFF), "Match & Chat Notification" (ON), "Marketing Notification" (OFF)
    - Each toggle: label text left + `Switch` component right (or text above, switch beside)
    - Switch state reflects `user.settings` values
    - Toggles are interactive (local state change on click, UI only)
  - All form fields are editable (inputs accept typing, selects open, toggles toggle)
  - No form validation needed
- **Verify:**
  - Render with mock user data; all fields pre-filled correctly
  - "Basic Info" section label visible in gray
  - 3 profile images displayed
  - "One-Line Intro" input shows "This is the one-line intro content."
  - Row 1: 4 fields in equal columns with 24px gap
  - Row 2: 4 fields, dropdowns open on click
  - Row 3: 3 fields in equal columns
  - Separator between sections
  - "Other Settings" label visible
  - 3 toggles in a row with 100px gap
  - "Match & Chat Notification" toggle is ON (blue); others are OFF (gray)
  - Click a toggle; it switches state with animation

### P4-T3: Assemble User Detail page (app/users/[id]/page.tsx)

- **Depends on:** P4-T2, P1-T13, P0-T5
- **Output:** `src/app/users/[id]/page.tsx`
- **Behavior:**
  - Reads `params.id` from route (Next.js dynamic route)
  - Looks up user from `mockUsers` by id (falls back to first user if not found)
  - Uses `Card` as main container (same styling as dashboard card)
  - Composes inside Card:
    1. `PageHeader` with title "User Management", subtitle "You can edit user information.", actionLabel "Save Changes", actionIcon `Pencil`
    2. `UserDetailForm` with the selected user
  - "Save Changes" button click: no-op (UI only, no actual save)
  - Route: `/users/[id]`
- **Verify:**
  - Navigate to `/users/1`; detail page loads in white card
  - Header shows "User Management" + subtitle "You can edit user information." + "Save Changes" button
  - No badge on this page (badgeCount not passed)
  - Form renders with all user fields pre-filled
  - Sidebar shows "User Management" as active
  - Click "Save Changes": no error (UI only)
  - Navigate back via sidebar "User Management" link; returns to dashboard

---

## Phase 5: Polish

Accessibility, animations, micro-interactions, keyboard navigation, final QA.

### P5-T1: Accessibility audit -- keyboard navigation

- **Depends on:** P3-T5, P4-T3
- **Output:** Updates to existing components as needed
- **Behavior:** Verify and fix keyboard navigation across all components:
  - **Skip link:** Tab first focuses "Skip to main content"; Enter jumps to `#main-content`
  - **Sidebar:** Tab/Shift+Tab navigates between items. Enter/Space toggles accordion. Arrow Up/Down navigates within accordion.
  - **Tabs:** Arrow Left/Right switches tabs. Enter/Space activates.
  - **Table rows:** Tab focuses row (or first interactive element). Enter navigates to detail.
  - **Delete action:** Enter/Space triggers delete. Tab reaches it separately from row.
  - **Pagination buttons:** Tab + Enter navigates. Each has `aria-label`.
  - **Inputs:** Tab focuses. Standard text input behavior.
  - **Selects:** Enter/Space opens. Arrow Up/Down navigates. Enter selects. Escape closes.
  - **Toggles:** Space toggles ON/OFF.
  - **Buttons:** Enter/Space activates.
  - Focus ring: 2px `#509594` outline with 2px offset on ALL interactive elements
- **Verify:**
  - Start at top of page, Tab through every interactive element without mouse
  - Focus ring visible on each element
  - No keyboard traps (can always Tab out or Escape out)
  - All actions achievable via keyboard alone
  - Skip link works on both pages

### P5-T2: Accessibility audit -- ARIA and screen reader

- **Depends on:** P5-T1
- **Output:** Updates to existing components as needed
- **Behavior:** Verify and fix ARIA attributes:
  - Badge: `aria-label="Total users: 100,000"` (screen reader reads meaningful text)
  - Active tab: `aria-selected="true"` (Radix handles this)
  - Table: ensure `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>` semantic elements (shadcn/ui table uses these)
  - Sort columns: `aria-label="Join Date, sortable column"` on header
  - Delete buttons: `aria-label="Delete user NicknameHere"` with dynamic user name
  - Toggle switches: `aria-checked` managed by Radix Switch
  - Accordion: `aria-expanded` on triggers
  - Pagination: `aria-live="polite"` on page indicator region
  - All icon-only buttons: `aria-label` present
  - Heading hierarchy: `<h1>` for page title, `<h2>` for section labels
  - Form fields: `<label htmlFor="field-id">` paired with `<input id="field-id">`
- **Verify:**
  - Use browser accessibility inspector (Chrome DevTools Accessibility tab)
  - VoiceOver (macOS): navigate through page; all elements announced correctly
  - Check: page title reads "User Management, heading level 1"
  - Check: badge reads "Total users: 100,000"
  - Check: toggle reads "Profile Public, switch, off"
  - No accessibility warnings in browser dev tools

### P5-T3: Micro-interactions and transitions

- **Depends on:** P3-T5, P4-T3
- **Output:** Updates to existing component styles
- **Behavior:** Ensure all transitions from the ui-ux-plan are implemented:
  - **Button hover:** `background-color 150ms ease-out` (primary -> `#3F7A79`)
  - **Button active:** `scale(0.98)` + `background-color 100ms ease-out` (primary -> `#357070`)
  - **Table row hover:** `background-color 150ms ease-out` (-> `#F9FAFC`)
  - **Toggle switch:** thumb `transform 200ms ease-in-out`, track `background-color 200ms ease-in-out`
  - **Accordion expand/collapse:** `height 300ms ease-in-out`, `opacity 200ms ease-in-out`. Chevron `transform 300ms ease-in-out` (rotate 180deg)
  - **Tab switch:** `background-color 200ms ease-in-out`, `color 200ms ease-in-out`
  - **Input focus:** `border-color 150ms ease-out`, `box-shadow 150ms ease-out` (ring appears)
  - **Delete text hover:** `color 150ms ease-out`, `text-decoration: underline`
  - **Sidebar menu item hover:** `background-color 150ms ease-out`
  - **Logout hover:** text color transition to red
- **Verify:**
  - Visually test each interaction; animations are smooth, not janky
  - No transitions are instant (all have appropriate duration)
  - Toggle thumb slides smoothly
  - Accordion content height animates (not instant appear/disappear)

### P5-T4: Final visual QA against design specs

- **Depends on:** P5-T3
- **Output:** Bug fixes and adjustments to existing components/styles
- **Behavior:** Systematic check of every visual element against the Figma design specs and PRD:
  - **Colors:** Verify every color token matches hex values in the PRD
  - **Typography:** Verify font family, size, weight, line-height for every text style
  - **Spacing:** Verify all paddings, margins, gaps match spec (card 32px padding, field gap 24px, etc.)
  - **Sizing:** Verify all fixed dimensions (sidebar 300px, button heights, input heights, avatar 22px, profile images 116px, toggle 44x24px, table row heights)
  - **Border radius:** Cards 8px, inputs/tabs/selects 6px, avatars full-round, table 0px
  - **Borders:** Card `#E2E8F0`, dividers `#EFF1F4`, table `#E2E8F0`
  - **Shadows:** Minimal/none on cards, `shadow-md` on dropdown menus only
  - **Layout:** Sidebar 300px fixed, content offset 324px, 20px top padding
  - **Dashboard page:** All elements match wireframe from Section 7.1
  - **Detail page:** All elements match wireframe from Section 7.2
  - **Empty/edge states:** Single page pagination shows disabled buttons
- **Verify:**
  - Side-by-side comparison with Figma designs at 1920px viewport
  - No visual regressions or misalignments
  - All hover/focus states match spec
  - Build succeeds: `bun run build` completes without errors

---

## Task Dependency Graph

```
P0-T1 (shadcn init)
  ├── P0-T2 (design tokens) ──> P0-T3 (fonts)
  └── P1-T1 (install components)
        ├── P1-T2 (Button)
        ├── P1-T3 (Table)
        ├── P1-T4 (Input)
        ├── P1-T5 (Select)
        ├── P1-T6 (Badge)
        ├── P1-T7 (Avatar)
        ├── P1-T8 (Switch)
        ├── P1-T9 (Tabs)
        ├── P1-T10 (Separator)
        ├── P1-T11 (Accordion)
        └── P1-T12 (Label)

P0-T4 (types) ──> P0-T5 (mock data)
P0-T4 (types) ──> P0-T6 (utils)

P1-T2 + P1-T6 + P1-T10 ──> P1-T13 (PageHeader)

P1-T11 + P0-T2 + P0-T3 ──> P2-T1 (AppSidebar)
P2-T1 ──> P2-T2 (ContentLayout)
P2-T1 + P2-T2 + P0-T3 ──> P2-T3 (Root Layout)

P1-T9 ──> P3-T1 (TabNavigation)
P1-T4 ──> P3-T2 (SearchBar)
P1-T2 + P1-T4 + P1-T5 ──> P3-T3 (PaginationControls)
P1-T3 + P1-T7 + P1-T2 + P0-T5 ──> P3-T4 (UserTable)
P3-T1 + P3-T2 + P3-T3 + P3-T4 + P1-T13 + P0-T5 + P0-T6 ──> P3-T5 (Dashboard page)

P0-T5 + P0-T7 ──> P4-T1 (ProfileImages)
P1-T4 + P1-T5 + P1-T8 + P1-T12 + P1-T10 + P4-T1 + P0-T5 ──> P4-T2 (UserDetailForm)
P4-T2 + P1-T13 + P0-T5 ──> P4-T3 (User Detail page)

P3-T5 + P4-T3 ──> P5-T1 (Keyboard a11y)
P5-T1 ──> P5-T2 (ARIA/SR a11y)
P3-T5 + P4-T3 ──> P5-T3 (Micro-interactions)
P5-T3 ──> P5-T4 (Visual QA)
```

---

## Task Summary

| ID | Phase | Task | Key Output |
|----|-------|------|------------|
| P0-T1 | 0 | Initialize shadcn/ui | `components.json`, `src/lib/utils.ts` |
| P0-T2 | 0 | Configure design tokens in globals.css | `src/styles/globals.css` |
| P0-T3 | 0 | Load fonts (Pretendard + Inter) | `src/app/layout.tsx` (fonts) |
| P0-T4 | 0 | Create shared TypeScript types | `src/features/user-management/types/index.ts` |
| P0-T5 | 0 | Create mock data | `src/lib/mock-data.ts` |
| P0-T6 | 0 | Create utility functions | `src/features/user-management/utils/format.ts` |
| P0-T7 | 0 | Add placeholder images | `public/avatars/`, `public/profile/` |
| P1-T1 | 1 | Install shadcn/ui components (batch) | 14 files in `src/components/ui/` |
| P1-T2 | 1 | Customize Button variants | `src/components/ui/button.tsx` |
| P1-T3 | 1 | Customize Table component | `src/components/ui/table.tsx` |
| P1-T4 | 1 | Customize Input component | `src/components/ui/input.tsx` |
| P1-T5 | 1 | Customize Select component | `src/components/ui/select.tsx` |
| P1-T6 | 1 | Customize Badge component | `src/components/ui/badge.tsx` |
| P1-T7 | 1 | Customize Avatar component | `src/components/ui/avatar.tsx` |
| P1-T8 | 1 | Customize Switch component | `src/components/ui/switch.tsx` |
| P1-T9 | 1 | Customize Tabs component | `src/components/ui/tabs.tsx` |
| P1-T10 | 1 | Customize Separator component | `src/components/ui/separator.tsx` |
| P1-T11 | 1 | Customize Accordion component | `src/components/ui/accordion.tsx` |
| P1-T12 | 1 | Customize Label component | `src/components/ui/label.tsx` |
| P1-T13 | 1 | Build PageHeader common component | `src/components/common/page-header.tsx` |
| P2-T1 | 2 | Build AppSidebar component | `src/components/layouts/app-sidebar.tsx` |
| P2-T2 | 2 | Build ContentLayout wrapper | `src/components/layouts/content-layout.tsx` |
| P2-T3 | 2 | Build root layout | `src/app/layout.tsx` |
| P3-T1 | 3 | Build TabNavigation component | `src/components/user-management/tab-navigation.tsx` |
| P3-T2 | 3 | Build SearchBar component | `src/components/user-management/search-bar.tsx` |
| P3-T3 | 3 | Build PaginationControls component | `src/components/user-management/pagination-controls.tsx` |
| P3-T4 | 3 | Build UserTable component | `src/components/user-management/user-table.tsx` |
| P3-T5 | 3 | Assemble Dashboard page | `src/app/page.tsx` |
| P4-T1 | 4 | Build ProfileImages component | `src/components/user-management/profile-images.tsx` |
| P4-T2 | 4 | Build UserDetailForm component | `src/components/user-management/user-detail-form.tsx` |
| P4-T3 | 4 | Assemble User Detail page | `src/app/users/[id]/page.tsx` |
| P5-T1 | 5 | Accessibility -- keyboard navigation | Updates across components |
| P5-T2 | 5 | Accessibility -- ARIA and screen reader | Updates across components |
| P5-T3 | 5 | Micro-interactions and transitions | Style updates across components |
| P5-T4 | 5 | Final visual QA against design specs | Bug fixes, adjustments |

**Total: 31 tasks across 6 phases**
