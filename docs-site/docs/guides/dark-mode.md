---
sidebar_position: 3
---

# Dark Mode

`@potenlab/ui` supports dark mode through the `.dark` CSS class.

## How It Works

The library uses the CSS custom variant `@custom-variant dark (&:is(.dark *))`. When the `.dark` class is present on an ancestor element, dark mode styles activate automatically.

## Next.js with next-themes

The recommended approach for Next.js projects:

```bash
npm install next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";
import "@potenlab/ui/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Theme Toggle

```tsx
"use client";
import { useTheme } from "next-themes";
import { Button } from "@potenlab/ui";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </Button>
  );
}
```

## Manual Toggle

Without `next-themes`, toggle the `.dark` class on `<html>` or `<body>`:

```tsx
document.documentElement.classList.toggle("dark");
```

## Dark Mode Tokens

Key tokens that change in dark mode:

| Token | Light | Dark |
|-------|-------|------|
| `--background` | White | Dark gray |
| `--foreground` | Near black | Near white |
| `--card` | White | Dark surface |
| `--border` | Light gray | Dark gray |
| `--muted` | Light gray | Dark gray |

All Potenlab-specific tokens (e.g., `--color-primary`) remain consistent across themes.
