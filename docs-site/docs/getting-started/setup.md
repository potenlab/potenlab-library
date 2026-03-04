---
sidebar_position: 2
---

# Setup

Configure your project to use `@potenlab/ui` components.

## 1. Import Global Styles

Add the CSS import to your app's entry point (e.g., `layout.tsx` or `main.tsx`):

```tsx
import "@potenlab/ui/styles/globals.css";
```

## 2. Configure Tailwind CSS

Add the `@source` directive to your CSS file so Tailwind scans the library's classes:

```css
@import "tailwindcss";
@source "../node_modules/@potenlab/ui/dist";
```

## 3. Font Configuration

The library uses these font families:

- **Pretendard** — Primary UI font
- **Inter** — Secondary font
- **JetBrains Mono** — Monospace / code font

Install them via your preferred method (e.g., `next/font`, CDN, or local files) and map them to the CSS custom properties:

```css
:root {
  --font-pretendard: "Pretendard", sans-serif;
  --font-inter: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

## 4. Dark Mode (Optional)

If using Next.js with `next-themes`:

```tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## Next Steps

Follow the [Quick Start](./quick-start) guide to use your first component.
