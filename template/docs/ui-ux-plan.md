# UI/UX Design Plan

Generated: 2026-03-04
Source PRD: template/docs/prd.md
Design System: Potenlab Admin Design System
Platform: Desktop-only (1920px target)
Tech Stack: Next.js 16 (App Router), TypeScript, shadcn/ui, Tailwind CSS 4, Lucide React, Bun

---

## Executive Summary

This UI/UX design plan covers a **frontend-only** admin dashboard for managing users of a fitness/workout matching platform. The interface consists of two primary views: a **User Management List** (dashboard) and a **User Detail** page, connected by a persistent sidebar navigation.

The design follows a custom brand identity derived from Figma design tokens, centered around a teal (`#509594`) primary palette. The aesthetic is clean, professional, and data-oriented -- optimized for admin efficiency on desktop screens. All data is static/mock with no backend integration.

Key design decisions:
- **Fixed sidebar + scrollable content area** layout for persistent navigation
- **Custom teal brand color** (#509594) applied across shadcn/ui component overrides
- **Pretendard Variable + Inter** font pairing for Korean/English bilingual support
- **Desktop-only** design at 1920px -- no responsive breakpoints required
- **WCAG 2.1 AA** compliance for accessibility

---

## 1. User Research

### 1.1 Problem Statement

**Business Goal:** Provide admin staff with an efficient interface to view, manage, and edit user accounts on a fitness/workout matching platform.

**User Need:** Admin users need to quickly scan a large user base, locate specific users, view detailed profiles, and make edits to user information -- all within a structured, low-friction interface.

**Design Challenge:** How might we design a data-dense admin interface that remains visually clear, scannable, and efficient for daily administrative tasks without overwhelming the operator?

### 1.2 User Personas

#### Primary Persona: Jimin Park -- Platform Operations Manager

| Attribute | Details |
|-----------|---------|
| **Demographics** | Age 32, operations manager at fitness tech startup, high tech-savviness |
| **Goals** | Quickly review user accounts, update user profiles, monitor platform growth |
| **Pain Points** | Slow-loading dashboards, unclear data tables, too many clicks to reach detail pages |
| **Behaviors** | Uses admin panel 4-6 hours daily, manages 100,000+ user accounts, prefers keyboard shortcuts |
| **Quote** | "I need to find a user, check their info, and move on -- in under 30 seconds." |

#### Secondary Persona: Soyeon Lee -- Customer Support Lead

| Attribute | Details |
|-----------|---------|
| **Demographics** | Age 27, support team lead, moderate tech-savviness |
| **Goals** | Look up user details when handling support tickets, verify account information |
| **Pain Points** | Difficulty finding specific users, unclear field labels, no visual feedback on actions |
| **Behaviors** | Uses admin panel intermittently (1-2 hours daily), often cross-references with support tickets |
| **Quote** | "When a user calls in, I need to pull up their profile instantly and see everything at a glance." |

#### Tertiary Persona: Donghyun Kim -- Junior Admin

| Attribute | Details |
|-----------|---------|
| **Demographics** | Age 24, recently hired admin assistant, lower tech-savviness |
| **Goals** | Learn the system quickly, perform assigned tasks without errors |
| **Pain Points** | Unfamiliar navigation patterns, fear of accidentally deleting data, unclear save states |
| **Behaviors** | Uses admin panel a few times per week, follows step-by-step procedures |
| **Quote** | "I want to make sure I'm clicking the right thing before anything changes." |

### 1.3 User Journey Map

```
Journey: Admin reviews and edits a user profile

Stage 1: Access Dashboard
|- Actions: Logs in, lands on User Management List page
|- Thoughts: "Let me see what's going on with our users today."
|- Emotions: Neutral
|- Pain Points: Slow load times, unclear initial state
|- Opportunities: Fast-loading static page, clear data summary with badge count

Stage 2: Scan User Table
|- Actions: Scrolls through table, reads columns, sorts by date
|- Thoughts: "I need to find that specific user from the support ticket."
|- Emotions: Focused
|- Pain Points: Too many columns, small text, hard to distinguish rows
|- Opportunities: Clear row hover states, readable font sizes, alternating cues

Stage 3: Search / Filter
|- Actions: Types in search bar, switches tabs to narrow down
|- Thoughts: "Let me filter this down to find them faster."
|- Emotions: Slightly impatient
|- Pain Points: No real-time feedback on search (static), tab labels unclear
|- Opportunities: Visible search input with clear placeholder, active tab styling

Stage 4: Navigate to User Detail
|- Actions: Clicks on a user row, navigates to detail page
|- Thoughts: "I need to see their full profile."
|- Emotions: Purposeful
|- Pain Points: Unclear that rows are clickable, no loading indicator
|- Opportunities: Row hover cursor change, smooth page transition

Stage 5: Review and Edit
|- Actions: Reviews profile fields, changes dropdown values, toggles settings
|- Thoughts: "I need to update their region and save."
|- Emotions: Careful, attentive
|- Pain Points: Too many fields at once, unclear which fields are editable
|- Opportunities: Clear input/select styling, organized field grouping, prominent save button

Stage 6: Save and Return
|- Actions: Clicks "Save Changes", returns to list
|- Thoughts: "Done. Next user."
|- Emotions: Satisfied (if smooth), frustrated (if unclear)
|- Pain Points: No save confirmation, unclear navigation back
|- Opportunities: Visual save feedback, sidebar navigation always available
```

### 1.4 Competitive Analysis

| Competitor | Strengths | Weaknesses | Opportunity |
|------------|-----------|------------|-------------|
| Django Admin | Familiar patterns, auto-generated from models | Dated UI, minimal customization, dense layout | Modern visual design with same data density |
| Retool | Flexible layout builder, good component library | Complex setup, generic appearance | Purpose-built UI with branded identity |
| AdminJS | Node.js native, good React integration | Limited design control, sparse documentation | Full design control with shadcn/ui components |
| Forest Admin | Clean table views, good filtering | Expensive, opinionated layout | Custom teal brand with similar clean aesthetic |
| Strapi Admin | Good content management UI, plugin ecosystem | Content-focused (not user management), heavy | Lightweight, focused user management interface |

---

## 2. Information Architecture

### 2.1 Sitemap

```
Potenlab Admin
|-- / (User Management List - Dashboard)
|   |-- Card Container
|   |   |-- Header (Title + Badge + Subtitle + Write Button)
|   |   |-- Divider
|   |   |-- Tab Navigation (All, Tab, Tab)
|   |   |-- Search Bar
|   |   |-- Pagination Controls
|   |   |-- Data Table (User rows)
|
|-- /users/[id] (User Detail)
|   |-- Card Container
|   |   |-- Header (Title + Subtitle + Save Changes Button)
|   |   |-- Divider
|   |   |-- Section: Basic Info
|   |   |   |-- Profile Images (3x)
|   |   |   |-- One-Line Intro (text input)
|   |   |   |-- Row 1: Role, Nickname, Phone, Age
|   |   |   |-- Row 2: Gender, Exercise Style, Gym Relocation, Region
|   |   |   |-- Row 3: Bench, Deadlift, Squat
|   |   |-- Divider
|   |   |-- Section: Other Settings
|   |       |-- Toggle: Profile Public
|   |       |-- Toggle: Match & Chat Notification
|   |       |-- Toggle: Marketing Notification
|
|-- Sidebar (Persistent, all pages)
    |-- Header: "ADMIN" + admin user ID
    |-- Nav: Home
    |-- Nav: User (accordion)
    |   |-- User Management (active)
    |-- Nav: Match (accordion)
    |   |-- Match Management
    |-- Nav: Admin (accordion)
    |   |-- Notice Management
    |   |-- Report Management
    |   |-- Terms Management
    |-- Footer: Logout
```

### 2.2 Navigation Structure

**Primary Navigation (Sidebar -- persistent):**

| Item | Priority | Icon (Lucide) | Target | Accordion |
|------|----------|---------------|--------|-----------|
| Home | High | `Home` | / | No |
| User | High | `Users` | -- | Yes (parent) |
| -- User Management | High | (dot/indicator) | / | Sub-item |
| Match | Medium | `Gamepad2` | -- | Yes (parent) |
| -- Match Management | Medium | (dot/indicator) | /matches | Sub-item |
| Admin | Medium | `Shield` | -- | Yes (parent) |
| -- Notice Management | Low | (dot/indicator) | /notices | Sub-item |
| -- Report Management | Low | (dot/indicator) | /reports | Sub-item |
| -- Terms Management | Low | (dot/indicator) | /terms | Sub-item |

**Footer Navigation:**

| Item | Icon (Lucide) | Action |
|------|---------------|--------|
| Logout | `LogOut` | Trigger logout (UI only) |

**In-Page Navigation:**

| Element | Location | Behavior |
|---------|----------|----------|
| Tab bar | Dashboard card | Switches tab state (All / Tab / Tab) |
| Pagination | Dashboard card | Navigates table pages |
| User row click | Dashboard table | Navigates to /users/[id] |
| Back (sidebar) | User Detail | Click "User Management" in sidebar to return |

### 2.3 Content Hierarchy

| Page | Primary Content | Secondary Content | Tertiary |
|------|----------------|-------------------|----------|
| Dashboard | Data Table (user rows) | Header (title, badge, subtitle) | Tabs, Search, Pagination |
| User Detail | Form Fields (basic info) | Toggle Settings (other settings) | Header, Profile Images |

---

## 3. User Flows

### 3.1 Core Flow: View User List

**Goal:** Admin views the paginated list of all users
**Entry Point:** Application root `/`
**Success Criteria:** Table renders with 5 mock data rows, pagination visible

```
[Admin opens app]
       |
       v
[Sidebar loads + Dashboard page renders]
       |
       v
[Header displays: "User Management" + badge "100,000" + subtitle]
       |
       v
[Tabs default to "All" (active state)]
       |
       v
[Search bar visible with placeholder]
       |
       v
[Pagination controls render: << < 1/1 > >> + page jump + items per page]
       |
       v
[Data table renders 5 rows of mock data]
       |
       v
[SUCCESS: Admin can see the user list]
```

**Edge Cases:**
- Empty table state: Display "No users found" message centered in table body
- Single page: Pagination buttons visually present but disabled (muted state)

### 3.2 Core Flow: Navigate to User Detail

**Goal:** Admin clicks a user row and views their detail page
**Entry Point:** Dashboard table row
**Success Criteria:** User detail page loads with pre-filled form fields

```
[Admin is on Dashboard]
       |
       v
[Hovers over table row]
       |
       v
[Row highlights with hover state (cursor: pointer)]
       |
       v
[Admin clicks row]
       |
       v
[Next.js navigates to /users/[id]]
       |
       v
[User Detail page renders with sidebar active state updated]
       |
       v
[Form fields pre-filled with mock data]
       |
       v
[SUCCESS: Admin sees user detail]
```

**Edge Cases:**
- Click on "Delete" text in row: Should trigger delete action, NOT navigate to detail
- Click on avatar: Should navigate to detail (same as row click)

### 3.3 Core Flow: Edit User Detail

**Goal:** Admin modifies user fields and clicks Save
**Entry Point:** User Detail page `/users/[id]`
**Success Criteria:** Fields are editable, Save button is visible and clickable

```
[Admin is on User Detail page]
       |
       v
[Reviews Basic Info section]
       |
       v
[Clicks on a text input field]
       |
       v
[Field receives focus (border changes to primary color)]
       |
       v
[Admin types new value]
       |
       v
[Admin clicks dropdown (e.g., Role)]
       |
       v
[Select menu opens with options]
       |
       v
[Admin selects new option]
       |
       v
[Admin toggles a setting in Other Settings]
       |
       v
[Toggle animates to new state]
       |
       v
[Admin clicks "Save Changes" button]
       |
       v
[Button shows brief feedback (UI only)]
       |
       v
[SUCCESS: Admin has edited the form]
```

**Error States:**
- No validation errors needed (UI only, static data)
- Save button always enabled (no dirty-state tracking required)

### 3.4 Core Flow: Sidebar Navigation

**Goal:** Admin navigates between sections using sidebar
**Entry Point:** Any page
**Success Criteria:** Accordion expands, sub-menu highlights, page navigates

```
[Admin sees sidebar with collapsed sections]
       |
       v
[Clicks on "User" accordion header]
       |
       v
[Accordion expands, reveals "User Management" sub-item]
       |
       v
[Sub-item shows with active state (#EEF2F6 background)]
       |
       v
[Admin clicks "Match" accordion header]
       |
       v
[Match section expands, User section may remain open or collapse]
       |
       v
["Match Management" sub-item visible]
       |
       v
[Admin clicks "Logout" in footer]
       |
       v
[UI only: no action, but button provides click feedback]
```

### 3.5 Core Flow: Search Users

**Goal:** Admin types a search keyword
**Entry Point:** Dashboard search bar
**Success Criteria:** Search input accepts text, placeholder disappears on focus

```
[Admin clicks search bar]
       |
       v
[Input receives focus, border highlights]
       |
       v
[Placeholder "Enter search keyword" disappears as user types]
       |
       v
[Admin types search term]
       |
       v
[UI only: no filtering occurs, text remains in input]
       |
       v
[SUCCESS: Search input is functional as a UI element]
```

### 3.6 Core Flow: Delete User

**Goal:** Admin clicks delete on a table row
**Entry Point:** Dashboard table "Delete" column
**Success Criteria:** Delete text is clickable with hover feedback

```
[Admin sees "Delete" text in teal (#509594) on table row]
       |
       v
[Hovers over "Delete" text]
       |
       v
[Text shows underline or opacity change on hover]
       |
       v
[Admin clicks "Delete"]
       |
       v
[UI only: no actual deletion, click event captured]
       |
       v
[SUCCESS: Delete action is accessible]
```

---

## 4. Design System

### 4.1 Color Palette

#### Brand Colors (from Figma Design Tokens)

| Token | Hex | RGB | Usage | WCAG on White |
|-------|-----|-----|-------|---------------|
| Primary | `#509594` | rgb(80, 149, 148) | Buttons, active tab, action text, links | 3.15:1 (use on large text / UI only) |
| Primary Light | `#B9D5D4` | rgb(185, 213, 212) | Pagination buttons | Decorative only |
| Primary Hover | `#3F7A79` | rgb(63, 122, 121) | Hover state for primary buttons | 4.87:1 (AA for large text) |
| Primary Active | `#357070` | rgb(53, 112, 112) | Active/pressed state for primary | 5.52:1 (AA) |

#### Neutral Colors (from Figma Design Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FCFCFC` | Page background |
| White | `#FFFFFF` | Card background, sidebar background |
| Gray/200 | `#E2E8F0` | Borders, table dividers, input borders |
| Gray/400 | `#A0AEC0` | Placeholder text, section labels |
| Gray/700 | `#2D3748` | Select text, dropdown values |
| Gray/800 | `#1A202C` | Inactive tab text |
| Grayscale/600 | `#9DA0A8` | Subtitle text |
| Grayscale/800 | `#5A5E6A` | Sidebar menu text, pagination separator |
| Grayscale/900 | `#3B3F4A` | Table cell text |
| Black | `#000000` | Headings, body text |

#### Surface Colors (from Figma Design Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| Gray/2 | `#EFF1F4` | Dividers, inactive tab background |
| Table Header BG | `#F9FAFC` | Table header row background |
| Sidebar Selected BG | `#EEF2F6` | Active sidebar sub-menu, secondary button bg |

#### Semantic Colors (from Figma Design Tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| Badge Green BG | `#C6F6D5` | Count badge background |
| Badge Green Text | `#22543D` | Count badge text |
| Error | `#EF4444` | Error states (reserved, not in current Figma) |
| Warning | `#F59E0B` | Warning states (reserved) |
| Info | `#3B82F6` | Toggle ON state (blue) |
| Toggle OFF | `#CBD5E0` | Toggle OFF state (gray) |

#### Color Contrast Compliance Notes

| Combination | Ratio | WCAG Level | Notes |
|-------------|-------|------------|-------|
| Black (#000000) on White (#FFFFFF) | 21:1 | AAA | Headings, body text |
| Grayscale/900 (#3B3F4A) on White (#FFFFFF) | 9.21:1 | AAA | Table cell text |
| Gray/400 (#A0AEC0) on White (#FFFFFF) | 2.64:1 | Fails for small text | Use only for placeholder / non-essential text, pair with labels |
| Gray/800 (#1A202C) on Gray/2 (#EFF1F4) | 13.0:1 | AAA | Inactive tab text on inactive bg |
| White (#FFFFFF) on Primary (#509594) | 3.15:1 | AA for large text (18px+) | Button text is 18px SemiBold -- passes AA for large text |
| Badge Green Text (#22543D) on Badge Green BG (#C6F6D5) | 7.05:1 | AAA | Badge text |
| Grayscale/600 (#9DA0A8) on White (#FFFFFF) | 3.01:1 | AA for large text | Subtitle at 18px -- passes AA for large text |

**Accessibility Note on Primary Color:**
The primary teal `#509594` on white has a contrast ratio of approximately 3.15:1, which passes WCAG AA for **large text** (18px bold / 24px regular). Since the PRD specifies button text at 18px SemiBold, this meets the AA threshold. For any small text usage of primary color, consider using the darker `#3F7A79` variant (4.87:1) or `#357070` (5.52:1) to ensure compliance.

### 4.2 Typography

#### Font Families

```css
/* Primary -- UI headings, labels, body */
--font-primary: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Secondary -- Inputs, buttons, sidebar menu, badges */
--font-secondary: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace -- Code blocks if needed */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

#### Type Scale (from Figma Design Tokens)

| Style | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|-------------|------|--------|-------------|----------------|-------|
| Page Title | Pretendard Variable | 32px / 2rem | SemiBold (600) | 1.25 (40px) | -0.02em | Page headings ("User Management") |
| Section Label | Pretendard Variable | 20px / 1.25rem | Bold (700) | 1.3 (26px) | 0 | Section titles ("Basic Info") |
| Field Label | Pretendard Variable | 20px / 1.25rem | SemiBold (600) | 1.3 (26px) | 0 | Form field labels |
| Subtitle | Pretendard Variable | 18px / 1.125rem | Medium (500) | 1.4 (25.2px) | 0 | Page subtitles |
| Body | Pretendard Variable | 14px / 0.875rem | Regular (400) | 1.5 (21px) | 0 | Table cell text, general body |
| Sidebar Title | Pretendard Variable | 24px / 1.5rem | SemiBold (600) | 1.25 (30px) | 0.05em | "ADMIN" title |
| Sidebar Menu | Inter / Noto Sans KR | 16px / 1rem | Regular (400) | 1.5 (24px) | 0 | Navigation menu items |
| Button Text | Inter | 18px / 1.125rem | SemiBold (600) | 1 (18px) | 0 | Button labels |
| Input Text | Inter / Noto Sans KR | 18px / 1.125rem | Regular (400) | 1.4 (25.2px) | 0 | Form input values |
| Badge | Inter | 18px / 1.125rem | Bold (700) | 1 (18px) | 0 | Count badges |
| Pagination Current | (inherit) | 20px / 1.25rem | Bold (700) | 1.25 | 0 | Current page number |
| Pagination Total | (inherit) | 16px / 1rem | Regular (400) | 1.25 | 0 | Total page, separator |

#### Font Loading Strategy

```html
<!-- Pretendard Variable from CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />

<!-- Inter from Google Fonts (or Next.js font optimization) -->
<!-- Use next/font/google for Inter to leverage automatic optimization -->
```

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Pretendard loaded via CSS @font-face or CDN link
```

### 4.3 Spacing System

Base unit: **4px**. All spacing values are multiples of 4px as specified in the Figma design.

```css
--space-0:   0px;      /* None */
--space-1:   4px;      /* Tight inline elements */
--space-2:   8px;      /* Compact gaps (icon + text) */
--space-3:   12px;     /* Cozy (related items) */
--space-4:   16px;     /* Default (tab padding horizontal, input padding) */
--space-5:   20px;     /* Content area top padding */
--space-6:   24px;     /* Form field gaps between columns */
--space-8:   32px;     /* Card padding, section gaps */
--space-10:  40px;     /* Button height (pagination, primary) */
--space-12:  48px;     /* Input height (search, page jump), section spacing */
--space-13:  52px;     /* Tab height, detail input height */
--space-14:  56px;     /* Table header row height */
--space-15:  60px;     /* Table body row height */
--space-16:  64px;     /* Large vertical spacing */
--space-25:  100px;    /* Toggle settings gap */
```

#### Layout-Specific Spacing

| Element | Property | Value |
|---------|----------|-------|
| Sidebar | Width | 300px |
| Content area | Left offset | 324px (300px sidebar + 24px gap) |
| Content area | Top padding | 20px |
| Card | Padding | 32px |
| Card | Border radius | 8px |
| Form field gap | Column gap | 24px |
| Form field gap | Row gap | 24px |
| Tab | Height | 52px |
| Tab | Horizontal padding | 16px |
| Tab | Border radius | 6px |
| Search input | Height | 48px |
| Search input | Border radius | 6px |
| Primary button | Height | 40px |
| Primary button | Border radius | 8px |
| Pagination button | Height | 40px |
| Pagination button | Border radius | 6px |
| Table header row | Height | 56px |
| Table body row | Height | 60px |
| Detail input | Height | 52px |
| Detail input | Border radius | 6px |
| Detail input | Horizontal padding | 16px |
| Profile image | Size | 116px x 116px |
| Profile image | Border radius | 8px |
| Avatar (table) | Size | 22px (circular) |
| Toggle switch | Size | 44px x 24px |

### 4.4 Border Radius

```css
--radius-sm:   4px;      /* Small UI elements */
--radius-md:   6px;      /* Inputs, tabs, pagination buttons, selects */
--radius-lg:   8px;      /* Cards, primary buttons, profile images */
--radius-xl:   12px;     /* Modals (if needed) */
--radius-full: 9999px;   /* Avatars, pills, toggle switches */
```

### 4.5 Borders

```css
--border-default: 1px solid #E2E8F0;    /* Card borders, input borders, table borders */
--border-divider: 1px solid #EFF1F4;    /* Section dividers within cards */
--border-table:   1px solid #E2E8F0;    /* Table container border, row separators */
```

### 4.6 Shadows

The Figma design uses a flat/minimal shadow approach. Shadows are subtle or absent.

```css
--shadow-none: none;                              /* Default for cards (border-defined) */
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.05);    /* Subtle lift (optional hover) */
--shadow-md:   0 4px 6px rgba(0, 0, 0, 0.07);    /* Dropdown menus */
--shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.1);   /* Modals/overlays */
```

### 4.7 CSS Custom Properties (globals.css)

```css
@layer base {
  :root {
    /* Brand Colors */
    --primary: 80 149 148;           /* #509594 */
    --primary-foreground: 255 255 255; /* #FFFFFF */
    --primary-light: 185 213 212;    /* #B9D5D4 */

    /* Backgrounds */
    --background: 252 252 252;       /* #FCFCFC */
    --card: 255 255 255;             /* #FFFFFF */
    --sidebar: 255 255 255;          /* #FFFFFF */

    /* Borders */
    --border: 226 232 240;           /* #E2E8F0 */
    --divider: 239 241 244;          /* #EFF1F4 */

    /* Text */
    --foreground: 0 0 0;             /* #000000 */
    --muted-foreground: 90 94 106;   /* #5A5E6A */
    --placeholder: 160 174 192;      /* #A0AEC0 */
    --table-cell: 59 63 74;          /* #3B3F4A */
    --section-label: 160 174 192;    /* #A0AEC0 */
    --subtitle: 157 160 168;         /* #9DA0A8 */

    /* Surfaces */
    --muted: 238 242 246;            /* #EEF2F6 */
    --table-header: 249 250 252;     /* #F9FAFC */
    --inactive-tab: 239 241 244;     /* #EFF1F4 */

    /* Semantic */
    --badge-green-bg: 198 246 213;   /* #C6F6D5 */
    --badge-green-text: 34 84 61;    /* #22543D */
    --info: 59 130 246;              /* #3B82F6 (toggle ON) */
    --toggle-off: 203 213 224;       /* #CBD5E0 */

    /* Accent */
    --accent: 185 213 212;           /* #B9D5D4 */
    --accent-foreground: 0 0 0;      /* #000000 */

    /* Radius */
    --radius: 8px;
  }
}
```

---

## 5. Component Library

### 5.1 Buttons

#### Variants (shadcn/ui `Button` overrides)

| Variant | Background | Text Color | Border | Height | Radius | Font | Usage |
|---------|------------|------------|--------|--------|--------|------|-------|
| `primary` | `#509594` | `#FFFFFF` | none | 40px | 8px | Inter 18px SemiBold | "Write", "Save Changes" |
| `primary` (hover) | `#3F7A79` | `#FFFFFF` | none | 40px | 8px | -- | Hover state |
| `primary` (active) | `#357070` | `#FFFFFF` | none | 40px | 8px | -- | Pressed state |
| `primary` (disabled) | `#509594` @ 50% opacity | `#FFFFFF` | none | 40px | 8px | -- | Disabled state |
| `secondary` | `#EEF2F6` | `#000000` | none | 48px | 6px | Inter 18px SemiBold | "Go" button |
| `pagination` | `#B9D5D4` | `#509594` | none | 40px | 6px | -- | `<<` `<` `>` `>>` |
| `pagination` (hover) | `#A0C4C3` | `#3F7A79` | none | 40px | 6px | -- | Hover state |
| `pagination` (disabled) | `#B9D5D4` @ 50% opacity | `#509594` @ 50% | none | 40px | 6px | -- | Disabled (no more pages) |
| `ghost` | transparent | `#509594` | none | auto | 0 | Body 14px | "Delete" action in table |
| `ghost` (hover) | transparent | `#3F7A79` | none | auto | 0 | underline | Hover state |
| `outline` | transparent | `#000000` | 1px `#E2E8F0` | 40px | 6px | -- | Reserved |

**Button Icon Placement:**
- "Write" button: `Pencil` icon left of text, 8px gap
- "Save Changes" button: `Pencil` icon left of text, 8px gap
- Pagination buttons: Icon only (no text), centered

**Accessibility:**
- Minimum touch/click target: 40px x 40px (met by all button heights)
- Focus ring: 2px offset, `#509594` color, `outline-offset: 2px`
- Disabled state: `opacity: 0.5`, `cursor: not-allowed`, `pointer-events: none`
- All icon-only buttons must have `aria-label` (e.g., "Go to first page", "Previous page")

### 5.2 Form Elements

#### Text Input (shadcn/ui `Input` overrides)

| State | Border | Background | Text Color | Placeholder Color |
|-------|--------|------------|------------|-------------------|
| Default | 1px `#E2E8F0` | `#FFFFFF` | `#000000` | `#A0AEC0` |
| Hover | 1px `#CBD5E0` | `#FFFFFF` | `#000000` | `#A0AEC0` |
| Focus | 1px `#509594` | `#FFFFFF` | `#000000` | -- |
| Disabled | 1px `#E2E8F0` | `#F9FAFC` | `#A0AEC0` | `#A0AEC0` |

**Specifications:**
- Dashboard search: 48px height, 6px radius, full width
- Detail form inputs: 52px height, 6px radius, 16px horizontal padding
- Font: Inter Regular 18px
- Focus ring: 2px `#509594` ring with 2px offset (or replace border color)

#### Select / Dropdown (shadcn/ui `Select` overrides)

| State | Border | Background | Text Color | Chevron |
|-------|--------|------------|------------|---------|
| Default | 1px `#E2E8F0` | `#FFFFFF` | `#2D3748` | `ChevronDown` `#A0AEC0` |
| Hover | 1px `#CBD5E0` | `#FFFFFF` | `#2D3748` | `ChevronDown` `#2D3748` |
| Focus/Open | 1px `#509594` | `#FFFFFF` | `#2D3748` | `ChevronUp` `#509594` |
| Disabled | 1px `#E2E8F0` | `#F9FAFC` | `#A0AEC0` | `ChevronDown` `#CBD5E0` |

**Specifications:**
- Detail form selects: 52px height, 6px radius
- Items per page dropdown (dashboard): 48px height, 96px width
- Right padding: 48px (space for chevron icon area)
- Dropdown menu: white bg, `#E2E8F0` border, 6px radius, `shadow-md`
- Dropdown item hover: `#EEF2F6` background

#### Switch / Toggle (shadcn/ui `Switch` overrides)

| State | Track BG | Thumb | Thumb Position |
|-------|----------|-------|----------------|
| OFF | `#CBD5E0` | `#FFFFFF` | Left |
| OFF (hover) | `#B0BEC5` | `#FFFFFF` | Left |
| ON | `#3B82F6` (blue) | `#FFFFFF` | Right |
| ON (hover) | `#2563EB` | `#FFFFFF` | Right |
| Disabled OFF | `#CBD5E0` @ 50% | `#FFFFFF` | Left |
| Disabled ON | `#3B82F6` @ 50% | `#FFFFFF` | Right |

**Specifications:**
- Track size: 44px x 24px
- Thumb size: 20px (with 2px inset from track edge)
- Transition: 200ms ease-in-out for thumb slide
- Label: Text to the left of toggle, 16px Regular

### 5.3 Card (shadcn/ui `Card` overrides)

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | 1px `#E2E8F0` |
| Border radius | 8px |
| Padding | 32px |
| Shadow | none (border-defined containers) |

**Usage:** Main content container on both Dashboard and User Detail pages.

### 5.4 Table (shadcn/ui `Table` overrides)

#### Table Container
- Background: `#FFFFFF`
- Border: 1px `#E2E8F0`
- Border radius: 0px (square corners per Figma)
- Overflow: hidden

#### Table Header (`TableHeader`)
- Background: `#F9FAFC`
- Row height: 56px
- Text: 14px, SemiBold (600), `#3B3F4A`
- Vertical alignment: center
- Bottom border: 1px `#E2E8F0`

#### Table Row (`TableRow`)
- Row height: 60px
- Text: 14px, Regular (400), `#3B3F4A`
- Bottom border: 1px `#E2E8F0`
- Hover state: `#F9FAFC` background, `cursor: pointer`
- Vertical alignment: center

#### Table Cell (`TableCell`)
- Padding: 0 16px
- Vertical alignment: center

#### Column Specifications

| Column | Width | Content | Special |
|--------|-------|---------|---------|
| Nickname | flex-1 | Text | -- |
| Grade | flex-1 | Text | -- |
| Avatar | 80px fixed | 22px circular image centered | `Avatar` component |
| Phone Number | flex-1 | Text | -- |
| Age | flex-1 | Text | -- |
| Gender | flex-1 | Text | -- |
| Region | flex-1 | Text | -- |
| Join Date | flex-1 | Text + sort icon | `ChevronDown`/`ChevronUp` icon |
| Withdrawal Date | flex-1 | Text + sort icon | `ChevronDown`/`ChevronUp` icon |
| Delete | 57px fixed | Teal text link | `ghost` button, `#509594` |

### 5.5 Badge (shadcn/ui `Badge` overrides)

#### Green Count Badge
- Background: `#C6F6D5`
- Text: `#22543D`, Inter Bold 18px
- Padding: 4px 12px
- Border radius: 9999px (pill)
- Content: Formatted number (e.g., "100,000")

### 5.6 Tabs (shadcn/ui `Tabs` overrides)

| State | Background | Text Color | Font | Border Radius |
|-------|------------|------------|------|---------------|
| Active | `#509594` | `#FFFFFF` | Pretendard SemiBold | 6px |
| Inactive | `#EEF2F6` | `#1A202C` | Pretendard Medium | 6px |
| Hover (inactive) | `#E2E8F0` | `#1A202C` | Pretendard Medium | 6px |

**Specifications:**
- Tab height: 52px
- Horizontal padding: 16px
- Gap between tabs: 8px
- Tab list: no bottom border (custom styled, not underline variant)

### 5.7 Pagination Controls

**Left Group:**
- Navigation buttons: `<<` (ChevronsLeft), `<` (ChevronLeft), `>` (ChevronRight), `>>` (ChevronsRight)
- Button style: `pagination` variant (40px square, `#B9D5D4` bg, 6px radius)
- Page indicator between `<` and `>`: "1 / 1"
  - Current page: 20px Bold
  - Separator "/": 16px Regular `#5A5E6A`
  - Total pages: 16px Regular `#5A5E6A`

**Right Group:**
- Page jump input: 100px width, 48px height, placeholder "Page", 6px radius
- "Go" button: `secondary` variant, 48px height
- Items per page: `Select` dropdown, 96px width, 48px height, "10 items" default

### 5.8 Sidebar (shadcn/ui `Sidebar` + `Accordion` overrides)

#### Sidebar Container
- Width: 300px
- Height: 100vh (fixed)
- Position: fixed left
- Background: `#FFFFFF`
- Border right: 1px `#E2E8F0`
- Padding: 24px

#### Sidebar Header
- Title: "ADMIN" -- Pretendard 24px SemiBold, letter-spacing 0.05em
- Subtitle: Admin user ID -- 14px Regular `#9DA0A8`
- Bottom spacing: 32px

#### Sidebar Navigation (Accordion)
- Menu item height: 48px
- Menu item text: Inter/Noto Sans KR 16px Regular `#5A5E6A`
- Menu item icon: 20px Lucide icon, `#5A5E6A`
- Menu item hover: `#F9FAFC` background
- Accordion trigger: Chevron icon on right side, rotates 180deg on expand
- Sub-menu item: Indented 40px from left
- Sub-menu active state: `#EEF2F6` background, `#509594` text, left border or dot indicator
- Sub-menu item height: 44px

#### Sidebar Footer
- Border top: 1px `#E2E8F0`
- Padding top: 16px
- Logout button: `LogOut` icon + "Logout" text, centered, 16px Regular `#5A5E6A`
- Logout hover: `#EF4444` text color (red hint for destructive action)

### 5.9 Separator (shadcn/ui `Separator` overrides)

- Color: `#EFF1F4`
- Height: 1px
- Full width of parent container
- Margin: 24px vertical (between header and content sections)

### 5.10 Avatar (shadcn/ui `Avatar` overrides)

- Table avatar: 22px x 22px, circular (`border-radius: 9999px`)
- Fallback: First letter of nickname, `#EEF2F6` bg, `#5A5E6A` text
- Profile images (detail page): 116px x 116px, 8px border radius (NOT circular)

### 5.11 Label (shadcn/ui `Label` overrides)

- Field labels: Pretendard 20px SemiBold `#101010`
- Margin bottom: 8px (below label, above input)

### 5.12 Tooltip (shadcn/ui `Tooltip`)

- Background: `#1A202C`
- Text: `#FFFFFF`, 14px Regular
- Padding: 8px 12px
- Border radius: 6px
- Arrow: included
- Delay: 300ms show, 100ms hide
- Usage: Icon-only buttons (pagination), optional hover hints

---

## 6. Page Layouts

### 6.1 Global Layout Structure

```
+------------------------------------------------------------------+
|                        Browser Viewport (1920px)                  |
+----------+-------------------------------------------------------+
|          |                                                       |
| Sidebar  |              Content Area                              |
| 300px    |              (offset 324px from left)                  |
| fixed    |              (padding-top: 20px)                       |
|          |                                                       |
| +------+ |  +------------------------------------------------+  |
| |ADMIN | |  |  Card Container (white, 8px radius, border)    |  |
| |admin  | |  |                                                |  |
| |ID     | |  |  [Page-specific content]                       |  |
| +------+ |  |                                                |  |
| |Home   | |  |                                                |  |
| |User v | |  |                                                |  |
| | User  | |  |                                                |  |
| |  Mgmt | |  |                                                |  |
| |Match v| |  |                                                |  |
| | Match | |  |                                                |  |
| |  Mgmt | |  |                                                |  |
| |Admin v| |  |                                                |  |
| | Notice| |  |                                                |  |
| | Report| |  |                                                |  |
| | Terms | |  +------------------------------------------------+  |
| |       | |                                                       |
| +------+ |                                                       |
| |Logout | |                                                       |
| +------+ |                                                       |
+----------+-------------------------------------------------------+
```

### 6.2 Responsive Considerations

Per the PRD, the design is **desktop-only at 1920px**. No responsive breakpoints are required. However, the following minimum considerations apply:

| Breakpoint | Behavior |
|------------|----------|
| >= 1440px | Full layout as designed |
| 1280px - 1439px | Content area compresses, table columns may use ellipsis |
| < 1280px | Not supported (out of scope per PRD) |

---

## 7. Wireframes

### 7.1 User Management List (Dashboard) -- Desktop

```
+---------------------------+-----------------------------------------------------------+
| SIDEBAR (300px)           | CONTENT AREA                                              |
|                           |                                                           |
| +---------------------+  |  +-------------------------------------------------------+|
| |  ADMIN              |  |  |  User Management  [100,000]            [ Write btn ]  ||
| |  admin@potenlab.com |  |  |  User list management page                            ||
| +---------------------+  |  |                                                       ||
| |                     |  |  |  ---------------------------------------------------- ||
| |  Home               |  |  |                                                       ||
| |                     |  |  |  [All]  [Tab]  [Tab]                                  ||
| |  v User             |  |  |                                                       ||
| |    > User Mgmt [*]  |  |  |  +---------------------------------------------------+||
| |                     |  |  |  | Enter search keyword                     (search) |||
| |  v Match            |  |  |  +---------------------------------------------------+||
| |    > Match Mgmt     |  |  |                                                       ||
| |                     |  |  |  [<<] [<]  1 / 1  [>] [>>]    [Page] [Go] [10 items] ||
| |  v Admin            |  |  |                                                       ||
| |    > Notice Mgmt    |  |  |  +---------------------------------------------------+||
| |    > Report Mgmt    |  |  |  | Nick | Grade | Avt | Phone | Age | Gen | Reg |    |||
| |    > Terms Mgmt     |  |  |  |      |       |     |       |     |     |     |    |||
| |                     |  |  |  |      |       |     |       |     |     | Join|Wdr |||
| |                     |  |  |  |      |       |     |       |     |     | Date|Date|||
| |                     |  |  |  |      |       |     |       |     |     |     |Del |||
| |                     |  |  |  |------+-------+-----+-------+-----+-----+-----+----|||
| |                     |  |  |  | Nick | Mania | (o) | 010.. | 99  | M   | Gang|    |||
| |                     |  |  |  |Here  |       |     | 1234  |     |     | nam |    |||
| |                     |  |  |  |      |       |     | 1234  |     |     |     |Nov |||
| |                     |  |  |  |      |       |     |       |     |     |     |Del |||
| |                     |  |  |  |------+-------+-----+-------+-----+-----+-----+----|||
| |                     |  |  |  | (repeat 4 more rows...)                            |||
| |                     |  |  |  +---------------------------------------------------+||
| +---------------------+  |  +-------------------------------------------------------+|
| |      Logout         |  |                                                           |
| +---------------------+  |                                                           |
+---------------------------+-----------------------------------------------------------+
```

#### Detailed Annotations -- Dashboard

**A. Header Area:**
```
+-------------------------------------------------------+
|  [Title: "User Management"]   [Badge: "100,000"]      |
|  32px SemiBold black          Green pill badge         |
|                                                        |
|  [Subtitle: "User list management page"]               |       [Write]
|  18px Medium #9DA0A8                                   |    Teal btn w/ Pencil icon
|                                                        |    Top-right aligned
+-------------------------------------------------------+
```

**B. Tabs Area:**
```
+-------------------------------------------------------+
| [All]          [Tab]          [Tab]                    |
| Active:        Inactive:      Inactive:                |
| bg #509594     bg #EEF2F6     bg #EEF2F6              |
| text white     text #1A202C   text #1A202C            |
| 52px h         52px h         52px h                   |
| 6px radius     6px radius     6px radius               |
+-------------------------------------------------------+
```

**C. Pagination Controls:**
```
+-------------------------------------------------------+
| [<<] [<]  1 / 1  [>] [>>]           [Page][Go][10 v] |
|  40x40    20px/16px  40x40            100px 48h  96px |
| #B9D5D4   Bold/Reg   #B9D5D4         input btn  sel  |
+-------------------------------------------------------+
```

**D. Table:**
```
+----+------+-----+---+-------+-----+-----+-----+------+------+-----+
| #  | Nick | Grd | A | Phone | Age | Gen | Reg | Join | Wdr  | Del |
|    |      |     | v |       |     |     |     | v    | v    |     |
+----+------+-----+---+-------+-----+-----+-----+------+------+-----+  <- #F9FAFC bg, 56px
| 1  | Nick | Man |(o)| 010.. | 99  | M   | Gan | Nov  | Nov  | Del |
|    | Here | ia  |   | 1234  |     | ale | nam | 1,22 | 1,22 | ete |  <- White bg, 60px
+----+------+-----+---+-------+-----+-----+-----+------+------+-----+
| 2  | ...  | ... |...| ...   | ... | ... | ... | ...  | ...  | Del |
+----+------+-----+---+-------+-----+-----+-----+------+------+-----+
```
- Column "A v" = Avatar (80px fixed, centered circle)
- Column "Del" = Delete (57px fixed, teal ghost text)
- "v" on Join/Wdr = sort icon (ChevronDown)

### 7.2 User Detail Page -- Desktop

```
+---------------------------+-----------------------------------------------------------+
| SIDEBAR (300px)           | CONTENT AREA                                              |
|                           |                                                           |
| (same sidebar as above)  |  +-------------------------------------------------------+|
|                           |  |  User Management                 [ Save Changes btn ] ||
|                           |  |  You can edit user information.                        ||
|                           |  |                                                       ||
|                           |  |  ---------------------------------------------------- ||
|                           |  |                                                       ||
|                           |  |  Basic Info  (section label, #A0AEC0, 20px Bold)      ||
|                           |  |                                                       ||
|                           |  |  +--------+  +--------+  +--------+                  ||
|                           |  |  | IMG 1  |  | IMG 2  |  | IMG 3  |   116x116px ea   ||
|                           |  |  | 116px  |  | 116px  |  | 116px  |   8px radius     ||
|                           |  |  +--------+  +--------+  +--------+                  ||
|                           |  |                                                       ||
|                           |  |  One-Line Intro                                       ||
|                           |  |  +---------------------------------------------------+||
|                           |  |  | This is the one-line intro content.               |||
|                           |  |  +---------------------------------------------------+||
|                           |  |                                                       ||
|                           |  |  +----------+ +----------+ +----------+ +----------+  ||
|                           |  |  | Role     | | Nickname | | Phone    | | Age      |  ||
|                           |  |  | [User v] | | [Attack..] | [01012..] | [24 yrs] |  ||
|                           |  |  +----------+ +----------+ +----------+ +----------+  ||
|                           |  |                                                       ||
|                           |  |  +----------+ +----------+ +----------+ +----------+  ||
|                           |  |  | Gender   | | Ex.Style | | Gym Relo | | Region   |  ||
|                           |  |  | [Male v] | | [Body..v]| | [Avail.v]| | [Seoul.v]|  ||
|                           |  |  +----------+ +----------+ +----------+ +----------+  ||
|                           |  |                                                       ||
|                           |  |  +----------+ +----------+ +----------+               ||
|                           |  |  | Bench    | | Deadlift | | Squat    |               ||
|                           |  |  | [100kg]  | | [100kg]  | | [100kg]  |               ||
|                           |  |  +----------+ +----------+ +----------+               ||
|                           |  |                                                       ||
|                           |  |  ---------------------------------------------------- ||
|                           |  |                                                       ||
|                           |  |  Other Settings (section label, #A0AEC0, 20px Bold)   ||
|                           |  |                                                       ||
|                           |  |  Profile Public [OFF]   Match&Chat [ON]   Mktg [OFF]  ||
|                           |  |       (--o)               (o--)             (--o)      ||
|                           |  |    100px gap            100px gap                      ||
|                           |  |                                                       ||
|                           |  +-------------------------------------------------------+|
+---------------------------+-----------------------------------------------------------+
```

#### Detailed Annotations -- User Detail

**A. Header Area:**
```
+-------------------------------------------------------+
|  [Title: "User Management"]                            |
|  32px SemiBold black                                   |
|                                                        |       [Save Changes]
|  [Subtitle: "You can edit user information."]          |    Teal btn w/ Pencil icon
|  18px Medium #9DA0A8                                   |    Top-right aligned
+-------------------------------------------------------+
```

**B. Basic Info Section:**
```
Section Label: "Basic Info"
  - Font: Pretendard 20px Bold
  - Color: #A0AEC0
  - Margin bottom: 24px

Profile Images: 3 images in horizontal row
  - Each: 116x116px, 8px radius
  - Gap between images: 16px
  - Margin bottom: 24px

One-Line Intro:
  - Label: "One-Line Intro" (20px SemiBold #101010)
  - Input: full-width, 52px height, 6px radius
  - Margin bottom: 24px

Field Rows:
  - 4 columns per row (except row 3 = 3 columns)
  - Equal width, 24px gap
  - Each field: Label (20px SemiBold) above Input/Select (52px height)
  - Row gap: 24px
```

**C. Other Settings Section:**
```
Section Label: "Other Settings"
  - Font: Pretendard 20px Bold
  - Color: #A0AEC0
  - Margin bottom: 24px

Toggle Layout: Horizontal, 100px gap between items
  Each toggle:
  - Label text (left) + Switch component (right)
  - or Label text above, switch beside
  - Switch: 44x24px
  - ON: Blue (#3B82F6) track, white thumb right
  - OFF: Gray (#CBD5E0) track, white thumb left
```

---

## 8. Micro-interactions and Animation Guidelines

### 8.1 Animation Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | `ease-out` | Button hover, focus ring, link hover |
| Small | 200ms | `ease-in-out` | Toggle switch thumb, tab switch, row hover |
| Medium | 300ms | `ease-in-out` | Accordion expand/collapse, dropdown open/close, tooltip |
| Large | 400ms | `ease-in-out` | Page transitions (if applicable) |

### 8.2 Specific Interactions

#### Button Hover
```css
.btn-primary:hover {
  background-color: #3F7A79;
  transition: background-color 150ms ease-out;
}
.btn-primary:active {
  background-color: #357070;
  transform: scale(0.98);
  transition: all 100ms ease-out;
}
```

#### Table Row Hover
```css
.table-row:hover {
  background-color: #F9FAFC;
  cursor: pointer;
  transition: background-color 150ms ease-out;
}
```

#### Toggle Switch
```css
.switch-thumb {
  transition: transform 200ms ease-in-out;
}
.switch-track {
  transition: background-color 200ms ease-in-out;
}
/* ON state */
.switch[data-state="checked"] .switch-thumb {
  transform: translateX(20px);
}
```

#### Accordion Expand/Collapse
```css
.accordion-content {
  transition: height 300ms ease-in-out, opacity 200ms ease-in-out;
}
.accordion-trigger .chevron {
  transition: transform 300ms ease-in-out;
}
.accordion-trigger[data-state="open"] .chevron {
  transform: rotate(180deg);
}
```

#### Tab Switch
```css
.tab-trigger {
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
}
```

#### Input Focus
```css
.input:focus {
  border-color: #509594;
  outline: none;
  box-shadow: 0 0 0 2px rgba(80, 149, 148, 0.2);
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}
```

#### Delete Text Hover
```css
.delete-action:hover {
  text-decoration: underline;
  color: #3F7A79;
  transition: color 150ms ease-out;
}
```

#### Sidebar Menu Item Hover
```css
.sidebar-menu-item:hover {
  background-color: #F9FAFC;
  transition: background-color 150ms ease-out;
}
.sidebar-menu-item.active {
  background-color: #EEF2F6;
  color: #509594;
}
```

#### Page Jump Input Focus
```css
.page-jump:focus {
  border-color: #509594;
  transition: border-color 150ms ease-out;
}
```

### 8.3 Loading and Empty States

Even though data is static/mock, define these for completeness:

| State | Component | Behavior |
|-------|-----------|----------|
| Table loading | Skeleton rows | 5 rows of pulsing gray blocks matching column widths |
| Empty table | Message | "No users found" centered in table area, `#9DA0A8` text |
| Image loading | Skeleton | 116x116px pulsing gray block |
| Avatar fallback | Initial | First letter of nickname in `#EEF2F6` circle |

---

## 9. Accessibility Checklist

### 9.1 WCAG 2.1 AA Requirements

#### Perceivable

- [x] All images have alt text (profile images, avatars)
- [x] Color contrast meets 4.5:1 for normal text (Black on white = 21:1, Grayscale/900 on white = 9.21:1)
- [x] Color contrast meets 3:1 for large text 18px+ (Primary on white = 3.15:1, used at 18px SemiBold)
- [x] Information not conveyed by color alone (active tab has both color AND background change, toggle has position indicator)
- [x] Text resizable up to 200% without loss of content (desktop-only, but layout should not break)
- [x] All form fields have visible labels
- [x] Placeholder text is supplementary, not the only label

#### Operable

- [x] All functionality accessible via keyboard
- [x] Tab order follows logical reading order (sidebar -> content, top to bottom, left to right)
- [x] No keyboard traps (accordion sections, select dropdowns can be exited with Escape)
- [x] Skip links provided: "Skip to main content" link before sidebar
- [x] Focus indicators visible: 2px `#509594` ring with offset on all interactive elements
- [x] Minimum click/touch target: 40px height on all buttons (44px on toggles)
- [x] Focus visible on all interactive elements (buttons, inputs, links, tabs, toggles, accordion triggers)

#### Understandable

- [x] Language specified in HTML (`lang="ko"` or `lang="en"` as appropriate)
- [x] Form labels clearly associated with inputs via `htmlFor`/`id` pairing
- [x] Error messages descriptive (reserved for future, not needed in static UI)
- [x] Consistent navigation (sidebar is the same on every page)
- [x] Consistent identification (same components styled the same way everywhere)

#### Robust

- [x] Valid, semantic HTML markup (heading hierarchy: h1 for page title, h2 for sections)
- [x] ARIA labels on icon-only buttons (`aria-label="Go to first page"`, etc.)
- [x] ARIA roles on custom components (shadcn/ui provides these via Radix primitives)
- [x] `role="table"`, `role="row"`, `role="columnheader"`, `role="cell"` on data table
- [x] `aria-expanded` on accordion triggers
- [x] `aria-selected` on active tab
- [x] `aria-checked` on toggle switches
- [x] Works with screen readers (NVDA, VoiceOver) -- shadcn/ui Radix primitives handle this

### 9.2 Keyboard Navigation Map

| Component | Key | Action |
|-----------|-----|--------|
| Skip link | Tab (first element) | Focus skip link, Enter to jump to main content |
| Sidebar menu | Tab / Shift+Tab | Navigate between menu items |
| Accordion | Enter / Space | Toggle expand/collapse |
| Accordion | Arrow Up/Down | Navigate between accordion items |
| Tabs | Arrow Left/Right | Switch between tabs |
| Tabs | Enter / Space | Activate tab |
| Table row | Tab | Focus row (or first interactive element in row) |
| Table row | Enter | Navigate to user detail (same as click) |
| Delete action | Enter / Space | Trigger delete action |
| Pagination buttons | Tab + Enter | Navigate pages |
| Input fields | Tab | Focus field |
| Select dropdown | Enter / Space | Open dropdown |
| Select dropdown | Arrow Up/Down | Navigate options |
| Select dropdown | Enter | Select option |
| Select dropdown | Escape | Close dropdown |
| Toggle switch | Space | Toggle ON/OFF |
| Buttons | Enter / Space | Activate button |

### 9.3 Screen Reader Announcements

| Element | Announcement |
|---------|-------------|
| Page title | "User Management, heading level 1" |
| Badge | "Total users: 100,000" (use `aria-label`) |
| Active tab | "All, tab, selected, 1 of 3" |
| Table | "User management table, 10 columns, 5 rows" |
| Sort button | "Join Date, sortable column, sort ascending" |
| Delete action | "Delete user NicknameHere, button" |
| Toggle | "Profile Public, switch, off" / "Match notification, switch, on" |
| Pagination | "Page 1 of 1" (use `aria-live="polite"` region) |

### 9.4 Color Accessibility Verification

| Element | Foreground | Background | Ratio | WCAG Level | Status |
|---------|------------|------------|-------|------------|--------|
| Page title | `#000000` | `#FFFFFF` | 21:1 | AAA | Pass |
| Subtitle | `#9DA0A8` | `#FFFFFF` | 3.01:1 | AA Large (18px) | Pass |
| Section label | `#A0AEC0` | `#FFFFFF` | 2.64:1 | -- | Decorative label; pair with semantic heading for SR |
| Table cell text | `#3B3F4A` | `#FFFFFF` | 9.21:1 | AAA | Pass |
| Button text | `#FFFFFF` | `#509594` | 3.15:1 | AA Large (18px SemiBold) | Pass |
| Badge text | `#22543D` | `#C6F6D5` | 7.05:1 | AAA | Pass |
| Inactive tab text | `#1A202C` | `#EEF2F6` | 13.83:1 | AAA | Pass |
| Sidebar text | `#5A5E6A` | `#FFFFFF` | 5.32:1 | AA | Pass |
| Placeholder text | `#A0AEC0` | `#FFFFFF` | 2.64:1 | -- | Placeholder only, label provides accessible name |
| Delete action | `#509594` | `#FFFFFF` | 3.15:1 | AA Large (14px) | Needs underline or icon for non-color indicator |

**Remediation for Delete Action:**
The "Delete" text at 14px with `#509594` on white (3.15:1) does not meet AA for normal text (needs 4.5:1). Options:
1. Add underline to provide non-color visual affordance (text-decoration: underline)
2. Use darker shade `#3F7A79` (4.87:1) -- meets AA for normal text
3. Add a trash icon beside text for additional visual cue

**Recommendation:** Use `#3F7A79` for delete text AND add underline on hover. This ensures both color contrast compliance and clear interactive affordance.

---

## 10. Implementation Guidelines

### 10.1 Design Token to CSS Variable Mapping

| Design Token | CSS Variable | Tailwind v4 | shadcn Variable |
|--------------|--------------|-------------|-----------------|
| Primary `#509594` | `--primary` | `bg-primary` / `text-primary` | `--primary` |
| Primary Light `#B9D5D4` | `--accent` | `bg-accent` | `--accent` |
| Background `#FCFCFC` | `--background` | `bg-background` | `--background` |
| White `#FFFFFF` | `--card` | `bg-card` | `--card` |
| Border `#E2E8F0` | `--border` | `border-border` | `--border` |
| Divider `#EFF1F4` | `--divider` | Custom: `border-divider` | Custom |
| Table Header `#F9FAFC` | `--table-header` | Custom: `bg-table-header` | Custom |
| Sidebar Selected `#EEF2F6` | `--muted` | `bg-muted` | `--muted` |
| Gray/400 `#A0AEC0` | `--placeholder` | Custom: `text-placeholder` | Custom |
| Grayscale/600 `#9DA0A8` | `--subtitle` | Custom: `text-subtitle` | Custom |
| Grayscale/800 `#5A5E6A` | `--muted-foreground` | `text-muted-foreground` | `--muted-foreground` |
| Grayscale/900 `#3B3F4A` | `--table-cell` | Custom: `text-table-cell` | Custom |
| Black `#000000` | `--foreground` | `text-foreground` | `--foreground` |
| Badge BG `#C6F6D5` | `--badge-green-bg` | Custom | Custom |
| Badge Text `#22543D` | `--badge-green-text` | Custom | Custom |

### 10.2 Tailwind CSS 4 Configuration

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Custom colors extending Tailwind */
  --color-primary: #509594;
  --color-primary-hover: #3F7A79;
  --color-primary-active: #357070;
  --color-primary-light: #B9D5D4;
  --color-background: #FCFCFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-divider: #EFF1F4;
  --color-table-header: #F9FAFC;
  --color-sidebar-selected: #EEF2F6;
  --color-placeholder: #A0AEC0;
  --color-subtitle: #9DA0A8;
  --color-muted-fg: #5A5E6A;
  --color-table-cell: #3B3F4A;
  --color-inactive-tab: #EFF1F4;
  --color-inactive-tab-text: #1A202C;
  --color-badge-green-bg: #C6F6D5;
  --color-badge-green-text: #22543D;
  --color-toggle-on: #3B82F6;
  --color-toggle-off: #CBD5E0;
  --color-delete-text: #3F7A79;

  /* Font families */
  --font-pretendard: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-inter: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 10.3 Component File Structure

```
src/components/
  ui/                          # shadcn/ui base components (auto-generated, then customized)
    accordion.tsx
    avatar.tsx
    badge.tsx
    button.tsx                 # Add primary, secondary, pagination, ghost variants
    card.tsx
    input.tsx                  # Override height, border, placeholder styles
    label.tsx
    pagination.tsx
    select.tsx                 # Override height, border, chevron styles
    separator.tsx              # Override color to #EFF1F4
    sidebar.tsx                # Override width to 300px
    switch.tsx                 # Override size to 44x24px, ON color blue
    table.tsx                  # Override header bg, row heights
    tabs.tsx                   # Override active/inactive styles
    tooltip.tsx

  app-sidebar.tsx              # Sidebar with ADMIN header, accordion nav, logout footer
  page-header.tsx              # Reusable: title + badge + subtitle + action button
  user-table.tsx               # Table with columns, mock data rows, pagination
  user-detail-form.tsx         # Form with Basic Info + Other Settings sections
```

### 10.4 Component Implementation Notes

#### app-sidebar.tsx
- Uses shadcn/ui `Sidebar` + `Accordion` components
- Fixed 300px width, full viewport height
- `SidebarHeader`: "ADMIN" title + admin ID subtitle
- `SidebarContent`: Accordion with Home, User, Match, Admin sections
- `SidebarFooter`: Logout button with `Separator` above
- Active state tracked via Next.js `usePathname()`
- Sub-menu items use `Link` from `next/link`

#### page-header.tsx
- Accepts props: `title`, `subtitle`, `badgeCount?`, `actionLabel`, `actionIcon`, `onAction`
- Flex layout: title+badge+subtitle left, action button right
- Badge only rendered when `badgeCount` provided
- `Separator` component below header content

#### user-table.tsx
- shadcn/ui `Table` with custom column definitions
- 5 rows of hardcoded mock data from `lib/mock-data.ts`
- Row `onClick` navigates to `/users/[id]` using `useRouter().push()`
- Delete column `onClick` stops propagation (prevents row navigation)
- Pagination controls above table as flex row with space-between
- Sort icons on Join Date and Withdrawal Date columns (visual only)

#### user-detail-form.tsx
- Sections: Basic Info, Other Settings
- Uses CSS Grid for field rows: `grid-cols-4` with `gap-6` (24px)
- Row 3 uses `grid-cols-3`
- Each field: `Label` above `Input` or `Select`
- Profile images: flex row with 3 `img` elements
- Toggles: flex row with `100px` gap, each toggle = label + `Switch`

### 10.5 Mock Data Structure

```typescript
// src/lib/mock-data.ts

export interface User {
  id: string;
  nickname: string;
  grade: string;
  avatar: string;           // URL or placeholder path
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
  profileImages: string[];  // Array of 3 image URLs
  settings: {
    profilePublic: boolean;
    matchChatNotification: boolean;
    marketingNotification: boolean;
  };
}

export const mockUsers: User[] = [
  {
    id: "1",
    nickname: "NicknameHere",
    grade: "Mania",
    avatar: "/avatars/user1.jpg",
    phone: "010-1234-1234",
    age: "Born 1999",
    gender: "Male",
    region: "Gangnam-gu",
    joinDate: "Nov 1, 2022",
    withdrawalDate: "Nov 1, 2022",
    role: "User",
    exerciseStyle: "Bodybuilding",
    gymRelocation: "Available",
    bench: "100kg",
    deadlift: "100kg",
    squat: "100kg",
    intro: "This is the one-line intro content.",
    profileImages: [
      "/profile/img1.jpg",
      "/profile/img2.jpg",
      "/profile/img3.jpg",
    ],
    settings: {
      profilePublic: false,
      matchChatNotification: true,
      marketingNotification: false,
    },
  },
  // ... repeat for 5 total rows
];

export const totalUserCount = 100000;
```

### 10.6 Asset Specifications

| Asset Type | Format | Size | Notes |
|------------|--------|------|-------|
| Icons (Lucide) | SVG (inline React) | 16px, 20px, 24px | Imported from `lucide-react` |
| Avatars (table) | WebP/PNG | 22x22px (rendered), 44x44px (source @2x) | Circular crop |
| Profile images | WebP/PNG | 116x116px (rendered), 232x232px (source @2x) | 8px border radius |
| Logo/Brand mark | SVG | As needed | If sidebar header needs a logo |
| Favicon | ICO/PNG | 16x16, 32x32, 180x180 | Standard set |

### 10.7 Next.js App Router Structure

```typescript
// app/layout.tsx
// - Wraps all pages with SidebarProvider + AppSidebar + main content area
// - Loads Pretendard Variable (CSS) and Inter (next/font)
// - Sets <html lang="ko"> for Korean platform
// - Applies global CSS variables

// app/page.tsx
// - Dashboard: User Management List
// - Contains: PageHeader + Tabs + SearchBar + Pagination + UserTable

// app/users/[id]/page.tsx
// - User Detail page
// - Contains: PageHeader + UserDetailForm
// - Receives `params.id` to select mock user (or default to first)
```

### 10.8 Key Tailwind Utility Classes Reference

| Design Element | Tailwind Classes |
|----------------|-----------------|
| Card container | `bg-white border border-border rounded-lg p-8` |
| Page title | `font-pretendard text-[32px] font-semibold text-black` |
| Subtitle | `font-pretendard text-[18px] font-medium text-subtitle` |
| Section label | `font-pretendard text-[20px] font-bold text-placeholder` |
| Field label | `font-pretendard text-[20px] font-semibold text-[#101010]` |
| Primary button | `bg-primary hover:bg-primary-hover text-white font-inter text-[18px] font-semibold h-10 px-4 rounded-lg` |
| Secondary button | `bg-sidebar-selected text-black font-inter text-[18px] font-semibold h-12 px-4 rounded-md` |
| Pagination button | `bg-primary-light text-primary h-10 w-10 rounded-md` |
| Input (dashboard) | `h-12 border border-border rounded-md px-4 font-inter text-[18px] placeholder:text-placeholder` |
| Input (detail) | `h-[52px] border border-border rounded-md px-4 font-inter text-[18px]` |
| Table header | `bg-table-header h-14 text-[14px] font-semibold text-table-cell` |
| Table row | `h-[60px] text-[14px] text-table-cell hover:bg-table-header cursor-pointer` |
| Active tab | `bg-primary text-white font-semibold h-[52px] px-4 rounded-md` |
| Inactive tab | `bg-inactive-tab text-inactive-tab-text font-medium h-[52px] px-4 rounded-md` |
| Badge | `bg-badge-green-bg text-badge-green-text font-inter text-[18px] font-bold px-3 py-1 rounded-full` |
| Separator | `bg-divider h-px w-full` |
| Toggle (track) | `w-[44px] h-[24px] rounded-full` |
| Avatar (table) | `w-[22px] h-[22px] rounded-full` |
| Profile image | `w-[116px] h-[116px] rounded-lg object-cover` |
| Sidebar | `w-[300px] h-screen fixed left-0 bg-white border-r border-border` |
| Content area | `ml-[324px] pt-5 pr-8 pb-8` |

---

## 11. Design Decisions Log

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Fixed sidebar (not collapsible) | PRD specifies 300px fixed sidebar; desktop-only design eliminates need for collapse | Collapsible sidebar with hamburger toggle |
| Teal (#509594) as primary | Matches Figma design tokens; conveys trust and wellness (appropriate for fitness platform) | Blue (#3B82F6), Green (#22C55E) |
| Pretendard Variable for headings | Korean-optimized variable font with excellent weight range; specified in PRD | Noto Sans KR, Spoqa Han Sans |
| Inter for UI elements | Excellent readability at small sizes, pairs well with Pretendard; specified in PRD | SF Pro, Roboto |
| Blue (#3B82F6) for toggle ON state | Standard toggle pattern; distinguishes from teal primary to avoid confusion | Teal (#509594), Green (#22C55E) |
| No border-radius on table container | Matches Figma spec; creates visual contrast with rounded card container | 8px radius matching card |
| Darker teal (#3F7A79) for delete text | Improves contrast ratio from 3.15:1 to 4.87:1 for AA compliance at 14px | Original #509594 with underline only |
| 4px base spacing unit | Industry standard, aligns with all Figma measurements as clean multiples | 8px base unit |
| shadcn/ui as component foundation | Copy-paste model allows full customization while providing accessible Radix primitives | Headless UI, custom components from scratch |
| No responsive design | PRD explicitly states desktop-only at 1920px; out of scope | Mobile-first responsive |
| Section labels in #A0AEC0 (gray) | Matches Figma tokens; creates visual hierarchy where labels are subordinate to content | Black section labels, primary color labels |
| Accordion sidebar navigation | Matches Figma design; scales well for growing number of admin sections | Flat list, mega menu, breadcrumb nav |

---

## 12. Next Steps

1. [ ] Review and approve this UI/UX design plan
2. [ ] Initialize Next.js 16 project with Bun
3. [ ] Install and configure shadcn/ui with custom theme
4. [ ] Set up Tailwind CSS 4 with design token variables
5. [ ] Load Pretendard Variable and Inter fonts
6. [ ] Build shadcn/ui component overrides (button variants, table, input, etc.)
7. [ ] Implement global layout (sidebar + content area)
8. [ ] Build app-sidebar component with accordion navigation
9. [ ] Build User Management List (dashboard) page
10. [ ] Build User Detail page with form fields
11. [ ] Add mock data and wire up static interactions
12. [ ] Conduct accessibility audit (keyboard nav, screen reader, contrast)
13. [ ] Final visual QA against Figma designs
14. [ ] Developer handoff documentation finalization

---

## References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)
- [Pretendard Font](https://github.com/orioncactus/pretendard)
- [Inter Font](https://rsms.me/inter/)
- [Next.js App Router](https://nextjs.org/docs/app)
- Figma Design: [Admin Design System](https://www.figma.com/design/zBw8h8Qv20EnLw0sx4s7si/Admin-Design-System)
