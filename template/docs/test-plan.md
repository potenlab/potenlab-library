# Test Plan

## Overview

- **Project:** Admin User Management UI (frontend only)
- **Testing approach:** Component testing with Vitest + React Testing Library
- **No backend/API testing** -- all data is mock/static
- **Platform:** Desktop-only (1920px target viewport)
- **Tech Stack:** Next.js 16 (App Router), TypeScript, shadcn/ui, Tailwind CSS 4
- **Source documents:** `dev-plan.md` (phases/tasks), `frontend-plan.md` (component specs), `prd.md` (requirements/user stories)

---

## Test Infrastructure

### Vitest Configuration

- **Environment:** `jsdom` for all component tests
- **Config file:** `vitest.config.ts` at project root
- **Required settings:**
  - `environment: "jsdom"`
  - `globals: true` (allows `describe`, `it`, `expect` without imports)
  - `setupFiles: ["./tests/setup.ts"]`
  - Path alias resolution matching `tsconfig.json` (`@/` -> `src/`)
  - CSS module handling (mock or transform Tailwind CSS imports)
  - Asset handling (mock image imports: `.jpg`, `.png`, `.svg`)

### React Testing Library Setup

- **Packages required:**
  - `@testing-library/react` -- render, screen, fireEvent, waitFor
  - `@testing-library/jest-dom` -- custom matchers (toBeInTheDocument, toHaveClass, toHaveAttribute, etc.)
  - `@testing-library/user-event` -- realistic user interaction simulation (click, type, keyboard)
  - `jsdom` -- DOM environment for Vitest

### Setup File (`tests/setup.ts`)

- Import `@testing-library/jest-dom/vitest` for matcher extensions
- Mock `next/navigation` (`useRouter`, `usePathname`, `useParams`)
- Mock `next/image` to render as standard `<img>` element
- Mock `next/link` to render as standard `<a>` element
- Mock `next/font/google` to return CSS variable objects

### Test Utilities Needed

- **Custom render helper** (`tests/utils/render.tsx`): Wraps components with necessary providers (if any) and exports a pre-configured `render` function
- **Mock data re-exports** (`tests/utils/mock-data.ts`): Re-exports `mockUsers` and `totalUserCount` from `src/lib/mock-data.ts` for test file convenience
- **Mock router** (`tests/utils/mock-router.ts`): Provides configurable mock for `useRouter().push()`, `usePathname()`, `useParams()` with assertion helpers

### Directory Structure

```
tests/
├── setup.ts                          # Global test setup
├── utils/
│   ├── render.tsx                    # Custom render helper
│   ├── mock-data.ts                  # Re-exports of mock data
│   └── mock-router.ts               # Next.js router mocks
├── lib/
│   ├── mock-data.test.ts             # Mock data structure validation
│   └── utils.test.ts                 # Utility function tests
├── components/
│   ├── ui/
│   │   ├── button.test.tsx           # Button variants
│   │   ├── table.test.tsx            # Table sub-components
│   │   ├── input.test.tsx            # Input component
│   │   ├── select.test.tsx           # Select component
│   │   ├── badge.test.tsx            # Badge variants
│   │   ├── avatar.test.tsx           # Avatar + fallback
│   │   ├── switch.test.tsx           # Switch toggle
│   │   ├── tabs.test.tsx             # Tabs active/inactive
│   │   ├── separator.test.tsx        # Separator rendering
│   │   ├── accordion.test.tsx        # Accordion expand/collapse
│   │   ├── label.test.tsx            # Label + htmlFor
│   │   ├── card.test.tsx             # Card container
│   │   └── tooltip.test.tsx          # Tooltip rendering
│   ├── common/
│   │   └── page-header.test.tsx      # PageHeader composite
│   └── layouts/
│       ├── app-sidebar.test.tsx      # Sidebar navigation
│       └── content-layout.test.tsx   # Content wrapper
├── features/
│   └── users/
│       ├── tab-navigation.test.tsx   # Tab switching
│       ├── search-bar.test.tsx       # Search input
│       ├── pagination-controls.test.tsx  # Pagination UI
│       ├── user-table.test.tsx       # Data table
│       ├── profile-images.test.tsx   # Profile image display
│       ├── user-detail-form.test.tsx # Detail form fields + toggles
│       ├── dashboard-page.test.tsx   # Dashboard page assembly
│       └── user-detail-page.test.tsx # User detail page assembly
└── accessibility/
    └── a11y.test.tsx                 # Cross-cutting accessibility tests
```

---

## Phase-by-Phase Test Scenarios

### Phase 0: Foundation

#### P0-TS1: Mock Data Structure Validation

**Test file:** `tests/lib/mock-data.test.ts`
**Source tasks:** P0-T4, P0-T5

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | `mockUsers` is exported and is an array | `Array.isArray(mockUsers)` is `true` |
| 2 | `mockUsers` has exactly 5 entries | `mockUsers.length === 5` |
| 3 | `totalUserCount` is exported and equals 100000 | `totalUserCount === 100000` |
| 4 | Each user has all required fields from the `User` interface | Every user object contains: `id`, `nickname`, `grade`, `avatar`, `phone`, `age`, `gender`, `region`, `joinDate`, `withdrawalDate`, `role`, `exerciseStyle`, `gymRelocation`, `bench`, `deadlift`, `squat`, `intro`, `profileImages`, `settings` |
| 5 | Each user has a unique `id` string ("1" through "5") | No duplicate `id` values; all are string type |
| 6 | `profileImages` is an array of 3 strings per user | `user.profileImages.length === 3` for each user |
| 7 | `settings` contains all 3 boolean fields | Each user has `settings.profilePublic`, `settings.matchChatNotification`, `settings.marketingNotification` as booleans |
| 8 | Avatar paths follow expected pattern | Each `user.avatar` is a non-empty string |

#### P0-TS2: Utility Function Tests

**Test file:** `tests/lib/utils.test.ts`
**Source tasks:** P0-T6

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | `formatNumber(100000)` formats with commas | Returns `"100,000"` |
| 2 | `formatNumber(0)` returns zero string | Returns `"0"` |
| 3 | `formatNumber(1)` returns single digit | Returns `"1"` |
| 4 | `formatNumber(1000)` formats with comma | Returns `"1,000"` |
| 5 | `formatNumber(1000000)` formats with two commas | Returns `"1,000,000"` |
| 6 | `cn()` utility merges class names | `cn("px-4", "py-2")` returns combined string |
| 7 | `cn()` handles conditional classes | `cn("px-4", false && "hidden")` excludes falsy |
| 8 | `cn()` resolves Tailwind conflicts | `cn("px-4", "px-8")` resolves to `"px-8"` (tailwind-merge behavior) |

#### P0-TS3: TypeScript Types Compilation

**Test file:** `tests/lib/utils.test.ts` (type-level validation within the same file)
**Source tasks:** P0-T4

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | `User` interface is importable | Import succeeds without TypeScript errors |
| 2 | `UserTableColumn` type is importable | Import succeeds |
| 3 | `USER_TABLE_COLUMNS` constant has 10 entries | `USER_TABLE_COLUMNS.length === 10` |
| 4 | `PaginationState` type and `DEFAULT_PAGINATION` are importable | Import succeeds, `DEFAULT_PAGINATION.currentPage === 1` |
| 5 | `SidebarNavItem` and `SidebarSubItem` types are importable from shared types | Import from `@/types/index` succeeds |

---

### Phase 1: Shared UI Components

#### P1-TS1: Button Component

**Test file:** `tests/components/ui/button.test.tsx`
**Source tasks:** P1-T2
**PRD mapping:** Buttons used across all pages (US-1, US-5, US-6, US-7, US-8)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders with default (primary) variant | Button renders with text content visible |
| 2 | Primary variant has correct CSS classes | Contains `bg-primary` and `text-white` classes |
| 3 | Secondary variant renders correctly | Contains `bg-sidebar-selected` and `text-black` classes |
| 4 | Pagination variant renders as square | Contains `bg-primary-light` and dimension classes |
| 5 | Ghost variant renders with transparent bg | Contains `bg-transparent` and `text-delete-text` classes |
| 6 | Disabled state applies opacity and cursor | Disabled button has `opacity-50` and `cursor-not-allowed` styles |
| 7 | Click handler fires on enabled button | `onClick` callback is called once |
| 8 | Click handler does NOT fire on disabled button | `onClick` callback is not called |
| 9 | Focus ring classes are present | Contains `focus-visible:ring-2` and `focus-visible:ring-primary` |
| 10 | Button renders children content | Text content passed as children is visible |
| 11 | Button renders with icon and text | Icon element + text both render inside button |

#### P1-TS2: Table Component

**Test file:** `tests/components/ui/table.test.tsx`
**Source tasks:** P1-T3
**PRD mapping:** US-1 (View User List)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Table wrapper renders with border | Contains `border` and `border-border` classes |
| 2 | TableHeader renders with background | Contains `bg-table-header` class |
| 3 | TableHead renders with correct height and text | Contains `h-14`, `text-[14px]`, `font-semibold` classes |
| 4 | TableRow renders with correct height | Contains `h-[60px]` class |
| 5 | TableRow has hover styles | Contains `hover:bg-table-header` class |
| 6 | TableRow has pointer cursor | Contains `cursor-pointer` class |
| 7 | TableCell renders with correct padding | Contains `px-4` class |
| 8 | Semantic HTML: renders `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>` | Query by role: `table`, `rowgroup`, `columnheader`, `row`, `cell` all found |

#### P1-TS3: Input Component

**Test file:** `tests/components/ui/input.test.tsx`
**Source tasks:** P1-T4
**PRD mapping:** US-3 (Search Users), US-7 (Edit User Detail)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders with placeholder text | Placeholder attribute matches passed prop |
| 2 | Accepts typed text input | After `userEvent.type()`, input value updates |
| 3 | Has correct base border class | Contains `border-border` class |
| 4 | Has focus styles | Contains `focus:border-primary` class |
| 5 | Disabled state applies correct styles | Contains `disabled:bg-table-header` and `disabled:cursor-not-allowed` |
| 6 | Passes `id` attribute for label association | `id` attribute matches passed prop |
| 7 | Renders with custom height class (h-12 or h-[52px]) | When className includes `h-12`, element has that class |

#### P1-TS4: Select Component

**Test file:** `tests/components/ui/select.test.tsx`
**Source tasks:** P1-T5
**PRD mapping:** US-7 (Edit User Detail)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | SelectTrigger renders with placeholder text | Trigger button displays placeholder |
| 2 | SelectTrigger has correct height | Contains `h-[52px]` class |
| 3 | Clicking trigger opens dropdown content | After click, SelectContent is visible |
| 4 | SelectItem renders option text | Each option text is visible in opened dropdown |
| 5 | Selecting an item updates the displayed value | Trigger shows selected option text |
| 6 | Escape key closes the dropdown | After Escape, content is hidden |
| 7 | Chevron icon renders inside trigger | Chevron/arrow icon element is present |

#### P1-TS5: Badge Component

**Test file:** `tests/components/ui/badge.test.tsx`
**Source tasks:** P1-T6
**PRD mapping:** US-1 (View User List -- header badge count)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Default variant renders | Badge element is in the document |
| 2 | Green variant renders with correct background class | Contains `bg-badge-green-bg` class |
| 3 | Green variant renders with correct text class | Contains `text-badge-green-text` class |
| 4 | Badge displays content text | Text "100,000" is visible |
| 5 | Green variant has pill shape | Contains `rounded-full` class |
| 6 | Badge renders with correct font weight | Contains `font-bold` class |

#### P1-TS6: Avatar Component

**Test file:** `tests/components/ui/avatar.test.tsx`
**Source tasks:** P1-T7
**PRD mapping:** US-1 (View User List -- avatar column)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Avatar renders at 22px size | Contains `w-[22px]` and `h-[22px]` classes |
| 2 | Avatar is circular | Contains `rounded-full` class |
| 3 | AvatarImage has `alt` attribute | `<img>` has non-empty `alt` text |
| 4 | AvatarFallback renders when image fails | Fallback element visible with single letter |
| 5 | AvatarFallback has correct background | Contains `bg-sidebar-selected` class |

#### P1-TS7: Switch Component

**Test file:** `tests/components/ui/switch.test.tsx`
**Source tasks:** P1-T8
**PRD mapping:** US-7 (Edit User Detail -- toggle settings)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Switch renders in unchecked (OFF) state | `aria-checked` is `"false"` |
| 2 | Switch renders in checked (ON) state | When `checked={true}`, `aria-checked` is `"true"` |
| 3 | Clicking toggles the switch state | After click, `onCheckedChange` callback fires with opposite boolean |
| 4 | Space key toggles the switch | After `userEvent.keyboard(" ")` while focused, callback fires |
| 5 | Disabled switch does not toggle on click | `onCheckedChange` is not called |
| 6 | Switch has correct dimensions | Contains `w-[44px]` and `h-[24px]` classes |
| 7 | `role="switch"` is present | Element has `role="switch"` attribute |

#### P1-TS8: Tabs Component

**Test file:** `tests/components/ui/tabs.test.tsx`
**Source tasks:** P1-T9
**PRD mapping:** US-4 (Filter by Tabs)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | TabsList renders with no background | Contains `bg-transparent` class |
| 2 | Active TabsTrigger has primary background | Active trigger contains `data-[state=active]` styles with `bg-primary` |
| 3 | Inactive TabsTrigger has gray background | Inactive trigger contains `bg-inactive-tab` class |
| 4 | Active trigger has correct height | Contains `h-[52px]` class |
| 5 | Clicking inactive tab activates it | After click, tab's `aria-selected` becomes `"true"` |
| 6 | Previously active tab becomes inactive | After clicking another tab, first tab's `aria-selected` becomes `"false"` |
| 7 | `aria-selected` attribute is present on all tabs | Each trigger has `aria-selected` attribute |

#### P1-TS9: Separator Component

**Test file:** `tests/components/ui/separator.test.tsx`
**Source tasks:** P1-T10

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Separator renders as a horizontal line | Element has `role="separator"` or renders as `<hr>` |
| 2 | Has correct background color class | Contains `bg-divider` class |
| 3 | Renders at full width of parent | Element is in the document and visible |

#### P1-TS10: Accordion Component

**Test file:** `tests/components/ui/accordion.test.tsx`
**Source tasks:** P1-T11
**PRD mapping:** US-2 (Navigate with Sidebar)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Accordion trigger renders with text | Trigger text is visible |
| 2 | Content is hidden by default (when collapsed) | Content region is not visible initially |
| 3 | Clicking trigger expands content | After click, content becomes visible |
| 4 | Clicking expanded trigger collapses content | After second click, content is hidden |
| 5 | `aria-expanded` toggles on trigger | Attribute changes from `"false"` to `"true"` on expand |
| 6 | Enter key toggles accordion | After `userEvent.keyboard("{Enter}")` while trigger focused, content toggles |
| 7 | Space key toggles accordion | After `userEvent.keyboard(" ")` while trigger focused, content toggles |

#### P1-TS11: Label Component

**Test file:** `tests/components/ui/label.test.tsx`
**Source tasks:** P1-T12

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Label renders with text content | Label text is visible |
| 2 | `htmlFor` attribute is set | Label element has `for` attribute matching provided value |
| 3 | Clicking label focuses associated input | After click, associated input element receives focus |
| 4 | Has correct font styling classes | Contains `font-pretendard`, `text-[20px]`, `font-semibold` classes |

#### P1-TS12: Card Component

**Test file:** `tests/components/ui/card.test.tsx`
**Source tasks:** P1-T1

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Card renders children content | Children text is visible |
| 2 | Card has white background | Contains `bg-white` class |
| 3 | Card has border | Contains `border` and `border-border` classes |
| 4 | Card has rounded corners | Contains `rounded-lg` class |
| 5 | Card has 32px padding | Contains `p-8` class |

#### P1-TS13: PageHeader Component

**Test file:** `tests/components/common/page-header.test.tsx`
**Source tasks:** P1-T13
**PRD mapping:** US-1 (Dashboard header), US-6/US-7 (Detail page header)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders title text | "User Management" heading is visible |
| 2 | Renders subtitle text | "User list management page" is visible |
| 3 | Renders badge with formatted count when `badgeCount` provided | "100,000" is visible inside a Badge element |
| 4 | Badge is NOT rendered when `badgeCount` is omitted | No badge element in the document |
| 5 | Renders action button with label | "Write" button text is visible |
| 6 | Action button click fires `onAction` callback | Callback is called once on click |
| 7 | Renders separator below the header content | Separator element is in the document |
| 8 | Title uses heading element (`<h1>`) | `role="heading"` with level 1 is present |
| 9 | Action button renders with icon when `actionIcon` is provided | Icon element renders inside button |

---

### Phase 2: Layout & Navigation

#### P2-TS1: AppSidebar Component

**Test file:** `tests/components/layouts/app-sidebar.test.tsx`
**Source tasks:** P2-T1
**PRD mapping:** US-2 (Navigate with Sidebar), US-9 (Logout)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Sidebar renders "ADMIN" title | Text "ADMIN" is visible |
| 2 | Sidebar renders admin email/ID | "admin@potenlab.com" (or equivalent) is visible |
| 3 | "Home" menu item renders | Text "Home" is visible |
| 4 | "User" accordion section renders | Text "User" is visible as accordion trigger |
| 5 | "Match" accordion section renders | Text "Match" is visible as accordion trigger |
| 6 | "Admin" accordion section renders | Text "Admin" is visible as accordion trigger |
| 7 | Expanding "User" accordion reveals "User Management" sub-item | After clicking "User" trigger, "User Management" link is visible |
| 8 | Expanding "Match" accordion reveals "Match Management" sub-item | After clicking "Match" trigger, "Match Management" link is visible |
| 9 | Expanding "Admin" accordion reveals 3 sub-items | After clicking "Admin" trigger, "Notice Management", "Report Management", "Terms Management" are visible |
| 10 | Active sub-menu item has highlight background | When `usePathname()` returns `/`, "User Management" has `bg-sidebar-selected` class or equivalent active styling |
| 11 | Logout button renders at bottom | Text "Logout" is visible |
| 12 | Logout button has icon | LogOut icon element is present near "Logout" text |
| 13 | Sidebar has `<nav>` landmark | `role="navigation"` or `<nav>` element is present |
| 14 | Sub-menu items render as links | "User Management" renders as `<a>` with `href="/"` |
| 15 | Accordion trigger toggles `aria-expanded` | After clicking "User" trigger, `aria-expanded` changes to `"true"` |

#### P2-TS2: ContentLayout Component

**Test file:** `tests/components/layouts/content-layout.test.tsx`
**Source tasks:** P2-T2

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders children content | Children text is visible in the document |
| 2 | Has correct left margin offset | Contains `ml-[324px]` class |
| 3 | Has correct top padding | Contains `pt-5` class |
| 4 | Has correct right padding | Contains `pr-8` class |
| 5 | Has correct bottom padding | Contains `pb-8` class |

#### P2-TS3: Root Layout

**Test file:** (Tested implicitly through page-level tests; layout structure verified via integration)
**Source tasks:** P2-T3

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Skip link is rendered as first focusable element | `<a>` with text "Skip to main content" exists with `sr-only` class |
| 2 | Skip link href points to `#main-content` | `href` attribute is `#main-content` |
| 3 | Main content wrapper has `id="main-content"` | `<main>` element with `id="main-content"` exists |
| 4 | `<html>` element has `lang="ko"` | HTML lang attribute is "ko" |

---

### Phase 3: Dashboard (User Management List Page)

#### P3-TS1: TabNavigation Component

**Test file:** `tests/features/users/tab-navigation.test.tsx`
**Source tasks:** P3-T1
**PRD mapping:** US-4 (Filter by Tabs)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders 3 tabs: "All", "Tab", "Tab" | All 3 tab trigger texts are visible |
| 2 | "All" tab is active by default | First tab has `aria-selected="true"` |
| 3 | Other 2 tabs are inactive by default | Second and third tabs have `aria-selected="false"` |
| 4 | Clicking second tab activates it | After click, second tab has `aria-selected="true"` |
| 5 | Clicking second tab deactivates "All" | After click, "All" tab has `aria-selected="false"` |
| 6 | `onTabChange` callback fires with new value | Callback receives the value of the clicked tab |
| 7 | Active tab has teal background styling | Active tab element has primary background class |
| 8 | Inactive tabs have gray background styling | Inactive tabs have `bg-inactive-tab` class |

#### P3-TS2: SearchBar Component

**Test file:** `tests/features/users/search-bar.test.tsx`
**Source tasks:** P3-T2
**PRD mapping:** US-3 (Search Users)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders input with placeholder "Enter search keyword" | Placeholder text is present |
| 2 | Input renders at full width | Input element is in the document (full-width handled by CSS) |
| 3 | Typing text fires `onChange` callback | After typing "hello", callback receives "hello" |
| 4 | Input displays the controlled `value` prop | When `value="test"`, input displays "test" |
| 5 | Input is focusable | After `userEvent.click()`, input has focus |
| 6 | Input has accessible label | `aria-label="Search users"` or associated `<label>` exists |

#### P3-TS3: PaginationControls Component

**Test file:** `tests/features/users/pagination-controls.test.tsx`
**Source tasks:** P3-T3
**PRD mapping:** US-5 (Paginate User List)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders 4 navigation buttons (first, prev, next, last) | 4 icon buttons are present |
| 2 | "Go to first page" button has `aria-label` | Button has `aria-label="Go to first page"` |
| 3 | "Previous page" button has `aria-label` | Button has `aria-label="Previous page"` |
| 4 | "Next page" button has `aria-label` | Button has `aria-label="Next page"` |
| 5 | "Go to last page" button has `aria-label` | Button has `aria-label="Go to last page"` |
| 6 | Page indicator displays "1 / 1" | Text "1" and "1" (current/total) are visible |
| 7 | Page jump input renders with "Page" placeholder | Input with placeholder "Page" exists |
| 8 | "Go" button renders | Button with text "Go" is visible |
| 9 | Items per page select defaults to "10 items" | Select trigger displays "10 items" |
| 10 | Clicking items per page select opens dropdown | After click, options "10 items", "20 items", "50 items" are visible |
| 11 | Selecting "20 items" fires `onItemsPerPageChange(20)` | Callback receives `20` |
| 12 | Navigation buttons have `pagination` variant styling | Buttons contain `bg-primary-light` class |
| 13 | Page indicator region has `aria-live="polite"` | Region element has `aria-live` attribute |
| 14 | Typing in page jump input updates its value | After typing "5", input value is "5" |

#### P3-TS4: UserTable Component

**Test file:** `tests/features/users/user-table.test.tsx`
**Source tasks:** P3-T4
**PRD mapping:** US-1 (View User List), US-6 (View User Detail), US-8 (Delete User)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Table renders 10 column headers | 10 `<th>` elements: Nickname, Grade, Avatar, Phone Number, Age, Gender, Region, Join Date, Withdrawal Date, Delete |
| 2 | Table renders 5 data rows from mock data | 5 `<tr>` elements in `<tbody>` |
| 3 | Each row displays nickname text | "NicknameHere" (or equivalent mock data) visible in each row |
| 4 | Each row displays grade text | "Mania" visible in each row |
| 5 | Avatar column renders Avatar component | `<img>` elements with `alt` attribute present in avatar cells |
| 6 | Phone number displays in each row | "010-1234-1234" visible |
| 7 | Age displays in each row | "Born 1999" visible |
| 8 | Gender displays in each row | "Male" visible |
| 9 | Region displays in each row | "Gangnam-gu" visible |
| 10 | Join Date displays in each row | "Nov 1, 2022" visible |
| 11 | Withdrawal Date displays in each row | "Nov 1, 2022" visible |
| 12 | Delete column renders ghost button with "Delete" text | "Delete" text button visible in each row |
| 13 | Row click calls `router.push("/users/{id}")` | After clicking row, `useRouter().push` called with `/users/1` (or matching id) |
| 14 | Delete button click does NOT trigger row navigation | After clicking Delete, `router.push` is NOT called (stopPropagation verified) |
| 15 | Sort icon renders on "Join Date" column header | ChevronDown icon element present in "Join Date" header |
| 16 | Sort icon renders on "Withdrawal Date" column header | ChevronDown icon element present in "Withdrawal Date" header |
| 17 | Table has semantic HTML structure | `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements present |
| 18 | Row has hover cursor style | Table rows contain `cursor-pointer` class |
| 19 | Delete button has accessible label | `aria-label` includes "Delete user" and the user's nickname |

#### P3-TS5: Dashboard Page Assembly

**Test file:** `tests/features/users/dashboard-page.test.tsx`
**Source tasks:** P3-T5
**PRD mapping:** US-1 (View User List), US-3 (Search), US-4 (Tabs), US-5 (Pagination)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Page renders inside a Card container | Card element with white bg is present |
| 2 | PageHeader renders with title "User Management" | Heading "User Management" is visible |
| 3 | PageHeader badge shows "100,000" | Badge text "100,000" is visible |
| 4 | PageHeader subtitle shows "User list management page" | Subtitle text is visible |
| 5 | "Write" action button renders | Button with text "Write" is visible |
| 6 | Separator renders below header | Separator element is present |
| 7 | TabNavigation renders with 3 tabs | 3 tab triggers are visible |
| 8 | SearchBar renders with placeholder | "Enter search keyword" placeholder input is present |
| 9 | PaginationControls render with navigation buttons | Pagination buttons are present |
| 10 | UserTable renders with 5 rows | 5 data rows are present |
| 11 | Component ordering is correct (header -> separator -> tabs -> search -> pagination -> table) | DOM order matches expected hierarchy |
| 12 | Tab switching updates local state (no errors) | Clicking a tab does not throw; tab becomes active |
| 13 | Typing in search input updates value (no errors) | Input accepts text without errors |
| 14 | "Write" button click does not throw | Click event completes without error |

---

### Phase 4: User Detail Page

#### P4-TS1: ProfileImages Component

**Test file:** `tests/features/users/profile-images.test.tsx`
**Source tasks:** P4-T1
**PRD mapping:** US-6 (View User Detail)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Renders 3 images | 3 `<img>` elements are present |
| 2 | Each image has `alt` text | "Profile photo 1", "Profile photo 2", "Profile photo 3" (or equivalent) alt texts |
| 3 | Images render at 116x116 size | Elements have `w-[116px]` and `h-[116px]` classes (or equivalent) |
| 4 | Images have 8px border radius | Elements have `rounded-lg` or equivalent border-radius class |
| 5 | Images are in a horizontal row | Parent container has `flex` and `flex-row` layout (or default flex) |
| 6 | Images have 16px gap between them | Parent container has `gap-4` class |
| 7 | Fallback renders when image src fails | On image error, fallback placeholder element appears |

#### P4-TS2: UserDetailForm Component

**Test file:** `tests/features/users/user-detail-form.test.tsx`
**Source tasks:** P4-T2
**PRD mapping:** US-6 (View User Detail), US-7 (Edit User Detail)

**Basic Info Section:**

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | "Basic Info" section label renders | Text "Basic Info" is visible |
| 2 | ProfileImages component renders (3 images) | 3 image elements present |
| 3 | "One-Line Intro" label renders | Label "One-Line Intro" is visible |
| 4 | "One-Line Intro" input pre-filled with mock value | Input value is "This is the one-line intro content." |
| 5 | Row 1: "Role" select renders with "User" value | Select trigger shows "User" |
| 6 | Row 1: "Nickname" input pre-filled | Input contains "AttackingHealthPerson" or mock nickname |
| 7 | Row 1: "Phone" input pre-filled | Input contains "01012341234" or mock phone |
| 8 | Row 1: "Age" input pre-filled | Input contains "24 years old" or mock age |
| 9 | Row 2: "Gender" select renders with "Male" value | Select trigger shows "Male" |
| 10 | Row 2: "Exercise Style" select renders | Select trigger shows "Bodybuilding" |
| 11 | Row 2: "Gym Relocation" select renders | Select trigger shows "Available" |
| 12 | Row 2: "Region" select renders | Select trigger shows "Seoul Mapo-gu" |
| 13 | Row 3: "Bench" input pre-filled | Input contains "100kg" |
| 14 | Row 3: "Deadlift" input pre-filled | Input contains "100kg" |
| 15 | Row 3: "Squat" input pre-filled | Input contains "100kg" |
| 16 | All form labels render with `htmlFor` attribute | Each label has corresponding `for` attribute |
| 17 | "Role" select opens and shows options "User", "Admin" | After click, both options visible |
| 18 | "Gender" select opens and shows options "Male", "Female" | After click, both options visible |
| 19 | "Exercise Style" select shows "Bodybuilding", "Crossfit", "Cardio" | After click, all 3 options visible |
| 20 | "Gym Relocation" select shows "Available", "Not Available" | After click, both options visible |
| 21 | "Region" select shows "Seoul Mapo-gu", "Gangnam-gu", "Songpa-gu" | After click, all 3 options visible |
| 22 | Text inputs are editable (typing changes value) | After typing in "Nickname" input, value updates |

**Other Settings Section:**

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 23 | Separator renders between Basic Info and Other Settings | Separator element present between sections |
| 24 | "Other Settings" section label renders | Text "Other Settings" is visible |
| 25 | "Profile Public" toggle renders in OFF state | Switch has `aria-checked="false"` |
| 26 | "Match & Chat Notification" toggle renders in ON state | Switch has `aria-checked="true"` |
| 27 | "Marketing Notification" toggle renders in OFF state | Switch has `aria-checked="false"` |
| 28 | Clicking "Profile Public" toggle switches to ON | After click, `aria-checked` changes to `"true"` |
| 29 | Clicking "Match & Chat Notification" toggle switches to OFF | After click, `aria-checked` changes to `"false"` |
| 30 | 3 toggle labels are visible | "Profile Public", "Match & Chat Notification", "Marketing Notification" texts are all visible |

#### P4-TS3: User Detail Page Assembly

**Test file:** `tests/features/users/user-detail-page.test.tsx`
**Source tasks:** P4-T3
**PRD mapping:** US-6 (View User Detail), US-7 (Edit User Detail)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Page renders inside a Card container | Card element is present |
| 2 | PageHeader title is "User Management" | Heading "User Management" is visible |
| 3 | PageHeader subtitle is "You can edit user information." | Subtitle text is visible |
| 4 | NO badge rendered on detail page | Badge element is NOT in the document |
| 5 | "Save Changes" action button renders | Button with text "Save Changes" is visible |
| 6 | UserDetailForm renders with user data | Form fields with pre-filled mock data are visible |
| 7 | Page looks up user by `params.id` | When `params.id` is "1", form shows user 1 data |
| 8 | Invalid `params.id` falls back to first user | When `params.id` is "999", form still renders with first user data |
| 9 | "Save Changes" button click does not throw | Click completes without error (no-op) |
| 10 | Separator renders below header | Separator element is present |

---

### Phase 5: Polish (Accessibility & Interactions)

#### P5-TS1: Keyboard Navigation

**Test file:** `tests/accessibility/a11y.test.tsx` (keyboard section)
**Source tasks:** P5-T1
**PRD mapping:** All user stories (keyboard access is cross-cutting)

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Tab key moves focus through all interactive sidebar items | Focus moves sequentially through sidebar links, accordion triggers, logout |
| 2 | Enter key toggles sidebar accordion | Pressing Enter on accordion trigger expands/collapses content |
| 3 | Space key toggles sidebar accordion | Pressing Space on accordion trigger expands/collapses content |
| 4 | Arrow Left/Right switches active tab | On tab trigger, ArrowRight moves focus and activates next tab |
| 5 | Enter key on table row triggers navigation | Pressing Enter on focused row calls `router.push` |
| 6 | Tab key reaches Delete button separately from row | Delete button is separately focusable via Tab |
| 7 | Enter/Space on Delete button triggers delete action | Pressing Enter on Delete button fires click handler |
| 8 | Space key toggles switch component | Focused switch toggles state on Space press |
| 9 | Enter/Space opens Select dropdown | Focused select trigger opens on Enter |
| 10 | Arrow Up/Down navigates select options | Options are navigable via arrow keys |
| 11 | Escape closes select dropdown | Open dropdown closes on Escape |
| 12 | Enter/Space activates buttons | Focused button fires click on Enter or Space |
| 13 | No keyboard traps exist (can Tab out of any component) | Focus always moves to next element; never stuck |

#### P5-TS2: ARIA Attributes and Screen Reader Support

**Test file:** `tests/accessibility/a11y.test.tsx` (ARIA section)
**Source tasks:** P5-T2

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Badge has `aria-label="Total users: 100,000"` | Attribute present on badge element |
| 2 | Active tab has `aria-selected="true"` | Active TabsTrigger has correct attribute |
| 3 | Sort column headers have descriptive `aria-label` | "Join Date, sortable column" and "Withdrawal Date, sortable column" aria-labels present |
| 4 | Delete buttons have dynamic `aria-label` with user nickname | `aria-label="Delete user NicknameHere"` per row |
| 5 | Pagination icon buttons all have `aria-label` | 4 buttons have: "Go to first page", "Previous page", "Next page", "Go to last page" |
| 6 | Page indicator region has `aria-live="polite"` | Region element has attribute |
| 7 | All toggle switches have `aria-checked` | Each switch has `aria-checked="true"` or `"false"` |
| 8 | Accordion triggers have `aria-expanded` | Each trigger has `aria-expanded="true"` or `"false"` |
| 9 | Page title is `<h1>` | Heading level 1 exists with "User Management" |
| 10 | Section labels ("Basic Info", "Other Settings") are `<h2>` | Heading level 2 exists for each |
| 11 | All form `<label>` elements have `htmlFor` matching `<input>` `id` | Each label/input pair is correctly associated |
| 12 | Sidebar has `<nav>` or `role="navigation"` landmark | Navigation landmark present |
| 13 | Content area uses `<main>` landmark | `<main>` element present with `id="main-content"` |
| 14 | Search input has accessible label | `aria-label="Search users"` or visible label association |

#### P5-TS3: Focus Management

**Test file:** `tests/accessibility/a11y.test.tsx` (focus section)
**Source tasks:** P5-T1

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Focus ring is visible on focused buttons | Focused button has `focus-visible:ring-2` class applied |
| 2 | Focus ring uses primary color | Ring classes include `focus-visible:ring-primary` |
| 3 | Skip link becomes visible on focus | After Tab, skip link has `focus:not-sr-only` behavior (removed from sr-only) |
| 4 | Skip link Enter moves focus to main content | After Enter on skip link, focus target is `#main-content` |
| 5 | Focus order follows logical reading order | Sidebar items -> Content area (top to bottom) |
| 6 | Select dropdown returns focus to trigger on close | After selecting an option, trigger element has focus |

---

## Accessibility Test Scenarios (Cross-Cutting)

These tests span multiple phases and validate WCAG 2.1 AA compliance.

### Keyboard Accessibility

| # | Requirement | Components Affected |
|---|-------------|-------------------|
| 1 | All interactive elements reachable via Tab | Buttons, links, inputs, selects, switches, table rows |
| 2 | All actions executable via keyboard (Enter/Space) | Buttons, accordion triggers, tab triggers, toggles |
| 3 | Arrow key navigation where expected | Tabs (Left/Right), Select options (Up/Down), Accordion (Up/Down) |
| 4 | Escape closes overlays/dropdowns | Select dropdown |
| 5 | No keyboard traps | All components |

### Color Contrast (WCAG 2.1 AA)

| # | Element | Foreground | Background | Expected Ratio | Passes |
|---|---------|-----------|------------|---------------|--------|
| 1 | Page title | `#000000` | `#FFFFFF` | 21:1 | Yes (AAA) |
| 2 | Subtitle | `#9DA0A8` | `#FFFFFF` | 3.01:1 | Yes (AA Large at 18px) |
| 3 | Table cell text | `#3B3F4A` | `#FFFFFF` | 9.21:1 | Yes (AAA) |
| 4 | Button text (primary) | `#FFFFFF` | `#509594` | 3.15:1 | Yes (AA Large at 18px SemiBold) |
| 5 | Badge text | `#22543D` | `#C6F6D5` | 7.05:1 | Yes (AAA) |
| 6 | Inactive tab text | `#1A202C` | `#EEF2F6` | 13.83:1 | Yes (AAA) |
| 7 | Sidebar text | `#5A5E6A` | `#FFFFFF` | 5.32:1 | Yes (AA) |
| 8 | Delete action text | `#3F7A79` | `#FFFFFF` | 4.87:1 | Yes (AA) |

### ARIA and Landmarks

| # | Requirement | Validation |
|---|-------------|-----------|
| 1 | `<nav>` landmark wraps sidebar navigation | Present in AppSidebar |
| 2 | `<main>` landmark wraps content area | Present in root layout |
| 3 | All form fields have associated `<label>` via `htmlFor`/`id` | All inputs and selects in UserDetailForm |
| 4 | All icon-only buttons have `aria-label` | Pagination buttons, sort icons |
| 5 | Page title uses `<h1>` | PageHeader component |
| 6 | Section labels use `<h2>` | "Basic Info", "Other Settings" in UserDetailForm |

### Focus Indicators

| # | Requirement | Validation |
|---|-------------|-----------|
| 1 | 2px `#509594` focus ring with 2px offset on all interactive elements | `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` classes present |
| 2 | Focus ring visible on buttons | Button component |
| 3 | Focus ring visible on inputs | Input component |
| 4 | Focus ring visible on select triggers | Select component |
| 5 | Focus ring visible on switch toggles | Switch component |
| 6 | Focus ring visible on tabs | TabsTrigger component |

---

## User Story to Test Scenario Mapping

| User Story | ID | Test Scenarios |
|-----------|-----|----------------|
| US-1: View User List | P3-TS4 #1-#12, P3-TS5 #1-#10 | Table renders 10 columns, 5 rows; all cell data visible; page renders all dashboard sections |
| US-2: Navigate with Sidebar | P2-TS1 #1-#15, P1-TS10 #1-#7 | Sidebar renders all sections; accordion expand/collapse; active state highlights; links navigate |
| US-3: Search Users | P3-TS2 #1-#6, P3-TS5 #8, #13 | Search input renders; accepts text; placeholder visible |
| US-4: Filter by Tabs | P3-TS1 #1-#8, P1-TS8 #1-#7, P3-TS5 #7, #12 | 3 tabs render; active/inactive states; clicking switches tabs |
| US-5: Paginate User List | P3-TS3 #1-#14, P3-TS5 #9 | 4 nav buttons; page indicator; page jump; items per page select; aria-labels |
| US-6: View User Detail | P3-TS4 #13, P4-TS1 #1-#7, P4-TS2 #1-#22, P4-TS3 #1-#10 | Row click navigates; detail page renders; form pre-filled; images render |
| US-7: Edit User Detail | P4-TS2 #17-#22, #28-#29, P4-TS3 #5, #9 | Form fields editable; selects open with options; toggles switchable; "Save Changes" is no-op |
| US-8: Delete User | P3-TS4 #12, #14, #19 | Delete button renders; click does not navigate; has accessible label |
| US-9: Logout | P2-TS1 #11-#12 | Logout button renders with icon; visible at bottom of sidebar |

---

## Test Priority Matrix

| Priority | Category | Scenario Count | Description |
|----------|----------|---------------|-------------|
| **P0 (Critical)** | Component rendering | 52 | All components render without crashing; correct children/content visible; semantic HTML structure |
| **P1 (High)** | State management & user interactions | 38 | Tab switching, search input, pagination state changes, toggle switches, select dropdowns, row click navigation, delete click stopPropagation |
| **P2 (Medium)** | Accessibility (ARIA + keyboard) | 33 | All `aria-label`, `aria-checked`, `aria-expanded`, `aria-selected`, `aria-live` attributes; keyboard navigation; focus management; landmarks; heading hierarchy |
| **P3 (Low)** | Visual styling & CSS classes | 25 | Correct CSS classes applied per variant; hover/focus/disabled states; dimensions; color tokens |
| | **Total** | **148** | |

---

## Summary

| Metric | Value |
|--------|-------|
| **Total test files** | 22 |
| **Total test scenarios** | 148 |
| **Phase 0 scenarios** | 16 |
| **Phase 1 scenarios** | 45 |
| **Phase 2 scenarios** | 20 |
| **Phase 3 scenarios** | 42 |
| **Phase 4 scenarios** | 47 |
| **Phase 5 scenarios** | 33 (accessibility cross-cutting, overlaps with component tests) |
| **Coverage target: Statements** | 80% minimum |
| **Coverage target: Branches** | 75% minimum |
| **Coverage target: Functions** | 80% minimum |
| **Coverage target: Lines** | 80% minimum |

### Test File Inventory

| # | Test File | Phase | Scenario Count |
|---|-----------|-------|---------------|
| 1 | `tests/lib/mock-data.test.ts` | 0 | 8 |
| 2 | `tests/lib/utils.test.ts` | 0 | 8 |
| 3 | `tests/components/ui/button.test.tsx` | 1 | 11 |
| 4 | `tests/components/ui/table.test.tsx` | 1 | 8 |
| 5 | `tests/components/ui/input.test.tsx` | 1 | 7 |
| 6 | `tests/components/ui/select.test.tsx` | 1 | 7 |
| 7 | `tests/components/ui/badge.test.tsx` | 1 | 6 |
| 8 | `tests/components/ui/avatar.test.tsx` | 1 | 5 |
| 9 | `tests/components/ui/switch.test.tsx` | 1 | 7 |
| 10 | `tests/components/ui/tabs.test.tsx` | 1 | 7 |
| 11 | `tests/components/ui/separator.test.tsx` | 1 | 3 |
| 12 | `tests/components/ui/accordion.test.tsx` | 1 | 7 |
| 13 | `tests/components/ui/label.test.tsx` | 1 | 4 |
| 14 | `tests/components/ui/card.test.tsx` | 1 | 5 |
| 15 | `tests/components/common/page-header.test.tsx` | 1 | 9 |
| 16 | `tests/components/layouts/app-sidebar.test.tsx` | 2 | 15 |
| 17 | `tests/components/layouts/content-layout.test.tsx` | 2 | 5 |
| 18 | `tests/features/users/tab-navigation.test.tsx` | 3 | 8 |
| 19 | `tests/features/users/search-bar.test.tsx` | 3 | 6 |
| 20 | `tests/features/users/pagination-controls.test.tsx` | 3 | 14 |
| 21 | `tests/features/users/user-table.test.tsx` | 3 | 19 |
| 22 | `tests/features/users/dashboard-page.test.tsx` | 3 | 14 |
| 23 | `tests/features/users/profile-images.test.tsx` | 4 | 7 |
| 24 | `tests/features/users/user-detail-form.test.tsx` | 4 | 30 |
| 25 | `tests/features/users/user-detail-page.test.tsx` | 4 | 10 |
| 26 | `tests/accessibility/a11y.test.tsx` | 5 | 33 |

**Note:** The 26 test files listed above include the dedicated accessibility file which consolidates cross-cutting keyboard, ARIA, and focus management tests. Some accessibility scenarios overlap with individual component tests and are listed in both places intentionally -- the component-level tests verify per-component correctness while the accessibility file validates end-to-end keyboard flow and ARIA compliance across assembled pages.
