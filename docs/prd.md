# Product Requirements Document: potenlab-library

## 1. Overview

### 1.1 Product Name
**potenlab-library**

### 1.2 Description
A CLI tool distributed as an npm package that scaffolds production-ready Next.js projects. Users run `npx potenlab-library` and interactively configure their project with their preferred authentication approach, database setup, and optional admin panel. The tool generates a complete, runnable project with all configurations, boilerplate, and feature code in place.

### 1.3 Problem Statement
Starting a new Next.js project with authentication, database integration, and an admin panel requires significant repetitive setup work. Developers must:
- Configure auth providers and session management
- Set up database connections and ORM
- Build admin dashboard UI from scratch
- Wire up middleware for route protection
- Handle monorepo setup when a separate backend is needed

This tool eliminates that overhead by generating a production-ready project in seconds.

### 1.4 Target Users
- Full-stack developers starting new Next.js projects
- Teams at Potenlab who need consistent project structure
- Developers who want auth + admin out of the box

### 1.5 Success Criteria
- User can scaffold a working project in under 60 seconds
- Generated project starts without errors (`bun dev` / `npm run dev`)
- Auth flow (login/register) works end-to-end
- Admin panel is accessible and functional
- Supports all 4 stack combinations without conflicts

---

## 2. User Stories

### US-1: Project Scaffolding
**As a** developer,
**I want to** run a single command to create a new project,
**So that** I don't have to manually set up boilerplate code.

**Acceptance Criteria:**
- Running `npx potenlab-library` starts an interactive CLI
- User is prompted for: project name, auth approach, DB approach, admin panel, package manager
- A complete project directory is created with all files
- Dependencies are installed automatically (unless skipped)
- Git is initialized with an initial commit

### US-2: Supabase Authentication
**As a** developer choosing Supabase,
**I want** pre-configured Supabase Auth with login/register pages,
**So that** I can authenticate users immediately.

**Acceptance Criteria:**
- Supabase client is configured for both browser and server
- Login page with email/password and OAuth buttons (Google, GitHub)
- Register page with email/password
- Session management via Supabase SSR helpers
- Middleware redirects unauthenticated users from protected routes
- User button component showing current user with sign-out
- `.env.example` documents `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### US-3: Custom API Authentication (Express)
**As a** developer preferring a custom backend,
**I want** a separate Express server with JWT-based auth,
**So that** I have full control over my authentication logic.

**Acceptance Criteria:**
- Monorepo structure: `apps/web/` (Next.js) + `apps/api/` (Express)
- Express server with routes: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- Passwords hashed with bcrypt
- JWT access + refresh token strategy
- Auth middleware for protected Express routes
- Next.js frontend with login/register pages that call Express API
- Next.js middleware checks JWT cookie for route protection
- CORS configured between Next.js and Express
- `.env.example` documents `JWT_SECRET`, `API_URL`, `DATABASE_URL`

### US-4: Supabase Database
**As a** developer using Supabase,
**I want** the Supabase client configured for database queries,
**So that** I can read/write data using Supabase's Postgres.

**Acceptance Criteria:**
- Supabase client set up (shared with auth if both selected)
- Type-safe database queries using Supabase's generated types
- `.env.example` includes Supabase connection vars
- README documents how to create tables in Supabase dashboard
- If admin panel is included, admin data fetching uses Supabase client

### US-5: Prisma + PostgreSQL Database
**As a** developer wanting a self-hosted database,
**I want** Prisma ORM configured with PostgreSQL,
**So that** I have full control over my database schema.

**Acceptance Criteria:**
- `prisma/schema.prisma` with User, Session, Account models
- Prisma client singleton (`src/lib/prisma.ts` or `apps/api/src/lib/prisma.ts`)
- Database migration setup (`prisma migrate dev`)
- Seed script for initial data
- `.env.example` includes `DATABASE_URL`
- If admin panel is included, admin data fetching uses Prisma queries

### US-6: Admin Panel
**As a** developer,
**I want** a pre-built admin dashboard,
**So that** I can manage users and view app metrics immediately.

**Acceptance Criteria:**
- Admin layout with collapsible sidebar and top header
- Dashboard page with stats cards (total users, active sessions, etc.)
- User management page with data table (list, search, pagination)
- Settings page
- Route protection: only authenticated users (or admin role) can access `/admin/*`
- Works with both Supabase and Prisma data sources
- Built with shadcn/ui components, fully customizable
- Responsive design (mobile-friendly sidebar)

### US-7: Package Manager Choice
**As a** developer,
**I want to** choose my preferred package manager,
**So that** the project uses my team's tooling.

**Acceptance Criteria:**
- CLI offers: bun (default), npm, pnpm, yarn
- Correct lockfile is generated
- Scripts in `package.json` use the chosen manager
- Dependencies installed with the chosen manager

---

## 3. Technical Architecture

### 3.1 CLI Tool (What We Build)

```
potenlab-library/              <- This repo
├── package.json               name: "potenlab-library", bin field
├── tsconfig.json              ES2022, ESNext modules, bundler resolution
├── bunfig.toml                Build target: node, format: esm
├── .gitignore
├── .npmignore                 Exclude src/ from npm publish
│
├── src/                       CLI source code (TypeScript)
│   ├── index.ts               #!/usr/bin/env node entry point
│   ├── cli.ts                 commander: arg parsing
│   ├── prompts.ts             @clack/prompts: interactive UI
│   ├── scaffolder.ts          Orchestrates full scaffolding flow
│   ├── template-processor.ts  File copying, variable replacement, dep merging
│   ├── types.ts               ProjectConfig interface
│   ├── constants.ts           VERSION, defaults
│   └── utils/
│       ├── logger.ts          chalk-based colored output
│       ├── fs.ts              File system helpers
│       ├── package-manager.ts Detect & run install commands
│       └── git.ts             git init + first commit
│
├── template/                  Template files (shipped in npm package)
│   ├── base/                  Always-included Next.js starter
│   └── features/              Feature overlays (copied on top of base)
│       ├── supabase-auth/
│       ├── api-auth/
│       ├── supabase-db/
│       ├── prisma-db/
│       ├── admin/
│       └── monorepo/
│
└── dist/                      Built CLI (git-ignored)
    └── index.js               Bundled entry point
```

### 3.2 CLI Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@clack/prompts` | ^0.9 | Beautiful interactive terminal prompts |
| `commander` | ^13 | CLI argument parsing |
| `chalk` | ^5 | Colored terminal output |
| `ora` | ^8 | Loading spinners |
| `fs-extra` | ^11 | Reliable file copy/merge operations |

Dev dependencies: `typescript`, `@types/node`, `@types/fs-extra`, `bun-types`

### 3.3 Generated Project Dependencies (by feature)

**Base (always included):**
| Package | Purpose |
|---|---|
| `next` ^15 | React framework |
| `react` ^19, `react-dom` ^19 | UI library |
| `tailwindcss` ^4 | Utility-first CSS |
| `clsx`, `tailwind-merge` | Class name utilities |
| `class-variance-authority` | Component variant management |
| `lucide-react` | Icon library |
| `next-themes` | Theme switching |

**Supabase Auth:**
| Package | Purpose |
|---|---|
| `@supabase/supabase-js` ^2 | Supabase client |
| `@supabase/ssr` ^0.5 | Server-side auth helpers |

**Custom API Auth (Express side):**
| Package | Purpose |
|---|---|
| `express` ^4 | HTTP server |
| `cors` | Cross-origin requests |
| `cookie-parser` | Cookie handling |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT tokens |
| `tsx` (dev) | TypeScript execution |

**Custom API Auth (Next.js side):**
| Package | Purpose |
|---|---|
| `jose` | JWT verification in Edge runtime |

**Prisma DB:**
| Package | Purpose |
|---|---|
| `@prisma/client` | Database ORM client |
| `prisma` (dev) | CLI & migration tool |

**Admin Panel:**
| Package | Purpose |
|---|---|
| `@tanstack/react-table` | Headless data table |

### 3.4 Feature Combination Matrix

| # | Auth | DB | Structure | Valid |
|---|---|---|---|---|
| 1 | Supabase Auth | Supabase | Single project | Yes |
| 2 | Supabase Auth | Prisma + PG | Single project | Yes |
| 3 | Custom API | Supabase | Monorepo | Yes |
| 4 | Custom API | Prisma + PG | Monorepo | Yes |

All 4 combinations must work. Admin panel is optional on top of any combination.

### 3.5 Scaffolding Flow (Algorithm)

```
1. Parse CLI arguments (commander)
2. Run interactive prompts (clack)
3. Resolve feature dependencies
4. Determine project structure (single vs monorepo)
5. Create target directory
6. IF monorepo:
   a. Copy template/features/monorepo/ -> root structure
   b. Copy template/base/ -> apps/web/
   c. Copy template/features/api-auth/api/ -> apps/api/
   d. Copy template/features/{auth}/web/ -> apps/web/
   e. Copy template/features/{db}/ -> appropriate location
   f. IF admin: Copy template/features/admin/ -> apps/web/
   g. Merge deps.json files -> generate apps/web/package.json + apps/api/package.json + root package.json
   ELSE (single project):
   a. Copy template/base/ -> target directory
   b. Copy template/features/{auth}/ -> target (merge, no clobber)
   c. Copy template/features/{db}/ -> target
   d. IF admin: Copy template/features/admin/ -> target
   e. Merge deps.json files -> generate package.json
7. Process template variables ({{PROJECT_NAME}}, etc.)
8. Write .env file from .env.example
9. Install dependencies (chosen package manager)
10. Initialize git repository
11. Print success message with next steps
```

### 3.6 Template Variable System

Templates use `{{VARIABLE}}` syntax in `.ejs` files. The processor reads `.ejs` files, replaces variables, and writes the result without the `.ejs` extension.

| Variable | Example Value | Used In |
|---|---|---|
| `{{PROJECT_NAME}}` | `my-app` | package.json, README |
| `{{PROJECT_DESCRIPTION}}` | `A Next.js application` | package.json |
| `{{API_PORT}}` | `3001` | Express server config |
| `{{NEXT_PORT}}` | `3000` | Next.js config |

### 3.7 deps.json Pattern

Each feature declares its dependencies in a `deps.json` file:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.49.0",
    "@supabase/ssr": "^0.5.0"
  },
  "devDependencies": {},
  "scripts": {
    "db:types": "supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > src/types/database.ts"
  }
}
```

The scaffolder merges all selected features' deps.json files into the final package.json(s).

---

## 4. Detailed Feature Specifications

### 4.1 Base Template

**`src/app/layout.tsx`**
- HTML lang attribute
- Inter font from `next/font/google`
- ThemeProvider from `next-themes`
- Metadata: title and description using `{{PROJECT_NAME}}`

**`src/app/page.tsx`**
- Clean landing page with:
  - Hero section with project name
  - "Get Started" button linking to docs
  - Feature cards showing what's included
  - Footer

**`src/app/globals.css`**
- Tailwind v4 `@import "tailwindcss"`
- CSS variables for shadcn theming (light and dark mode)
- Base reset styles

**`src/lib/utils.ts`**
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**shadcn/ui components** (pre-included in `src/components/ui/`):
- `button.tsx` -- Primary, secondary, outline, ghost, link variants
- `card.tsx` -- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `input.tsx` -- Text input with label support
- `label.tsx` -- Form label
- `form.tsx` -- Form wrapper with react-hook-form integration
- `table.tsx` -- Table, TableHeader, TableBody, TableRow, TableCell
- `dialog.tsx` -- Modal dialog
- `dropdown-menu.tsx` -- Dropdown with items, separators
- `avatar.tsx` -- User avatar with fallback
- `badge.tsx` -- Status badges
- `separator.tsx` -- Visual separator
- `sheet.tsx` -- Slide-out panel (for mobile sidebar)
- `skeleton.tsx` -- Loading skeleton

### 4.2 Supabase Auth Feature

**File: `src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**File: `src/lib/supabase/server.ts`**
```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

**File: `src/middleware.ts`**
- Intercepts all requests to protected routes (`/admin/*`, `/dashboard/*`)
- Creates server Supabase client, checks `auth.getUser()`
- Redirects to `/login` if no session
- Refreshes session tokens automatically

**File: `src/app/(auth)/login/page.tsx`**
- Login form with email and password fields
- "Sign in with Google" and "Sign in with GitHub" OAuth buttons
- Link to register page
- Error message display
- Redirect to `/` or `/admin` after successful login

**File: `src/app/(auth)/register/page.tsx`**
- Registration form: name, email, password, confirm password
- Client-side validation
- Calls `supabase.auth.signUp()`
- Email confirmation flow (configurable in Supabase dashboard)
- Link to login page

**File: `src/components/auth/user-button.tsx`**
- Shows user avatar and name when logged in
- Dropdown with: Profile, Settings, Sign Out
- Shows "Sign In" button when not logged in

**Environment variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4.3 Custom API Auth Feature (Express)

**Express Backend (`apps/api/`):**

**File: `src/index.ts`**
```typescript
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`API running on port ${process.env.PORT || 3001}`);
});
```

**File: `src/routes/auth.ts`**
- `POST /auth/register` -- Hash password (bcrypt), create user, return tokens
- `POST /auth/login` -- Verify password, generate access + refresh JWT tokens
- `POST /auth/refresh` -- Verify refresh token, issue new access token
- `POST /auth/logout` -- Clear refresh token cookie
- `GET /auth/me` -- Return current user from JWT

**File: `src/middleware/auth.ts`**
```typescript
import { verifyToken } from "../lib/jwt";

export function authenticate(req, res, next) {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
```

**File: `src/lib/jwt.ts`**
- `generateAccessToken(user)` -- Short-lived (15min) JWT
- `generateRefreshToken(user)` -- Long-lived (7d) JWT
- `verifyToken(token)` -- Verify and decode JWT

**Next.js Frontend (`apps/web/`):**

**File: `src/lib/api-client.ts`**
- Typed fetch wrapper that calls Express API
- Automatic token refresh on 401
- `api.get()`, `api.post()`, `api.put()`, `api.delete()` methods
- Base URL from `NEXT_PUBLIC_API_URL` env var

**File: `src/middleware.ts`**
- Reads JWT from cookie
- Verifies using `jose` (Edge-compatible)
- Redirects to `/login` if invalid/missing

**Login/Register pages** -- Same UI as Supabase version but calls Express API instead.

**Environment variables:**
```
# apps/api/.env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
FRONTEND_URL=http://localhost:3000
PORT=3001

# apps/web/.env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4.4 Supabase DB Feature

- Shared `@supabase/supabase-js` client (same as auth if both selected)
- Type generation script: `supabase gen types typescript`
- `src/types/database.ts` -- Generated database types (placeholder, user generates with Supabase CLI)
- README section documenting required Supabase table setup:
  - `profiles` table (extends auth.users)
  - Any app-specific tables

### 4.5 Prisma DB Feature

**File: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String
  role          Role      @default(USER)
  emailVerified Boolean   @default(false)
  image         String?
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Session {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

**File: `src/lib/prisma.ts`** (or `apps/api/src/lib/prisma.ts`)
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Scripts added to package.json:**
- `db:migrate` -- `prisma migrate dev`
- `db:push` -- `prisma db push`
- `db:studio` -- `prisma studio`
- `db:seed` -- `prisma db seed`

### 4.6 Admin Panel Feature

**File: `src/app/(admin)/admin/layout.tsx`**
- Two-column layout: sidebar (240px) + main content
- `AdminSidebar` -- Collapsible navigation with icons
  - Dashboard (home icon)
  - Users (users icon)
  - Settings (gear icon)
- `AdminHeader` -- Top bar with breadcrumbs, search, user button
- Mobile: sidebar becomes slide-out sheet

**File: `src/app/(admin)/admin/page.tsx` (Dashboard)**
- 4 stats cards in a responsive grid:
  - Total Users
  - Active Sessions
  - New Users (this month)
  - System Status
- Recent activity section (placeholder)
- Quick actions section

**File: `src/app/(admin)/admin/users/page.tsx`**
- Data table with columns: Name, Email, Role, Status, Created, Actions
- Search/filter functionality
- Pagination
- Row actions: Edit, Delete, Change Role
- Uses `@tanstack/react-table` for headless table logic
- Data source adapter:
  - Supabase: `supabase.from("profiles").select("*")`
  - Prisma: `prisma.user.findMany()`
  - API: `api.get("/users")`

**File: `src/app/(admin)/admin/settings/page.tsx`**
- App settings form (name, description)
- Theme toggle
- Placeholder for custom settings

**Admin Components:**
- `sidebar.tsx` -- Navigation items with active state, collapse toggle
- `admin-header.tsx` -- Breadcrumb, search input, user dropdown
- `stats-card.tsx` -- Title, value, trend indicator, icon
- `data-table.tsx` -- Generic reusable table with sorting, filtering, pagination

### 4.7 Monorepo Setup

**Root `package.json`:**
```json
{
  "name": "{{PROJECT_NAME}}",
  "private": true,
  "workspaces": ["apps/*"],
  "scripts": {
    "dev": "concurrently \"bun run --filter api dev\" \"bun run --filter web dev\"",
    "build": "bun run --filter api build && bun run --filter web build"
  }
}
```

`apps/web/` contains the Next.js app.
`apps/api/` contains the Express server.

Both apps run concurrently in development.

---

## 5. CLI Interface Specification

### 5.1 Command
```
potenlab-library [project-name] [options]
```

### 5.2 Options
| Flag | Description | Default |
|---|---|---|
| `--skip-install` | Skip dependency installation | false |
| `--skip-git` | Skip git initialization | false |
| `--use-npm` | Use npm | (auto-detect) |
| `--use-yarn` | Use yarn | (auto-detect) |
| `--use-pnpm` | Use pnpm | (auto-detect) |
| `--use-bun` | Use bun | (auto-detect) |
| `-V, --version` | Show version | -- |
| `-h, --help` | Show help | -- |

### 5.3 Interactive Prompts (when options not provided via flags)

1. **Project name** -- Text input, validated: lowercase, alphanumeric, hyphens
2. **Auth approach** -- Select: "Supabase Auth" / "Custom API (Express + JWT)"
3. **Database approach** -- Select: "Supabase" / "Prisma + PostgreSQL"
4. **Include admin panel** -- Confirm: Yes / No
5. **Package manager** -- Select: bun / npm / pnpm / yarn

### 5.4 Post-Scaffold Output
```
 Project structure created
 Authentication configured (Supabase Auth)
 Database configured (Prisma + PostgreSQL)
 Admin panel added
 Dependencies installed
 Git initialized

  Your project is ready!

  cd my-app
  cp .env.example .env    # Configure your environment variables
  bun run db:migrate      # Run database migrations (if Prisma)
  bun dev                 # Start development server

  Documentation: https://github.com/potenlab/potenlab-library
```

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Scaffolding completes in under 30 seconds (excluding dependency installation)
- CLI startup time under 500ms

### 6.2 Compatibility
- Node.js >= 18
- Bun >= 1.0
- Works on macOS, Linux, Windows
- Published to npm registry

### 6.3 Package Size
- CLI bundle < 500KB (excluding templates)
- Template files < 5MB total
- npm package total < 6MB

### 6.4 Error Handling
- Graceful exit on Ctrl+C during prompts
- Clear error message if target directory already exists
- Validation on all user inputs
- Rollback (delete created directory) on fatal errors during scaffolding

---

## 7. File Inventory (Complete List)

### CLI Source Files to Create:
1. `package.json`
2. `tsconfig.json`
3. `bunfig.toml`
4. `.gitignore`
5. `.npmignore`
6. `src/index.ts`
7. `src/cli.ts`
8. `src/prompts.ts`
9. `src/scaffolder.ts`
10. `src/template-processor.ts`
11. `src/types.ts`
12. `src/constants.ts`
13. `src/utils/logger.ts`
14. `src/utils/fs.ts`
15. `src/utils/package-manager.ts`
16. `src/utils/git.ts`

### Template Files to Create:
17. `template/base/next.config.ts`
18. `template/base/tsconfig.json`
19. `template/base/postcss.config.mjs`
20. `template/base/.env.example`
21. `template/base/.gitignore`
22. `template/base/package.json.ejs`
23. `template/base/src/app/layout.tsx`
24. `template/base/src/app/page.tsx`
25. `template/base/src/app/globals.css`
26. `template/base/src/lib/utils.ts`
27. `template/base/src/components/ui/button.tsx`
28. `template/base/src/components/ui/card.tsx`
29. `template/base/src/components/ui/input.tsx`
30. `template/base/src/components/ui/label.tsx`
31. `template/base/src/components/ui/form.tsx`
32. `template/base/src/components/ui/table.tsx`
33. `template/base/src/components/ui/dialog.tsx`
34. `template/base/src/components/ui/dropdown-menu.tsx`
35. `template/base/src/components/ui/avatar.tsx`
36. `template/base/src/components/ui/badge.tsx`
37. `template/base/src/components/ui/separator.tsx`
38. `template/base/src/components/ui/sheet.tsx`
39. `template/base/src/components/ui/skeleton.tsx`
40. `template/base/src/components/theme-provider.tsx`
41. `template/features/supabase-auth/src/lib/supabase/client.ts`
42. `template/features/supabase-auth/src/lib/supabase/server.ts`
43. `template/features/supabase-auth/src/lib/supabase/middleware.ts`
44. `template/features/supabase-auth/src/middleware.ts`
45. `template/features/supabase-auth/src/app/(auth)/login/page.tsx`
46. `template/features/supabase-auth/src/app/(auth)/register/page.tsx`
47. `template/features/supabase-auth/src/app/(auth)/layout.tsx`
48. `template/features/supabase-auth/src/components/auth/login-form.tsx`
49. `template/features/supabase-auth/src/components/auth/register-form.tsx`
50. `template/features/supabase-auth/src/components/auth/user-button.tsx`
51. `template/features/supabase-auth/src/app/api/auth/callback/route.ts`
52. `template/features/supabase-auth/deps.json`
53. `template/features/api-auth/api/package.json.ejs`
54. `template/features/api-auth/api/tsconfig.json`
55. `template/features/api-auth/api/src/index.ts`
56. `template/features/api-auth/api/src/routes/auth.ts`
57. `template/features/api-auth/api/src/routes/users.ts`
58. `template/features/api-auth/api/src/middleware/auth.ts`
59. `template/features/api-auth/api/src/lib/jwt.ts`
60. `template/features/api-auth/api/.env.example`
61. `template/features/api-auth/api/deps.json`
62. `template/features/api-auth/web/src/lib/api-client.ts`
63. `template/features/api-auth/web/src/middleware.ts`
64. `template/features/api-auth/web/src/app/(auth)/login/page.tsx`
65. `template/features/api-auth/web/src/app/(auth)/register/page.tsx`
66. `template/features/api-auth/web/src/app/(auth)/layout.tsx`
67. `template/features/api-auth/web/src/components/auth/login-form.tsx`
68. `template/features/api-auth/web/src/components/auth/register-form.tsx`
69. `template/features/api-auth/web/src/components/auth/user-button.tsx`
70. `template/features/api-auth/web/deps.json`
71. `template/features/supabase-db/deps.json`
72. `template/features/supabase-db/src/types/database.ts`
73. `template/features/prisma-db/prisma/schema.prisma`
74. `template/features/prisma-db/src/lib/prisma.ts`
75. `template/features/prisma-db/deps.json`
76. `template/features/prisma-db/prisma/seed.ts`
77. `template/features/admin/src/app/(admin)/admin/layout.tsx`
78. `template/features/admin/src/app/(admin)/admin/page.tsx`
79. `template/features/admin/src/app/(admin)/admin/users/page.tsx`
80. `template/features/admin/src/app/(admin)/admin/settings/page.tsx`
81. `template/features/admin/src/components/admin/sidebar.tsx`
82. `template/features/admin/src/components/admin/admin-header.tsx`
83. `template/features/admin/src/components/admin/stats-card.tsx`
84. `template/features/admin/src/components/admin/data-table.tsx`
85. `template/features/admin/deps.json`
86. `template/features/monorepo/package.json.ejs`
87. `docs/prd.md` (this document)

---

## 8. Implementation Order

| Phase | What | Files |
|---|---|---|
| 1 | Project bootstrap | 1-5 |
| 2 | CLI core (entry, args, types) | 6-8, 11-12 |
| 3 | Interactive prompts | 9 |
| 4 | Scaffolding engine | 10, 13-16 |
| 5 | Base Next.js template | 17-40 |
| 6 | Supabase Auth feature | 41-52 |
| 7 | Custom API Auth feature | 53-70 |
| 8 | Database features | 71-76 |
| 9 | Admin panel feature | 77-85 |
| 10 | Monorepo setup | 86 |
| 11 | Testing all combinations | -- |
| 12 | Publish to npm | -- |

---

## 9. Testing Strategy

### Manual Testing Matrix
Test all 4 combinations + admin toggle = 8 scenarios:

| # | Auth | DB | Admin | Monorepo | Test |
|---|---|---|---|---|---|
| 1 | Supabase | Supabase | No | No | `bun dev` starts |
| 2 | Supabase | Supabase | Yes | No | Admin panel renders |
| 3 | Supabase | Prisma | No | No | `bun dev` + `db:migrate` work |
| 4 | Supabase | Prisma | Yes | No | Admin + Prisma queries work |
| 5 | Custom API | Supabase | No | Yes | Both servers start |
| 6 | Custom API | Supabase | Yes | Yes | Admin calls API |
| 7 | Custom API | Prisma | No | Yes | Express + Prisma work |
| 8 | Custom API | Prisma | Yes | Yes | Full stack works |

### Verification Steps Per Scenario:
1. Run `bun run src/index.ts test-project-N`
2. `cd test-project-N && bun install`
3. `bun dev` -- no errors, page loads at localhost:3000
4. `/login` and `/register` pages render
5. `/admin` page renders (if included)
6. Express API responds at localhost:3001 (if monorepo)
7. No TypeScript errors: `bun run typecheck`
