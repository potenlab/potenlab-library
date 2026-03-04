# PRD: Admin User Management UI

## Overview

An admin dashboard for managing users of a fitness/workout matching platform. The application consists of a **User Management List** page (dashboard) and a **User Detail** page. This PRD covers **UI implementation only** — no backend integration, API calls, or database connectivity.

All data displayed will be **static/mock data** hardcoded in the frontend.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** shadcn/ui (built on Radix UI primitives)
- **Styling:** Tailwind CSS 4 (used by shadcn/ui)
- **Icons:** Lucide React (bundled with shadcn/ui)
- **Package Manager:** Bun
- **Fonts:** Pretendard Variable, Inter

## Design References

| Page | Figma Link |
|------|------------|
| User Management List (Dashboard) | [Figma - Dashboard](https://www.figma.com/design/zBw8h8Qv20EnLw0sx4s7si/Admin-Design-System?node-id=503-4639&t=VNcT2c5KRyZDdwR1-4) |
| User Detail | [Figma - User Detail](https://www.figma.com/design/zBw8h8Qv20EnLw0sx4s7si/Admin-Design-System?node-id=503-4813&t=VNcT2c5KRyZDdwR1-4) |

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#509594` | Buttons, active tab, action text |
| Primary Light | `#B9D5D4` | Pagination buttons |
| Background | `#FCFCFC` | Page background |
| White | `#FFFFFF` | Card background, sidebar |
| Gray/200 | `#E2E8F0` | Borders, table dividers |
| Gray/400 | `#A0AEC0` | Placeholder text, section labels |
| Gray/700 | `#2D3748` | Select text |
| Gray/800 | `#1A202C` | Inactive tab text |
| Grayscale/600 | `#9DA0A8` | Subtitle text |
| Grayscale/800 | `#5A5E6A` | Sidebar menu text |
| Grayscale/900 | `#3B3F4A` | Table cell text |
| Black | `#000000` | Headings, body text |
| Gray/2 | `#EFF1F4` | Dividers, inactive tab bg |
| Table Header BG | `#F9FAFC` | Table header row |
| Sidebar Selected BG | `#EEF2F6` | Active sidebar sub-menu |
| Badge Green BG | `#C6F6D5` | Count badge background |
| Badge Green Text | `#22543D` | Count badge text |

### Typography

| Style | Font | Weight | Size |
|-------|------|--------|------|
| Page Title | Pretendard Variable | SemiBold (600) | 32px |
| Section Label | Pretendard Variable | Bold (700) | 20px |
| Field Label | Pretendard Variable | SemiBold (600) | 20px |
| Subtitle | Pretendard Variable | Medium (500) | 18px |
| Body | Pretendard Variable | Regular (400) | 14px |
| Sidebar Title | Pretendard Variable | SemiBold (600) | 24px |
| Sidebar Menu | Inter / Noto Sans KR | Regular (400) | 16px |
| Button Text | Inter | SemiBold (600) | 18px |
| Input Text | Inter / Noto Sans KR | Regular (400) | 18px |
| Badge | Inter | Bold (700) | 18px |

## Layout Structure

### Global Layout

The application uses a fixed **sidebar + content area** layout:

- **Sidebar:** Fixed left, 300px wide, full viewport height
- **Content Area:** Offset 324px from left, padded 20px from top

### Sidebar (Shared Across Pages)

**Header:**
- Title: "ADMIN" (24px, SemiBold)
- Subtitle: Admin user ID displayed below

**Navigation Menu:**
- Home (with icon)
- User section (expandable accordion)
  - Sub-menu: "User Management" (highlighted when active with `#EEF2F6` background)
- Match section (expandable accordion)
  - Sub-menu: "Match Management"
- Admin section (expandable accordion)
  - Sub-menu: "Notice Management"
  - Sub-menu: "Report Management"
  - Sub-menu: "Terms Management"

**Footer:**
- Logout button with icon, centered, border-top separator

**Behavior:**
- Accordion sections expand/collapse to show sub-menus
- Active sub-menu has teal highlight background with icon
- Chevron icons indicate expand/collapse state

---

## Page 1: User Management List (Dashboard)

**Route:** `/`

### Card Container

White card with 8px border-radius, 1px `#E2E8F0` border, 32px padding.

### Header Section

- **Title:** "User Management" (32px, SemiBold, black)
- **Badge:** Total count (e.g. "100,000") in green badge (`#C6F6D5` bg, `#22543D` text, uppercase)
- **Subtitle:** "User list management page" (18px, Medium, `#9DA0A8`)
- **Action Button:** "Write" button, teal (`#509594`), white text, edit icon, 8px border-radius, 40px height — positioned top-right

### Divider

1px horizontal line (`#EFF1F4`), full width.

### Tab Navigation

- Tabs: "All", "Tab", "Tab" (placeholder labels)
- Active tab: Teal (`#509594`) background, white text, SemiBold
- Inactive tabs: Light gray (`#EEF2F6`) background, dark text, Medium
- 6px border-radius, 52px height, 16px horizontal padding

### Search Bar

- Full-width text input
- Placeholder: "Enter search keyword"
- 48px height, 6px border-radius, `#E2E8F0` border
- Placeholder color: `#A0AEC0`

### Pagination Controls (Above Table)

**Left side:**
- Navigation buttons: First (`<<`), Previous (`<`), Next (`>`), Last (`>>`)
- Button style: `#B9D5D4` background, 40px height, 6px border-radius
- Page indicator: "1 / 1" (current page bold 20px, separator and total 16px `#5A5E6A`)

**Right side:**
- Page jump input (100px wide, 48px height, placeholder "Page")
- "Go" button (`#EEF2F6` background, 48px height)
- Items per page dropdown: "10 items" (96px wide, 48px height, `#E2E8F0` border, with chevron icon)

### Data Table

**Table Container:** White background, 1px `#E2E8F0` border, no border-radius.

**Table Headers:** (56px row height, `#F9FAFC` background)

| Column | Width | Sortable | Alignment |
|--------|-------|----------|-----------|
| Nickname | flex-1 | No | Left |
| Grade | flex-1 | No | Left |
| Avatar | 80px (fixed) | No | Center |
| Phone Number | flex-1 | No | Left |
| Age | flex-1 | No | Left |
| Gender | flex-1 | No | Left |
| Region | flex-1 | No | Left |
| Join Date | flex-1 | Yes (sort icon) | Left |
| Withdrawal Date | flex-1 | Yes (sort icon) | Left |
| Delete | 57px (fixed) | No | Left |

**Table Rows:** (60px row height)
- Text: 14px, Regular, `#3B3F4A`
- Avatar column: 22px circular avatar image, centered
- Delete column: Teal text (`#509594`), clickable
- Bottom border per row: 1px `#E2E8F0`

**Mock Data (5 rows):**

| Nickname | Grade | Avatar | Phone | Age | Gender | Region | Join Date | Withdrawal Date |
|----------|-------|--------|-------|-----|--------|--------|-----------|-----------------|
| NicknameHere | Mania | (avatar) | 010-1234-1234 | Born 1999 | Male | Gangnam-gu | Nov 1, 2022 | Nov 1, 2022 |
| *(repeat for 5 rows with same sample data)* |

---

## Page 2: User Detail

**Route:** `/users/[id]`

### Card Container

Same card style as dashboard (white, 8px radius, border, 32px padding).

### Header Section

- **Title:** "User Management" (32px, SemiBold, black)
- **Subtitle:** "You can edit user information." (18px, Medium, `#9DA0A8`)
- **Action Button:** "Save Changes" button, teal (`#509594`), white text, edit icon

### Divider

1px horizontal line (`#EFF1F4`).

### Section: Basic Info

**Section Label:** "Basic Info" (20px, Bold, `#A0AEC0`)

**Profile Images:**
- 3 images displayed in a horizontal row
- Each: 116px x 116px, 8px border-radius
- Placeholder images showing workout/fitness photos

**One-Line Intro:**
- Label: "One-Line Intro" (20px, SemiBold, `#101010`)
- Full-width text input (52px height)
- Value: "This is the one-line intro content."

**Row 1 (4 columns, equal width, 24px gap):**

| Field | Type | Value |
|-------|------|-------|
| Role | Dropdown (with chevron) | "User" |
| Nickname | Text Input | "AttackingHealthPerson" |
| Phone | Text Input | "01012341234" |
| Age | Text Input | "24 years old" |

**Row 2 (4 columns, equal width, 24px gap):**

| Field | Type | Value |
|-------|------|-------|
| Gender | Dropdown (with chevron) | "Male" |
| Exercise Style | Dropdown (with chevron) | "Bodybuilding" |
| Gym Relocation | Dropdown (with chevron) | "Available" |
| Region | Dropdown (with chevron) | "Seoul Mapo-gu" |

**Row 3 (3 columns, equal width, 24px gap):**

| Field | Type | Value |
|-------|------|-------|
| Bench | Text Input | "100kg" |
| Deadlift | Text Input | "100kg" |
| Squat | Text Input | "100kg" |

### Divider

1px horizontal line (`#EFF1F4`).

### Section: Other Settings

**Section Label:** "Other Settings" (20px, Bold, `#A0AEC0`)

**Toggle Settings (horizontal layout, 100px gap between items):**

| Setting | Toggle State |
|---------|-------------|
| Profile Public | OFF |
| Match & Chat Notification | ON (blue) |
| Marketing Notification | OFF |

**Toggle Component:**
- 44px x 24px toggle switch
- ON state: Blue filled with white circle right
- OFF state: Gray outline with white circle left

### Form Field Specs

**Text Input:**
- Height: 52px
- Border: 1px `#E2E8F0`
- Border-radius: 6px
- Padding: 16px horizontal
- Font: Inter Regular 18px, black

**Dropdown (Select):**
- Same as text input but with 48px right padding for chevron icon
- Chevron positioned in 48px-wide right element area

---

## shadcn/ui Component Mapping

The following shadcn/ui components should be installed and used. Custom styling via Tailwind overrides will match the Figma design tokens.

### Required shadcn/ui Components

| shadcn/ui Component | Used In | Figma Element | Customization Notes |
|---------------------|---------|---------------|---------------------|
| `Card` | Both pages | Card container | Override border color to `#E2E8F0`, padding 32px |
| `Button` | Both pages | Primary/Secondary buttons | Primary variant: bg `#509594`, text white. Secondary variant: bg `#EEF2F6`, text black |
| `Table` | Dashboard | Data table | Header bg `#F9FAFC`, row height 60px, cell text `#3B3F4A` |
| `Input` | Both pages | Search bar, text inputs | Height 48-52px, border `#E2E8F0`, placeholder `#A0AEC0` |
| `Select` | User Detail | Dropdown fields | With chevron trigger, border `#E2E8F0` |
| `Badge` | Dashboard | Count badge | Custom green variant: bg `#C6F6D5`, text `#22543D` |
| `Avatar` | Dashboard | User avatar in table | 22px size, circular |
| `Switch` | User Detail | Toggle settings | 44x24px, ON state styled blue |
| `Tabs` | Dashboard | Tab navigation | Active: bg `#509594` white text. Inactive: bg `#EEF2F6` |
| `Separator` | Both pages | Dividers | Color `#EFF1F4` |
| `Accordion` | Sidebar | Navigation menu | Expand/collapse sections with chevron |
| `Sidebar` | Both pages | Left navigation | 300px fixed, uses shadcn/ui sidebar layout |
| `Pagination` | Dashboard | Page navigation | Custom styled with `#B9D5D4` buttons |
| `Label` | User Detail | Form field labels | 20px SemiBold `#101010` |
| `Tooltip` | Both pages | Optional hover hints | For icon-only buttons if needed |

### shadcn/ui Installation Commands

```bash
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add card button table input select badge avatar switch tabs separator accordion sidebar pagination label tooltip
```

### Component Customization Strategy

shadcn/ui components are copy-pasted into the project (`src/components/ui/`) and fully editable. Apply the following global customizations:

1. **Theme Variables** — Override CSS variables in `globals.css` to match Figma design tokens:
   - `--primary`: `#509594` (teal)
   - `--primary-foreground`: `#FFFFFF`
   - `--border`: `#E2E8F0`
   - `--muted`: `#EEF2F6`
   - `--muted-foreground`: `#5A5E6A`
   - `--background`: `#FCFCFC`
   - `--card`: `#FFFFFF`
   - `--accent`: `#B9D5D4`

2. **Custom Variants** — Add to `Button` component:
   - `primary`: bg `#509594`, hover darker, text white
   - `secondary`: bg `#EEF2F6`, text black
   - `pagination`: bg `#B9D5D4`, icon only, 40px square

3. **Table Styling** — Override `TableHeader` bg to `#F9FAFC`, row heights, and font sizes per the Figma spec.

4. **Icons** — Use Lucide React icons (included with shadcn/ui) for all UI icons:
   - `ChevronsLeft`, `ChevronLeft`, `ChevronRight`, `ChevronsRight` for pagination
   - `ChevronDown`, `ChevronUp` for accordion/sort
   - `Pencil` / `Edit` for edit button
   - `Home`, `Users`, `Gamepad2`, `Shield`, `Bell`, `AlertTriangle`, `FileText`, `LogOut` for sidebar navigation

## User Stories

### US-1: View User List
As an admin, I can see a paginated table of all users with their key information (nickname, grade, avatar, phone, age, gender, region, dates) so that I can quickly scan the user base.

### US-2: Navigate with Sidebar
As an admin, I can use the sidebar to navigate between different admin sections (Users, Matches, Admin management) with expandable accordion menus.

### US-3: Search Users
As an admin, I can type a search keyword in the search bar to filter the user list (UI only — no actual filtering logic needed).

### US-4: Filter by Tabs
As an admin, I can switch between tabs ("All" and other filter tabs) to categorize users (UI only — tab switching state).

### US-5: Paginate User List
As an admin, I can navigate between pages using pagination buttons, jump to a specific page, and change items per page count.

### US-6: View User Detail
As an admin, I can click on a user row to navigate to their detail page where I see their full profile information.

### US-7: Edit User Detail
As an admin, I can modify user fields (text inputs, dropdowns, toggles) on the detail page and click "Save Changes" (UI only — no actual save).

### US-8: Delete User
As an admin, I can click the "Delete" action in the table row (UI only — no actual deletion).

### US-9: Logout
As an admin, I can click the logout button at the bottom of the sidebar (UI only — no auth logic).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # User Management List (Dashboard)
│   └── users/
│       └── [id]/
│           └── page.tsx        # User Detail page
├── components/
│   ├── ui/                     # shadcn/ui components (auto-generated)
│   │   ├── accordion.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sidebar.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   ├── app-sidebar.tsx         # Sidebar navigation with accordion menu
│   ├── page-header.tsx         # Reusable page title + subtitle + action
│   ├── user-table.tsx          # Data table with pagination
│   └── user-detail-form.tsx    # Detail page form fields
├── lib/
│   ├── utils.ts                # shadcn/ui cn() utility
│   └── mock-data.ts            # Static mock user data
└── styles/
    └── globals.css             # Tailwind + shadcn/ui theme overrides
```

## Out of Scope

- Backend API integration
- Authentication / Authorization
- Real data fetching
- Form validation logic
- Actual search/filter functionality
- Database operations
- User session management
- Responsive/mobile layout (design is desktop-only at 1920px)
